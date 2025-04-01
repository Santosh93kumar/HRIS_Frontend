import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default styles

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Select a Date</h2>
      <Calendar onChange={setDate} value={date} />
      <p className="mt-2">Selected Date: {date.toDateString()}</p>
    </div>
  );
};

export default CalendarComponent;
