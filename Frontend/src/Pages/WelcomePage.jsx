import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styling/WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>End Event Coordination Chaos</h1>
            <p className="hero-subtitle">
              One platform to plan, execute, and analyze events seamlessly. 
              Replace 10+ tools with intelligent event management.
            </p>
            <div className="hero-actions">
              <Link to="/organizer/dashboard" className="btn btn-primary">
                Start Planning
              </Link>
              <Link to="/attendee/onboarding" className="btn btn-secondary">
                Join Event
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <h3>45%</h3>
                <p>Fewer Event Failures</p>
              </div>
              <div className="stat">
                <h3>10+</h3>
                <p>Tools Consolidated</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Seamless Coordination</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>All-in-One Event Management</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Planning Assistant</h3>
              <p>Intelligent event planning with automated task management and vendor coordination</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-time Analytics</h3>
              <p>Comprehensive insights into attendee engagement and event performance</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3>Vendor Integration</h3>
              <p>Seamless coordination with all your vendors in one unified platform</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Attendee Experience</h3>
              <p>Personalized agendas and seamless onboarding for every attendee</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="user-types">
        <div className="container">
          <h2>Built for Everyone in the Event Ecosystem</h2>
          <div className="user-grid">
            <Link to="/organizer/dashboard" className="user-card">
              <h3>Organizers</h3>
              <p>Streamline planning, coordination, and analytics</p>
              <span className="arrow">→</span>
            </Link>
            <Link to="/attendee/onboarding" className="user-card">
              <h3>Attendees</h3>
              <p>Personalized experience and seamless participation</p>
              <span className="arrow">→</span>
            </Link>
            <Link to="/vendor/dashboard" className="user-card">
              <h3>Vendors</h3>
              <p>Efficient coordination and task management</p>
              <span className="arrow">→</span>
            </Link>
            <Link to="/sponsor/insights" className="user-card">
              <h3>Sponsors</h3>
              <p>ROI tracking and engagement analytics</p>
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;