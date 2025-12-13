import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Register = () => {
    const navigate = useNavigate();

    // Theme State Logic
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const handleRegister = (e) => {
        e.preventDefault();
        // Add actual registration logic here
        navigate('/');
    };

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        document.body.classList.add('login-page-body');
        return () => {
            document.body.classList.remove('login-page-body');
        };
    }, []);

    return (
        <div className="login-page-container">
            <header className="login-header-nav">
                <Link to="/" className="logo">
                    <span><i className="fa-brands fa-meta"></i>&nbsp;asterkart</span>
                </Link>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button
                        className="theme-toggle"
                        id="themeToggle"
                        aria-label="Toggle dark mode"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                    >
                        <i className={`fa-solid ${isDarkMode ? 'fa-moon' : 'fa-sun'}`}></i>
                    </button>
                    <Link to="/" className="back-link">
                        <i className="fa-solid fa-arrow-left"></i> Back to Shop
                    </Link>
                </div>
            </header>

            <div className="login-wrapper">
                <div className="login-card">
                    <div className="login-header">
                        <h2>Create Account</h2>
                        <p>Join us for exclusive deals & offers</p>
                    </div>

                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <div className="input-group">
                                <i className="fa-regular fa-user"></i>
                                <input type="text" className="form-input" placeholder="John Doe" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div className="input-group">
                                <i className="fa-regular fa-envelope"></i>
                                <input type="email" className="form-input" placeholder="name@example.com" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <i className="fa-solid fa-lock"></i>
                                <input type="password" className="form-input" placeholder="Create a strong password" required />
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" required /> I agree to the <a href="#" style={{ color: 'var(--accent-green)' }}>Terms & Conditions</a>
                            </label>
                        </div>

                        <button type="submit" className="login-btn">Sign Up</button>

                        <div className="divider">Or register with</div>

                        <div className="social-login">
                            <button type="button" className="social-btn" onClick={() => navigate('/')}>
                                <i className="fa-brands fa-google" style={{ color: '#DB4437' }}></i> Google
                            </button>
                            <button type="button" className="social-btn" onClick={() => navigate('/')}>
                                <i className="fa-brands fa-facebook" style={{ color: '#4267B2' }}></i> Facebook
                            </button>
                        </div>

                        <div className="register-text">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
