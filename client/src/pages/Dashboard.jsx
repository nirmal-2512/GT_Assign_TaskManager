import { useEffect, useState } from "react";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import AlertBar from "../components/AlertBar";
import CategoryModal from "../components/Category_Modal";
import CalendarView from "../components/CalendarView";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const fetchTasks = async (dateObj) => {
    try {
      const d = dateObj || selectedDate || new Date();

      const formattedDate =
        d instanceof Date ? d.toISOString().split("T")[0] : d;

      console.log("Fetching date:", formattedDate);

      const res = await api.get(`/tasks?date=${formattedDate}`);

      console.log("Tasks:", res.data);

      setTasks(res.data);
    } catch (err) {
      console.error("Fetch tasks error:", err.message);
    }
  };

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchTasks(date);
  };

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  return (
    <div className="flex min-h-screen text-white w-1/1 flex-col w-screen">
      {/* Header */}
      <div className="bg-purple-500">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-semibold text-blue-900">
              Task Manager
            </h1>
            <p className="text-xl font-serif text-gray-900">
              Plan, track and finish your tasks
            </p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="text-sm px-4 text-white py-2 rounded-lg bg-purple-950 hover:bg-purple-800"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Left */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <CalendarView
            selectedDate={selectedDate}
            onChange={handleDateChange}
          />
          <CategoryModal onChange={fetchCategories} />

          <TaskForm
            categories={categories}
            onSuccess={() => fetchTasks(selectedDate)}
          />
        </div>

        {/* Right */}
        <div className="xl:col-span-3">
          <h2 className="text-xl font-semibold mb-3 text-white p-4">
            Tasks on {selectedDate.toDateString()}
          </h2>

          <div className="space-y-4 w-full">
            {tasks.length === 0 ? (
              <p className="text-white">No tasks for this date</p>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onUpdate={() => fetchTasks(selectedDate)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
