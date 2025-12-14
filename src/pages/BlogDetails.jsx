import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogData from '../data/blog.json';
import '../style.css';

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Find article by ID
        const foundArticle = blogData.find(post => post.id === parseInt(id));
        if (foundArticle) {
            setArticle(foundArticle);
        } else {
            navigate('/blog');
        }
        window.scrollTo(0, 0); // Scroll to top when loaded
    }, [id, navigate]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!article) return <div className="loading-spinner"></div>;

    return (
        <div className="blog-details-wrapper">
            <style>{`
                /* General Resets */
                .blog-details-wrapper {
                    font-family: 'Abi', sans-serif;
                    background-color: var(--bg-primary);
                    color: var(--text-primary);
                    min-height: 100vh;
                    padding-top: 2rem;
                }

                /* Container */
                .container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 0 20px 60px;
                }

                /* Blog Card (Details View) */
                .blog-card {
                    background: var(--bg-primary);
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid var(--border-color);
                    box-shadow: 0 4px 15px var(--shadow-color);
                }

                .card-image {
                    height: 400px;
                    position: relative;
                    overflow: hidden;
                    background-color: var(--bg-secondary);
                }

                .card-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .card-title {
                    font-size: 32px;
                    margin-bottom: 25px;
                    color: var(--text-primary);
                    line-height: 1.3;
                    font-weight: 700;
                }

                .category-tag {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    background-color: var(--accent-green);
                    color: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    padding: 6px 14px;
                    border-radius: 20px;
                    text-transform: uppercase;
                    z-index: 2;
                }

                .card-content {
                    padding: 40px;
                }

                .meta-info {
                    display: flex;
                    gap: 20px;
                    font-size: 13px;
                    color: var(--text-secondary);
                    margin-bottom: 25px;
                    border-bottom: 1px solid var(--border-color);
                    padding-bottom: 20px;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                /* Article Body Content */
                .article-body {
                    font-size: 16px;
                    color: var(--text-secondary);
                    line-height: 1.8;
                }

                .article-body p {
                    margin-bottom: 1.5rem;
                }

                .article-body h3 {
                    font-size: 22px;
                    color: var(--text-primary);
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                    font-weight: 600;
                }

                .article-body ul {
                    margin-bottom: 2rem;
                    padding-left: 20px;
                }

                .article-body li {
                    margin-bottom: 0.5rem;
                }

                /* Back Button */
                .back-btn-container {
                    position: fixed;
                    top: 8rem; /* Initial aligned position */
                    left: calc(50% - 480px); /* Align with content container (1000px/2 - 20px padding) */
                    z-index: 900;
                    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
                    width: fit-content;
                    padding: 0;
                    margin: 0;
                }

                .back-btn-container.scrolled-left {
                    top: 140px;
                    left: 40px;
                }

                /* Text visibility logic */
                .read-more-btn .btn-text {
                    max-width: 200px;
                    opacity: 1;
                    transition: all 0.4s ease;
                    white-space: nowrap;
                    margin-left: 8px;
                }

                .back-btn-container.scrolled-left .read-more-btn .btn-text {
                    max-width: 0;
                    opacity: 0;
                    margin-left: 0;
                    overflow: hidden;
                }

                /* Show text on hover when scrolled */
                .back-btn-container.scrolled-left .read-more-btn:hover .btn-text {
                    max-width: 200px;
                    opacity: 1;
                    margin-left: 8px;
                }

                .read-more-btn {
                    background: var(--bg-primary); 
                    border: 1px solid var(--border-color);
                    padding: 8px 16px;
                    border-radius: 20px;
                    color: var(--text-secondary);
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0; /* Gap handled by margin-left on text */
                    transition: all 0.3s;
                    font-family: 'Abi', sans-serif;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                }

                .read-more-btn:hover {
                    color: var(--accent-green);
                    border-color: var(--accent-green);
                    box-shadow: 0 5px 15px rgba(37, 127, 94, 0.15);
                    transform: translateY(-2px);
                }
                
                /* Ensure icon stays visible */
                .read-more-btn i {
                    font-size: 1.1em;
                }

                /* Mobile/Tablet Responsive overrides */
                @media (max-width: 1100px) {
                    /* Initial state: aligned with content */
                    .back-btn-container {
                        position: fixed; /* Keep fixed to allow transition */
                        top: 8rem;
                        left: 20px; /* Align to left padding */
                        right: auto;
                        width: fit-content;
                        transform: none;
                        z-index: 900;
                    }

                    /* Scrolled state: move to top-left corner */
                    .back-btn-container.scrolled-left {
                        top: 140px; 
                        left: 20px; 
                        /* Logic is same as desktop, just different coordinates if needed. 
                           Here 140px/20px is fine. Text hiding will work automatically. */
                    }
                    
                    /* Note: The previous disable-text-hiding block is removed so it works on mobile too */
                }

                /* Mobile Responsive */
                @media (max-width: 768px) {

                    .blog-details-wrapper {
                        padding-top: 2rem;
                    }
                    
                    /* Adjust spacers since button is relative here */
                    .container {
                        padding-top: 0; 
                    }

                    .card-image {
                        height: 250px;
                    }

                    .card-content {
                        padding: 25px;
                    }

                    .card-title {
                        font-size: 24px;
                    }
                }
            `}</style>

            <div className={`back-btn-container ${isScrolled ? 'scrolled-left' : ''}`}>
                <button className="read-more-btn" onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-arrow-left"></i> <span className="btn-text">Back</span>
                </button>
            </div>

            <main className="container" style={{ marginTop: '1rem' }}>{/* Add top margin to compensate for fixed button */}

                <article className="blog-card">
                    <div className="card-image">
                        <img src={article.img} alt={article.title} />
                        <span className="category-tag">{article.category}</span>
                    </div>

                    <div className="card-content">
                        <h1 className="card-title">{article.title}</h1>
                        <div className="meta-info">
                            <div className="meta-item">
                                <i className="fa-regular fa-calendar-alt"></i> {article.date}
                            </div>
                            <div className="meta-item">
                                <i className="fa-regular fa-user"></i> {article.author}
                            </div>
                            <div className="meta-item">
                                <i className="fa-regular fa-clock"></i> {article.readTime} read
                            </div>
                        </div>

                        {/* Content Injection */}
                        <div
                            className="article-body"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        >
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default BlogDetails;