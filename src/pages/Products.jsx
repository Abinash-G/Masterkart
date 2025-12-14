import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Products.css';
import products from '../data/products.json';

const Products = () => {
    const { addToCart, addToWishlist, isInWishlist, toggleWishlist } = useCart();

    // Parse query parameters
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const categoryParam = query.get('category');

    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [showAllCategories, setShowAllCategories] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [selectedSort, setSelectedSort] = React.useState("Featured");
    const [selectedCategory, setSelectedCategory] = React.useState(categoryParam || "All");
    const dropdownRef = React.useRef(null);

    const categories = ["All", "Vegetable", "Fruit", "Juice", "Dairy", "Bakery", "Meat", "Seafood", "Ice Cream", "Fast Food", "Baby Care", "Pet Food", "Snacks"];

    const sortedCategories = React.useMemo(() => {
        const targetCategory = categoryParam;

        // If no category in URL, or it's "All", or invalid, simply return default order
        if (!targetCategory || targetCategory === "All" || !categories.includes(targetCategory)) {
            return categories;
        }

        // Otherwise, move the URL-specified category to the second slot
        const otherCategories = categories.filter(cat => cat !== "All" && cat !== targetCategory);
        return ["All", targetCategory, ...otherCategories];
    }, [categoryParam]);

    // Update state when URL param changes
    React.useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        } else {
            setSelectedCategory("All");
        }
    }, [categoryParam]);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const sortOptions = [
        "Featured",
        "Price: Low to High",
        "Price: High to Low",
        "Newest First"
    ];

    const filteredProducts = products
        .filter(product => {
            return selectedCategory === "All" || product.category === selectedCategory;
        })
        .sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
            const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));

            if (selectedSort === "Price: Low to High") {
                return priceA - priceB;
            } else if (selectedSort === "Price: High to Low") {
                return priceB - priceA;
            } else if (selectedSort === "Newest First") {
                return b.id - a.id;
            }
            return 0; // Featured
        });

    return (
        <div className="products-page">

            {/* Hero Section with Cover Background */}
            <div className="products-hero">
                <div className="products-overlay"></div>
                <div className="products-content">
                    <h1>Farm Fresh Selection</h1>
                    <p>Handpicked organic products just for you. Fresh from the fields to your doorstep.</p>
                </div>
            </div>

            {/* Category Filter (Desktop) */}
            <div className="category-filter desktop-only">
                {(showAllCategories ? sortedCategories : sortedCategories.slice(0, 7)).map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat === "All" ? "All" : cat.endsWith('s') ? cat : `${cat}s`}
                    </button>
                ))}
                {sortedCategories.length > 7 && (
                    <button
                        className="filter-btn toggle-more-btn"
                        onClick={() => setShowAllCategories(!showAllCategories)}
                        aria-label={showAllCategories ? "Show Less" : "Show More"}
                    >
                        <i className={`fa-solid fa-chevron-${showAllCategories ? 'left' : 'right'}`}></i>
                    </button>
                )}
            </div>

            {/* Mobile Filter Toggle & Menu */}
            <div className="mobile-filter-container">
                <button className="mobile-filter-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <i className="fa-solid fa-filter"></i> Filter
                </button>

                {isMobileMenuOpen && (
                    <div className="mobile-filter-menu">
                        <div className="mobile-filter-header">
                            <h3>Filters</h3>
                            <button onClick={() => setIsMobileMenuOpen(false)}><i className="fa-solid fa-xmark"></i></button>
                        </div>
                        <div className="mobile-filter-options">
                            {sortedCategories.map(cat => (
                                <button
                                    key={cat}
                                    className={`mobile-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {cat === "All" ? "All" : cat.endsWith('s') ? cat : `${cat}s`}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Filter / Sort Bar */}
            <div className="products-toolbar">
                <span>Showing {filteredProducts.length} results</span>

                <div className="custom-dropdown" ref={dropdownRef}>
                    <div
                        className={`dropdown-selected ${isDropdownOpen ? 'active' : ''}`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {selectedSort.includes('Price:') ? (
                            <span>
                                <span className="desktop-inline">Price: </span>
                                {selectedSort.replace('Price: ', '')}
                            </span>
                        ) : selectedSort}
                        <i className={`fa-solid fa-chevron-down ${isDropdownOpen ? 'rotate' : ''}`}></i>
                    </div>
                    {isDropdownOpen && (
                        <div className="dropdown-options">
                            {sortOptions.map(option => (
                                <div
                                    key={option}
                                    className={`dropdown-item ${selectedSort === option ? 'selected' : ''}`}
                                    onClick={() => {
                                        setSelectedSort(option);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {option.includes('Price:') ? (
                                        <span>
                                            <span className="desktop-inline">Price: </span>
                                            {option.replace('Price: ', '')}
                                        </span>
                                    ) : option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid-container">
                {filteredProducts.map((product) => (
                    <div className="product-card" key={product.id}>
                        {product.badge && <span className="product-badge">{product.badge}</span>}
                        <Link to={`/product/${product.id}`} className="product-card-link">
                            <div className="product-img-wrapper">
                                <img src={product.img} alt={product.name} />
                                <button
                                    className="wishlist-icon-btn"
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent navigation when clicking wishlist
                                        toggleWishlist(product);
                                    }}
                                    style={{
                                        color: isInWishlist(product.id) ? 'var(--accent-red)' : 'var(--text-secondary)'
                                    }}
                                >
                                    <i className={`${isInWishlist(product.id) ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                                </button>
                            </div>
                        </Link>
                        <div className="product-info">
                            <div className="product-rating">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className={`fa-star ${i < Math.floor(product.rating) ? "fa-solid" : "fa-regular"}`}></i>
                                ))}
                            </div>
                            <Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link>
                            <div className="product-footer">
                                <span className="product-price">{product.price}</span>
                                <button className="add-btn" onClick={() => addToCart(product)}>
                                    <i className="fa-solid fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;