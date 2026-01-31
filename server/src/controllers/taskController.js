const Task = require("../models/Task");

const getStatus = (progress) => {
  if (progress === 100) return "completed";
  if (progress > 0) return "in-progress";
  return "pending";
};

exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    status: getStatus(req.body.progress),
    userId: req.userId,
  });
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const query = { userId: req.userId };
  if (req.query.date) query.date = req.query.date;

  const tasks = await Task.find(query).populate("categoryId");
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔥 SAFE CHECK
    if (!req.user || task.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    task.status = req.body.status ?? task.status;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};




exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });
  res.json({ message: "Task deleted" });
};
