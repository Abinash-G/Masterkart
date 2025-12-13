import React, { useState, useEffect } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import './style.css';

const Nav = () => {
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

    return (
        <>
            {/* --- COMMON HEADER --- */}
            <header>
                <div className="logo">
                    <span><i className="fa-brands fa-meta"></i>&nbsp;<span className="m-hide">asterkart</span></span>
                </div>

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
                            <i className="fa-regular fa-heart"></i>
                            <span className="m-hide">Wishlist</span>
                        </div>
                    </Link>
                    <Link to="/cart">
                        <div className="action-item">
                            <i className="fa-solid fa-bag-shopping"></i>
                            <span className="m-hide">Cart</span>
                        </div>
                    </Link>
                </div>
            </header>

            {/* --- COMMON NAVIGATION --- */}
            <nav className="nav">
                <div className="nav-more-container">
                    <div className="nav-more" role="button" tabIndex="0"><i className="fa-solid fa-bars"></i></div>
                    <div className="nav-more-dropdown">
                        <Link to="/">Home</Link>
                        <Link to="/blog">Blog</Link>
                        <Link to="/categories">Categories</Link>
                        <Link to="/products">Products</Link>
                    </div>
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
                                    <img src="cashew.png" alt="Snack" />
                                    <div className="title">SNACK & SPICE</div>
                                </Link>
                                <Link className="dropdown-card" to="/products?category=Juice">
                                    <img src="drink.png" alt="Drink" />
                                    <div className="title">JUICE & DRINKS</div>
                                </Link>
                                <Link className="dropdown-card" to="/products?category=Seafood">
                                    <img src="fish.png" alt="Fish" />
                                    <div className="title">SEAFOOD</div>
                                </Link>
                                <Link className="dropdown-card" to="/products?category=Bakery">
                                    <img src="fast-food.png" alt="Fast Food" />
                                    <div className="title">FAST FOOD</div>
                                </Link>
                                <Link className="dropdown-card" to="/products?category=Dairy">
                                    <img src="eggs.png" alt="Eggs" />
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
                    <i className="fa-solid fa-location-dot"></i> SURAT, IN <i className="fa-solid fa-chevron-down"></i>
                    <div className="location-dropdown">
                        <iframe
                            className="mini-map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.4170942006!2d72.73989504859032!3d21.15934029281313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1703673333068!5m2!1sen!2sin"
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
                            <li><Link to="/">About Us</Link></li>
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
                            <li><Link to="/">Payments</Link></li>
                            <li><Link to="/">Shipping</Link></li>
                            <li><Link to="/">Product Returns</Link></li>
                            <li><Link to="/">FAQ</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; 2025 MasterKart. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Nav;