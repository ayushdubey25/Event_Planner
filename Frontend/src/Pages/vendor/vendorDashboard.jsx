import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../Styling/VendorDashboard.css';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const upcomingEvents = [
    {
      id: 1,
      name: 'Tech Conference 2024',
      date: '2024-03-15',
      services: ['Catering', 'Equipment'],
      status: 'Confirmed',
      organizer: 'Tech Events Inc.'
    },
    {
      id: 2,
      name: 'Product Launch',
      date: '2024-04-01',
      services: ['Venue Setup'],
      status: 'Pending',
      organizer: 'Startup XYZ'
    }
  ];

  const tasks = [
    {
      id: 1,
      event: 'Tech Conference 2024',
      task: 'Finalize menu with organizer',
      dueDate: '2024-02-20',
      priority: 'High'
    },
    {
      id: 2,
      event: 'Product Launch',
      task: 'Submit equipment list',
      dueDate: '2024-03-01',
      priority: 'Medium'
    }
  ];

  return (
    <div className="vendor-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Vendor Dashboard</h1>
            <p>Premium Catering Services</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary">New Proposal</button>
          </div>
        </div>

        <div className="vendor-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            My Events
          </button>
          <button 
            className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            Tasks
          </button>
          <button 
            className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Active Events</h3>
                  <div className="stat-value">5</div>
                  <div className="stat-change positive">+2 this month</div>
                </div>
                <div className="stat-card">
                  <h3>Pending Proposals</h3>
                  <div className="stat-value">3</div>
                  <div className="stat-change">Need review</div>
                </div>
                <div className="stat-card">
                  <h3>Satisfaction Rate</h3>
                  <div className="stat-value">96%</div>
                  <div className="stat-change positive">+4%</div>
                </div>
                <div className="stat-card">
                  <h3>Revenue</h3>
                  <div className="stat-value">$42.5K</div>
                  <div className="stat-change positive">+12%</div>
                </div>
              </div>

              <div className="overview-sections">
                <div className="upcoming-events">
                  <h3>Upcoming Events</h3>
                  <div className="events-list">
                    {upcomingEvents.slice(0, 3).map(event => (
                      <div key={event.id} className="event-item">
                        <div className="event-info">
                          <h4>{event.name}</h4>
                          <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                          <div className="services">
                            {event.services.map(service => (
                              <span key={service} className="service-tag">{service}</span>
                            ))}
                          </div>
                        </div>
                        <div className="event-status">
                          <span className={`status-badge ${event.status.toLowerCase()}`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="recent-tasks">
                  <h3>Recent Tasks</h3>
                  <div className="tasks-list">
                    {tasks.map(task => (
                      <div key={task.id} className="task-item">
                        <div className="task-main">
                          <h4>{task.task}</h4>
                          <p>For: {task.event}</p>
                        </div>
                        <div className="task-meta">
                          <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                            {task.priority}
                          </span>
                          <span className="due-date">Due: {task.dueDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="events-content">
              <div className="section-header">
                <h2>My Events</h2>
                <button className="btn btn-primary">Add Availability</button>
              </div>
              
              <div className="events-table">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="event-row">
                    <div className="event-details">
                      <h4>{event.name}</h4>
                      <p>Organizer: {event.organizer}</p>
                      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <div className="event-services">
                      {event.services.map(service => (
                        <span key={service} className="service-tag">{service}</span>
                      ))}
                    </div>
                    <div className="event-actions">
                      <span className={`status-badge ${event.status.toLowerCase()}`}>
                        {event.status}
                      </span>
                      <button className="btn btn-secondary">Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="tasks-content">
              <div className="section-header">
                <h2>Task Management</h2>
                <button className="btn btn-primary">Create Task</button>
              </div>
              
              <div className="tasks-table">
                {tasks.map(task => (
                  <div key={task.id} className="task-row">
                    <div className="task-info">
                      <h4>{task.task}</h4>
                      <p>{task.event}</p>
                    </div>
                    <div className="task-priority">
                      <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="task-due">
                      {task.dueDate}
                    </div>
                    <div className="task-actions">
                      <button className="btn btn-secondary">Update</button>
                      <button className="btn btn-primary">Complete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="messages-content">
              <div className="section-header">
                <h2>Messages</h2>
              </div>
              
              <div className="messages-list">
                <div className="message-item unread">
                  <div className="message-sender">
                    <strong>Tech Events Inc.</strong>
                    <span>Today, 10:30 AM</span>
                  </div>
                  <div className="message-preview">
                    Regarding menu changes for Tech Conference...
                  </div>
                </div>
                <div className="message-item">
                  <div className="message-sender">
                    <strong>Startup XYZ</strong>
                    <span>Yesterday, 3:45 PM</span>
                  </div>
                  <div className="message-preview">
                    Equipment requirements for Product Launch...
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;