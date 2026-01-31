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
