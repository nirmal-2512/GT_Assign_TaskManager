const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

router.use(protect);
router.post("/", createCategory);
router.get("/", getCategories);

module.exports = router;
