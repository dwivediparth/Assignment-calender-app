import React from "react";
import "./Sidebar.css";

function Sidebar({ events, deleteEvent }) {
  return (
    <div className="sidebar">
      <h2>All Events</h2>
      {events.length === 0 ? (
        <p>No events added yet.</p>
      ) : (
        <ul>
          {events.map((e) => (
            <li key={e.id}>
              <div className="event-text">
                <strong>{e.title}</strong>
                <br />
                <small>{e.date}</small>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteEvent(e.id)}
              >
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
