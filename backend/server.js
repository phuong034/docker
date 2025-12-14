const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- Health check (đặt trước cũng được)
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// ---- Mount routes (API)
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));

// ---- Debug: in ra các request để biết route có được hit không
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

// ---- Root route (đỡ bị Not Found khi mở domain)
app.get("/", (req, res) => {
  res.send("OK - API is running. Try /api/health or /api/products");
});

// ---- DB check
const pool = require("./config/database");
pool.query("SELECT 1", (err, results) => {
  if (err) console.error("❌ DB connect failed:", err);
  else console.log("✅ DB connected OK:", results);
});

// ---- 404 handler (rõ ràng hơn)
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => console.log("API running on", PORT));
