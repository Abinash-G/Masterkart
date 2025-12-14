import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HelpCenter = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    return (
        <div className="help-page">
            <style>
                {`
                .help-page {
                    padding-bottom: 4rem;
                }

                .help-hero {
                    background: url('/Masterkart/premium-bg.jpg') no-repeat center center;
                    background-size: 110%;
                    padding: 4rem 2%;
                    text-align: center;
                    border-bottom: 1px solid var(--border-color);
                    margin-bottom: 3rem;
                    object-fit: cover;
                    overflow: hidden;
                    transition: background-size 0.8s ease;
                }

                .help-hero:hover {
                    background-size: 100%;
                }

                .help-hero h1 {
                    font-size: 3.5rem;
                    margin-bottom: 0.8rem;
                    font-weight: 800;
                    background: linear-gradient(180deg, #E6C168 0%, #fffb7dff 45%, #fffb7dff 55%, #C77526 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));
                }

                .help-hero p {
                    color: #fff8e1;
                    font-size: 1.1rem;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .help-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .help-section {
                    background: var(--bg-primary);
                    border: 1px solid var(--border-color);
                    border-radius: 12px;
                    padding: 2.5rem;
                    display: flex;
                    gap: 2rem;
                    align-items: flex-start;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .help-section:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
                }

                .help-icon {
                    width: 60px;
                    height: 60px;
                    background: var(--bg-secondary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    color: var(--accent-green);
                    font-size: 1.5rem;
                }

                .help-content {
                    flex: 1;
                }

                .help-content h2 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    color: var(--text-primary);
                    font-weight: 700;
                }

                .help-content p {
                    color: var(--text-secondary);
                    margin-bottom: 1rem;
                    line-height: 1.6;
                }

                .help-list {
                    list-style-type: none;
                    padding-left: 0;
                    margin-top: 1rem;
                }

                .help-list li {
                    margin-bottom: 0.8rem;
                    color: var(--text-secondary);
                    position: relative;
                    padding-left: 1.5rem;
                }

                .help-list li::before {
                    content: "\\f00c";
                    font-family: "Font Awesome 6 Free";
                    font-weight: 900;
                    position: absolute;
                    left: 0;
                    color: var(--accent-green);
                    font-size: 0.8rem;
                    top: 4px;
                }

                .help-section.full-width {
                    display: block;
                }

                .faq-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2.5rem;
                    margin-top: 2rem;
                }

                .faq-item {
                    background: var(--bg-secondary);
                    padding: 1.5rem;
                    border-radius: 8px;
                }

                .faq-item h3 {
                    font-size: 1.1rem;
                    color: var(--text-primary);
                    margin-bottom: 0.8rem;
                    font-weight: 700;
                }

                .faq-item p {
                    font-size: 0.95rem;
                    color: var(--text-secondary);
                    line-height: 1.5;
                }

                @media (max-width: 768px) {
                    .help-section {
                        flex-direction: column;
                        gap: 1.5rem;
                        padding: 1.5rem;
                    }

                    .help-icon {
                        margin-bottom: 0.5rem;
                    }

                    .faq-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                }
                `}
            </style>
            <div className="help-hero">
                <h1>Help Center</h1>
                <p>We are here to assist you. Find answers to your questions below.</p>
            </div>

            <div className="help-container">
                <section id="payments" className="help-section">
                    <div className="help-icon"><i className="fa-solid fa-credit-card"></i></div>
                    <div className="help-content">
                        <h2>Payments</h2>
                        <p>We accept all major credit cards, debit cards, and UPI payments. Your payment information is processed securely, providing a safe and reliable shopping experience.</p>
                        <ul className="help-list">
                            <li>Credit/Debit Cards (Visa, Mastercard, RuPay)</li>
                            <li>Net Banking with all major Indian banks</li>
                            <li>UPI (Google Pay, PhonePe, Paytm, BHIM)</li>
                            <li>Cash on Delivery (available in select PIN codes)</li>
                        </ul>
                    </div>
                </section>

                <section id="shipping" className="help-section">
                    <div className="help-icon"><i className="fa-solid fa-truck-fast"></i></div>
                    <div className="help-content">
                        <h2>Shipping & Delivery</h2>
                        <p>We strive to deliver your orders as quickly as possible. Our fresh produce is harvested and delivered within 24 hours to ensure maximum freshness.</p>
                        <ul className="help-list">
                            <li><strong>Standard Delivery:</strong> 2-3 business days for packaged goods.</li>
                            <li><strong>Express Delivery:</strong> Same day delivery for orders placed before 2 PM.</li>
                            <li><strong>Free Shipping:</strong> On all orders above ₹499.</li>
                        </ul>
                    </div>
                </section>

                <section id="returns" className="help-section">
                    <div className="help-icon"><i className="fa-solid fa-rotate-left"></i></div>
                    <div className="help-content">
                        <h2>Product Returns</h2>
                        <p>Your satisfaction is our priority. If you are not happy with the quality of fresh produce, you can return it at the time of delivery, no questions asked.</p>
                        <ul className="help-list">
                            <li><strong>Perishables:</strong> Return at doorstep if quality is unsatisfactory.</li>
                            <li><strong>Non-perishables:</strong> 48-hour return window for damaged or expired items.</li>
                            <li>Instant refund to source for online payments upon successful return.</li>
                        </ul>
                    </div>
                </section>

                <section id="faq" className="help-section full-width">
                    <div className="help-content">
                        <h2>Frequently Asked Questions (FAQ)</h2>
                        <div className="faq-grid">
                            <div className="faq-item">
                                <h3>How do I track my order?</h3>
                                <p>You can track your live order status in the 'My Orders' section of your account or use the tracking link sent to your registered email/SMS.</p>
                            </div>
                            <div className="faq-item">
                                <h3>Do you deliver to my city?</h3>
                                <p>Currently, we operate in major metro cities including Mumbai, Delhi, Bangalore, and Chennai. Enter your pincode on the product page to check availability.</p>
                            </div>
                            <div className="faq-item">
                                <h3>Can I change my delivery address?</h3>
                                <p>Yes, you can change the address before the order is "Out for Delivery" by contacting our customer support or editing details in "My Orders".</p>
                            </div>
                            <div className="faq-item">
                                <h3>Is there a minimum order value?</h3>
                                <p>No, there is no minimum order value. However, a small delivery fee of ₹40 applies for orders below ₹200.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HelpCenter;
