import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './Wishlist.css';

const Wishlist = () => {
    // Context
    const { wishlistItems, removeFromWishlist, addToCart } = useCart();

    // Theme State
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

    // Theme Logic
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    const moveToCart = (item) => {
        if (item.stock === 'Out of Stock') return;
        addToCart({
            id: item.id,
            title: item.title,
            price: item.price,
            img: item.img
        });
        removeFromWishlist(item.id);
    };

    return (
        <div>
            <div className="wishlist-container">
                <div className="page-header">
                    <div className="page-title">
                        My Wishlist <i className="fa-regular fa-heart" style={{ fontSize: '1.5rem', color: 'var(--accent-red)', marginLeft: '8px' }}></i>
                    </div>
                    <div className="item-count">{wishlistItems.length} Items</div>
                </div>

                <div className="wishlist-grid">
                    {wishlistItems.length === 0 ? (
                        <div className="empty-state">
                            <p>Your wishlist is empty.</p>
                        </div>
                    ) : (
                        wishlistItems.map(item => (
                            <div className="wishlist-card" key={item.id}>
                                <div className="remove-icon" title="Remove" onClick={() => removeFromWishlist(item.id)}>
                                    <i className="fa-solid fa-xmark"></i>
                                </div>
                                <div className="img-wrapper">
                                    <img src={item.img} alt={item.title} />
                                </div>
                                <div className="card-details">
                                    <h3>{item.title}</h3>
                                    <div className={`stock-status ${item.stock === 'Out of Stock' ? 'out' : ''}`}>
                                        {item.stock || 'In Stock'}
                                    </div>
                                    <div className="card-footer">
                                        <span className="price">{item.price}</span>
                                        <button
                                            className={`move-btn ${item.stock === 'Out of Stock' ? 'disabled' : ''}`}
                                            onClick={() => moveToCart(item)}
                                        >
                                            {item.stock === 'Out of Stock' ? 'Unavailable' : 'Move to Cart'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <footer>
                &copy; 2025 MasterKart. All rights reserved.
            </footer>
        </div>
    );
};

export default Wishlist;