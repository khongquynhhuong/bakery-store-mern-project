/**
 * One-time seed: create first admin user.
 * Usage: set ADMIN_EMAIL and ADMIN_PASSWORD in .env, then run: node scripts/seedAdmin.js
 */
import "dotenv/config";
import { connectDB } from "../config/db.js";
import User, { hashPassword } from "../models/User.js";

async function seed() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
    process.exit(1);
  }

  await connectDB();
  const existing = await User.findOne({ role: "admin" });
  if (existing) {
    console.log("Admin already exists:", existing.email);
    process.exit(0);
  }

  const passwordHash = await hashPassword(password);
  await User.create({
    email: email.toLowerCase().trim(),
    passwordHash,
    role: "admin",
    fullName: "Admin",
  });
  console.log("Admin created:", email);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
