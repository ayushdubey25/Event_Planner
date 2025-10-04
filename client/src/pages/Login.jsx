import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const styles = {
        loginContainer: {
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
        loginCard: {
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
            padding: '2.5rem',
            width: '90%',
            maxWidth: '420px',
            transformStyle: 'preserve-3d',
            animation: 'cardAppear 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
            overflow: 'hidden',
            position: 'relative',
            zIndex: '1'
        },
        loginHeader: {
            textAlign: 'center',
            marginBottom: '2rem'
        },
        loginTitle: {
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
        loginSubtitle: {
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
        inputFocus: {
            outline: 'none',
            borderColor: 'rgba(108, 99, 255, 0.6)',
            boxShadow: '0 0 0 3px rgba(108, 99, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.15)'
        },
        inputPlaceholder: {
            color: 'rgba(255, 255, 255, 0.6)'
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
        loginButton: {
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
        loginButtonHover: {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 20px rgba(108, 99, 255, 0.5)'
        },
        loginButtonLoading: {
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
        registerLink: {
            textAlign: 'center',
            marginTop: '1.5rem',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.9rem'
        },
        registerText: {
            color: '#342d78ff',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            position: 'relative'
        },
        registerUnderline: {
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

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const res = await axios.post('https://event-planner-nu0c.onrender.com/api/auth/login', { email, password });
            const { token, role, name } = res.data;

            // Save token and user info
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('name', name);

            // Redirect based on role
            if (role === 'organizer') navigate('/dashboard/organizer');
            else if (role === 'attendee') navigate('/dashboard/attendee');
            else if (role === 'vendor') navigate('/dashboard/vendor');
            else if (role === 'sponsor') navigate('/dashboard/sponsor');
        } catch (err) {
            console.log(err);
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const [isHovered, setIsHovered] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [registerHovered, setRegisterHovered] = useState(false);

    return (
        <div style={styles.loginContainer}>
            <style>{keyframesStyle}</style>
            
            {/* Floating Background Elements */}
            <div style={styles.floatingElements}>
                <div style={{...styles.floatingElement, width: '80px', height: '80px', top: '20%', left: '10%', animationDelay: '0s'}}></div>
                <div style={{...styles.floatingElement, width: '120px', height: '120px', top: '60%', left: '80%', animationDelay: '-2s'}}></div>
                <div style={{...styles.floatingElement, width: '60px', height: '60px', top: '80%', left: '20%', animationDelay: '-4s'}}></div>
                <div style={{...styles.floatingElement, width: '100px', height: '100px', top: '30%', left: '70%', animationDelay: '-6s'}}></div>
            </div>

            {/* Login Card */}
            <div style={styles.loginCard}>
                <div style={styles.loginHeader}>
                    <h2 style={styles.loginTitle}>
                        Welcome Back
                        <span style={styles.titleUnderline}></span>
                    </h2>
                    <p style={styles.loginSubtitle}>Sign in to your account to continue</p>
                </div>
                
                {error && <div style={styles.errorMessage}>{error}</div>}
                
                <form onSubmit={handleLogin}>
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
                       
                    </div>
                    
                    <button 
                        type="submit" 
                        style={{
                            ...styles.loginButton,
                            ...(isHovered && styles.loginButtonHover),
                            ...(loading && styles.loginButtonLoading)
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div style={styles.loadingSpinner}></div>
                                Signing In...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
                
                <div style={styles.registerLink}>
                    Don't have an account?{' '}
                    <span 
                        style={styles.registerText}
                        onClick={() => navigate('/register')}
                        onMouseEnter={() => setRegisterHovered(true)}
                        onMouseLeave={() => setRegisterHovered(false)}
                    >
                        Register
                        <span style={{
                            ...styles.registerUnderline,
                            width: registerHovered ? '100%' : '0'
                        }}></span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
