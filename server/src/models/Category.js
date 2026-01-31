exports.createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;

    const category = await Category.create({
      name,
      color,
      userId: req.user.id, // 🔥 REQUIRED FIX
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
