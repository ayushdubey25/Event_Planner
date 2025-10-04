import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/'); // redirect to login
    }

    return (
        <nav style={styles.nav}>
            <div style={styles.brand}>
                <h2>EventFlow</h2>
            </div>
            <div style={styles.userInfo}>
                <span>{name} ({role})</span>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </div>
        </nav>
    )
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 40px',
        marginBottom: '0.5cm',
        background: 'linear-gradient(135deg, #f3f4f8cd, #1E90FF)',
        color: '#f4f4f4',
        fontFamily: "'Poppins', sans-serif",
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '15px 15px 15px 15px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease-in-out'
    },
 brand: {
        color: '#004687',
        fontWeight: '1200',
        fontSize: '26px',
        letterSpacing: '1px',
        // textShadow: '0 0 10px rgba(0, 123, 255, 0.7)',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        // width: '25%',
        // padding: '15px 10px 10px 10px',
        gap: '30px',
        fontSize: '16px',
        fontWeight: '500',
        background: 'rgba(255, 255, 255, 0.23)',
        padding: '8px 18px',
        borderRadius: '50px',
        boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.1)',
        transition: 'background 0.3s ease-in-out',
    },
 logoutBtn: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '50px',
        background: 'linear-gradient(90deg, #ff416c, #ff4b2b)',
        color: '#fff',
        fontWeight: '600',
        cursor: 'pointer',
        letterSpacing: '0.5px',
        boxShadow: '0 4px 12px rgba(255, 75, 43, 0.4)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    }

};

export default Navbar;
