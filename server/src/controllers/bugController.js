const Bug = require("../models/Bug");
const analyzeBug = require("../services/geminiService");


//const analyzeBug = require("../services/geminiService");

// Create Bug
const createBug = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const aiAnalysis = await analyzeBug(description);

    const bug = await Bug.create({
      title,
      description,
      status,
      aiSuggestion: aiAnalysis,
    });

    res.status(201).json(bug);
  } catch (error) {
    console.log("CREATE BUG ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Bugs
const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();

    res.json(bugs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);

    if (!bug) {
      return res.status(404).json({
        message: "Bug not found",
      });
    }

    res.json({
      message: "Bug deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!bug) {
      return res.status(404).json({
        message: "Bug not found",
      });
    }

    res.json(bug);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBugById = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({
        message: "Bug not found",
      });
    }

    res.json(bug);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBug,
  getBugs,
  updateBug,
  deleteBug,
  getBugById,
};