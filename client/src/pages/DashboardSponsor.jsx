import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const DashboardSponsor = () => {
    const token = localStorage.getItem('token');
    const [requests, setRequests] = useState([]);

    // --- Fetch pending sponsor requests ---
    const fetchRequests = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/sponsorRequests/pending', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // --- Respond to sponsor request ---
    const respondRequest = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/sponsorRequests/${id}/respond`, 
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
        <div>
            <Navbar />
            <h1>Welcome, {localStorage.getItem('name')} (Sponsor)</h1>
            <h2>Pending Sponsor Requests</h2>
            <ul>
                {requests.length > 0 ? requests.map(r => (
                    <li key={r._id}>
                        Event: {r.eventId.title} | Amount: ${r.amount || 0} | Status: {r.status}
                        <button onClick={() => respondRequest(r._id, 'accepted')}>Accept</button>
                        <button onClick={() => respondRequest(r._id, 'rejected')}>Reject</button>
                    </li>
                )) : <p>No pending requests</p>}
            </ul>
        </div>
    );
};

export default DashboardSponsor;
