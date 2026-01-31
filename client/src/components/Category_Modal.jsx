import { useState } from "react";
import api from "../services/api";

export default function CategoryModal({ onAdd }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#6366f1");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/categories", { name, color });
      setName("");
      onAdd();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow space-y-3"
    >
      <h3 className="font-serif font-semibold text-purple-700">Add Category</h3>

      <input
        placeholder="Category name"
        className="w-full border rounded px-3 py-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <div className="flex items-center gap-3">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <span className="text-sm">{color}</span>
      </div>

      <button className="w-full bg-indigo-600 text-white p-2 rounded">
        Save Category
      </button>
    </form>
  );
}
