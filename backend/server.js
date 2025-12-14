const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log("API running on", PORT));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/products", require("./routes/products"));
app.use("/cart", require("./routes/cart"));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const pool = require("./config/database"); // đường dẫn đúng file pool của bạn

pool.query("SELECT 1", (err, results) => {
  if (err) {
    console.error("❌ DB connect failed:", err);
  } else {
    console.log("✅ DB connected OK:", results);
  }
});

