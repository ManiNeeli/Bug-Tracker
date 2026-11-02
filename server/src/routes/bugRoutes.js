const express = require("express");

const {
  createBug,
  getBugs,
  getStats,
  getBugById,
  updateBug,
  reanalyzeBug,
  deleteBug,
} = require("../controllers/bugController");

const router = express.Router();

router.get("/", getBugs);
router.get("/stats", getStats); // MUST be above "/:id"
router.get("/:id", getBugById);
router.post("/", createBug);
router.post("/:id/analyze", reanalyzeBug);
router.put("/:id", updateBug);
router.delete("/:id", deleteBug);

module.exports = router;
