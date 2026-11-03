const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    category: {
      type: String,
      enum: [
        "UI",
        "Backend",
        "Database",
        "Performance",
        "Security",
        "Other",
        "General",
      ],
      default: "General",
    },
    aiSuggestion: { type: String, default: "" },
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Bug", bugSchema);
