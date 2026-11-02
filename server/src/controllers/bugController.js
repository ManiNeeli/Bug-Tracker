const mongoose = require("mongoose");
const Bug = require("../models/Bug");
const analyzeBug = require("../services/geminiService");

const isValidId = (id) => mongoose.isValidObjectId(id);
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

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

// Get bugs with optional search + filters
// GET /api/bugs?search=login&status=Open&priority=High&category=UI
const getBugs = async (req, res) => {
  try {
    const { search, status, priority, category } = req.query;
    const filter = {};

    if (typeof status === "string" && status) filter.status = status;
    if (typeof priority === "string" && priority) filter.priority = priority;
    if (typeof category === "string" && category) filter.category = category;

    if (typeof search === "string" && search.trim()) {
      const regex = new RegExp(escapeRegex(search.trim()), "i");
      filter.$or = [{ title: regex }, { description: regex }];
    }

    const bugs = await Bug.find(filter).sort({ createdAt: -1 });
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Stats for dashboard (not affected by filters)
const getStats = async (req, res) => {
  try {
    const countBy = async (field) => {
      const rows = await Bug.aggregate([
        { $group: { _id: `$${field}`, count: { $sum: 1 } } },
      ]);
      return Object.fromEntries(rows.map((r) => [r._id, r.count]));
    };

    const [total, status, priority, category] = await Promise.all([
      Bug.countDocuments(),
      countBy("status"),
      countBy("priority"),
      countBy("category"),
    ]);

    res.json({ total, status, priority, category });
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

// Re-run AI analysis
const reanalyzeBug = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid bug id" });
    }

    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: "Bug not found" });

    let ai;
    try {
      ai = await analyzeBug(bug.description);
    } catch (err) {
      console.error("AI re-analysis failed:", err.message);
      return res
        .status(502)
        .json({ message: "AI analysis failed. Try again." });
    }

    bug.priority = ai.priority;
    bug.category = ai.category;
    bug.aiSuggestion = ai.suggestion;
    await bug.save();

    res.json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

module.exports = {
  createBug,
  getBugs,
  getStats,
  getBugById,
  updateBug,
  reanalyzeBug,
  deleteBug,
};
