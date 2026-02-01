import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/calander.css";

export default function CalendarView({ selectedDate, onChange }) {
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
    text-white
  "
    >
      <h3 className="font-semibold text-lg text-center mb-3">Select Date</h3>

      <Calendar
        value={selectedDate}
        onChange={onChange}
        className="custom-calendar"
      />
    </div>
  );
}
