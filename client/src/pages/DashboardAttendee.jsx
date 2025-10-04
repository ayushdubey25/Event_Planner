import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
// import '../styles/DashboardAttendee.css'
import '../styles.css';

const DashboardAttendee = () => {
    const token = localStorage.getItem('token');
    const [events, setEvents] = useState([]);
    const [myEvents, setMyEvents] = useState([]);

    // Fetch all events
    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/events', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents(res.data);
        } catch(err){ console.log(err); }
    }

    // Fetch attendee's booked events
    const fetchMyEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/events/my-booked', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMyEvents(res.data);
        } catch(err){ console.log(err); }
    }

    const bookEvent = async (eventId) => {
    try {
        const res = await axios.post(`http://localhost:5000/api/events/${eventId}/book`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert('Booked successfully!');
        fetchMyEvents();

        if(res.data.ticket){
            const link = document.createElement('a');
            link.href = `http://localhost:5000${res.data.ticket}`;
            link.download = `ticket-${eventId}.pdf`;
            link.click();
        }

    } catch(err){
        console.log(err);
        alert(err.response?.data?.message || 'Booking failed');
    }
};


    useEffect(()=>{
        fetchEvents();
        fetchMyEvents();
    }, []);

    return (
        <div className="dashboard">
               <Navbar/>
            <h1>Welcome, {localStorage.getItem('name')} (Attendee)</h1>

            <h2>Available Events</h2>
            <ul>
                {events.map(ev => (
                    <li key={ev._id} style={{ marginBottom: '10px' }}>
                        <strong>{ev.title}</strong> | {new Date(ev.date).toLocaleDateString()} | Venue: {ev.venue}
                        <button style={{ marginLeft: '10px' }} onClick={()=>bookEvent(ev._id)}>Book</button>
                    </li>
                ))}
            </ul>

            <h2>My Booked Events</h2>
            <ul>
                {myEvents.length === 0 && <li>No events booked yet.</li>}
                {myEvents.map(ev => (
                    <li key={ev._id}>
                        <strong>{ev.title}</strong> | {new Date(ev.date).toLocaleDateString()} | Venue: {ev.venue}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DashboardAttendee;
