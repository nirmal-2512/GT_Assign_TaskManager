import { useState } from "react";
import api from "../services/api";

export default function TaskForm({ onSuccess, categories }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    progress: 0,
    categoryId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", form);
      onSuccess(); // refresh tasks
      setForm({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        progress: 0,
        categoryId: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow space-y-3"
    >
      <h2 className="text-lg font-semibold">Add Task</h2>

      <input
        name="title"
        placeholder="Title"
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={handleChange}
        value={form.title}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 rounded"
        onChange={handleChange}
        value={form.description}
      />

      <div className="flex gap-2">
        <input
          type="date"
          name="date"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
          value={form.date}
          required
        />
        <input
          type="time"
          name="startTime"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
          value={form.startTime}
          required
        />
        <input
          type="time"
          name="endTime"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
          value={form.endTime}
          required
        />
      </div>

      <select
        name="categoryId"
        className="border p-2 rounded"
        onChange={handleChange}
        value={form.categoryId}
        required
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="progress"
        min="0"
        max="100"
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={handleChange}
        value={form.progress}
      />

      <button className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
        Save Task
      </button>
    </form>
  );
}
