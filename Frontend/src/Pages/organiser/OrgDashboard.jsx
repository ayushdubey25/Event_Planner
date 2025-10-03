import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const OrgDashboard = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5800/api/event/my-events", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched Events:", res.data);

        if (Array.isArray(res.data)) {
          setUpcomingEvents(res.data);
        } else {
          setUpcomingEvents([]);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. You can still create a new one.");
        setUpcomingEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Organizer Dashboard</h2>
        <Link to="/organizer/create-event" className="btn btn-primary">
          Create New Event
        </Link>
      </div>

      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && upcomingEvents.length === 0 && !error && (
        <p>No upcoming events. Create one!</p>
      )}

      {!loading && upcomingEvents.length > 0 && (
        <ul>
          {upcomingEvents
            .filter((event) => new Date(event.date) > new Date())
            .map((event) => (
              <li key={event._id}>
                <strong>{event.name}</strong> — {new Date(event.date).toLocaleDateString()}{" "}
                at {event.venue}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default OrgDashboard;
