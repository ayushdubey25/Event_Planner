import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../Styling/AttendeeOnboard.css';

const AttendeeOnboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventCode: '',
    fullName: '',
    email: '',
    company: '',
    role: '',
    interests: []
  });

  const interests = [
    'Networking', 'Technical Workshops', 'Keynote Sessions', 
    'Product Demos', 'Career Development', 'Industry Trends'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Attendee Data:', formData);
    // Handle form submission
  };

  return (
    <div className="attendee-onboarding">
      <div className="container">
        <div className="onboarding-header">
          <h1>Join Your Event</h1>
          <p>Get ready for an amazing experience!</p>
        </div>

        <div className="onboarding-progress">
          <div className="progress-steps">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`progress-step ${stepNumber === step ? 'active' : ''} ${
                  stepNumber < step ? 'completed' : ''
                }`}
              >
                <div className="step-number">{stepNumber}</div>
                <div className="step-label">
                  {stepNumber === 1 && 'Event Code'}
                  {stepNumber === 2 && 'Your Info'}
                  {stepNumber === 3 && 'Interests'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="onboarding-form">
          {step === 1 && (
            <div className="form-step">
              <h2>Enter Event Code</h2>
              <div className="form-group">
                <label htmlFor="eventCode">Event Access Code *</label>
                <input
                  type="text"
                  id="eventCode"
                  name="eventCode"
                  value={formData.eventCode}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter the code provided by your event organizer"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h2>Tell Us About Yourself</h2>
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company/Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Where do you work?"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role/Title</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="Your job title"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  Back
                </button>
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <h2>What Are You Interested In?</h2>
              <p className="step-description">
                Help us personalize your event experience
              </p>
              
              <div className="interests-grid">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    className={`interest-card ${
                      formData.interests.includes(interest) ? 'selected' : ''
                    }`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </button>
                ))}
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  Back
                </button>
                <Link to="/attendee/agenda" className="btn btn-primary">
                  Complete Onboarding
                </Link>
              </div>
            </div>
          )}
        </form>

        <div className="onboarding-features">
          <h3>What to Expect</h3>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">📱</div>
              <h4>Personalized Agenda</h4>
              <p>Get session recommendations based on your interests</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🤝</div>
              <h4>Networking</h4>
              <p>Connect with like-minded professionals</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <h4>Interactive Experience</h4>
              <p>Participate in live Q&A and polls</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeOnboarding;