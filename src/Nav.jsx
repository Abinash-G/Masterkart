import React, { useState, useEffect } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { useCart } from './CartContext';
import './style.css';

const ToastNotification = ({ toast }) => {
    if (!toast.show) return null;
    return (
        <div className="toast-notification">
            <i className={`fa-solid ${toast.type === 'wishlist' ? 'fa-heart' : 'fa-check-circle'}`}></i>
            {toast.message}
        </div>
    );
};

const Nav = () => {
    const { cartItems, wishlistItems, toast } = useCart();
    // --- DROPDOWN STATE ---
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const dropdownRef = React.useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMoreOpen(false);
            }
        };

        if (isMoreOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMoreOpen]);

    // --- CENTRALIZED THEME LOGIC ---
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const [locationData, setLocationData] = useState({
        city: '.',
        country_code: '..',
        latitude: 0,
        longitude: 0,
        loaded: false
    });

    useEffect(() => {
        const fetchIPLocation = () => {
            fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(data => {
                    if (data && data.city) {
                        setLocationData({
                            city: data.city.toUpperCase(),
                            country_code: data.country_code,
                            latitude: data.latitude,
                            longitude: data.longitude,
                            loaded: true
                        });
                    }
                })
                .catch(err => console.error("IP Location fetch error:", err));
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Use a free reverse geocoding API to get city name from coords
                    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                        .then(res => res.json())
                        .then(data => {
                            setLocationData({
                                city: (data.city || data.locality || 'Unknown').toUpperCase(),
                                country_code: data.countryCode || 'IN',
                                latitude: latitude,
                                longitude: longitude,
                                loaded: true
                            });
                        })
                        .catch(() => fetchIPLocation()); // Fallback to IP if reverse geo fails
                },
                (error) => {
                    console.warn("Geolocation denied or failed, falling back to IP:", error);
                    fetchIPLocation();
                }
            );
        } else {
            fetchIPLocation();
        }
    }, []);

    return (
        <>
            {/* --- COMMON HEADER --- */}
            <header>
                <Link to="/" className="logo">
                    <span><i className="fa-brands fa-meta"></i>&nbsp;<span className="m-hide">asterkart</span></span>
                </Link>

                <div className="search-bar m-hide">
                    <i className="fa-solid fa-magnifying-glass" style={{ color: '#aaa' }}></i>
                    <input type="text" placeholder="Search Products..." />
                </div>

                <div className="user-actions">
                    <button
                        className="action-item theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle dark mode"
                    >
                        <i className={`fa-solid ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
                        <span className="m-hide">Mode</span>
                    </button>

                    <Link to="/login">
                        <div className="action-item">
                            <i className="fa-regular fa-user"></i>
                            <span className="m-hide">Account</span>
                        </div>
                    </Link>
                    <Link to="/wishlist">
                        <div className="action-item">
                            <div className="icon-badge-wrapper">
                                <i className="fa-regular fa-heart"></i>
                                {wishlistItems.length > 0 && (
                                    <span className="nav-badge">{wishlistItems.length}</span>
                                )}
                            </div>
                            <span className="m-hide">Wishlist</span>
                        </div>
                    </Link>
                    <Link to="/cart">
                        <div className="action-item">
                            <div className="icon-badge-wrapper">
                                <i className="fa-solid fa-bag-shopping"></i>
                                {cartItems.length > 0 && (
                                    <span className="nav-badge">
                                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                    </span>
                                )}
                            </div>
                            <span className="m-hide">Cart</span>
                        </div>
                    </Link>
                </div>
            </header>

            {/* --- COMMON NAVIGATION --- */}
            <nav className="nav">
                <div className="nav-more-container" ref={dropdownRef}>
                    <div
                        className={`nav-more ${isMoreOpen ? 'active' : ''}`}
                        role="button"
                        tabIndex="0"
                        onClick={() => setIsMoreOpen(!isMoreOpen)}
                    >
                        <i className={`fa-solid ${isMoreOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                    </div>
                    {isMoreOpen && (
                        <div className="nav-more-dropdown">
                            <NavLink to="/" onClick={() => setIsMoreOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                            <NavLink to="/blog" onClick={() => setIsMoreOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
                            <NavLink to="/categories" onClick={() => setIsMoreOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Categories</NavLink>
                            <NavLink to="/products" onClick={() => setIsMoreOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink>
                        </div>
                    )}
                </div>

                <div className="nav-links">
                    {/* NavLink automatically adds an 'active' class, but we can also style inline */}
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "nav-item active-link" : "nav-item"}
                        style={({ isActive }) => isActive ? { color: 'var(--accent-green)', fontWeight: 700 } : {}}
                    >
                        Home
                    </NavLink>

                    <div className="nav-item has-dropdown">
                        <NavLink
                            className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
                            to="/categories"
                            style={({ isActive }) => isActive ? { color: 'var(--accent-green)', fontWeight: 700 } : {}}
                        >
                            Categories <i className="fa-solid fa-angle-down"></i>
                        </NavLink>
                        <div className="dropdown">
                            <div className="dropdown-grid">
                                <Link className="dropdown-card" to="/products?category=Snacks">
                                    <img src="/Masterkart/cashew.png" alt="Snack" />
                                    <div className="title">SNACK & SPICE</div>
                                </Link>
                                <Link className="dropdown-card" to="/products?category=Juice">
                                    <img src="/Masterkart/drink.png" alt="Drink" />
                                    <div className="title">JUICE & DRINKS</div>
                                </Link>
                                <Link className="dropdown-card" to="/products?category=Seafood">
                                    <img src="/Masterkart/fish.png" alt="Fish" />
                                    <div className="title">SEAFOOD</div>
                                </Link>
                                <Link className="dropdown-card" to="/products?category=Bakery">
                                    <img src="/Masterkart/fast-food.png" alt="Fast Food" />
                                    <div className="title">FAST FOOD</div>
                                </Link>
                                <Link className="dropdown-card" to="/products?category=Dairy">
                                    <img src="/Masterkart/eggs.png" alt="Eggs" />
                                    <div className="title">EGGS</div>
                                </Link>
                                <Link className="dropdown-card more-card" to="/categories">
                                    <div className="more-icon-circle">
                                        <i className="fa-solid fa-angle-right"></i>
                                    </div>
                                    <div className="title">MORE</div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="nav-item has-dropdown">
                        <NavLink
                            className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
                            to="/products"
                            style={({ isActive }) => isActive ? { color: 'var(--accent-green)', fontWeight: 700 } : {}}
                        >
                            Products <i className="fa-solid fa-angle-down"></i>
                        </NavLink>
                        <div className="dropdown">
                            <div className="dropdown-grid">
                                <Link className="dropdown-card" to="/products?category=Fruit">
                                    <img src="https://cdn-icons-png.flaticon.com/512/7910/7910224.png" alt="Fruits" />
                                    <div className="title">FRUITS</div>
                                </Link>
                                <Link className="dropdown-card" to="/products?category=Vegetable">
                                    <img src="https://cdn-icons-png.flaticon.com/512/7910/7910612.png" alt="Vegetables" />
                                    <div className="title">VEGETABLES</div>
                                </Link>
                                <Link className="dropdown-card more-card" to="/products">
                                    <div className="more-icon-circle">
                                        <i className="fa-solid fa-angle-right"></i>
                                    </div>
                                    <div className="title">MORE</div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <NavLink
                        to="/blog"
                        className="nav-item"
                        style={({ isActive }) => isActive ? { color: 'var(--accent-green)', fontWeight: 700 } : {}}
                    >
                        Blog
                    </NavLink>
                </div>

                <div className="location">
                    {locationData.city}, {locationData.country_code} <i className="fa-solid fa-location-dot"></i>
                    <div className="location-dropdown">
                        <iframe
                            className="mini-map"
                            src={`https://maps.google.com/maps?q=${locationData.latitude},${locationData.longitude}&hl=en&z=14&output=embed`}
                            loading="lazy"
                            allowFullScreen=""
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </nav>

            <main className="layout-content-wrapper">
                <Outlet />
            </main>

            {/* Footer */}
            <footer>
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="logo">
                            <span><i className="fa-brands fa-meta"></i>&nbsp;asterkart</span>
                        </div>
                        <p>We provide the best quality fresh organic food directly from the farm to your doorstep with love and care.</p>
                        <div className="social-links">
                            <a href="#" className="footer-social-btn"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="footer-social-btn"><i className="fa-brands fa-twitter"></i></a>
                            <a href="#" className="footer-social-btn"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#" className="footer-social-btn"><i className="fa-brands fa-pinterest"></i></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/">Shop</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Categories</h4>
                        <ul className="footer-links">
                            <li><Link to="/categories">Fruits & Vegetables</Link></li>
                            <li><Link to="/categories">Dairy Products</Link></li>
                            <li><Link to="/categories">Package Food</Link></li>
                            <li><Link to="/categories">Beverages</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Help Center</h4>
                        <ul className="footer-links">
                            <li><Link to="/help#payments">Payments</Link></li>
                            <li><Link to="/help#shipping">Shipping</Link></li>
                            <li><Link to="/help#returns">Product Returns</Link></li>
                            <li><Link to="/help#faq">FAQ</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; 2025 MasterKart. All rights reserved.</p>
                </div>
            </footer>

            <ToastNotification toast={toast} />
        </>
    );
};

export default Nav;