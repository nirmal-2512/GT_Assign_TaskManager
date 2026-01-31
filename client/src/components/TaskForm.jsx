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
      className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <h2 className="text-lg font-semibold text-purple-700 font-serif">
        Add Task
      </h2>

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
        className="border p-2 rounded w-full"
        onChange={handleChange}
        value={form.description}
      />

      <div className="flex gap-2 flex-row">
        <input
          type="date"
          name="date"
          className="w-1/3 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
          value={form.date}
          required
        />
        <input
          type="time"
          name="startTime"
          className="w-1/3 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
          value={form.startTime}
          required
        />
        <input
          type="time"
          name="endTime"
          className="w-1/3 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
          value={form.endTime}
          required
        />
      </div>

      <select
        name="categoryId"
        className="w-full border mt-2 mb-2 p-2 rounded"
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

      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium">
        Save Task
      </button>
    </form>
  );
}
