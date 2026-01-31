const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.use(protect);

router.route("/")
  .get(getCategories)
  .post(createCategory);

router.delete("/:id", deleteCategory); // 🔥 REQUIRED

module.exports = router;
