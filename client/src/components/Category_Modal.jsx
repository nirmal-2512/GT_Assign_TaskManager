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
    <div className="bg-white rounded-2xl border shadow-sm p-4 space-y-4">
      <h3 className="font-semibold text-purple-700 text-lg">Categories</h3>

      {/* Category List */}
      <div className="space-y-2 max-h-20 overflow-y-auto pr-1">
        {categories.length === 0 && (
          <p className="text-sm text-gray-800 ">No categories yet</p>
        )}

        {categories.map((cat) => (
          <div
            key={cat._id}
            className="flex items-center justify-between p-2 rounded-lg border"
          >
            <div className="flex items-center  text-gray-800 gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm">{cat.name}</span>
            </div>

            {/* <button
              onClick={() => deleteCategory(cat._id)}
              className="text-xs text-red-600 hover:underline"
            >
              Delete
            </button>
            */}
          </div>
        ))}
      </div>

      {/* Add Category */}
      <form onSubmit={addCategory} className="space-y-2 pt-2 border-t">
        <p className="text-sm font-medium">Add Category</p>

        <input
          placeholder="Category name"
          className="w-full border rounded-lg px-3 py-2 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <span className="text-xs">{color}</span>
        </div>

        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm">
          Add Category
        </button>
      </form>
    </div>
  );
}
