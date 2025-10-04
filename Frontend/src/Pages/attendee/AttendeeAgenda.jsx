import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../Styling/AttendeeAgenda.css';

const AttendeeAgenda = () => {
  const [activeDay, setActiveDay] = useState('day1');
  
  const schedule = {
    day1: [
      {
        id: 1,
        time: '09:00 - 10:00',
        title: 'Opening Keynote: The Future of Technology',
        speaker: 'Dr. Sarah Chen',
        location: 'Main Hall',
        type: 'Keynote',
        isBookmarked: true
      },
      {
        id: 2,
        time: '10:30 - 12:00',
        title: 'React Best Practices Workshop',
        speaker: 'Mike Johnson',
        location: 'Room 101',
        type: 'Workshop',
        isBookmarked: false
      },
      {
        id: 3,
        time: '13:00 - 14:00',
        title: 'Networking Lunch',
        speaker: '',
        location: 'Dining Hall',
        type: 'Networking',
        isBookmarked: false
      }
    ],
    day2: [
      {
        id: 4,
        time: '09:30 - 11:00',
        title: 'AI in Modern Applications',
        speaker: 'Dr. Alex Rivera',
        location: 'Main Hall',
        type: 'Presentation',
        isBookmarked: true
      }
    ]
  };

  const toggleBookmark = (sessionId) => {
    // Handle bookmark toggle
    console.log('Toggle bookmark:', sessionId);
  };

  return (
    <div className="attendee-agenda">
      <div className="container">
        <div className="agenda-header">
          <div>
            <h1>Your Event Agenda</h1>
            <p>Tech Conference 2024 - March 15-16, San Francisco</p>
          </div>
          <Link to="/attendee/onboarding" className="btn btn-secondary">
            Edit Preferences
          </Link>
        </div>

        <div className="agenda-content">
          <div className="agenda-sidebar">
            <div className="event-info">
              <h3>Event Details</h3>
              <div className="info-item">
                <strong>📅 Date:</strong>
                <span>March 15-16, 2024</span>
              </div>
              <div className="info-item">
                <strong>📍 Venue:</strong>
                <span>Moscone Center, SF</span>
              </div>
              <div className="info-item">
                <strong>👥 Attendees:</strong>
                <span>500+ Registered</span>
              </div>
            </div>

            <div className="personal-stats">
              <h3>Your Schedule</h3>
              <div className="stat">
                <div className="stat-value">6</div>
                <div className="stat-label">Sessions Booked</div>
              </div>
              <div className="stat">
                <div className="stat-value">3</div>
                <div className="stat-label">Networking Meetings</div>
              </div>
            </div>
          </div>

          <div className="agenda-main">
            <div className="days-navigation">
              <button 
                className={`day-tab ${activeDay === 'day1' ? 'active' : ''}`}
                onClick={() => setActiveDay('day1')}
              >
                Day 1 - March 15
              </button>
              <button 
                className={`day-tab ${activeDay === 'day2' ? 'active' : ''}`}
                onClick={() => setActiveDay('day2')}
              >
                Day 2 - March 16
              </button>
            </div>

            <div className="schedule">
              {schedule[activeDay].map(session => (
                <div key={session.id} className="session-card">
                  <div className="session-time">
                    {session.time}
                  </div>
                  <div className="session-content">
                    <div className="session-header">
                      <h3>{session.title}</h3>
                      <button 
                        className={`bookmark-btn ${session.isBookmarked ? 'bookmarked' : ''}`}
                        onClick={() => toggleBookmark(session.id)}
                      >
                        {session.isBookmarked ? '★' : '☆'}
                      </button>
                    </div>
                    {session.speaker && (
                      <p className="session-speaker">By {session.speaker}</p>
                    )}
                    <div className="session-meta">
                      <span className="session-location">📍 {session.location}</span>
                      <span className="session-type">{session.type}</span>
                    </div>
                    <div className="session-actions">
                      <button className="btn btn-secondary">Add to Calendar</button>
                      <button className="btn btn-primary">Join Session</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="recommended-sessions">
              <h3>Recommended for You</h3>
              <div className="recommendations-grid">
                <div className="recommendation-card">
                  <h4>Cloud Infrastructure Workshop</h4>
                  <p>Learn about modern cloud solutions</p>
                  <button className="btn btn-primary">Add to Agenda</button>
                </div>
                <div className="recommendation-card">
                  <h4>Startup Networking</h4>
                  <p>Connect with entrepreneurs and investors</p>
                  <button className="btn btn-primary">Add to Agenda</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeAgenda;