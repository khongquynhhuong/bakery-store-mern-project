import express from "express";
import Cake from "../models/Cake.js";
import Order from "../models/Order.js";
import User, { hashPassword } from "../models/User.js";
import { verifyJWT } from "../middleware/auth.js";
import { requireRole } from "../middleware/auth.js";

const router = express.Router();
router.use(verifyJWT);
router.use(requireRole(["admin"]));

// ——— Products (Cakes) CRUD ———
router.get("/cakes", async (req, res) => {
  try {
    const cakes = await Cake.find().sort({ category: 1, name: 1 });
    res.json(cakes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/cakes", async (req, res) => {
  try {
    const cake = new Cake(req.body);
    await cake.save();
    res.status(201).json(cake);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/cakes/:id", async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) return res.status(404).json({ message: "Cake not found" });
    res.json(cake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/cakes/:id", async (req, res) => {
  try {
    const cake = await Cake.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cake) return res.status(404).json({ message: "Cake not found" });
    res.json(cake);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/cakes/:id", async (req, res) => {
  try {
    const cake = await Cake.findByIdAndDelete(req.params.id);
    if (!cake) return res.status(404).json({ message: "Cake not found" });
    res.json({ message: "Cake deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ——— Sales reports (daily / weekly) ———
// GET /api/admin/reports/sales?from=YYYY-MM-DD&to=YYYY-MM-DD&groupBy=day|week
router.get("/reports/sales", async (req, res) => {
  try {
    const { from, to, groupBy } = req.query;
    const toDate = (s) => {
      const d = new Date(s);
      d.setHours(0, 0, 0, 0);
      return d;
    };
    const endOfDay = (d) => {
      const x = new Date(d);
      x.setHours(23, 59, 59, 999);
      return x;
    };
    let start = from ? toDate(from) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    let end = to ? endOfDay(toDate(to)) : new Date();

    const orders = await Order.find({
      createdAt: { $gte: start, $lte: end },
      status: { $ne: "cancelled" },
    }).lean();

    const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
    const totalOrders = orders.length;

    // Group by day or week
    const byDay = {};
    const byWeek = {};
    orders.forEach((o) => {
      const d = new Date(o.createdAt);
      const dayKey = d.toISOString().slice(0, 10);
      byDay[dayKey] = (byDay[dayKey] || { revenue: 0, count: 0 });
      byDay[dayKey].revenue += o.total || 0;
      byDay[dayKey].count += 1;

      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      const weekKey = weekStart.toISOString().slice(0, 10);
      byWeek[weekKey] = (byWeek[weekKey] || { revenue: 0, count: 0 });
      byWeek[weekKey].revenue += o.total || 0;
      byWeek[weekKey].count += 1;
    });

    const summary = groupBy === "week"
      ? Object.entries(byWeek).map(([date, v]) => ({ date, ...v })).sort((a, b) => a.date.localeCompare(b.date))
      : Object.entries(byDay).map(([date, v]) => ({ date, ...v })).sort((a, b) => a.date.localeCompare(b.date));

    res.json({
      from: start.toISOString().slice(0, 10),
      to: end.toISOString().slice(0, 10),
      totalRevenue,
      totalOrders,
      summary,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ——— Staff management ———
// GET /api/admin/staff — list staff (employees)
router.get("/staff", async (req, res) => {
  try {
    const staff = await User.find({ role: "employee", isActive: true })
      .select("email fullName phone createdAt")
      .sort({ createdAt: -1 })
      .lean();
    res.json(staff.map((s) => ({ id: s._id.toString(), ...s, _id: undefined })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/admin/staff — add staff (employee)
router.post("/staff", async (req, res) => {
  try {
    const { email, password, fullName, phone } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const passwordHash = await hashPassword(password);
    const user = await User.create({
      email: email.toLowerCase().trim(),
      passwordHash,
      role: "employee",
      fullName: fullName?.trim() || "",
      phone: phone?.trim() || "",
    });
    const u = await User.findById(user._id).select("email role fullName phone");
    res.status(201).json({ id: u._id.toString(), email: u.email, role: u.role, fullName: u.fullName, phone: u.phone });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/admin/staff/:id — xóa hẳn staff để email có thể dùng lại khi thêm mới
router.delete("/staff/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id, role: "employee" });
    if (!user) return res.status(404).json({ message: "Staff not found" });
    res.json({ message: "Staff removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/staff/:id/performance — sales performance for one staff (orders assignedTo this user)
router.get("/staff/:id/performance", async (req, res) => {
  try {
    const staffId = req.params.id;
    const staff = await User.findOne({ _id: staffId, role: "employee" }).select("email fullName").lean();
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    const orders = await Order.find({ assignedTo: staffId, status: { $ne: "cancelled" } })
      .sort({ createdAt: -1 })
      .lean();
    const totalSales = orders.reduce((s, o) => s + (o.total || 0), 0);

    res.json({
      staff: { id: staffId, ...staff },
      totalOrders: orders.length,
      totalSales,
      orders: orders.map((o) => ({
        id: o._id,
        total: o.total,
        status: o.status,
        createdAt: o.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
