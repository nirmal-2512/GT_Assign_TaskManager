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

  const fetchTasks = async (date = selectedDate) => {
    const formattedDate = date.toISOString().split("T")[0];
    const res = await api.get(`/tasks?date=${formattedDate}`);
    setTasks(res.data);
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="text-sm text-red-500"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left */}
        <div className="space-y-4 md:col-span-1">
          <CalendarView
            selectedDate={selectedDate}
            onChange={handleDateChange}
          />
          <CategoryModal onAdd={fetchCategories} />
          <TaskForm
            categories={categories}
            onSuccess={() => fetchTasks(selectedDate)}
          />
        </div>

        {/* Right */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-3">
            Tasks on {selectedDate.toDateString()}
          </h2>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <p className="text-gray-500">No tasks for this date</p>
            ) : (
              tasks.map((task) => <TaskCard key={task._id} task={task} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
