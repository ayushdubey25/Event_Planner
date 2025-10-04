import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('organizer');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const styles = {
        registerContainer: {
            minHeight: '100vh',
            background: 'linear-gradient(-45deg, #d5f1f0ff, #3c8ce7ff, #60abc7ff, #23d5ab)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            position: 'relative',
            overflow: 'hidden'
        },
        floatingElements: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: '0'
        },
        floatingElement: {
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: 'float 15s infinite linear'
        },
        registerCard: {
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
            padding: '2.5rem',
            width: '90%',
            maxWidth: '450px',
            transformStyle: 'preserve-3d',
            animation: 'cardAppear 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
            overflow: 'hidden',
            position: 'relative',
            zIndex: '1'
        },
        registerHeader: {
            textAlign: 'center',
            marginBottom: '2rem'
        },
        registerTitle: {
            fontSize: '2.2rem',
            fontWeight: '700',
            background: 'linear-gradient(45deg, #fff, #e0e0e0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
            position: 'relative',
            display: 'inline-block'
        },
        titleUnderline: {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50px',
            height: '3px',
            background: 'linear-gradient(45deg, #6c63ff, #3f37c9)',
            borderRadius: '2px'
        },
        registerSubtitle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.9rem',
            marginTop: '1rem'
        },
        formGroup: {
            position: 'relative',
            marginBottom: '1.8rem'
        },
        input: {
            width: '100%',
            padding: '1rem 1rem 1rem 3rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(5px)'
        },
        select: {
            width: '100%',
            padding: '1rem 1rem 1rem 3rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(5px)',
            cursor: 'pointer'
        },
        selectOption: {
            background: '#2d3748',
            color: 'white'
        },
        inputFocus: {
            outline: 'none',
            borderColor: 'rgba(108, 99, 255, 0.6)',
            boxShadow: '0 0 0 3px rgba(108, 99, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.15)'
        },
        formIcon: {
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(255, 255, 255, 0.7)',
            transition: 'color 0.3s ease'
        },
        passwordToggle: {
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer',
            transition: 'color 0.3s ease'
        },
        registerButton: {
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(45deg, #6c63ff, #3f37c9)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(108, 99, 255, 0.4)',
            marginTop: '0.5rem'
        },
        registerButtonHover: {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 20px rgba(108, 99, 255, 0.5)'
        },
        registerButtonLoading: {
            pointerEvents: 'none'
        },
        errorMessage: {
            background: 'rgba(220, 20, 60, 0.2)',
            color: '#ff6b81',
            padding: '0.8rem 1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            textAlign: 'center',
            border: '1px solid rgba(220, 20, 60, 0.3)',
            animation: 'shake 0.5s ease-in-out'
        },
        loginLink: {
            textAlign: 'center',
            marginTop: '1.5rem',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.9rem'
        },
        loginText: {
            color: '#6c63ff',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            position: 'relative'
        },
        loginUnderline: {
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: '0',
            width: '0',
            height: '2px',
            background: '#6c63ff',
            transition: 'width 0.3s ease'
        },
        loadingSpinner: {
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #ffffff',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            animation: 'spin 1s linear infinite',
            display: 'inline-block',
            marginRight: '0.5rem'
        },
        roleDescription: {
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginTop: '0.5rem',
            textAlign: 'center',
            fontStyle: 'italic'
        }
    };

    const keyframesStyle = `
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.7; }
            100% { transform: translateY(0) rotate(360deg); opacity: 1; }
        }
        
        @keyframes cardAppear {
            0% { opacity: 0; transform: translateY(50px) rotateX(-10deg); }
            100% { opacity: 1; transform: translateY(0) rotateX(0); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('name', res.data.name);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const [isHovered, setIsHovered] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [roleFocused, setRoleFocused] = useState(false);
    const [loginHovered, setLoginHovered] = useState(false);

    const getRoleDescription = () => {
        switch(role) {
            case 'organizer': return 'Create and manage events, assign tasks to vendors';
            case 'attendee': return 'Browse and book events, download tickets';
            case 'vendor': return 'Receive task assignments, upload completed work';
            case 'sponsor': return 'Receive sponsorship requests, fund events';
            default: return '';
        }
    };

    return (
        <div style={styles.registerContainer}>
            <style>{keyframesStyle}</style>
            
            {/* Floating Background Elements */}
            <div style={styles.floatingElements}>
                <div style={{...styles.floatingElement, width: '80px', height: '80px', top: '20%', left: '10%', animationDelay: '0s'}}></div>
                <div style={{...styles.floatingElement, width: '120px', height: '120px', top: '60%', left: '80%', animationDelay: '-2s'}}></div>
                <div style={{...styles.floatingElement, width: '60px', height: '60px', top: '80%', left: '20%', animationDelay: '-4s'}}></div>
                <div style={{...styles.floatingElement, width: '100px', height: '100px', top: '30%', left: '70%', animationDelay: '-6s'}}></div>
            </div>

            {/* Register Card */}
            <div style={styles.registerCard}>
                <div style={styles.registerHeader}>
                    <h2 style={styles.registerTitle}>
                        Create Account
                        <span style={styles.titleUnderline}></span>
                    </h2>
                    <p style={styles.registerSubtitle}>Join our event management platform</p>
                </div>
                
                {error && <div style={styles.errorMessage}>{error}</div>}
                
                <form onSubmit={handleRegister}>
                    <div style={styles.formGroup}>
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            required 
                            style={{
                                ...styles.input,
                                ...(nameFocused && styles.inputFocus)
                            }}
                            onFocus={() => setNameFocused(true)}
                            onBlur={() => setNameFocused(false)}
                        />
                        <span style={styles.formIcon}>👤</span>
                    </div>
                    
                    <div style={styles.formGroup}>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                            style={{
                                ...styles.input,
                                ...(emailFocused && styles.inputFocus)
                            }}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                        />
                        <span style={styles.formIcon}>📧</span>
                    </div>
                    
                    <div style={styles.formGroup}>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                            style={{
                                ...styles.input,
                                ...(passwordFocused && styles.inputFocus)
                            }}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                        />
                        <span style={styles.formIcon}>🔒</span>
                        <button 
                            type="button" 
                            style={styles.passwordToggle}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                    
                    <div style={styles.formGroup}>
                        <select 
                            value={role} 
                            onChange={e => setRole(e.target.value)} 
                            required 
                            style={{
                                ...styles.select,
                                ...(roleFocused && styles.inputFocus)
                            }}
                            onFocus={() => setRoleFocused(true)}
                            onBlur={() => setRoleFocused(false)}
                        >
                            <option value="organizer">Organizer</option>
                            <option value="attendee">Attendee</option>
                            <option value="vendor">Vendor</option>
                            <option value="sponsor">Sponsor</option>
                        </select>
                        <span style={styles.formIcon}>🎯</span>
                    </div>
                    
                    <div style={styles.roleDescription}>
                        {getRoleDescription()}
                    </div>
                    
                    <button 
                        type="submit" 
                        style={{
                            ...styles.registerButton,
                            ...(isHovered && styles.registerButtonHover),
                            ...(loading && styles.registerButtonLoading)
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div style={styles.loadingSpinner}></div>
                                Creating Account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>
                
                <div style={styles.loginLink}>
                    Already have an account?{' '}
                    <span 
                        style={styles.loginText}
                        onClick={() => navigate('/login')}
                        onMouseEnter={() => setLoginHovered(true)}
                        onMouseLeave={() => setLoginHovered(false)}
                    >
                        Login
                        <span style={{
                            ...styles.loginUnderline,
                            width: loginHovered ? '100%' : '0'
                        }}></span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Register;