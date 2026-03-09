import express from "express";
import Order from "../models/Order.js";
import User from "../models/User.js";
import { verifyJWT } from "../middleware/auth.js";
import { requireRole } from "../middleware/auth.js";
import { hashPassword } from "../models/User.js";

const router = express.Router();

router.use(verifyJWT);
router.use(requireRole(["employee", "admin"]));

// GET /api/employees/me — own profile
router.get("/me", async (req, res) => {
  const user = await User.findById(req.user.id).select("email role fullName phone").lean();
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ id: user._id.toString(), ...user });
});

// PATCH /api/employees/me — update own profile (fullName, phone; password optional)
router.patch("/me", async (req, res) => {
  try {
    const { fullName, phone, password } = req.body || {};
    const update = {};
    if (fullName !== undefined) update.fullName = fullName.trim();
    if (phone !== undefined) update.phone = String(phone).trim();
    if (password && password.length >= 6) {
      update.passwordHash = await hashPassword(password);
    }
    const updated = await User.findByIdAndUpdate(req.user.id, update, { new: true })
      .select("email role fullName phone");
    res.json({ id: updated._id.toString(), email: updated.email, role: updated.role, fullName: updated.fullName, phone: updated.phone });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/employees/orders — list all orders (newest first)
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate("assignedTo", "fullName email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/employees/orders/:id/status — update status, optionally assign to self
router.patch("/orders/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status, assignToMe } = req.body || {};
  const allowed = ["pending", "confirmed", "delivering", "delivered", "cancelled"];

  if (!allowed.includes(status)) {
    return res.status(400).json({ message: `Status must be one of: ${allowed.join(", ")}` });
  }

  try {
    const update = { status };
    if (assignToMe) update.assignedTo = req.user.id;
    const order = await Order.findByIdAndUpdate(id, update, { new: true, runValidators: true })
      .populate("assignedTo", "fullName email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
