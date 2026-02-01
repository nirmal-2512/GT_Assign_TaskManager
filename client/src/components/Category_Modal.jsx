import { useEffect, useState } from "react";
import api from "../services/api";

export default function CategoryModal({ onChange }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#6366f1");

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    await api.post("/categories", { name, color });
    setName("");
    fetchCategories();
    onChange();
  };

  // const deleteCategory = async (id) => {
  //   const ok = window.confirm("Delete this category?");
  //   if (!ok) return;

  //   await api.delete(`/categories/${id}`);

  //   fetchCategories();
  //   onChange();
  // };

  return (
    <div
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
      <h3 className="font-semibold text-purple-900 text-xl text-center">
        Categories
      </h3>

      {/* Category List */}
      <div className="space-y-2 max-h-32 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/30">
        {categories.length === 0 && (
          <p className="text-sm text-white/80 text-center">No categories yet</p>
        )}

        {categories.map((cat) => (
          <div
            key={cat._id}
            className="
          flex
          items-center
          justify-between
          p-2
          rounded-lg
          bg-white/70
          text-gray-800
        "
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm font-medium">{cat.name}</span>
            </div>

            {/* Delete button (optional) */}
            {/* 
        <button
          onClick={() => deleteCategory(cat._id)}
          className="text-xs text-red-500 hover:text-red-600"
        >
          Delete
        </button>
        */}
          </div>
        ))}
      </div>

      {/* Add Category */}
      <form
        onSubmit={addCategory}
        className="space-y-3 pt-3 border-t border-white/30"
      >
        <p className="text-sm font-medium text-white">Add Category</p>

        <input
          placeholder="Category name"
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="flex items-center gap-3">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 rounded cursor-pointer"
          />
          <span className="text-xs text-white/80">{color}</span>
        </div>

        <button
          className="
        w-full
        py-2
        rounded-lg
        bg-purple-600
        hover:bg-purple-700
        text-white
        font-semibold
        transition
      "
        >
          Add Category
        </button>
      </form>
    </div>
  );
}
