const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const BUILD_ID = "build-2025-12-15-01"; // đổi số bất kỳ mỗi lần bạn muốn kiểm tra deploy
console.log("✅ BOOT:", BUILD_ID);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route "đóng dấu" để biết Render đang chạy đúng code hay chưa
app.get("/__whoami", (req, res) => {
  res.json({ ok: true, build: BUILD_ID });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", build: BUILD_ID, message: "Server is running" });
});

// Routes
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));

// Root route (đỡ thấy Not Found khi mở domain)
app.get("/", (req, res) => {
  res.send("OK - API is running. Try /__whoami, /api/health, /api/products");
});

// DB check
const pool = require("./config/database");
pool.query("SELECT 1", (err, results) => {
  if (err) console.error("❌ DB connect failed:", err);
  else console.log("✅ DB connected OK:", results);
});

// 404 handler (trả JSON rõ ràng)
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    path: req.originalUrl,
    method: req.method,
    build: BUILD_ID,
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log("API running on", PORT);
});
