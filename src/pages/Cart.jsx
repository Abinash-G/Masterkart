import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Cart.css';
import productsData from '../data/products.json';

const Cart = () => {
    // Context
    const { cartItems, updateQuantity, removeFromCart, addToCart } = useCart();

    // Theme State Local (ideally should be global too)
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const [randomSuggestions, setRandomSuggestions] = useState([]);

    // Theme Setup
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    // Random Suggestions on Mount
    useEffect(() => {
        // Shuffle array using Fisher-Yates algorithm or simple sort
        const shuffled = [...productsData].sort(() => 0.5 - Math.random());
        // Get sub-array of first 4 elements
        setRandomSuggestions(shuffled.slice(0, 4));
    }, []);

    // Derived values directly from context items
    const groupedItems = cartItems; // Context already handles grouping

    const addSuggestion = (product) => {
        addToCart(product);
    };

    // Calculations
    const subtotal = groupedItems.reduce((acc, item) => {
        // Handle both $ and ₹ or just remove non-digits
        // If price is undefined, default to 0
        const priceStr = item.price ? item.price.toString() : '0';
        const price = parseFloat(priceStr.replace(/[^\d.]/g, ''));
        return acc + (price * item.quantity);
    }, 0);

    const discount = subtotal * 0.10;
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = (subtotal - discount) * 0.05;
    const total = subtotal - discount + shipping + tax;

    return (
        <div className="cart-page-wrapper">

            <div className={`cart-container ${groupedItems.length === 0 ? 'is-empty' : ''}`}>
                <div className="cart-header-title">Shopping Cart</div>

                {/* Cart Items */}
                <div className="cart-items">
                    {groupedItems.length === 0 ? (
                        <div className="empty-cart">
                            <i className="fa-solid fa-basket-shopping"></i>
                            <h2>Your cart is empty</h2>
                            <p>Looks like you haven't added anything yet.</p>
                            <Link to="/" className="checkout-btn" style={{ width: 'auto', display: 'inline-flex' }}>Start Shopping</Link>
                        </div>
                    ) : (
                        groupedItems.map((item, idx) => (
                            <div className="cart-item" key={idx}>
                                <Link to={`/product/${item.id}`} className="item-img">
                                    <img src={item.img} alt={item.name || item.title} />
                                </Link>
                                <div className="item-details">
                                    <Link to={`/product/${item.id}`}><h3>{item.name || item.title}</h3></Link>
                                    <div className="item-meta">Unit Price: {item.price}</div>
                                </div>
                                <div className="item-actions">
                                    <div className="item-price">
                                        {(parseFloat((item.price ? item.price.toString() : '0').replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}
                                    </div>
                                    <div className="qty-control">
                                        <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}><i className="fa-solid fa-minus"></i></button>
                                        <div className="qty-display">{item.quantity}</div>
                                        <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}><i className="fa-solid fa-plus"></i></button>
                                    </div>
                                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                        <i className="fa-regular fa-trash-can"></i> Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Sidebar Summary */}
                {groupedItems.length > 0 && (
                    <div className="sidebar-col">
                        <div className="summary-card">
                            <div className="summary-header">Order Summary</div>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Discount (10%)</span>
                                <span style={{ color: 'var(--accent-green)' }}>-{discount.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping Estimate</span>
                                <span>{shipping === 0 ? 'Free' : `${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax (5%)</span>
                                <span style={{ color: 'var(--accent-red)' }}>+{tax.toFixed(2)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                            <button className="checkout-btn" onClick={() => alert('Proceeding to checkout...')}>
                                Checkout <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Suggestions */}
            <div className="suggestions-container">
                <div className="section-header">
                    <div className="section-title">You might also like</div>
                </div>
                <div className="products-grid">
                    {randomSuggestions.map((prod, idx) => (
                        <div className="product-card" key={idx}>
                            <Link to={`/product/${prod.id}`} className="product-img-wrapper">
                                <img src={prod.img} alt={prod.name} />
                            </Link>
                            <div className="product-info">
                                <Link to={`/product/${prod.id}`}><h3>{prod.name}</h3></Link>
                                <div className="product-footer">
                                    <span className="product-price">{prod.price}</span>
                                    <button className="add-btn" onClick={() => addSuggestion(prod)}>
                                        <i className="fa-solid fa-cart-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer>
                &copy; 2025 MasterKart. All rights reserved. Secure Checkout.
            </footer>
        </div>
    );
};

export default Cart;