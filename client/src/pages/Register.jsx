import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('organizer');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('name', res.data.name);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <select value={role} onChange={e => setRole(e.target.value)} required>
                    <option value="organizer">Organizer</option>
                    <option value="attendee">Attendee</option>
                    <option value="vendor">Vendor</option>
                    <option value="sponsor">Sponsor</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
                Already have an account? <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</span>
            </p>
        </div>
    );
};

export default Register;
