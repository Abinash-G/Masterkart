import React, { useState, useEffect } from 'react';
import './Blog.css';

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

    // Blog Data (12 Articles)
    const blogPosts = [
        {
            id: 1,
            category: "Farm Stories",
            img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1738&auto=format&fit=crop",
            date: "Oct 15, 2025",
            title: "Meet the Farmers Behind Your Morning Coffee",
            excerpt: "A journey into the sustainable practices of our local coffee bean suppliers in Coorg."
        },
        {
            id: 2,
            category: "Sustainability",
            img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1613&auto=format&fit=crop",
            date: "Oct 12, 2025",
            title: "Zero Waste Kitchen: Simple Swaps for 2025",
            excerpt: "Easy actionable steps to reduce food waste and plastic usage in your daily cooking routine."
        },
        {
            id: 3,
            category: "Recipes",
            img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1671&auto=format&fit=crop",
            date: "Oct 10, 2025",
            title: "Traditional Spicy Vegetable Curry",
            excerpt: "Warm your soul with this authentic family recipe passed down through generations."
        },
        {
            id: 4,
            category: "Recipes",
            img: "https://vegnews.com/media/W1siZiIsIjQ1NTUyL1ZlZ25ld3MuQmFuYW5hQ3JlYW1QaWVTbW9vdGhpZUJvd2wuRW1pbGllRWF0cy5qcGciXSxbInAiLCJjcm9wX3Jlc2l6ZWQiLCIxMDIweDYwMyswKzEyIiwiMTM2MHg4MDReIix7ImZvcm1hdCI6ImpwZyJ9XSxbInAiLCJvcHRpbWl6ZSJdXQ/Vegnews.BananaCreamPieSmoothieBowl.EmilieEats.jpg?sha=81e7754be51906ca",
            date: "Oct 22, 2025",
            title: "5 Energizing Smoothie Bowls to Start Your Day",
            excerpt: "Discover the perfect blend of fruits, seeds, and greens to kickstart your morning with a burst of energy and flavor."
        },
        {
            id: 5,
            category: "Health",
            img: "https://media.istockphoto.com/id/1300836710/photo/crop-shot-of-plate-with-colorful-healthy-sliced-vegetables-and-dips.jpg?s=612x612&w=0&k=20&c=n78ffFNdqTX_DWQoQ7ghyjlfvLxZGOHuQUa_CDjLgRs=",
            date: "Oct 20, 2025",
            title: "Why \"Eat the Rainbow\" is More Than Just a Saying",
            excerpt: "Understanding phytonutrients and why colorful plates lead to better heart health and immunity."
        },
        {
            id: 6,
            category: "Tips",
            img: "https://booksbyrobricewinter.com/wp-content/uploads/2025/08/guide-for-tip.jpg",
            date: "Oct 18, 2025",
            title: "Smart Grocery Shopping: A Beginner's Guide",
            excerpt: "How to navigate the aisles, read labels effectively, and save money while buying high-quality organic produce."
        },
        // --- Page 2 Content ---
        {
            id: 7,
            category: "Sustainability",
            img: "https://i.ytimg.com/vi/AbJaQlHD1KQ/hq720.jpg",
            date: "Sep 28, 2025",
            title: "Composting 101: Turning Scraps into Gold",
            excerpt: "Learn the basics of composting at home, even if you live in a small apartment."
        },
        {
            id: 8,
            category: "Farm Stories",
            img: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            date: "Sep 25, 2025",
            title: "Harvest Season: A Day in the Life",
            excerpt: "Follow our team as we harvest the season's freshest pumpkins and squash."
        },
        {
            id: 9,
            category: "Health Tips",
            img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            date: "Sep 20, 2025",
            title: "Benefits of Plant-Based Milk Alternatives",
            excerpt: "Comparing almond, oat, soy, and coconut milk to find the best fit for your diet."
        },
        {
            id: 10,
            category: "Recipes",
            img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            date: "Sep 15, 2025",
            title: "Zesty Lemon & Quinoa Salad",
            excerpt: "A refreshing, protein-packed salad perfect for quick lunches or side dishes."
        },
        {
            id: 11,
            category: "Tips",
            img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            date: "Sep 10, 2025",
            title: "Meal Prepping for Busy Weekdays",
            excerpt: "Save time and money by prepping these 5 healthy meals on Sunday night."
        },
        {
            id: 12,
            category: "Farm Stories",
            img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            date: "Sep 05, 2025",
            title: "From Seed to Table: The Strawberry Journey",
            excerpt: "Tracing the path of our organic strawberries from planting to your dessert bowl."
        }
    ];

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
                                <article className="blog-card" key={post.id}>
                                    <div className="blog-img-wrapper">
                                        <span className="blog-category">{post.category}</span>
                                        <img src={post.img} alt={post.title} />
                                    </div>
                                    <div className="blog-content">
                                        <div className="blog-date"><i className="fa-regular fa-calendar"></i> {post.date}</div>
                                        <h2 className="blog-title">{post.title}</h2>
                                        <p className="blog-excerpt">{post.excerpt}</p>
                                        <a href="#" className="read-more">Read Article</a>
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