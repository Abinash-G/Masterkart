import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import productsData from './products.json';
import './ProductDetails.css'; // We will create this next

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, addToWishlist, isInWishlist, toggleWishlist } = useCart();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        // Find product by ID
        const foundProduct = productsData.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            // Redirect to products if not found
            navigate('/products');
        }
    }, [id, navigate]);

    if (!product) return <div className="loading-spinner"></div>;

    // Generate a description if one doesn't exist in JSON
    const description = product.description || `Experience the premium quality of our ${product.name}. Sourced from the best organic farms, this ${product.category.toLowerCase()} item is perfect for your daily needs. guaranteed freshness and taste in every bite.`;

    // Mock additional images for the gallery
    const images = [product.img, product.img, product.img];

    return (
        <div className="product-details-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left"></i> Back
            </button>

            <div className="details-container">
                {/* Image Gallery */}
                <div className="product-gallery">
                    <div className="main-image">
                        <img src={images[selectedImage]} alt={product.name} />
                        {product.badge && <span className="badge">{product.badge}</span>}
                    </div>
                    <div className="thumbnail-list">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                onClick={() => setSelectedImage(index)}
                            >
                                <img src={img} alt={`${product.name} view ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="product-info-section">
                    <span className="product-cat">{product.category}</span>
                    <h1 className="product-title">{product.name}</h1>

                    <div className="rating-row">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fa-star ${i < Math.floor(product.rating) ? "fa-solid" : "fa-regular"}`}></i>
                            ))}
                        </div>
                        <span className="rating-text">({product.rating} Rating)</span>
                    </div>

                    <div className="price-row">
                        <span className="current-price">{product.price}</span>
                        {/* Mock original price for effect */}
                        <span className="original-price">
                            Top Deal
                        </span>
                    </div>

                    <p className="description">{description}</p>

                    <div className="actions">
                        <div className="quantity-selector">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)}>+</button>
                        </div>

                        <button
                            className="add-to-cart-btn-large"
                            onClick={() => {
                                // Add quantity loop
                                for (let i = 0; i < quantity; i++) addToCart(product);
                            }}
                            title={`Add ${quantity} to Cart`}
                        >
                            <i className="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>

                        <button
                            className={`wishlist-btn-large ${isInWishlist(product.id) ? 'active' : ''}`}
                            onClick={() => toggleWishlist(product)}
                        >
                            <i className={`${isInWishlist(product.id) ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                        </button>
                    </div>

                    <div className="features-list">
                        <div className="feat-item">
                            <i className="fa-solid fa-truck-fast"></i>
                            <span>Free Delivery</span>
                        </div>
                        <div className="feat-item">
                            <i className="fa-solid fa-leaf"></i>
                            <span>Organic & Fresh</span>
                        </div>
                        <div className="feat-item">
                            <i className="fa-solid fa-shield-halved"></i>
                            <span>Trusted and Safe</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
