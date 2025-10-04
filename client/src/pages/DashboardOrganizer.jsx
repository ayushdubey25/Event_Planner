import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
// import '../styles/DashboardOrganizer.css';
import '../styles.css';

const DashboardOrganizer = () => {
    const token = localStorage.getItem('token');

    // --- Event States ---
    const [sponsors, setSponsors] = useState([]); // all available sponsors
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    // --- Task States ---

const [taskStartTime, setTaskStartTime] = useState('');
const [taskEndTime, setTaskEndTime] = useState('');


    // --- Event input fields ---
    const [eventTitle, setEventTitle] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventVenue, setEventVenue] = useState('');
    const [eventBudget, setEventBudget] = useState('');

    // --- Vendors/Sponsors ---
    const [vendors, setVendors] = useState([]);
    const [assignedVendor, setAssignedVendor] = useState('');
    const [selectedSponsor, setSelectedSponsor] = useState('');
    const [sponsorAmount, setSponsorAmount] = useState('');

    // --- Task States ---
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [taskDesc, setTaskDesc] = useState('');

    // --- Sponsor Requests ---
    const [sponsorRequests, setSponsorRequests] = useState([]);

    // --- Budget States ---
    const [newExpense, setNewExpense] = useState('');

    // --- Fetch organizer events ---
    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/events', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents(res.data);
        } catch(err){ console.log(err); }
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

    // --- Create Event ---
   const createEvent = async () => {
  if (!eventTitle) return;
  try {
    const res = await axios.post('http://localhost:5000/api/events/create', {
      title: eventTitle,        // ✅ changed from 'name' to 'title'
      type: "general",          // ✅ required by schema
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
  }
};



    // --- Add Task ---
   // When assigning a task
const addTask = async () => {
    if(!newTask || !selectedEvent) return;

    let assignVendorId = assignedVendor;

    // AI suggestion if no vendor selected
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
        setNewTask(''); setTaskDesc(''); setAssignedVendor('');
        setTaskStartTime(''); setTaskEndTime('');
    } catch(err){
        console.log(err.response?.data || err);
        alert('Task creation failed');
    }
};




    // --- Send Sponsor Request ---
   const sendSponsorRequest = async () => {
    if (!selectedEvent || !selectedSponsor || !sponsorAmount) 
        return alert('Select event, sponsor, and amount');

    try {
        await axios.post('http://localhost:5000/api/sponsorRequests/request', {  // <-- fixed path
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


    // --- Update Task Status ---
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

    // --- Add Expense ---
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

    const statusDisplay = { todo: 'To-do', inprogress: 'In Progress', done: 'Done' };

    return (
        <div className="dashboard">
            <Navbar />
            <h1>Welcome, {localStorage.getItem('name')} (Organizer)</h1>

            {/* --- Create Event Form --- */}
            <div className="card">
                <h2>Create New Event</h2>
                <input type="text" placeholder="Title" value={eventTitle} onChange={e => setEventTitle(e.target.value)} />
                <input type="text" placeholder="Description" value={eventDesc} onChange={e => setEventDesc(e.target.value)} />
                <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} />
                <input type="time" value={eventTime} onChange={e => setEventTime(e.target.value)} />
                <input type="text" placeholder="Venue" value={eventVenue} onChange={e => setEventVenue(e.target.value)} />
                <input type="number" placeholder="Budget" value={eventBudget} onChange={e => setEventBudget(e.target.value)} />
                <button onClick={createEvent}>Create Event</button>
            </div>

            {/* --- Event Selector --- */}
            <div className="card">
                <label>Select Event: </label>
                <select onChange={e => {
                    const ev = events.find(ev => ev._id === e.target.value);
                    setSelectedEvent(ev);
                }} value={selectedEvent?._id || ''}>
                    <option value="">-- Select Event --</option>
                    {events.map(ev => <option key={ev._id} value={ev._id}>{ev.title}</option>)}
                </select>
            </div>

            {selectedEvent && (
                <div className="grid">

                    {/* --- Event Info --- */}
                    <div className="card">
                        <h2>Event Info</h2>
                        <p><strong>Title:</strong> {selectedEvent.title}</p>
                        <p><strong>Description:</strong> {selectedEvent.description}</p>
                        <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {selectedEvent.time}</p>
                        <p><strong>Venue:</strong> {selectedEvent.venue}</p>
                        <p><strong>Budget:</strong> ${selectedEvent.budget}</p>
                    </div>

                    {/* --- Task Manager --- */}
                    {/* --- Task Manager --- */}
<div className="card">
    <h2>Task Manager</h2>

    {/* --- Add New Task --- */}
    <div style={{ marginBottom: '10px' }}>
        <input
            type="text"
            placeholder="Task Title"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
        />
        <input
            type="text"
            placeholder="Task Description"
            value={taskDesc}
            onChange={e => setTaskDesc(e.target.value)}
        />
        <input
            type="datetime-local"
            value={taskStartTime}
            onChange={e => setTaskStartTime(e.target.value)}
        />
        <input
            type="datetime-local"
            value={taskEndTime}
            onChange={e => setTaskEndTime(e.target.value)}
        />
        <select value={assignedVendor} onChange={e => setAssignedVendor(e.target.value)}>
            <option value="">-- Assign Vendor --</option>
            {vendors.map(v => (
                <option key={v._id} value={v._id}>{v.name}</option>
            ))}
        </select>
        <button type="button" onClick={addTask}>Add Task</button>
    </div>

    {/* --- Task List --- */}
    {tasks.length > 0 ? (
        <ul>
            {tasks.map(t => (
                <li key={t._id} className="list-item" onClick={() => updateStatus(t)}>
                    <div>
                        <strong>{t.title}</strong>
                        <p style={{ fontSize: '12px', color: '#555' }}>{t.description}</p>

                        {/* Vendor Info */}
                        <p style={{ fontSize: '12px', color: '#666' }}>
                            Vendor: {t.vendorId?.name || 'Not assigned'}
                            {t.vendorId?.email ? ` (${t.vendorId.email})` : ''}
                        </p>

                        {/* Start & End Time */}
                        <p style={{ fontSize: '12px', color: '#666' }}>
                            {t.startTime ? `Start: ${new Date(t.startTime).toLocaleString()}` : 'Start: N/A'}
                        </p>
                        <p style={{ fontSize: '12px', color: '#666' }}>
                            {t.endTime ? `End: ${new Date(t.endTime).toLocaleString()}` : 'End: N/A'}
                        </p>
                    </div>
                    <span>{statusDisplay[t.status]}</span>
                </li>
            ))}
        </ul>
    ) : (
        <p>No tasks yet.</p>
    )}

    <p style={{ fontSize: '12px', color: '#555' }}>Click task to change status</p>
</div>


                    {/* --- Sponsor Requests --- */}
                    <div className="card">
                        <h2>Sponsor Requests</h2>
                        <div style={{ marginBottom: '10px' }}>
                            <select value={selectedSponsor} onChange={e => setSelectedSponsor(e.target.value)}>
                                <option value="">-- Select Sponsor --</option>
                                {sponsors.map(s => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
                            </select>

                            <input 
                                type="number" 
                                placeholder="Amount" 
                                value={sponsorAmount} 
                                onChange={e => setSponsorAmount(e.target.value)} 
                                style={{ marginLeft: '5px' }}
                            />

                            <button onClick={sendSponsorRequest}>Send Request</button>
                        </div>

                        {sponsorRequests.length > 0 ? (
                            <ul>
                                {sponsorRequests.map(req => (
                                    <li key={req._id}>
                                        Sponsor: {req.sponsorId.name} | Email: {req.sponsorId.email} | Amount: ${req.amount} | Status: {req.status}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No sponsor requests yet.</p>
                        )}
                    </div>

                    {/* --- Budget Tracker --- */}
                    <div className="card">
                        <h2>Budget Tracker</h2>
                        <p>Total Budget: ${selectedEvent.budget}</p>
                        <input type="number" placeholder="Add Expense" value={newExpense} onChange={e => setNewExpense(e.target.value)} />
                        <button type="button" onClick={addExpense}>Add Expense</button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default DashboardOrganizer;
