export default function TaskCard({ task }) {
  const categoryColor = task.categoryId?.color || "#6366f1";

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-sm border-l-4"
      style={{ borderColor: categoryColor }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <span className="text-xs px-2 py-1 rounded bg-gray-200">
          {task.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm mt-1">{task.description}</p>

      <p className="text-sm mt-2">
        ⏰ {task.startTime} - {task.endTime}
      </p>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            className="h-2 rounded"
            style={{
              width: `${task.progress}%`,
              backgroundColor: categoryColor,
            }}
          />
        </div>
        <p className="text-xs mt-1">{task.progress}% completed</p>
      </div>
    </div>
  );
}
