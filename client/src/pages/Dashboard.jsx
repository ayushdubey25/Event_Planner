import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const Dashboard = () => {
    const token = localStorage.getItem('token');

    // --- Event States ---
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // --- Create Event Form States ---
    const [eventTitle, setEventTitle] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventVenue, setEventVenue] = useState('');
    const [eventBudget, setEventBudget] = useState('');

    // --- Task States ---
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    // --- Budget States ---
    const [newExpense, setNewExpense] = useState('');

    // Fetch organizer events
    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/events/my', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents(res.data);
            if(res.data.length > 0) setSelectedEvent(res.data[0]);
        } catch (err) { console.log(err); }
    };

    // Fetch tasks for selected event
    const fetchTasks = async (eventId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/tasks/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(res.data);
        } catch (err) { console.log(err); }
    };

    useEffect(() => { fetchEvents(); }, []);

    useEffect(() => {
        if(selectedEvent) fetchTasks(selectedEvent._id);
    }, [selectedEvent]);

    // --- Create Event Function ---
    const createEvent = async () => {
        if(!eventTitle) return;
        try{
            const res = await axios.post('http://localhost:5000/api/events/create', {
                title: eventTitle,
                description: eventDesc,
                date: eventDate,
                time: eventTime,
                venue: eventVenue,
                budget: eventBudget
            }, { headers: { Authorization: `Bearer ${token}` } });

            setEvents([...events, res.data]);
            setSelectedEvent(res.data);

            // Clear form
            setEventTitle(''); setEventDesc(''); setEventDate('');
            setEventTime(''); setEventVenue(''); setEventBudget('');
        } catch(err){ console.log(err); }
    };

    // --- Add Task ---
    const addTask = async () => {
        if(!newTask || !selectedEvent) return;
        try {
            const res = await axios.post(`http://localhost:5000/api/tasks/${selectedEvent._id}`,
                { title: newTask },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTasks([...tasks, res.data]);
            setNewTask('');
        } catch (err) { console.log(err); }
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

    return (
        <div className="dashboard">
            <h1>Welcome, {localStorage.getItem('name')} (Organizer)</h1>

            {/* --- Create Event Form --- */}
            <div className="card" style={{ marginBottom: '20px' }}>
                <h2>Create New Event</h2>
                <input type="text" placeholder="Title" value={eventTitle} onChange={e => setEventTitle(e.target.value)} />
                <input type="text" placeholder="Description" value={eventDesc} onChange={e => setEventDesc(e.target.value)} />
                <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} />
                <input type="time" value={eventTime} onChange={e => setEventTime(e.target.value)} />
                <input type="text" placeholder="Venue" value={eventVenue} onChange={e => setEventVenue(e.target.value)} />
                <input type="number" placeholder="Budget" value={eventBudget} onChange={e => setEventBudget(e.target.value)} />
                <button onClick={createEvent} style={{ marginTop: '5px' }}>Create Event</button>
            </div>

            {/* --- Event Selector --- */}
            <div style={{ marginBottom: '20px' }}>
                <label>Select Event: </label>
                <select onChange={e => {
                    const ev = events.find(ev => ev._id === e.target.value);
                    setSelectedEvent(ev);
                }} value={selectedEvent?._id || ''}>
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
                        <p><strong>Attendees:</strong> {selectedEvent.attendees.length}</p>
                        <p><strong>Vendors:</strong> {selectedEvent.vendors.length}</p>
                        <p><strong>Sponsors:</strong> {selectedEvent.sponsors.length}</p>
                    </div>

                    {/* --- Task Manager --- */}
                    <div className="card">
                        <h2>Task Manager</h2>
                        <div style={{ marginBottom: '10px' }}>
                            <input type="text" placeholder="New Task" value={newTask} onChange={e => setNewTask(e.target.value)} />
                            <button type="button" onClick={addTask} style={{ marginTop: '5px' }}>Add Task</button>
                        </div>
                        <ul>
                            {tasks.map(t => (
                                <li key={t._id} className="list-item" onClick={() => updateStatus(t)}>
                                    <span>{t.title}</span>
                                    <span>{t.status}</span>
                                </li>
                            ))}
                        </ul>
                        <p style={{ fontSize: '12px', color: '#555' }}>Click task to change status</p>
                    </div>

                    {/* --- Budget Tracker --- */}
                    <div className="card">
                        <h2>Budget Tracker</h2>
                        <p>Total Budget: ${selectedEvent.budget}</p>
                        <div style={{ marginTop: '10px' }}>
                            <input type="number" placeholder="Add Expense" value={newExpense} onChange={e => setNewExpense(e.target.value)} />
                            <button type="button" onClick={addExpense} style={{ marginTop: '5px' }}>Add Expense</button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Dashboard;
