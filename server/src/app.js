require("dotenv").config(); // MUST be the first line

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const bugRoutes = require("./routes/bugRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

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
