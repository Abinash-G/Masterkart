import React, { useState, useEffect } from 'react';
import './Blog.css';
import blogData from './blog.json';

import { Link } from 'react-router-dom';

const Blog = () => {
    // Theme Toggle State Logic
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Blog Data (Loaded from JSON)
    const blogPosts = blogData;

    // Filter & Pagination Logic
    const [currentPage, setCurrentPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState("All");
    const postsPerPage = 6;

    // 1. Filter posts first
    const filteredPosts = activeCategory === "All"
        ? blogPosts
        : blogPosts.filter(post => post.category === activeCategory || (activeCategory === "Health Tips" && post.category === "Health"));

    // 2. Calculate pagination based on filtered results
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Reset to page 1 when category changes
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    return (
        <div className="blog-page-wrapper">
            <main>
                {/* Featured Hero */}
                <section className="blog-hero">
                    <div className="hero-content">
                        <span className="hero-tag">Featured Story</span>
                        <h1 className="hero-title">The Secret to Keeping Your Organic Greens Fresh for 2 Weeks</h1>
                        <div className="hero-meta">
                            <span><i className="fa-regular fa-calendar"></i> Oct 24, 2025</span>
                            <span><i className="fa-regular fa-clock"></i> 5 min read</span>
                            <span><i className="fa-regular fa-user"></i> By Sarah Green</span>
                        </div>
                    </div>
                </section>

                {/* Filter Tabs */}
                <div className="blog-filters">
                    {["All", "Recipes", "Health Tips", "Farm Stories", "Sustainability"].map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Articles Grid */}
                <div className="blog-container">
                    <div className="blog-grid">
                        {currentPosts.length > 0 ? (
                            currentPosts.map(post => (
                                <article className="blog-card" key={post.id} style={{ cursor: 'pointer', position: 'relative' }}>
                                    <Link to={`/blog/${post.id}`} style={{ position: 'absolute', inset: 0, zIndex: 1 }} aria-label={post.title}></Link>
                                    <div className="blog-img-wrapper">
                                        <span className="blog-category">{post.category}</span>
                                        <img src={post.img} alt={post.title} />
                                    </div>
                                    <div className="blog-content">
                                        <div className="blog-date"><i className="fa-regular fa-calendar"></i> {post.date}</div>
                                        <h2 className="blog-title">{post.title}</h2>
                                        <p className="blog-excerpt">{post.excerpt}</p>
                                        <span className="read-more">Read Article</span>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <p style={{ gridColumn: "1/-1", textAlign: "center", padding: "2rem" }}>No articles found for this category.</p>
                        )}
                    </div>

                    {/* Pagination - Only show if necessary */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="page-btn"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                            >
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                    onClick={() => paginate(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                className="page-btn"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                            >
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div >
    );
};

export default Blog;