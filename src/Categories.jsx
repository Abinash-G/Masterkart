import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

import productsData from './products.json';

const Categories = () => {
    // Helper to count items per category
    const getCategoryCount = (categoryName) => {
        return productsData.filter(p => p.category === categoryName).length;
    };

    const categoryList = [
        { title: "Snack & Spice", img: "https://cdn-icons-png.flaticon.com/512/5989/5989769.png", param: "Snacks" },
        { title: "Juice & Drinks", img: "https://cdn-icons-png.flaticon.com/512/2442/2442019.png", param: "Juice" },
        { title: "Seafood", img: "./fish.png", param: "Seafood" },
        { title: "Fast Food", img: "https://cdn-icons-png.freepik.com/512/5778/5778652.png", param: "Fast Food" },
        { title: "Eggs & Dairy", img: "https://cdn-icons-png.flaticon.com/512/837/837560.png", param: "Dairy" },
        { title: "Fresh Fruits", img: "https://cdn-icons-png.flaticon.com/512/1625/1625099.png", param: "Fruit" },
        { title: "Vegetables", img: "https://cdn-icons-png.flaticon.com/512/2153/2153788.png", param: "Vegetable" },
        { title: "Bakery", img: "https://cdn-icons-png.flaticon.com/512/992/992747.png", param: "Bakery" },
        { title: "Meat & Poultry", img: "https://cdn-icons-png.flaticon.com/512/16779/16779242.png", param: "Meat" },
        { title: "Ice Cream", img: "https://cdn-icons-png.flaticon.com/512/938/938063.png", param: "Ice Cream" },
        { title: "Baby Care", img: "https://cdn-icons-png.flaticon.com/512/7890/7890168.png", param: "Baby Care" },
        { title: "Pet Food", img: "https://cdn-icons-png.flaticon.com/512/2171/2171991.png", param: "Pet Food" },
    ];

    return (
        <div className="categories-page">
            <div className="cat-header">
                <h1>All Categories</h1>
                <p>Browse our wide range of organic and fresh products</p>
            </div>

            <div className="categories-full-grid">
                {categoryList.map((item, index) => (
                    <Link to={`/products?category=${item.param}`} className="cat-card-large" key={index}>
                        <div className="cat-icon-bg">
                            <img src={item.img} alt={item.title} />
                        </div>
                        <h3>{item.title}</h3>
                        <span>{getCategoryCount(item.param)} items</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;