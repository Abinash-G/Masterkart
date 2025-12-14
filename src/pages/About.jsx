import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const About = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    return (
        <div className="help-page">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Pacifico&display=swap');

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
                    font-family: 'Lobster', cursive;
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

                @media (max-width: 768px) {
                    .help-section {
                        flex-direction: column;
                        gap: 1.5rem;
                        padding: 1.5rem;
                    }

                    .help-icon {
                        margin-bottom: 0.5rem;
                    }
                }
                `}
            </style>
            <div className="help-hero">
                <h1>About Us</h1>
                <p>Learn more about MasterCart, our mission, and our commitment to freshness.</p>
            </div>

            <div className="help-container">
                <section className="help-section">
                    <div className="help-icon"><i className="fa-solid fa-leaf"></i></div>
                    <div className="help-content">
                        <h2>Who We Are</h2>
                        <p>MasterCart is a premier online grocery store dedicated to delivering fresh, organic, and high-quality produce directly from local farms to your kitchen. We believe in bridging the gap between farmers and consumers.</p>
                        <p>Founded in 2024, our journey began with a simple idea: to make healthy eating accessible and convenient for everyone.</p>
                    </div>
                </section>

                <section className="help-section">
                    <div className="help-icon"><i className="fa-solid fa-bullseye"></i></div>
                    <div className="help-content">
                        <h2>Our Mission</h2>
                        <p>Our mission is to revolutionize the way people shop for food. We aim to provide a seamless shopping experience while supporting sustainable farming practices.</p>
                        <ul className="help-list">
                            <li>To provide the freshest organic produce.</li>
                            <li>To support local farmers and communities.</li>
                            <li>To ensure 100% customer satisfaction.</li>
                            <li>To promote a healthy and sustainable lifestyle.</li>
                        </ul>
                    </div>
                </section>

                <section className="help-section">
                    <div className="help-icon"><i className="fa-solid fa-star"></i></div>
                    <div className="help-content">
                        <h2>Why Choose Us?</h2>
                        <p>We are passionate about quality and service. Here is what sets us apart from the rest:</p>
                        <ul className="help-list">
                            <li><strong>Farm-to-Table Freshness:</strong> Produce harvested daily.</li>
                            <li><strong>Quality Guarantee:</strong> Strict quality checks on all items.</li>
                            <li><strong>Eco-Friendly Packaging:</strong> We care for the planet.</li>
                            <li><strong>Fast Delivery:</strong> Get your groceries in record time.</li>
                        </ul>
                    </div>
                </section>

                <section id="contact" className="help-section">
                    <div className="help-icon"><i className="fa-solid fa-envelope"></i></div>
                    <div className="help-content">
                        <h2>Contact Us</h2>
                        <p>We'd love to hear from you! Reach out to us for any queries, feedback, or support.</p>
                        <ul className="help-list">
                            <li><strong>Email:</strong> support@mastercart.com</li>
                            <li><strong>Phone:</strong> +91 98765 43210</li>
                            <li><strong>Address:</strong> 123, Green Street, Tech Park, Bangalore, India</li>
                            <li><strong>Working Hours:</strong> Mon - Sat, 9 AM - 6 PM</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
