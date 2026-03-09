import express from "express";
import jwt from "jsonwebtoken";
import User, { hashPassword, comparePassword } from "../models/User.js";
import { verifyJWT } from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";

function signToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

// POST /api/auth/register — customer only
router.post("/register", async (req, res) => {
  try {
    const { email, password, fullName } = req.body || {};
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
      role: "customer",
      fullName: fullName?.trim() || "",
    });
    const token = signToken(user._id);
    const u = await User.findById(user._id).select("email role fullName");
    res.status(201).json({
      token,
      user: { id: u._id, email: u.email, role: u.role, fullName: u.fullName },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login — all roles (customer, employee, admin)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (!user.isActive) {
      return res.status(401).json({ message: "Account is disabled" });
    }
    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = signToken(user._id);
    const u = await User.findById(user._id).select("email role fullName phone");
    res.json({
      token,
      user: {
        id: u._id.toString(),
        email: u.email,
        role: u.role,
        fullName: u.fullName,
        phone: u.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me — current user (requires valid JWT)
router.get("/me", verifyJWT, (req, res) => {
  res.json(req.user);
});

export default router;
