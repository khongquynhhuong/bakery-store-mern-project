import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cakesRouter from "./routes/cakes.js";
import ordersRouter from "./routes/orders.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import employeeRouter from "./routes/employees.js";
import adminRouter from "./routes/admin.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors(
  {
    origin: ["http://localhost:5173", "https://bakery-store-mern-application.vercel.app/"],
    credentials: true,
  }
));
app.use(express.json());

app.use("/api/cakes", cakesRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/admin", adminRouter);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
