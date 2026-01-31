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
  console.log("Updates:");
  const updates = {
    ...req.body,
    status: "completed",
  };

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    updates,
    { new: true }
  );

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });
  res.json({ message: "Task deleted" });
};
