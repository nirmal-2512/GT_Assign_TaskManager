import { useState } from "react";
import api from "../services/api";

export default function TaskForm({ onSuccess, categories }) {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: today,
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
      className="
    w-full
    max-w-md
    mx-auto
    p-5
    rounded-2xl
    bg-white/20
    backdrop-blur-lg
    border
    border-white/30
    shadow-xl
    space-y-4
  "
    >
      <h2 className="text-xl font-semibold text-purple-900 text-center">
        Add Task
      </h2>

      <input
        name="title"
        placeholder="Title"
        className="
      w-full
      px-4 py-2
      rounded-lg
      bg-white/80
      text-gray-800
      placeholder-gray-500
      focus:outline-none
      focus:ring-2
      focus:ring-indigo-400
    "
        onChange={handleChange}
        value={form.title}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="
      w-full
      px-4 py-2
      rounded-lg
      bg-white/80
      text-gray-800
      placeholder-gray-500
      focus:outline-none
      focus:ring-2
      focus:ring-indigo-400
    "
        rows={3}
        onChange={handleChange}
        value={form.description}
      />

      <div className="flex gap-1">
        <input
          type="date"
          name="date"
          className="
        w-1/3
        px-3 py-2
        rounded-lg
        bg-white/80
        text-gray-800
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-400
      "
          onChange={handleChange}
          value={form.date}
          required
        />
        <input
          type="time"
          name="startTime"
          className="
        w-1/3
        px-3 py-2
        rounded-lg
        bg-white/80
        text-gray-800
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-400
      "
          onChange={handleChange}
          value={form.startTime}
          required
        />
        <input
          type="time"
          name="endTime"
          className="
        w-1/3
        px-3 py-2
        rounded-lg
        bg-white/80
        text-gray-800
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-400
      "
          onChange={handleChange}
          value={form.endTime}
          required
        />
      </div>

      <select
        name="categoryId"
        className="
      w-full
      px-4 py-2
      rounded-lg
      bg-white/80
      text-gray-800
      focus:outline-none
      focus:ring-2
      focus:ring-indigo-400
    "
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

      <button
        className="
      w-full
      py-2.5
      rounded-lg
      bg-purple-600
      hover:bg-purple-700
      text-white
      font-semibold
      transition
    "
      >
        Add Task
      </button>
    </form>
  );
}
