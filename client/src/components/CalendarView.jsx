import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView({ selectedDate, onChange }) {
  return (
    <div className="p-4 rounded-xl shadow bg-[#ccd5ae] text-black">
      <h3 className="font-semibold mb-b text-purple-700">Select Date</h3>
      <Calendar value={selectedDate} onChange={onChange} />
    </div>
  );
}
