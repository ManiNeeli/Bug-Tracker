const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Open",
    },

    priority: {
      type: String,
      default: "Medium",
    },

    category: {
      type: String,
      default: "General",
    },

    aiSuggestion: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Bug", bugSchema);
