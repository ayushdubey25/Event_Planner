import React from 'react';
import { Link } from 'react-router-dom';
import '../../../Styling/OrgDashboard.css';

const Dashboard = () => {
  const upcomingEvents = [
    { id: 1, name: 'Tech Conference 2024', date: '2024-03-15', attendees: 500, status: 'Active' },
    { id: 2, name: 'Product Launch', date: '2024-04-01', attendees: 200, status: 'Draft' }
  ];

  const quickStats = [
    { label: 'Total Events', value: '12', change: '+2' },
    { label: 'Active Now', value: '3', change: '+1' },
    { label: 'Total Attendees', value: '2.4k', change: '+15%' },
    { label: 'Satisfaction', value: '94%', change: '+3%' }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Event Dashboard</h1>
          <Link to="/organizer/create-event" className="btn btn-primary">
            Create New Event
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          {quickStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
              <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {stat.change}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/organizer/ai-plan" className="action-card">
              <div className="action-icon">🤖</div>
              <h3>AI Planning</h3>
              <p>Generate event plan with AI</p>
            </Link>
            <Link to="/organizer/orchestration" className="action-card">
              <div className="action-icon">⚡</div>
              <h3>Orchestration</h3>
              <p>Manage vendors & tasks</p>
            </Link>
            <Link to="/organizer/analytics" className="action-card">
              <div className="action-icon">📊</div>
              <h3>Analytics</h3>
              <p>View event insights</p>
            </Link>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="events-section">
          <h2>Upcoming Events</h2>
          <div className="events-grid">
            {upcomingEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <h3>{event.name}</h3>
                  <span className={`status-badge ${event.status.toLowerCase()}`}>
                    {event.status}
                  </span>
                </div>
                <div className="event-details">
                  <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                  <p>👥 {event.attendees} attendees</p>
                </div>
                <div className="event-actions">
                  <button className="btn btn-secondary">View</button>
                  <button className="btn btn-primary">Manage</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;