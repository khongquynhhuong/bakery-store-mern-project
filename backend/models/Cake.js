import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const Cake = mongoose.model("Cake", cakeSchema);
export default Cake;
