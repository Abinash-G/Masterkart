import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import './Deal.css';

const Deal = () => {
    const { addToCart, addToWishlist, isInWishlist, toggleWishlist } = useCart();
    const [mainImg, setMainImg] = useState('https://cdn.dribbble.com/userupload/25625222/file/original-31b1189ef53f5cefbf0234519d014de8.gif');
    const [activeTab, setActiveTab] = useState('desc');

    // Countdown Timer Logic
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Set deadline to 2 days from now
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 2);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = deadline - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="deal-page-container">
            <div className="deal-product-wrapper">
                {/* Left: Image Gallery */}
                <div className="deal-gallery">
                    <div className="main-image-container">
                        <img src={mainImg} alt="Organic Avocado" className="main-image" />
                    </div>
                    <div className="thumbnail-row">
                        <img
                            src="https://cdn.dribbble.com/userupload/25625222/file/original-31b1189ef53f5cefbf0234519d014de8.gif"
                            alt="View 1"
                            className={`thumb ${mainImg.includes('dribbble') ? 'active' : ''}`}
                            onClick={() => setMainImg('https://cdn.dribbble.com/userupload/25625222/file/original-31b1189ef53f5cefbf0234519d014de8.gif')}
                        />
                        <img
                            src="https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2022/04/pexels-antonio-filigno-8538296-1024x657.jpg"
                            alt="View 2"
                            className={`thumb ${mainImg.includes('harvard') ? 'active' : ''}`}
                            onClick={() => setMainImg('https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2022/04/pexels-antonio-filigno-8538296-1024x657.jpg')}
                        />
                        <img
                            src="https://images.healthshots.com/healthshots/en/uploads/2024/04/04153309/avocado-1.jpg"
                            alt="View 3"
                            className={`thumb ${mainImg.includes('healthshots') ? 'active' : ''}`}
                            onClick={() => setMainImg('https://images.healthshots.com/healthshots/en/uploads/2024/04/04153309/avocado-1.jpg')}
                        />
                    </div>
                </div>

                {/* Right: Product Details */}
                <div className="deal-details">
                    <div className="deal-label">DEAL OF THE MONTH</div>
                    <h1 className="product-title">Premium Organic Hass Avocado</h1>

                    <div className="price-area">
                        <span className="current-price">₹299</span>
                        <span className="original-price">₹599</span>
                        <span className="discount-badge">-50% OFF</span>
                    </div>

                    <div className="rating-area">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star-half-stroke"></i>
                        <span>(450 Reviews)</span>
                    </div>

                    <p className="product-desc">
                        Experience the creamy, buttery texture of our hand-picked organic Hass Avocados.
                        Rich in healthy fats, potassium, and fiber. Perfect for your morning toast, smoothies,
                        or a fresh homemade guacamole. Sourced directly from certified organic farms.
                    </p>

                    {/* Countdown Timer Reuse */}
                    {/* Countdown Timer Reuse */}
                    <div className="deal-timer-box">
                        <p>Hurry! Offer ends in:</p>
                        <div className="countdown-display">
                            <div className="timer-unit">
                                <span className="value">{String(timeLeft.days).padStart(2, '0')}</span>
                                <span className="label">Days</span>
                            </div>
                            <div className="separator">:</div>
                            <div className="timer-unit">
                                <span className="value">{String(timeLeft.hours).padStart(2, '0')}</span>
                                <span className="label">Hrs</span>
                            </div>
                            <div className="separator">:</div>
                            <div className="timer-unit">
                                <span className="value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                <span className="label">Mins</span>
                            </div>
                            <div className="separator">:</div>
                            <div className="timer-unit">
                                <span className="value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                <span className="label">Secs</span>
                            </div>
                        </div>
                    </div>

                    <div className="purchase-actions">
                        <div className="qty-selector">
                            <button>-</button>
                            <input type="text" value="1" readOnly />
                            <button>+</button>
                        </div>
                        <button
                            className="add-to-cart-large"
                            onClick={() => {
                                addToCart({
                                    id: 'deal-avocado',
                                    title: "Premium Organic Hass Avocado",
                                    price: "₹999",
                                    img: mainImg
                                });
                            }}
                        >
                            <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                        </button>
                        <button
                            className="wishlist-btn-large"
                            onClick={() => toggleWishlist({
                                id: 'deal-avocado',
                                title: "Premium Organic Hass Avocado",
                                price: "₹999",
                                stock: "In Stock",
                                img: mainImg
                            })}
                            style={{
                                width: '2.5rem',
                                height: '2.5rem',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--bg-primary)',
                                color: isInWishlist('deal-avocado') ? 'var(--accent-red)' : 'var(--text-secondary)',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: '1rem'
                            }}
                        >
                            <i className={`${isInWishlist('deal-avocado') ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                        </button>
                    </div>

                    <div className="extra-info">
                        <div className="info-item">
                            <i className="fa-solid fa-truck"></i> Free Shipping
                        </div>
                        <div className="info-item">
                            <i className="fa-solid fa-shield-halved"></i> 1 Year Warranty
                        </div>
                        <div className="info-item">
                            <i className="fa-solid fa-leaf"></i> 100% Organic
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom: Tabs / Description */}
            <div className="deal-tabs">
                <div className="tabs-header">
                    <span
                        className={`tab ${activeTab === 'desc' ? 'active' : ''}`}
                        onClick={() => setActiveTab('desc')}
                    >Description</span>
                    <span
                        className={`tab ${activeTab === 'nutri' ? 'active' : ''}`}
                        onClick={() => setActiveTab('nutri')}
                    >Nutrition Facts</span>
                    <span
                        className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >Reviews</span>
                </div>

                <div className="tab-content">
                    {activeTab === 'desc' && (
                        <div className="fade-in">
                            <h3>Why Choose Our Avocados?</h3>
                            <p>Our avocados are grown in nutrient-rich volcanic soil, ensuring the highest mineral content and flavor profile. We wait until they reach optimal oil content before harvesting.</p>
                            <ul>
                                <li>High in monounsaturated fats (the good fats!)</li>
                                <li>Excellent source of Vitamin K, Folate, Vitamin C, Potassium, and Vitamin B5</li>
                                <li>Non-GMO and Pesticide-Free</li>
                            </ul>
                        </div>
                    )}

                    {activeTab === 'nutri' && (
                        <div className="fade-in">
                            <h3>Nutritional Information (per 100g)</h3>
                            <table className="nutrition-table" style={{ width: '100%', maxWidth: '600px', borderCollapse: 'collapse', marginTop: '1rem' }}>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Calories</td>
                                        <td style={{ padding: '10px 0', textAlign: 'right' }}>160</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Total Fat</td>
                                        <td style={{ padding: '10px 0', textAlign: 'right' }}>15g</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px 0', paddingLeft: '20px' }}>Saturated Fat</td>
                                        <td style={{ padding: '10px 0', textAlign: 'right' }}>2.1g</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Cholesterol</td>
                                        <td style={{ padding: '10px 0', textAlign: 'right' }}>0mg</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Sodium</td>
                                        <td style={{ padding: '10px 0', textAlign: 'right' }}>7mg</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Total Carbohydrate</td>
                                        <td style={{ padding: '10px 0', textAlign: 'right' }}>9g</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px 0', paddingLeft: '20px' }}>Dietary Fiber</td>
                                        <td style={{ padding: '10px 0', textAlign: 'right' }}>7g</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Protein</td>
                                        <td style={{ padding: '10px 0', textAlign: 'right' }}>2g</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="fade-in">
                            <h3>Customer Reviews</h3>
                            <div className="reviews-list" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {/* Review 1 */}
                                <div className="review-item">
                                    <div className="reviewer-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 'bold' }}>Sarah M.</span>
                                        <span style={{ color: '#ffc107', fontSize: '0.9rem' }}>
                                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                                        </span>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>These are hands down the best avocados I've ever bought online. They arrived perfectly ripe and the taste is incredibly rich!</p>
                                </div>

                                {/* Review 2 */}
                                <div className="review-item">
                                    <div className="reviewer-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 'bold' }}>James P.</span>
                                        <span style={{ color: '#ffc107', fontSize: '0.9rem' }}>
                                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i>
                                        </span>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Great value for the deal price. One was slightly bruised but the rest were perfect. Will buy again.</p>
                                </div>

                                {/* Review 3 */}
                                <div className="review-item">
                                    <div className="reviewer-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 'bold' }}>Emily R.</span>
                                        <span style={{ color: '#ffc107', fontSize: '0.9rem' }}>
                                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                                        </span>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Love the free shipping! Made guacamole for my party and everyone asked where I got them. Highly recommend.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Deal;
