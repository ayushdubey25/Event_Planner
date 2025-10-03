import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../Styling/AiPlan.css';

const AIPlan = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState(null);

  const handleGeneratePlan = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate AI API call
    setTimeout(() => {
      setPlan({
        timeline: [
          { task: 'Venue Booking', deadline: '2024-02-15', assigned: 'Venue Team' },
          { task: 'Catering Arrangements', deadline: '2024-02-20', assigned: 'Catering Team' },
          { task: 'Speaker Confirmations', deadline: '2024-02-25', assigned: 'Program Team' }
        ],
        budget: {
          total: 50000,
          categories: [
            { name: 'Venue', amount: 20000 },
            { name: 'Catering', amount: 10000 },
            { name: 'Marketing', amount: 8000 }
          ]
        },
        recommendations: [
          'Consider adding a networking session after main presentations',
          'Recommended to have backup speakers',
          'Suggest early bird pricing to boost initial registrations'
        ]
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="ai-plan">
      <div className="container">
        <div className="page-header">
          <h1>AI Event Planning Assistant</h1>
          <Link to="/organizer/dashboard" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>

        <div className="ai-plan-content">
          <div className="ai-input-section">
            <h2>Describe Your Event Vision</h2>
            <form onSubmit={handleGeneratePlan} className="ai-form">
              <div className="form-group">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your event in detail. Include type, audience, budget, goals, and any specific requirements..."
                  rows="6"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating Plan...' : 'Generate AI Plan'}
              </button>
            </form>
          </div>

          {isGenerating && (
            <div className="loading-section">
              <div className="loading-spinner"></div>
              <p>AI is crafting your perfect event plan...</p>
            </div>
          )}

          {plan && !isGenerating && (
            <div className="ai-results">
              <h2>Your AI-Generated Event Plan</h2>
              
              <div className="plan-section">
                <h3>📅 Project Timeline</h3>
                <div className="timeline">
                  {plan.timeline.map((item, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-content">
                        <h4>{item.task}</h4>
                        <p>Deadline: {item.deadline}</p>
                        <span className="assigned-to">Assigned: {item.assigned}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="plan-section">
                <h3>💰 Budget Breakdown</h3>
                <div className="budget-grid">
                  {plan.budget.categories.map((category, index) => (
                    <div key={index} className="budget-item">
                      <h4>{category.name}</h4>
                      <p>${category.amount.toLocaleString()}</p>
                    </div>
                  ))}
                  <div className="budget-total">
                    <h4>Total Budget</h4>
                    <p>${plan.budget.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="plan-section">
                <h3>💡 AI Recommendations</h3>
                <div className="recommendations">
                  {plan.recommendations.map((rec, index) => (
                    <div key={index} className="recommendation-item">
                      <p>{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="plan-actions">
                <button className="btn btn-secondary">Export Plan</button>
                <Link to="/organizer/orchestration" className="btn btn-primary">
                  Implement Plan
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPlan;