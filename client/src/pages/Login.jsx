import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('name', res.data.name);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
                Don't have an account? <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => navigate('/register')}>Register</span>
            </p>
        </div>
    );
};

export default Login;
