import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../Styling/Sponsor.css';

const SponsorInsights = () => {
  const [activeEvent, setActiveEvent] = useState('tech-conf-2024');
  
  const events = {
    'tech-conf-2024': {
      name: 'Tech Conference 2024',
      date: 'March 15-16, 2024',
      metrics: {
        totalImpressions: 12500,
        leadsGenerated: 342,
        engagementRate: 18.5,
        roi: 245
      },
      engagement: [
        { time: 'Day 1 AM', visits: 450, interactions: 89 },
        { time: 'Day 1 PM', visits: 520, interactions: 112 },
        { time: 'Day 2 AM', visits: 480, interactions: 95 },
        { time: 'Day 2 PM', visits: 390, interactions: 78 }
      ],
      leadQuality: [
        { category: 'Hot Leads', count: 45, percentage: 13 },
        { category: 'Warm Leads', count: 167, percentage: 49 },
        { category: 'Cold Leads', count: 130, percentage: 38 }
      ]
    }
  };

  const currentEvent = events[activeEvent];

  return (
    <div className="sponsor-insights">
      <div className="container">
        <div className="sponsor-header">
          <div>
            <h1>Sponsor Insights</h1>
            <p>Track your event sponsorship performance</p>
          </div>
          <div className="header-actions">
            <select 
              value={activeEvent}
              onChange={(e) => setActiveEvent(e.target.value)}
              className="event-selector"
            >
              <option value="tech-conf-2024">Tech Conference 2024</option>
              <option value="product-launch">Product Launch</option>
            </select>
            <button className="btn btn-primary">Download Report</button>
          </div>
        </div>

        <div className="sponsor-content">
          {/* Key Metrics */}
          <div className="metrics-overview">
            <h2>Performance Overview</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon">👁️</div>
                <div className="metric-info">
                  <h3>Total Impressions</h3>
                  <div className="metric-value">
                    {currentEvent.metrics.totalImpressions.toLocaleString()}
                  </div>
                  <div className="metric-change positive">+12% vs target</div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">📈</div>
                <div className="metric-info">
                  <h3>Leads Generated</h3>
                  <div className="metric-value">{currentEvent.metrics.leadsGenerated}</div>
                  <div className="metric-change positive">+8% vs target</div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">💬</div>
                <div className="metric-info">
                  <h3>Engagement Rate</h3>
                  <div className="metric-value">{currentEvent.metrics.engagementRate}%</div>
                  <div className="metric-change positive">+3.2%</div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">💰</div>
                <div className="metric-info">
                  <h3>ROI</h3>
                  <div className="metric-value">{currentEvent.metrics.roi}%</div>
                  <div className="metric-change positive">+45% vs expected</div>
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Timeline */}
          <div className="engagement-section">
            <h2>Engagement Timeline</h2>
            <div className="engagement-chart">
              {currentEvent.engagement.map((period, index) => (
                <div key={index} className="engagement-period">
                  <div className="period-label">{period.time}</div>
                  <div className="engagement-bars">
                    <div className="bar-container">
                      <div className="bar-label">Visits</div>
                      <div className="bar visits-bar" style={{ width: `${(period.visits / 600) * 100}%` }}>
                        <span className="bar-value">{period.visits}</span>
                      </div>
                    </div>
                    <div className="bar-container">
                      <div className="bar-label">Interactions</div>
                      <div className="bar interactions-bar" style={{ width: `${(period.interactions / 150) * 100}%` }}>
                        <span className="bar-value">{period.interactions}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Quality */}
          <div className="lead-quality-section">
            <h2>Lead Quality Breakdown</h2>
            <div className="lead-quality-grid">
              {currentEvent.leadQuality.map((quality, index) => (
                <div key={index} className="quality-card">
                  <h3>{quality.category}</h3>
                  <div className="quality-stats">
                    <div className="quality-count">{quality.count}</div>
                    <div className="quality-percentage">{quality.percentage}%</div>
                  </div>
                  <div className="quality-bar">
                    <div 
                      className="quality-fill"
                      style={{ width: `${quality.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Insights */}
          <div className="insights-section">
            <h2>Actionable Insights</h2>
            <div className="insights-grid">
              <div className="insight-card">
                <div className="insight-icon">🎯</div>
                <h3>Peak Engagement</h3>
                <p>Highest engagement occurred during Day 1 PM sessions. Consider increasing booth staff during these times.</p>
              </div>
              <div className="insight-card">
                <div className="insight-icon">📞</div>
                <h3>Follow-up Strategy</h3>
                <p>45 hot leads identified. Prioritize follow-up within 48 hours for maximum conversion.</p>
              </div>
              <div className="insight-card">
                <div className="insight-icon">🚀</div>
                <h3>Content Performance</h3>
                <p>Product demos generated 3x more engagement than brochures. Focus on interactive content.</p>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="export-section">
            <h2>Export Detailed Reports</h2>
            <div className="export-options">
              <button className="export-option">
                <div className="export-icon">📊</div>
                <span>Comprehensive PDF</span>
              </button>
              <button className="export-option">
                <div className="export-icon">📈</div>
                <span>Excel Data Sheet</span>
              </button>
              <button className="export-option">
                <div className="export-icon">🖼️</div>
                <span>Presentation Deck</span>
              </button>
              <button className="export-option">
                <div className="export-icon">📋</div>
                <span>Lead List</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorInsights;