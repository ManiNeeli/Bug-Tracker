const express = require("express");

const {
  createBug,
  getBugs,
  getBugById,
  updateBug,
  deleteBug,
} = require("../controllers/bugController");

const router = express.Router();

router.get("/", getBugs);
router.get("/:id", getBugById);
router.post("/", createBug);
router.put("/:id", updateBug);
router.delete("/:id", deleteBug);

module.exports = router;
