import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const DashboardSponsor = () => {
    const token = localStorage.getItem('token');
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hoveredRequest, setHoveredRequest] = useState(null);


    const styles = {
        dashboard: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #b1d8fff6 0%, #e2e8f0 100%)',
            padding: '0',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem'
        },
        header: {
            background: 'linear-gradient(135deg, #b2bce9ff 0%, #117cd3ba 100%)',
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
            border: '1px solid rgba(0,0,0,0.04)'
        },
        sectionTitle: {
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '1.5rem',
            paddingBottom: '0.75rem',
            borderBottom: '2px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
        },
        requestsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
            gap: '1.5rem',
            marginTop: '1.5rem'
        },
        requestCard: {
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.5rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            position: 'relative'
        },
        requestCardHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            borderColor: '#667eea'
        },
        eventTitle: {
            fontSize: '1.3rem',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '1rem',
            lineHeight: '1.4'
        },
        requestDetail: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.75rem',
            color: '#4a5568',
            fontSize: '1rem'
        },
        detailIcon: {
            marginRight: '0.75rem',
            color: '#667eea',
            width: '20px',
            textAlign: 'center'
        },
        amountBadge: {
            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '1.1rem',
            fontWeight: '600',
            display: 'inline-block',
            marginBottom: '1rem'
        },
        buttonGroup: {
            display: 'flex',
            gap: '1rem',
            marginTop: '1.5rem'
        },
        button: {
            flex: 1,
            padding: '0.9rem 1.5rem',
            border: 'none',
            borderRadius: '10px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '1rem'
        },
        acceptButton: {
            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
            color: 'white'
        },
        rejectButton: {
            background: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
            color: 'white'
        },
        buttonHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        },
        emptyState: {
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#718096'
        },
        emptyIcon: {
            fontSize: '4rem',
            marginBottom: '1.5rem',
            opacity: '0.5'
        },
        statusBadge: {
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            background: '#fefcbf',
            color: '#d69e2e'
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

    // --- Fetch pending sponsor requests ---
    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://event-planner-nu0c.onrender.com/sponsorRequests/pending', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(res.data);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    // --- Respond to sponsor request ---
    const respondRequest = async (id, status) => {
        try {
            await axios.put(`https://event-planner-nu0c.onrender.com/api/sponsorRequests/${id}/respond`, 
                { status }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchRequests(); // refresh list
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div style={styles.dashboard}>
            <style>{spinnerStyle}</style>
            <Navbar />
            
            <div style={styles.container}>
                {/* Header Section */}
                <div style={styles.header}>
                    <h1 style={styles.welcomeText}>Welcome, {localStorage.getItem('name')}!</h1>
                    <div style={styles.roleBadge}>Sponsor Dashboard</div>
                </div>

                {/* Pending Requests Section */}
                <div style={styles.card}>
                    <h2 style={styles.sectionTitle}>
                        📨 Pending Sponsor Requests
                    </h2>
                    
                    {loading ? (
                        <div style={styles.loadingSpinner}>
                            <div style={styles.spinner}></div>
                        </div>
                    ) : requests.length > 0 ? (
                        <div style={styles.requestsGrid}>
  {requests.map(request => (
    <div
      key={request._id}
      style={{
        ...styles.requestCard,
        ...(hoveredRequest === request._id ? styles.requestCardHover : {})
      }}
      onMouseEnter={() => setHoveredRequest(request._id)}
      onMouseLeave={() => setHoveredRequest(null)}
    >
      <div style={styles.statusBadge}>Pending</div>

      <h3 style={styles.eventTitle}>{request.eventId?.title}</h3>
      <div style={styles.amountBadge}>${request.amount || 0}</div>

      <div style={styles.requestDetail}>
        <span style={styles.detailIcon}>📅</span>
        <span>{request.eventId?.date ? new Date(request.eventId.date).toLocaleDateString() : 'Date not specified'}</span>
      </div>

      <div style={styles.requestDetail}>
        <span style={styles.detailIcon}>📍</span>
        <span>{request.eventId?.venue || 'Venue not specified'}</span>
      </div>

      <div style={styles.requestDetail}>
        <span style={styles.detailIcon}>👤</span>
        <span>Organizer: {request.eventId?.organizer?.name || 'Unknown'}</span>
      </div>

      <div style={styles.buttonGroup}>
        <button
          style={{
            ...styles.button,
            ...styles.acceptButton,
            ...(hoveredRequest === request._id ? styles.buttonHover : {})
          }}
          onClick={() => respondRequest(request._id, 'accepted')}
        >
          ✅ Accept
        </button>
        <button
          style={{
            ...styles.button,
            ...styles.rejectButton,
            ...(hoveredRequest === request._id ? styles.buttonHover : {})
          }}
          onClick={() => respondRequest(request._id, 'rejected')}
        >
          ❌ Reject
        </button>
      </div>
    </div>
  ))}
</div>

                    ) : (
                        <div style={styles.emptyState}>
                            <div style={styles.emptyIcon}>📭</div>
                            <h3>No Pending Requests</h3>
                            <p>You don't have any pending sponsorship requests at the moment.</p>
                            <p style={{ fontSize: '0.9rem', color: '#a0aec0', marginTop: '0.5rem' }}>
                                New requests will appear here when event organizers send them.
                            </p>
                        </div>
                    )}
                </div>

                {/* Statistics/Info Card */}
                <div style={styles.card}>
                    <h2 style={styles.sectionTitle}>📊 Quick Stats</h2>
                    <div style={styles.requestsGrid}>
                        <div style={styles.requestCard}>
                            <div style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: '700', 
                                color: '#667eea',
                                textAlign: 'center',
                                marginBottom: '0.5rem'
                            }}>
                                {requests.length}
                            </div>
                            <div style={{ 
                                textAlign: 'center', 
                                color: '#4a5568',
                                fontWeight: '500'
                            }}>
                                Pending Requests
                            </div>
                        </div>
                        <div style={styles.requestCard}>
                            <div style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: '700', 
                                color: '#48bb78',
                                textAlign: 'center',
                                marginBottom: '0.5rem'
                            }}>
                                ${requests.reduce((total, req) => total + (req.amount || 0), 0)}
                            </div>
                            <div style={{ 
                                textAlign: 'center', 
                                color: '#4a5568',
                                fontWeight: '500'
                            }}>
                                Total Requested Amount
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSponsor;
