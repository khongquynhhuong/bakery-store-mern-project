import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    priceRaw: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    address: { type: String, required: true },
    ward: { type: String, default: "" },
    district: { type: String, default: "" },
    city: { type: String, required: true },
    note: { type: String, default: "" },
    paymentMethod: { type: String, required: true },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivering", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
