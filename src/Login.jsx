import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    // Theme State Logic
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const handleLogin = (e) => {
        e.preventDefault();
        // Add actual login logic here if needed
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
        // 1. Add a specific class to the body when this component mounts
        document.body.classList.add('login-page-body');

        // 2. Remove it when the user leaves this page
        return () => {
            document.body.classList.remove('login-page-body');
        };
    }, []);

    return (
        <div className="login-page-container">
            <header className="login-header-nav">
                <Link to="/" className="logo">
                    <span><i className="fa-brands fa-meta"></i>&nbsp;<span className='m-hide'>asterkart</span></span>
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
                <Link to="/" className="mobile-back-link">
                    <i className="fa-solid fa-arrow-left"></i> Back to Shop
                </Link>
                <div className="login-card">
                    <div className="login-header">
                        <h2>Welcome Back</h2>
                        <p>Please sign in to your account</p>
                    </div>

                    <form onSubmit={handleLogin}>
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
                                <input type="password" className="form-input" placeholder="••••••••" required />
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#" className="forgot-link">Forgot password?</a>
                        </div>

                        <button type="submit" className="login-btn">Sign In</button>

                        <div className="divider">Or continue with</div>

                        <div className="social-login">
                            <button type="button" className="social-btn" onClick={() => navigate('/')}>
                                <i className="fa-brands fa-google" style={{ color: '#DB4437' }}></i> Google
                            </button>
                            <button type="button" className="social-btn" onClick={() => navigate('/')}>
                                <i className="fa-brands fa-facebook" style={{ color: '#4267B2' }}></i> Facebook
                            </button>
                        </div>

                        <div className="register-text">
                            Don't have an account? <Link to="/register">Create Account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;