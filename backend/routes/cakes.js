import express from "express";
import Cake from "../models/Cake.js";

const router = express.Router();

// GET all cakes
router.get("/", async (req, res) => {
  try {
    const cakes = await Cake.find().sort({ category: 1, name: 1 });
    res.json(cakes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET cakes by category using query: /api/cakes/by-category?category=Tin%20box%20cake
router.get("/by-category", async (req, res) => {
  const { category } = req.query;
  if (!category) {
    return res.status(400).json({ message: "Missing category query parameter" });
  }

  try {
    const cakes = await Cake.find({ category }).sort({ name: 1 });
    res.json(cakes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET cakes by category using params: /api/cakes/category/Tin%20box%20cake
router.get("/category/:category", async (req, res) => {
  const category = decodeURIComponent(req.params.category);

  try {
    const cakes = await Cake.find({ category }).sort({ name: 1 });
    res.json(cakes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET search cakes by name: /api/cakes/search?q=chocolate
router.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q || typeof q !== "string") {
    return res.json([]);
  }
  const trimmed = q.trim();
  if (!trimmed) return res.json([]);

  try {
    const cakes = await Cake.find({
      name: { $regex: trimmed, $options: "i" },
    })
      .sort({ category: 1, name: 1 })
      .limit(50);
    res.json(cakes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one cake by id
router.get("/:id", async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) return res.status(404).json({ message: "Cake not found" });
    res.json(cake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create/Update/Delete cakes: use /api/admin/cakes (admin only)

export default router;
