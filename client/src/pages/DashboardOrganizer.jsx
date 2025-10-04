import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const DashboardOrganizer = () => {
    const token = localStorage.getItem('token');

    // --- Event States ---
    const [hoveredTask, setHoveredTask] = useState(null); // stores task._id of hovered task

    const [sponsors, setSponsors] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [taskStartTime, setTaskStartTime] = useState('');
    const [taskEndTime, setTaskEndTime] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventVenue, setEventVenue] = useState('');
    const [eventBudget, setEventBudget] = useState('');
    const [vendors, setVendors] = useState([]);
    const [assignedVendor, setAssignedVendor] = useState('');
    const [selectedSponsor, setSelectedSponsor] = useState('');
    const [sponsorAmount, setSponsorAmount] = useState('');
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [sponsorRequests, setSponsorRequests] = useState([]);
    const [newExpense, setNewExpense] = useState('');
    const [loading, setLoading] = useState(false);

    const styles = {
        dashboard: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #b1d8fff6 0%, #e2e8f0 100%)',
            padding: '0',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
        },
        container: {
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '2rem'
        },
        header: {
            background: 'linear-gradient(135deg, #bbc3e8ff 0%, #117cd3ba 100%)',
            color: 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            marginBottom: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            textAlign: 'center'
        },
        welcomeText: {
            fontSize: '2.8rem',
            fontWeight: '300',
            margin: '0',
            marginBottom: '0.5rem'
        },
        roleBadge: {
            background: 'rgba(255,255,255,0.2)',
            padding: '0.6rem 2rem',
            borderRadius: '25px',
            fontSize: '1.1rem',
            display: 'inline-block',
            backdropFilter: 'blur(10px)',
            fontWeight: '500'
        },
        card: {
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.04)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        },
        cardHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
        },
        sectionTitle: {
            fontSize: '1.6rem',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '1.5rem',
            paddingBottom: '0.75rem',
            borderBottom: '2px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem',
            marginTop: '1.5rem'
        },
        formGroup: {
            marginBottom: '1.5rem'
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#2d3748',
            fontSize: '0.95rem'
        },
        input: {
            width: '100%',
            padding: '0.9rem 1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            background: '#f8fafc'
        },
        inputFocus: {
            borderColor: '#667eea',
            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
            background: 'white',
            outline: 'none'
        },
        select: {
            width: '100%',
            padding: '0.9rem 1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            fontSize: '1rem',
            background: '#f8fafc',
            cursor: 'pointer'
        },
        button: {
            background: 'linear-gradient(135deg, #bbc3e8ff 0%, #0373cedc 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '10px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '1rem',
            width: '100%'
        },
        buttonHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
        },
        buttonSecondary: {
            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)'
        },
        taskList: {
            listStyle: 'none',
            padding: '0',
            margin: '0'
        },
        taskItem: {
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative'
        },
        taskItemHover: {
            background: '#edf2f7',
            borderColor: '#cbd5e0'
        },
        taskTitle: {
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '0.5rem'
        },
        taskDescription: {
            fontSize: '0.9rem',
            color: '#718096',
            marginBottom: '0.75rem',
            lineHeight: '1.5'
        },
        taskMeta: {
            fontSize: '0.8rem',
            color: '#a0aec0',
            marginBottom: '0.25rem'
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
        eventInfo: {
            display: 'grid',
            gap: '1rem'
        },
        infoItem: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.75rem 0',
            borderBottom: '1px solid #f1f5f9'
        },
        infoLabel: {
            fontWeight: '500',
            color: '#4a5568'
        },
        infoValue: {
            fontWeight: '600',
            color: '#2d3748'
        },
        sponsorRequestItem: {
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '1.25rem',
            marginBottom: '1rem'
        },
        emptyState: {
            textAlign: 'center',
            padding: '3rem 2rem',
            color: '#718096'
        },
        emptyIcon: {
            fontSize: '3.5rem',
            marginBottom: '1rem',
            opacity: '0.5'
        },
        formRow: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem'
        },
        budgetDisplay: {
            fontSize: '2rem',
            fontWeight: '700',
            color: '#2d3748',
            textAlign: 'center',
            margin: '1.5rem 0'
        }
    };

    // Fetch organizer events
    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/events', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents(res.data);
        } catch(err){ console.log(err); }
        setLoading(false);
    };

    const fetchVendors = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/vendors', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setVendors(res.data);
        } catch(err){ console.log(err); }
    };

    const fetchTasks = async (eventId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/tasks/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(res.data);
        } catch (err) { console.log(err); }
    };

    const fetchSponsors = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/sponsors', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSponsors(res.data);
        } catch (err) { console.log(err); }
    };

    const fetchSponsorRequests = async (eventId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/sponsorRequests/event/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSponsorRequests(res.data);
        } catch (err) { console.log(err); }
    };

    useEffect(() => {
        fetchEvents();
        fetchVendors();
        fetchSponsors();
    }, []);

    useEffect(() => {
        if(selectedEvent) {
            fetchTasks(selectedEvent._id);
            fetchSponsorRequests(selectedEvent._id);
        }
    }, [selectedEvent]);

    // Create Event
    const createEvent = async () => {
        if (!eventTitle) return;
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/events/create', {
                title: eventTitle,
                type: "general",
                description: eventDesc,
                date: eventDate,
                time: eventTime,
                venue: eventVenue,
                capacity: 100,
                budget: parseInt(eventBudget)
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setEvents([...events, res.data]);
            setSelectedEvent(res.data);

            // Reset input fields
            setEventTitle('');
            setEventDesc('');
            setEventDate('');
            setEventTime('');
            setEventVenue('');
            setEventBudget('');
        } catch (err) {
            console.log('Create event error:', err.response?.data || err);
            alert('Failed to create event');
        }
        setLoading(false);
    };

    // Add Task
    const addTask = async () => {
        if(!newTask || !selectedEvent) return;

        let assignVendorId = assignedVendor;

        if(!assignedVendor){
            try {
                const suggested = await axios.get(
                    `http://localhost:5000/api/tasks/suggest-vendor/${selectedEvent._id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if(suggested.data) assignVendorId = suggested.data._id;
            } catch(err){ console.log(err); }
        }

        try {
            const taskData = {
                title: newTask,
                description: taskDesc,
                eventId: selectedEvent._id,
                vendorId: assignVendorId || null,
                startTime: taskStartTime || null,
                endTime: taskEndTime || null,
                status: 'todo'
            };

            const res = await axios.post('http://localhost:5000/api/tasks/create', taskData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setTasks([...tasks, res.data]);
            setNewTask(''); 
            setTaskDesc(''); 
            setAssignedVendor('');
            setTaskStartTime(''); 
            setTaskEndTime('');
        } catch(err){
            console.log(err.response?.data || err);
            alert('Task creation failed');
        }
    };

    // Send Sponsor Request
    const sendSponsorRequest = async () => {
        if (!selectedEvent || !selectedSponsor || !sponsorAmount) 
            return alert('Select event, sponsor, and amount');

        try {
            await axios.post('http://localhost:5000/api/sponsorRequests/request', {
                eventId: selectedEvent._id,
                sponsorId: selectedSponsor,
                amount: parseInt(sponsorAmount)
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Request sent!');
            setSelectedSponsor('');
            setSponsorAmount('');
            fetchSponsorRequests(selectedEvent._id);
        } catch (err) {
            console.log(err.response?.data || err);
            alert('Failed to send sponsor request');
        }
    };

    // Update Task Status
    const updateStatus = async (task) => {
        const nextStatus = task.status === 'todo' ? 'inprogress' : task.status === 'inprogress' ? 'done' : 'todo';
        try {
            await axios.put(`http://localhost:5000/api/tasks/${task._id}`,
                { status: nextStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTasks(tasks.map(t => t._id === task._id ? { ...t, status: nextStatus } : t));
        } catch (err) { console.log(err); }
    };

    // Add Expense
    const addExpense = async () => {
        const amount = parseInt(newExpense);
        if(!amount || !selectedEvent) return;
        try {
            const updatedEvent = { ...selectedEvent, budget: selectedEvent.budget + amount };
            await axios.put(`http://localhost:5000/api/events/${selectedEvent._id}`,
                updatedEvent,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSelectedEvent(updatedEvent);
            setNewExpense('');
        } catch (err) { console.log(err); }
    };

    const statusDisplay = { todo: 'To Do', inprogress: 'In Progress', done: 'Completed' };
    const statusStyles = { todo: styles.statusTodo, inprogress: styles.statusInProgress, done: styles.statusDone };

    return (
        <div style={styles.dashboard}>
            <Navbar />
            
            <div style={styles.container}>
                {/* Header Section */}
                <div style={styles.header}>
                    <h1 style={styles.welcomeText}>Welcome, {localStorage.getItem('name')}!</h1>
                    <div style={styles.roleBadge}>Event Organizer Dashboard</div>
                </div>

                {/* Create Event Form */}
                <div style={styles.card}>
                    <h2 style={styles.sectionTitle}>🎯 Create New Event</h2>
                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <input 
                                type="text" 
                                placeholder="Event Title" 
                                value={eventTitle} 
                                onChange={e => setEventTitle(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <input 
                                type="text" 
                                placeholder="Description" 
                                value={eventDesc} 
                                onChange={e => setEventDesc(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    </div>
                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <input 
                                type="date" 
                                value={eventDate} 
                                onChange={e => setEventDate(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <input 
                                type="time" 
                                value={eventTime} 
                                onChange={e => setEventTime(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <input 
                                type="text" 
                                placeholder="Venue" 
                                value={eventVenue} 
                                onChange={e => setEventVenue(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <input 
                                type="number" 
                                placeholder="Budget" 
                                value={eventBudget} 
                                onChange={e => setEventBudget(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    </div>
                    <button 
                        onClick={createEvent} 
                        style={styles.button}
                        disabled={loading}
                    >
                        {loading ? 'Creating Event...' : 'Create Event'}
                    </button>
                </div>

                {/* Event Selector */}
                <div style={styles.card}>
                    <h2 style={styles.sectionTitle}>📋 Select Event</h2>
                    <select 
                        onChange={e => {
                            const ev = events.find(ev => ev._id === e.target.value);
                            setSelectedEvent(ev);
                        }} 
                        value={selectedEvent?._id || ''}
                        style={styles.select}
                    >
                        <option value="">-- Select Event --</option>
                        {events.map(ev => <option key={ev._id} value={ev._id}>{ev.title}</option>)}
                    </select>
                </div>

                {selectedEvent && (
                    <div style={styles.grid}>
                        {/* Event Info */}
                        <div style={styles.card}>
                            <h2 style={styles.sectionTitle}>📊 Event Information</h2>
                            <div style={styles.eventInfo}>
                                <div style={styles.infoItem}>
                                    <span style={styles.infoLabel}>Title:</span>
                                    <span style={styles.infoValue}>{selectedEvent.title}</span>
                                </div>
                                <div style={styles.infoItem}>
                                    <span style={styles.infoLabel}>Description:</span>
                                    <span style={styles.infoValue}>{selectedEvent.description}</span>
                                </div>
                                <div style={styles.infoItem}>
                                    <span style={styles.infoLabel}>Date:</span>
                                    <span style={styles.infoValue}>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                                </div>
                                <div style={styles.infoItem}>
                                    <span style={styles.infoLabel}>Time:</span>
                                    <span style={styles.infoValue}>{selectedEvent.time}</span>
                                </div>
                                <div style={styles.infoItem}>
                                    <span style={styles.infoLabel}>Venue:</span>
                                    <span style={styles.infoValue}>{selectedEvent.venue}</span>
                                </div>
                                <div style={styles.infoItem}>
                                    <span style={styles.infoLabel}>Budget:</span>
                                    <span style={styles.infoValue}>${selectedEvent.budget}</span>
                                </div>
                            </div>
                        </div>

                        {/* Task Manager */}
                        <div style={styles.card}>
                            <h2 style={styles.sectionTitle}>✅ Task Manager</h2>
                            
                            {/* Add New Task Form */}
                            <div style={styles.formGroup}>
                                <input
                                    type="text"
                                    placeholder="Task Title"
                                    value={newTask}
                                    onChange={e => setNewTask(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <input
                                    type="text"
                                    placeholder="Task Description"
                                    value={taskDesc}
                                    onChange={e => setTaskDesc(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formRow}>
                                <div style={styles.formGroup}>
                                    <input
                                        type="datetime-local"
                                        value={taskStartTime}
                                        onChange={e => setTaskStartTime(e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <input
                                        type="datetime-local"
                                        value={taskEndTime}
                                        onChange={e => setTaskEndTime(e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                            <div style={styles.formGroup}>
                                <select value={assignedVendor} onChange={e => setAssignedVendor(e.target.value)} style={styles.select}>
                                    <option value="">-- Assign Vendor --</option>
                                    {vendors.map(v => (
                                        <option key={v._id} value={v._id}>{v.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={addTask} style={{...styles.button, ...styles.buttonSecondary}}>
                                Add Task
                            </button>

                            {/* Task List */}
                            <ul style={styles.taskList}>
  {tasks.length > 0 ? tasks.map(t => (
    <li
      key={t._id}
      style={{
        ...styles.taskItem,
        ...(hoveredTask === t._id ? styles.taskItemHover : {})
      }}
      onClick={() => updateStatus(t)}
      onMouseEnter={() => setHoveredTask(t._id)}
      onMouseLeave={() => setHoveredTask(null)}
    >
      <div style={{ ...styles.statusBadge, ...statusStyles[t.status] }}>
        {statusDisplay[t.status]}
      </div>
      <div style={styles.taskTitle}>{t.title}</div>
      <div style={styles.taskDescription}>{t.description}</div>
      <div style={styles.taskMeta}>
        Vendor: {t.vendorId?.name || 'Not assigned'}
        {t.vendorId?.email ? ` (${t.vendorId.email})` : ''}
      </div>
      {t.startTime && (
        <div style={styles.taskMeta}>
          Start: {new Date(t.startTime).toLocaleString()}
        </div>
      )}
      {t.endTime && (
        <div style={styles.taskMeta}>
          End: {new Date(t.endTime).toLocaleString()}
        </div>
      )}
    </li>
  )) : (
    <div style={styles.emptyState}>
      <div style={styles.emptyIcon}>📝</div>
      <h3>No tasks yet</h3>
      <p>Create your first task to get started</p>
    </div>
  )}
</ul>

                            <p style={{ fontSize: '0.9rem', color: '#718096', marginTop: '1rem', textAlign: 'center' }}>
                                Click on a task to change its status
                            </p>
                        </div>

                        {/* Sponsor Requests */}
                        <div style={styles.card}>
                            <h2 style={styles.sectionTitle}>🤝 Sponsor Requests</h2>
                            <div style={styles.formRow}>
                                <div style={styles.formGroup}>
                                    <select value={selectedSponsor} onChange={e => setSelectedSponsor(e.target.value)} style={styles.select}>
                                        <option value="">-- Select Sponsor --</option>
                                        {sponsors.map(s => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
                                    </select>
                                </div>
                                <div style={styles.formGroup}>
                                    <input 
                                        type="number" 
                                        placeholder="Amount" 
                                        value={sponsorAmount} 
                                        onChange={e => setSponsorAmount(e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                            <button onClick={sendSponsorRequest} style={styles.button}>
                                Send Sponsor Request
                            </button>

                            {sponsorRequests.length > 0 ? (
                                <div style={{ marginTop: '2rem' }}>
                                    {sponsorRequests.map(req => (
                                        <div key={req._id} style={styles.sponsorRequestItem}>
                                            <div style={{ fontWeight: '600', color: '#2d3748' }}>{req.sponsorId.name}</div>
                                            <div style={{ color: '#718096', fontSize: '0.9rem' }}>{req.sponsorId.email}</div>
                                            <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ fontWeight: '500' }}>Amount: ${req.amount}</span>
                                                <span style={{ 
                                                    padding: '0.3rem 0.8rem', 
                                                    borderRadius: '15px', 
                                                    fontSize: '0.8rem',
                                                    background: req.status === 'pending' ? '#fefcbf' : 
                                                               req.status === 'approved' ? '#c6f6d5' : '#fed7d7',
                                                    color: req.status === 'pending' ? '#d69e2e' : 
                                                          req.status === 'approved' ? '#276749' : '#c53030'
                                                }}>
                                                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={styles.emptyState}>
                                    <div style={styles.emptyIcon}>💼</div>
                                    <h3>No sponsor requests</h3>
                                    <p>Send your first sponsor request above</p>
                                </div>
                            )}
                        </div>

                        {/* Budget Tracker */}
                        <div style={styles.card}>
                            <h2 style={styles.sectionTitle}>💰 Budget Tracker</h2>
                            <div style={styles.budgetDisplay}>${selectedEvent.budget}</div>
                            <div style={styles.formGroup}>
                                <input 
                                    type="number" 
                                    placeholder="Add Expense Amount" 
                                    value={newExpense} 
                                    onChange={e => setNewExpense(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            <button onClick={addExpense} style={{...styles.button, ...styles.buttonSecondary}}>
                                Add Expense
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardOrganizer;