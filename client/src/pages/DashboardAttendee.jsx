import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const DashboardAttendee = () => {
    const token = localStorage.getItem('token');
    const [events, setEvents] = useState([]);
    const [myEvents, setMyEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredEvent, setHoveredEvent] = useState(null);

    const styles = {
        dashboard: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #b1d8fff6 0%, #e2e8f0 100%)',
            padding: '0',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        },
        container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem' },
        header: {
            background: 'linear-gradient(135deg, #bbc3e8ff 0%, #117cd3ba 100%)',
            color: 'white',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
        },
        welcomeText: { fontSize: '2.5rem', fontWeight: '300', margin: '0', marginBottom: '0.5rem' },
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
        eventsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', marginTop: '1rem' },
        eventCard: {
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.5rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            position: 'relative',
            overflow: 'hidden'
        },
        eventCardHover: { transform: 'translateY(-5px)', boxShadow: '0 8px 25px rgba(0,0,0,0.1)', borderColor: '#667eea' },
        eventTitle: { fontSize: '1.3rem', fontWeight: '600', color: '#2d3748', marginBottom: '0.8rem', lineHeight: '1.4' },
        eventDetail: { display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#4a5568', fontSize: '0.95rem' },
        icon: { marginRight: '0.5rem', color: '#667eea', width: '16px' },
        bookButton: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '1rem',
            width: '100%',
            fontSize: '0.95rem'
        },
        bookButtonHover: { transform: 'translateY(-2px)', boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)' },
        bookedEvent: { background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)', color: 'white' },
        emptyState: { textAlign: 'center', padding: '3rem', color: '#718096' },
        emptyIcon: { fontSize: '3rem', marginBottom: '1rem', opacity: '0.5' },
        loadingSpinner: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' },
        spinner: { border: '3px solid #f3f3f3', borderTop: '3px solid #667eea', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' },
        statusBadge: { position: 'absolute', top: '1rem', right: '1rem', background: '#48bb78', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }
    };

    const spinnerStyle = `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `;

    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/events', { headers: { Authorization: `Bearer ${token}` } });
            setEvents(res.data);
        } catch(err) { console.log(err); } 
        finally { setLoading(false); }
    };

    const fetchMyEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/events/my-booked', { headers: { Authorization: `Bearer ${token}` } });
            setMyEvents(res.data);
        } catch(err) { console.log(err); }
    };

    const bookEvent = async (eventId) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/events/${eventId}/book`, {}, { headers: { Authorization: `Bearer ${token}` } });
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

    useEffect(() => {
        fetchEvents();
        fetchMyEvents();
    }, []);

    const isEventBooked = (eventId) => myEvents.some(event => event._id === eventId);

    return (
        <div style={styles.dashboard}>
            <style>{spinnerStyle}</style>
            <Navbar/>

            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.welcomeText}>Welcome back, {localStorage.getItem('name')}!</h1>
                    <div style={styles.roleBadge}>Attendee Dashboard</div>
                </div>

                {/* Available Events */}
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>📅 Available Events</h2>
                    {loading ? (
                        <div style={styles.loadingSpinner}><div style={styles.spinner}></div></div>
                    ) : events.length === 0 ? (
                        <div style={styles.emptyState}>
                            <div style={styles.emptyIcon}>📅</div>
                            <h3>No events available at the moment</h3>
                            <p>Check back later for new events!</p>
                        </div>
                    ) : (
                        <div style={styles.eventsGrid}>
                            {events.map(event => {
                                const isBooked = isEventBooked(event._id);
                                return (
                                    <div
                                        key={event._id}
                                        style={{ ...styles.eventCard, ...(hoveredEvent === event._id ? styles.eventCardHover : {}) }}
                                        onMouseEnter={() => setHoveredEvent(event._id)}
                                        onMouseLeave={() => setHoveredEvent(null)}
                                    >
                                        {isBooked && <div style={styles.statusBadge}>Booked</div>}
                                        <h3 style={styles.eventTitle}>{event.title}</h3>

                                        <div style={styles.eventDetail}>
                                            <span style={styles.icon}>📅</span>
                                            {new Date(event.date).toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' })}
                                        </div>

                                        <div style={styles.eventDetail}>
                                            <span style={styles.icon}>📍</span>{event.venue}
                                        </div>

                                        {event.description && (
                                            <div style={styles.eventDetail}>
                                                <span style={styles.icon}>📝</span>
                                                {event.description.length > 100 ? `${event.description.substring(0,100)}...` : event.description}
                                            </div>
                                        )}

                                        <button
                                            style={{
                                                ...styles.bookButton,
                                                ...(hoveredEvent === event._id ? styles.bookButtonHover : {}),
                                                ...(isBooked ? styles.bookedEvent : {})
                                            }}
                                            onClick={() => !isBooked && bookEvent(event._id)}
                                            disabled={isBooked}
                                        >
                                            {isBooked ? 'Already Booked' : 'Book Event'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* My Booked Events */}
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>🎟️ My Booked Events</h2>
                    {myEvents.length === 0 ? (
                        <div style={styles.emptyState}>
                            <div style={styles.emptyIcon}>🎫</div>
                            <h3>No events booked yet</h3>
                            <p>Book your first event from the available events above!</p>
                        </div>
                    ) : (
                        <div style={styles.eventsGrid}>
                            {events.map(event => {
                                const isBooked = isEventBooked(event._id);
                                return (
                                    <div
                                        key={event._id}
                                        style={{ ...styles.eventCard, ...(hoveredEvent === event._id ? styles.eventCardHover : {}) }}
                                        onMouseEnter={() => setHoveredEvent(event._id)}
                                        onMouseLeave={() => setHoveredEvent(null)}
                                    >
                                        {isBooked && <div style={styles.statusBadge}>Booked</div>}
                                        <h3 style={styles.eventTitle}>{event.title}</h3>

                                        <div style={styles.eventDetail}>
                                            <span style={styles.icon}>📅</span>
                                            {new Date(event.date).toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' })}
                                        </div>

                                        <div style={styles.eventDetail}>
                                            <span style={styles.icon}>📍</span>{event.venue}
                                        </div>

                                        {event.description && (
                                            <div style={styles.eventDetail}>
                                                <span style={styles.icon}>📝</span>
                                                {event.description.length > 100 ? `${event.description.substring(0,100)}...` : event.description}
                                            </div>
                                        )}

                                        <button
                                            style={{
                                                ...styles.bookButton,
                                                ...(hoveredEvent === event._id ? styles.bookButtonHover : {}),
                                                ...(isBooked ? styles.bookedEvent : {})
                                            }}
                                            onClick={() => !isBooked && bookEvent(event._id)}
                                            disabled={isBooked}
                                        >
                                            {isBooked ? 'Already Booked' : 'Book Event'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardAttendee;
