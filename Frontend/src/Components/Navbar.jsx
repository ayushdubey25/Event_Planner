import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../Styling/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check login state on load
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <img src="/assets/logo.png" alt="EventSync" />
            <span>EventSync</span>
          </Link>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {/* Show links only if logged in */}
            {token && role === "organizer" && (
              <Link 
                to="/organizer/dashboard" 
                className={`nav-link ${location.pathname.includes('organizer') ? 'active' : ''}`}
              >Organizer</Link>
            )}
            {token && role === "attendee" && (
              <Link 
                to="/attendee/onboarding" 
                className={`nav-link ${location.pathname.includes('attendee') ? 'active' : ''}`}
              >Attendee</Link>
            )}
            {token && role === "vendor" && (
              <Link 
                to="/vendor/dashboard" 
                className={`nav-link ${location.pathname.includes('vendor') ? 'active' : ''}`}
              >Vendor</Link>
            )}
            {token && role === "sponsor" && (
              <Link 
                to="/sponsor/insights" 
                className={`nav-link ${location.pathname.includes('sponsor') ? 'active' : ''}`}
              >Sponsor</Link>
            )}
          </div>

          <div className="nav-actions">
            {!token ? (
              <>
                <button className="btn btn-secondary" onClick={() => navigate("/login")}>Login</button>
                <button className="btn btn-primary" onClick={() => navigate("/register")}>Sign Up</button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            )}
          </div>

          <button 
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
