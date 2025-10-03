// optional
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../../styles/Orchestration.css';

// const Orchestration = () => {
//   const [activeTab, setActiveTab] = useState('vendors');
  
//   const vendors = [
//     { id: 1, name: 'Venue Provider', type: 'Venue', status: 'Confirmed', contact: 'venue@example.com' },
//     { id: 2, name: 'Catering Service', type: 'Catering', status: 'Pending', contact: 'catering@example.com' },
//     { id: 3, name: 'AV Equipment', type: 'Technical', status: 'Confirmed', contact: 'av@example.com' }
//   ];

//   const tasks = [
//     { id: 1, title: 'Finalize seating arrangement', assignee: 'Venue Team', dueDate: '2024-02-20', status: 'In Progress' },
//     { id: 2, title: 'Confirm menu with catering', assignee: 'Catering Team', dueDate: '2024-02-18', status: 'Completed' },
//     { id: 3, title: 'Test audio equipment', assignee: 'Technical Team', dueDate: '2024-02-22', status: 'Pending' }
//   ];

//   return (
//     <div className="orchestration">
//       <div className="container">
//         <div className="page-header">
//           <h1>Event Orchestration</h1>
//           <Link to="/organizer/dashboard" className="btn btn-secondary">
//             Back to Dashboard
//           </Link>
//         </div>

//         <div className="orchestration-tabs">
//           <button 
//             className={`tab-button ${activeTab === 'vendors' ? 'active' : ''}`}
//             onClick={() => setActiveTab('vendors')}
//           >
//             Vendor Management
//           </button>
//           <button 
//             className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`}
//             onClick={() => setActiveTab('tasks')}
//           >
//             Task Coordination
//           </button>
//           <button 
//             className={`tab-button ${activeTab === 'communication' ? 'active' : ''}`}
//             onClick={() => setActiveTab('communication')}
//           >
//             Team Communication
//           </button>
//         </div>

//         <div className="tab-content">
//           {activeTab === 'vendors' && (
//             <div className="vendors-section">
//               <div className="section-header">
//                 <h2>Vendor Coordination</h2>
//                 <button className="btn btn-primary">Add Vendor</button>
//               </div>
              
//               <div className="vendors-grid">
//                 {vendors.map(vendor => (
//                   <div key={vendor.id} className="vendor-card">
//                     <div className="vendor-header">
//                       <h3>{vendor.name}</h3>
//                       <span className={`status-badge ${vendor.status.toLowerCase()}`}>
//                         {vendor.status}
//                       </span>
//                     </div>
//                     <div className="vendor-details">
//                       <p><strong>Type:</strong> {vendor.type}</p>
//                       <p><strong>Contact:</strong> {vendor.contact}</p>
//                     </div>
//                     <div className="vendor-actions">
//                       <button className="btn btn-secondary">Message</button>
//                       <button className="btn btn-primary">Details</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'tasks' && (
//             <div className="tasks-section">
//               <div className="section-header">
//                 <h2>Task Management</h2>
//                 <button className="btn btn-primary">Create Task</button>
//               </div>
              
//               <div className="tasks-list">
//                 {tasks.map(task => (
//                   <div key={task.id} className="task-item">
//                     <div className="task-info">
//                       <h4>{task.title}</h4>
//                       <p>Assigned to: {task.assignee}</p>
//                       <p>Due: {task.dueDate}</p>
//                     </div>
//                     <div className="task-status">
//                       <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
//                         {task.status}
//                       </span>
//                       <div className="task-actions">
//                         <button className="btn-icon">✏️</button>
//                         <button className="btn-icon">✅</button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'communication' && (
//             <div className="communication-section">
//               <div className="section-header">
//                 <h2>Team Communication</h2>
//                 <button className="btn btn-primary">New Message</button>
//               </div>
              
//               <div className="communication-content">
//                 <div className="chat-container">
//                   <div className="chat-messages">
//                     <div className="message">
//                       <div className="message-sender">Venue Team</div>
//                       <div className="message-content">
//                         Seating arrangement has been finalized. Awaiting approval.
//                       </div>
//                       <div className="message-time">10:30 AM</div>
//                     </div>
//                     <div className="message own-message">
//                       <div className="message-sender">You</div>
//                       <div className="message-content">
//                         Approved! Please proceed with setup.
//                       </div>
//                       <div className="message-time">10:32 AM</div>
//                     </div>
//                   </div>
//                   <div className="chat-input">
//                     <input type="text" placeholder="Type your message..." />
//                     <button className="btn btn-primary">Send</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orchestration;