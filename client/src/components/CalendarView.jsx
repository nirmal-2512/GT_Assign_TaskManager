import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView({ selectedDate, onChange }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-black">
      <h3 className="font-semibold mb-b">Select Date</h3>
      <Calendar value={selectedDate} onChange={onChange} />
    </div>
  );
}
