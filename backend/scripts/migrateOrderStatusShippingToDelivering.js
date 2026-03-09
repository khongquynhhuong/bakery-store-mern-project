/**
 * One-time migration: set order status from "shipping" to "delivering".
 * Run from backend folder: node scripts/migrateOrderStatusShippingToDelivering.js
 */
import "dotenv/config";
import { connectDB } from "../config/db.js";
import Order from "../models/Order.js";

async function run() {
  await connectDB();
  const result = await Order.updateMany(
    { status: "shipping" },
    { $set: { status: "delivering" } }
  );
  console.log("Updated orders:", result.modifiedCount);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
