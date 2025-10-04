import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const DashboardVendor = () => {
    const token = localStorage.getItem('token');
    const [tasks, setTasks] = useState([]);
    const [fileUpload, setFileUpload] = useState({});
    const [loading, setLoading] = useState(false);
    const [hoveredTasks, setHoveredTasks] = useState({});


    const styles = {
        dashboard: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #b1d8fff6 0%, #e2e8f0 100%)',
            padding: '0',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem'
        },
        header: {
            background: 'linear-gradient(135deg, #a5b1e4ff 0%, #117cd3ba 100%)',
            color: 'white',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
        },
        welcomeText: {
            fontSize: '2.5rem',
            fontWeight: '300',
            margin: '0',
            marginBottom: '0.5rem'
        },
        roleBadge: {
            background: 'rgba(255,255,255,0.2)',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            fontSize: '1rem',
            display: 'inline-block',
            backdropFilter: 'blur(10px)'
        },
        section: {
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.05)'
        },
        sectionTitle: {
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        tasksGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '1.5rem',
            marginTop: '1rem'
        },
        taskCard: {
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.5rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            position: 'relative',
            overflow: 'hidden'
        },
        taskCardHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            borderColor: '#667eea'
        },
        taskTitle: {
            fontSize: '1.3rem',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '1rem',
            lineHeight: '1.4'
        },
        taskDetail: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.75rem',
            color: '#4a5568',
            fontSize: '0.95rem'
        },
        icon: {
            marginRight: '0.75rem',
            color: '#667eea',
            width: '16px',
            textAlign: 'center'
        },
        statusBadge: {
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '600',
            textTransform: 'uppercase'
        },
        statusTodo: {
            background: '#fed7d7',
            color: '#c53030'
        },
        statusInProgress: {
            background: '#fefcbf',
            color: '#d69e2e'
        },
        statusDone: {
            background: '#c6f6d5',
            color: '#276749'
        },
        uploadSection: {
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#f8fafc',
            borderRadius: '8px',
            border: '1px dashed #cbd5e0'
        },
        fileInput: {
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            marginBottom: '1rem',
            background: 'white',
            fontSize: '0.9rem'
        },
        uploadButton: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            fontSize: '0.95rem'
        },
        uploadButtonHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
        },
        uploadButtonDisabled: {
            background: '#a0aec0',
            cursor: 'not-allowed'
        },
        emptyState: {
            textAlign: 'center',
            padding: '3rem',
            color: '#718096'
        },
        emptyIcon: {
            fontSize: '3rem',
            marginBottom: '1rem',
            opacity: '0.5'
        },
        loadingSpinner: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px'
        },
        spinner: {
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite'
        }
    };

    // Add keyframes for spinner
    const spinnerStyle = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/tasks/vendor', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(res.data);
        } catch(err){ console.log(err); }
        setLoading(false);
    }

    const handleFileChange = (taskId, e) => {
        setFileUpload({ ...fileUpload, [taskId]: e.target.files[0] });
    }

    const handleUpload = async (taskId) => {
        if (!fileUpload[taskId]) return alert('Select a file first!');
        setLoading(true);
        const formData = new FormData();
        formData.append('file', fileUpload[taskId]);

        try {
            await axios.post(`http://localhost:5000/api/tasks/${taskId}/upload`, formData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
            });
            alert('File uploaded successfully!');
            fetchTasks();
            // Clear the file input for this task
            setFileUpload({ ...fileUpload, [taskId]: null });
        } catch(err){ 
            console.log(err); 
            alert('Upload failed'); 
        }
        setLoading(false);
    }

    useEffect(() => { fetchTasks(); }, []);

    const statusStyles = {
        todo: styles.statusTodo,
        inprogress: styles.statusInProgress,
        done: styles.statusDone
    };

    const statusDisplay = {
        todo: 'To Do',
        inprogress: 'In Progress',
        done: 'Completed'
    };

    return (
        <div style={styles.dashboard}>
            <style>{spinnerStyle}</style>
            <Navbar/>
            
            <div style={styles.container}>
                {/* Header Section */}
                <div style={styles.header}>
                    <h1 style={styles.welcomeText}>Welcome, {localStorage.getItem('name')}!</h1>
                    <div style={styles.roleBadge}>Vendor Dashboard</div>
                </div>

                {/* Tasks Section */}
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        📋 Your Assigned Tasks
                    </h2>
                    
                    {loading ? (
                        <div style={styles.loadingSpinner}>
                            <div style={styles.spinner}></div>
                        </div>
                    ) : tasks.length > 0 ? (
                        <div style={styles.tasksGrid}>
                           {tasks.map(task => {
    const hasFile = !!fileUpload[task._id];
    const isHovered = hoveredTasks[task._id];

    return (
        <div 
            key={task._id}
            style={{
                ...styles.taskCard,
                ...(isHovered && styles.taskCardHover)
            }}
            onMouseEnter={() => setHoveredTasks({ ...hoveredTasks, [task._id]: true })}
            onMouseLeave={() => setHoveredTasks({ ...hoveredTasks, [task._id]: false })}
        >
            <div style={{ ...styles.statusBadge, ...statusStyles[task.status] }}>
                {statusDisplay[task.status]}
            </div>
            
            <h3 style={styles.taskTitle}>{task.title}</h3>
            
            {task.description && (
                <div style={styles.taskDetail}>
                    <span style={styles.icon}>📝</span>
                    <span>{task.description}</span>
                </div>
            )}
            
            <div style={styles.taskDetail}>
                <span style={styles.icon}>🎯</span>
                <span><strong>Event:</strong> {task.eventId?.title}</span>
            </div>
            
            <div style={styles.taskDetail}>
                <span style={styles.icon}>📍</span>
                <span><strong>Venue:</strong> {task.eventId?.venue}</span>
            </div>
            
            <div style={styles.taskDetail}>
                <span style={styles.icon}>📅</span>
                <span>
                    <strong>Date:</strong> {task.eventId?.date ? new Date(task.eventId.date).toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    }) : 'Not specified'}
                </span>
            </div>

            {task.startTime && (
                <div style={styles.taskDetail}>
                    <span style={styles.icon}>⏰</span>
                    <span><strong>Start:</strong> {new Date(task.startTime).toLocaleString()}</span>
                </div>
            )}

            {task.endTime && (
                <div style={styles.taskDetail}>
                    <span style={styles.icon}>⏱️</span>
                    <span><strong>End:</strong> {new Date(task.endTime).toLocaleString()}</span>
                </div>
            )}

            {/* File Upload Section */}
            <div style={styles.uploadSection}>
                <input 
                    type="file" 
                    onChange={(e) => handleFileChange(task._id, e)}
                    style={styles.fileInput}
                />
                <button 
                    style={{
                        ...styles.uploadButton,
                        ...(isHovered && styles.uploadButtonHover),
                        ...(!hasFile && styles.uploadButtonDisabled)
                    }}
                    onClick={() => handleUpload(task._id)}
                    disabled={!hasFile || loading}
                >
                    {loading ? 'Uploading...' : '📤 Upload Document'}
                </button>
            </div>
        </div>
    );
})}

                        </div>
                    ) : (
                        <div style={styles.emptyState}>
                            <div style={styles.emptyIcon}>📋</div>
                            <h3>No Tasks Assigned</h3>
                            <p>You don't have any assigned tasks at the moment.</p>
                            <p style={{ fontSize: '0.9rem', color: '#a0aec0', marginTop: '0.5rem' }}>
                                Tasks will appear here when event organizers assign them to you.
                            </p>
                        </div>
                    )}
                </div>

                {/* Statistics Card */}
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>📊 Task Overview</h2>
                    <div style={styles.tasksGrid}>
                        <div style={styles.taskCard}>
                            <div style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: '700', 
                                color: '#667eea',
                                textAlign: 'center',
                                marginBottom: '0.5rem'
                            }}>
                                {tasks.length}
                            </div>
                            <div style={{ 
                                textAlign: 'center', 
                                color: '#4a5568',
                                fontWeight: '500'
                            }}>
                                Total Tasks
                            </div>
                        </div>
                        <div style={styles.taskCard}>
                            <div style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: '700', 
                                color: '#48bb78',
                                textAlign: 'center',
                                marginBottom: '0.5rem'
                            }}>
                                {tasks.filter(t => t.status === 'done').length}
                            </div>
                            <div style={{ 
                                textAlign: 'center', 
                                color: '#4a5568',
                                fontWeight: '500'
                            }}>
                                Completed
                            </div>
                        </div>
                        <div style={styles.taskCard}>
                            <div style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: '700', 
                                color: '#ed8936',
                                textAlign: 'center',
                                marginBottom: '0.5rem'
                            }}>
                                {tasks.filter(t => t.status === 'inprogress').length}
                            </div>
                            <div style={{ 
                                textAlign: 'center', 
                                color: '#4a5568',
                                fontWeight: '500'
                            }}>
                                In Progress
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardVendor;