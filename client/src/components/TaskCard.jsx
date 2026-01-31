import api from "../services/api";

export default function TaskCard({ task, onUpdate }) {
  const markCompleted = async () => {
    try {
      await api.put(`/tasks/${task._id}`, {
        status: "completed",
      });
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full bg-red-200 rounded-2xl border shadow-sm px-10 space-y-4">
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className="text-gray-600 mt-2 text-sm">{task.description}</p>

        <span
          className={`text-xs px-3 py-1 rounded-full w-fit ${
            task.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
        {task.status !== "completed" && (
          <div className="m-2">
            <button
              onClick={markCompleted}
              className="px-2 py-1 text-sm rounded-lg 
            bg-green-600 text-white hover:bg-green-700 transition"
            >
              Mark as Completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
