// //optional
// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../../styles/Analytics.css';

// const Analytics = () => {
//   const eventMetrics = {
//     attendance: 450,
//     capacity: 500,
//     satisfaction: 94,
//     engagement: 87
//   };

//   const attendanceData = [
//     { time: '9:00 AM', count: 120 },
//     { time: '10:00 AM', count: 280 },
//     { time: '11:00 AM', count: 380 },
//     { time: '12:00 PM', count: 420 },
//     { time: '1:00 PM', count: 450 },
//     { time: '2:00 PM', count: 440 }
//   ];

//   const topSessions = [
//     { name: 'Keynote: Future of AI', attendance: 420, rating: 4.8 },
//     { name: 'Workshop: React Best Practices', attendance: 180, rating: 4.9 },
//     { name: 'Panel: Tech Trends 2024', attendance: 320, rating: 4.6 }
//   ];

//   return (
//     <div className="analytics">
//       <div className="container">
//         <div className="page-header">
//           <h1>Event Analytics</h1>
//           <Link to="/organizer/dashboard" className="btn btn-secondary">
//             Back to Dashboard
//           </Link>
//         </div>

//         <div className="analytics-content">
//           {/* Key Metrics */}
//           <div className="metrics-grid">
//             <div className="metric-card">
//               <h3>Attendance</h3>
//               <div className="metric-value">
//                 {eventMetrics.attendence}/{eventMetrics.capacity}
//               </div>
//               <div className="metric-progress">
//                 <div 
//                   className="progress-bar"
//                   style={{ width: `${(eventMetrics.attendance / eventMetrics.capacity) * 100}%` }}
//                 ></div>
//               </div>
//               <p>{((eventMetrics.attendance / eventMetrics.capacity) * 100).toFixed(1)}% Capacity</p>
//             </div>

//             <div className="metric-card">
//               <h3>Satisfaction Rate</h3>
//               <div className="metric-value">{eventMetrics.satisfaction}%</div>
//               <div className="metric-progress">
//                 <div 
//                   className="progress-bar"
//                   style={{ width: `${eventMetrics.satisfaction}%` }}
//                 ></div>
//               </div>
//               <p>Very Positive</p>
//             </div>

//             <div className="metric-card">
//               <h3>Engagement</h3>
//               <div className="metric-value">{eventMetrics.engagement}%</div>
//               <div className="metric-progress">
//                 <div 
//                   className="progress-bar"
//                   style={{ width: `${eventMetrics.engagement}%` }}
//                 ></div>
//               </div>
//               <p>Active Participation</p>
//             </div>

//             <div className="metric-card">
//               <h3>Net Promoter Score</h3>
//               <div className="metric-value">62</div>
//               <div className="score-indicator excellent">Excellent</div>
//               <p>Industry Average: 45</p>
//             </div>
//           </div>

//           {/* Attendance Chart */}
//           <div className="chart-section">
//             <h2>Attendance Over Time</h2>
//             <div className="attendance-chart">
//               {attendanceData.map((data, index) => (
//                 <div key={index} className="chart-bar-container">
//                   <div 
//                     className="chart-bar"
//                     style={{ height: `${(data.count / 500) * 100}%` }}
//                   ></div>
//                   <span className="chart-label">{data.time}</span>
//                   <span className="chart-value">{data.count}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Top Sessions */}
//           <div className="sessions-section">
//             <h2>Top Performing Sessions</h2>
//             <div className="sessions-grid">
//               {topSessions.map((session, index) => (
//                 <div key={index} className="session-card">
//                   <h3>{session.name}</h3>
//                   <div className="session-metrics">
//                     <div className="session-metric">
//                       <span className="metric-label">Attendance</span>
//                       <span className="metric-value">{session.attendance}</span>
//                     </div>
//                     <div className="session-metric">
//                       <span className="metric-label">Rating</span>
//                       <span className="metric-value">{session.rating}/5</span>
//                     </div>
//                   </div>
//                   <div className="session-actions">
//                     <button className="btn btn-secondary">View Feedback</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Export Options */}
//           <div className="export-section">
//             <h2>Export Reports</h2>
//             <div className="export-options">
//               <button className="btn btn-secondary">📊 PDF Report</button>
//               <button className="btn btn-secondary">📈 Excel Data</button>
//               <button className="btn btn-secondary">🖼️ Presentation</button>
//               <button className="btn btn-primary">Share Dashboard</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analytics;
