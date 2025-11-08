import React, { useState } from "react";
import dayjs from "dayjs";
import "./Calender.css";

function Calender({ events, addEvent, deleteEvent }) {
  const [monthView, setMonthView] = useState(dayjs());
  const [activeDay, setActiveDay] = useState(null);
  const [eventInput, setEventInput] = useState("");

  const firstDayOfMonth = monthView.startOf("month");
  const lastDayOfMonth = monthView.endOf("month");
  const totalDays = lastDayOfMonth.date();
  const offsetDays = firstDayOfMonth.day();

  const goPrevMonth = () => setMonthView(monthView.subtract(1, "month"));
  const goNextMonth = () => setMonthView(monthView.add(1, "month"));

  const onDaySelect = (dayNum) => {
    const selected = monthView.date(dayNum);
    setActiveDay(selected);
  };

  const onAddEvent = () => {
    if (!activeDay || eventInput.trim() === "") return;
    addEvent(activeDay.format("YYYY-MM-DD"), eventInput);
    setEventInput("");
  };

  const grabEventsForDay = (dateObj) => {
    return events.filter((item) => item.date === dateObj.format("YYYY-MM-DD"));
  };

  const weeksArray = [];
  let daySlots = [];

  // Fill leading empty slots
  for (let i = 0; i < offsetDays; i++) {
    daySlots.push(<div key={`blank-${i}`} className="day empty"></div>);
  }

  // Fill actual days
  for (let i = 1; i <= totalDays; i++) {
    const tempDate = monthView.date(i);
    const isToday = tempDate.isSame(dayjs(), "day");
    const dayItems = grabEventsForDay(tempDate);

    daySlots.push(
      <div
        key={i}
        className={`day ${isToday ? "today" : ""} ${
          dayItems.length ? "has-event" : ""
        }`}
        onClick={() => onDaySelect(i)}
      >
        <div className="date-number">{i}</div>

        {dayItems.map((task) => (
          <div key={task.id} className="event-item">
            {task.title}
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteEvent(task.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );

    if (daySlots.length === 7) {
      weeksArray.push(
        <div key={`week-${i}`} className="week">
          {daySlots}
        </div>
      );
      daySlots = [];
    }
  }

  if (daySlots.length > 0) {
    weeksArray.push(
      <div key="remaining-week" className="week">
        {daySlots}
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={goPrevMonth}>◀</button>
        <h2>{monthView.format("MMMM YYYY")}</h2>
        <button onClick={goNextMonth}>▶</button>
      </div>

      <div className="day-names">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">{weeksArray}</div>

      {activeDay && (
        <div className="event-form">
          <h3>Add Event for {activeDay.format("DD MMMM YYYY")}</h3>
          <input
            type="text"
            placeholder="Event title..."
            value={eventInput}
            onChange={(e) => setEventInput(e.target.value)}
          />
          <button onClick={onAddEvent}>Add</button>
        </div>
      )}
    </div>
  );
}

export default Calender;
