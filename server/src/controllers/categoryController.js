const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  const category = await Category.create({
    ...req.body,
    userId: req.userId,
  });
  res.json(category);
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find({ userId: req.userId });
  res.json(categories);
};

exports.deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  if (category.userId.toString() !== req.user.id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await category.deleteOne();
  res.json({ message: "Category deleted" });
};
