import api from "../services/api";

const hexToRgba = (hex, alpha = 0.12) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
export default function TaskCard({ task, onUpdate }) {
  const color = task.categoryId?.color || "#6366f1";
  const bgColor = hexToRgba(color);
  const markCompleted = async () => {
    await api.put(`/tasks/${task._id}`);
    console.log("ID:", task._id);
  };

  const deleteTask = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks/${task._id}`);
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="w-full bg-red-200 rounded-2xl border shadow-sm px-10 space-y-4"
      style={{
        backgroundColor: bgColor,
        borderColor: color,
      }}
    >
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-lg font-semibold text-white">{task.title}</h3>
        <p className="text-white mt-2 text-sm">{task.description}</p>

        <span
          className={`text-xs px-3 py-1 rounded-full w-fit ${
            task.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
        <div className="m-2">
          {task.status !== "completed" && (
            <button
              onClick={markCompleted}
              className="px-2 py-1 text-sm rounded-lg 
            bg-green-600 text-white hover:bg-green-700 transition"
            >
              Completed
            </button>
          )}
          <button
            onClick={deleteTask}
            className="px-4 py-1 mx-2 my-2 text-sm rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
