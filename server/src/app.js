require("dotenv").config(); // MUST be the first line

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");
const bugRoutes = require("./routes/bugRoutes");
const authRoutes = require("./routes/authRoutes");

connectDB();

const app = express();

app.set("trust proxy", 1); // needed behind Render's proxy so rate limits see real IPs

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "100kb" }));

app.use("/api/auth", authRoutes);
app.use("/api/bugs", bugRoutes);

app.get("/", (req, res) => {
  res.json({ message: "AI Bug Tracker API Running" });
});

// Global error handler (must be after routes)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
