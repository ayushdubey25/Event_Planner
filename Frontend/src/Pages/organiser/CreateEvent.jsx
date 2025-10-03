import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../Styling/CreateEvent.css';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    type: 'conference',
    date: '',
    time: '',
    venue: '',
    description: '',
    capacity: 100
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Data:', eventData);
    // Handle form submission
  };

  return (
    <div className="create-event">
      <div className="container">
        <div className="page-header">
          <h1>Create New Event</h1>
          <Link to="/organizer/dashboard" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>

        <div className="create-event-content">
          <form onSubmit={handleSubmit} className="event-form">
            <div className="form-section">
              <h2>Basic Information</h2>
              
              <div className="form-group">
                <label htmlFor="name">Event Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={eventData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter event name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="type">Event Type *</label>
                  <select
                    id="type"
                    name="type"
                    value={eventData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="networking">Networking</option>
                    <option value="party">Party</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="capacity">Capacity</label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={eventData.capacity}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="Maximum attendees"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={eventData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Time *</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={eventData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="venue">Venue *</label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={eventData.venue}
                  onChange={handleInputChange}
                  required
                  placeholder="Event venue address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Describe your event..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary">
                Save Draft
              </button>
              <Link to="/organizer/ai-plan" className="btn btn-primary">
                Continue with AI Planning →
              </Link>
            </div>
          </form>

          <div className="form-preview">
            <h3>Event Preview</h3>
            <div className="preview-card">
              <h4>{eventData.name || 'Event Name'}</h4>
              <p><strong>Type:</strong> {eventData.type}</p>
              <p><strong>Date:</strong> {eventData.date || 'Not set'}</p>
              <p><strong>Time:</strong> {eventData.time || 'Not set'}</p>
              <p><strong>Venue:</strong> {eventData.venue || 'Not set'}</p>
              <p><strong>Capacity:</strong> {eventData.capacity} attendees</p>
              <p><strong>Description:</strong> {eventData.description || 'No description provided'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;