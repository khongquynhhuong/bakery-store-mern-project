import express from "express";
import User from "../models/User.js";
import { verifyJWT, requireRole } from "../middleware/auth.js";

const router = express.Router();

// GET /api/users/me — customer profile
router.get("/me", verifyJWT, requireRole(["customer"]), (req, res) => {
  res.json(req.user);
});

// PATCH /api/users/me — update customer profile
router.patch("/me", verifyJWT, requireRole(["customer"]), async (req, res) => {
  try {
    const { fullName } = req.body || {};
    const update = {};
    if (fullName !== undefined) update.fullName = String(fullName).trim();
    if (Object.keys(update).length === 0) {
      const u = await User.findById(req.user.id).select("email role fullName");
      return res.json({ id: u._id.toString(), email: u.email, role: u.role, fullName: u.fullName });
    }
    const updated = await User.findByIdAndUpdate(req.user.id, update, { new: true }).select("email role fullName");
    res.json({ id: updated._id.toString(), email: updated.email, role: updated.role, fullName: updated.fullName });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
