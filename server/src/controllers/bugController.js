const mongoose = require("mongoose");
const Bug = require("../models/Bug");
const analyzeBug = require("../services/geminiService");

const isValidId = (id) => mongoose.isValidObjectId(id);

// Create Bug
const createBug = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // AI is optional: if it fails, the bug still gets saved
    let ai = { priority: "Medium", category: "General", suggestion: "" };
    try {
      ai = await analyzeBug(description);
    } catch (err) {
      console.error("AI analysis failed:", err.message);
    }

    const bug = await Bug.create({
      title,
      description,
      status,
      priority: ai.priority,
      category: ai.category,
      aiSuggestion: ai.suggestion,
    });

    res.status(201).json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bugs (newest first)
const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one bug
const getBugById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid bug id" });
    }

    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: "Bug not found" });

    res.json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update bug (only allowed fields)
const updateBug = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid bug id" });
    }

    const allowed = ["title", "description", "status", "priority", "category"];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const bug = await Bug.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!bug) return res.status(404).json({ message: "Bug not found" });

    res.json(bug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete bug
const deleteBug = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid bug id" });
    }

    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).json({ message: "Bug not found" });

    res.json({ message: "Bug deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBug, getBugs, updateBug, deleteBug, getBugById };
