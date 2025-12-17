
import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Payment = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [selectedMode, setSelectedMode] = useState('card');

    // Helper to parse price
    const parsePrice = (price) => {
        if (typeof price === 'number') return price;
        if (typeof price === 'string') {
            return parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
        }
        return 0;
    };

    // Calculate Subtotal
    const subtotal = cartItems.reduce((acc, item) => {
        return acc + parsePrice(item.price) * item.quantity;
    }, 0);

    const shipping = subtotal > 100 ? 0 : 5;
    const total = subtotal + shipping;

    const handlePayment = () => {
        alert(`Payment processed via ${selectedMode}`);
        navigate('/');
    };

    return (
        <div className="payment-minimal">
            <style>{`
                .payment-minimal {
                    max-width: 1000px;
                    margin: 4rem auto;
                    padding: 0 2rem;
                    font-family: 'Abi', system-ui, -apple-system, sans-serif;
                    color: #1a1a1a;
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 4rem;
                }

                @media (max-width: 900px) {
                    .payment-minimal {
                        grid-template-columns: 1fr;
                        margin: 2rem auto;
                    }
                }

                h1, h2, h3, h4, p { margin: 0; }

                /* Left Column */
                .pay-header {
                    margin-bottom: 2rem;
                }

                .back-link {
                    display: inline-flex;
                    color: #1a1a1a;
                    font-size: 1.2rem;
                    text-decoration: none;
                    margin-right: 8px;
                }

                .brand-logo {
                    font-size: 1.5rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .pay-title {
                    font-size: 1.8rem;
                    font-weight: 600;
                    margin-bottom: 2rem;
                }

                .express-checkout {
                    width: 100%;
                    background: #000;
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    padding: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    margin-bottom: 1.5rem;
                    transition: opacity 0.2s;
                }
                
                .express-checkout:hover { opacity: 0.9; }

                /* Methods List */
                .methods-container {
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    overflow: hidden;
                    margin-bottom: 2rem;
                }

                .method-row {
                    display: flex;
                    align-items: center;
                    padding: 1.25rem;
                    border-bottom: 1px solid #e5e7eb;
                    cursor: pointer;
                    transition: background 0.1s;
                    position: relative;
                }

                .method-row:last-child {
                    border-bottom: none;
                }

                .method-row:hover {
                    background: #f9fafb;
                }

                .method-icon {
                    width: 40px;
                    height: 28px;
                    background: #f3f4f6;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    color: #4b5563;
                    margin-right: 1rem;
                }

                .method-details {
                    flex: 1;
                }

                .method-name {
                    font-weight: 600;
                    font-size: 1rem;
                    display: block;
                    margin-bottom: 2px;
                }

                .method-sub {
                    font-size: 0.85rem;
                    color: #6b7280;
                    display: flex;
                    gap: 6px;
                    align-items: center;
                }

                .radio-circle {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #d1d5db;
                    border-radius: 50%;
                    position: relative;
                }

                .selected .radio-circle {
                    border-color: #000;
                }

                .selected .radio-circle::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 10px;
                    height: 10px;
                    background: #000;
                    border-radius: 50%;
                }

                /* Personal Info */
                .personal-info {
                    margin-bottom: 2rem;
                }
                
                .info-label {
                    font-size: 0.95rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }
                
                .user-badge {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #4b5563;
                    font-size: 0.95rem;
                }

                .main-pay-btn {
                    width: 100%;
                    background: #d1d5db;
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    padding: 16px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .main-pay-btn.active {
                    background: #000;
                }
                
                .main-pay-btn:hover.active {
                    background: #1f1f1f;
                }

                /* Right Column */
                .summary-container {
                    padding-top: 1rem;
                }

                .summary-header {
                    font-size: 1.5rem;
                    font-weight: 500;
                    margin-bottom: 2rem;
                    color: #111;
                }

                .summary-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                    align-items: flex-start;
                }

                .item-info {
                    flex: 1;
                    padding-right: 1rem;
                }

                .item-name {
                    font-weight: 500;
                    font-size: 1rem;
                    margin-bottom: 4px;
                    display: block;
                }

                .item-meta {
                    font-size: 0.85rem;
                    color: #6b7280;
                }

                .item-price {
                    font-weight: 500;
                }

                .total-row {
                    border-top: 1px solid #e5e7eb;
                    margin-top: 2rem;
                    padding-top: 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .total-label {
                    font-weight: 500;
                    color: #111;
                }

                .total-amount {
                    font-size: 1.5rem;
                    font-weight: 700;
                }

                /* Icons */
                .card-icons i { margin-right: 4px; font-size: 1rem; }
            `}</style>

            {/* Left Column */}
            <div className="payment-left">
                <div className="pay-header">
                    <div className="brand-logo">
                        <Link to="/cart" className="back-link"><i className="fa-solid fa-chevron-left"></i></Link>
                        <i className="fa-brands fa-meta"></i> Masterkart
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Hi User,</div>
                    <div className="pay-title">Payment ₹{total.toFixed(2)}</div>
                </div>

                <div className="methods-container">
                    {/* Card */}
                    <div
                        className={`method-row ${selectedMode === 'card' ? 'selected' : ''}`}
                        onClick={() => setSelectedMode('card')}
                    >
                        <div className="method-icon"><i className="fa-regular fa-credit-card"></i></div>
                        <div className="method-details">
                            <span className="method-name">Card</span>
                            <span className="method-sub card-icons">
                                <i className="fa-brands fa-cc-visa" style={{ color: '#1A1F71' }}></i>
                                <i className="fa-brands fa-cc-mastercard" style={{ color: '#EB001B' }}></i>
                                <i className="fa-brands fa-cc-amex" style={{ color: '#2E77BB' }}></i>
                            </span>
                        </div>
                        <div className="radio-circle"></div>
                    </div>

                    {/* UPI */}
                    <div
                        className={`method-row ${selectedMode === 'upi' ? 'selected' : ''}`}
                        onClick={() => setSelectedMode('upi')}
                    >
                        <div className="method-icon"><i className="fa-brands fa-google-pay" style={{ color: '#444' }}></i></div>
                        <div className="method-details">
                            <span className="method-name">UPI</span>
                            <span className="method-sub">Google Pay, PhonePe, Paytm</span>
                        </div>
                        <div className="radio-circle"></div>
                    </div>

                    {/* Net Banking */}
                    <div
                        className={`method-row ${selectedMode === 'netbanking' ? 'selected' : ''}`}
                        onClick={() => setSelectedMode('netbanking')}
                    >
                        <div className="method-icon"><i className="fa-solid fa-building-columns"></i></div>
                        <div className="method-details">
                            <span className="method-name">Net Banking</span>
                            <span className="method-sub">All major banks supported</span>
                        </div>
                        <div className="radio-circle"></div>
                    </div>

                    {/* COD */}
                    <div
                        className={`method-row ${selectedMode === 'cod' ? 'selected' : ''}`}
                        onClick={() => setSelectedMode('cod')}
                    >
                        <div className="method-icon"><i className="fa-solid fa-money-bill"></i></div>
                        <div className="method-details">
                            <span className="method-name">Cash on Delivery</span>
                            <span className="method-sub">Pay when you receive</span>
                        </div>
                        <div className="radio-circle"></div>
                    </div>
                </div>

                <div className="personal-info">
                    <div className="info-label">Personal information</div>
                    <div className="user-badge">
                        <i className="fa-solid fa-user-circle" style={{ fontSize: '1.2rem' }}></i>
                        <span>User, user@example.com</span>
                    </div>
                </div>

                <button className="main-pay-btn active" onClick={handlePayment}>
                    Pay ₹{total.toFixed(2)}
                </button>
            </div>

            {/* Right Column */}
            <div className="payment-right">
                <div className="summary-container">
                    <h2 className="summary-header">Summary</h2>

                    {cartItems.map(item => (
                        <div className="summary-item" key={item.id}>
                            <div className="item-info">
                                <span className="item-name">{item.name}</span>
                                <span className="item-meta">
                                    Quantity {item.quantity} • {item.price} each
                                </span>
                            </div>
                            <div className="item-price">
                                ₹{(parsePrice(item.price) * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}

                    <div className="summary-item">
                        <div className="item-info">
                            <span className="item-name">Shipping</span>
                        </div>
                        <div className="item-price">
                            {shipping === 0 ? (
                                <span style={{ color: '#16a34a' }}>Free</span>
                            ) : (
                                `₹${shipping.toFixed(2)}`
                            )}
                        </div>
                    </div>

                    <div className="total-row">
                        <span className="total-label">Total order amount</span>
                        <span className="total-amount">₹{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
