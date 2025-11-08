import React, { useState, useEffect } from "react";
import "./App.css";
import Calender from "./Calender";
import Sidebar from "./Sidebar";
import eventsData from "./eventsData.json"; // ✅ import static events

function App() {
  const [events, setEvents] = useState([]);

  // Load static events on first render
  useEffect(() => {
    // Assign IDs to static events (so deletion works)
    const withIds = eventsData.map((e, idx) => ({ id: idx + 1, ...e }));
    setEvents(withIds);
  }, []);

  // Add new event
  const addEvent = (date, title) => {
    const newEvent = { id: Date.now(), date, title };
    setEvents([...events, newEvent]);
  };

  // Delete event by ID
  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="app-container">
      <Sidebar events={events} deleteEvent={deleteEvent} />
      <Calender events={events} addEvent={addEvent} deleteEvent={deleteEvent} />
    </div>
  );
}

export default App;
