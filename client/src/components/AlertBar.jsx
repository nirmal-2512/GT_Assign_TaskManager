import { useEffect, useState } from "react";

export default function AlertBar({ tasks }) {
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    const checkActiveTask = () => {
      const now = new Date();

      const today = now.toISOString().split("T")[0];
      const currentTime =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0");

      const runningTasks = tasks.filter(
        (t) =>
          t.date?.startsWith(today) &&
          currentTime >= t.startTime &&
          currentTime <= t.endTime,
      );

      if (runningTasks.length === 0) {
        setActiveTask(null);
        return;
      }

      // Pick task that ends first
      runningTasks.sort((a, b) => a.endTime.localeCompare(b.endTime));

      setActiveTask(runningTasks[0]);
    };

    checkActiveTask();
    const interval = setInterval(checkActiveTask, 60000);

    return () => clearInterval(interval);
  }, [tasks]);

  if (!activeTask) return null;

  return (
    <div
      className="mb-4 p-4 rounded-lg text-white shadow"
      style={{
        backgroundColor: activeTask.categoryId?.color || "#16a34a",
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">🚨 Ongoing Task</p>
          <p className="text-sm">{activeTask.title}</p>
        </div>

        <span className="text-sm">
          {activeTask.startTime} – {activeTask.endTime}
        </span>
      </div>
    </div>
  );
}
