const express = require("express");
const router = express.Router();
const db = require("../config/database");

// Get all products
router.get("/", (req, res) => {
  const query = "SELECT * FROM products ORDER BY id DESC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Search products  ✅ để trước /:id để không bị nuốt
router.get("/search/:keyword", (req, res) => {
  const { keyword } = req.params;
  const query = "SELECT * FROM products WHERE name LIKE ? OR description LIKE ?";
  const searchTerm = `%${keyword}%`;

  db.query(query, [searchTerm, searchTerm], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get single product
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM products WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results || results.length === 0)
      return res.status(404).json({ error: "Product not found" });

    res.json(results[0]);
  });
});

module.exports = router;
