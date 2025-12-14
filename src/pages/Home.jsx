import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import '../style.css';
import productsData from '../data/products.json';

const Home = () => {
  const { addToCart, addToWishlist, isInWishlist, toggleWishlist } = useCart();

  // Helper to count items per category
  const getCategoryCount = (categoryName) => {
    return productsData.filter(p => p.category === categoryName).length;
  };

  // Products Data
  const featuredProducts = [
    { id: 1, name: "Fresh Red Apple", price: "₹180", rating: 4.5, badge: "HOT", img: "https://www.bbassets.com/media/uploads/p/l/40033817_11-fresho-apple-green-regular.jpg" },
    { id: 2, name: "Organic Broccoli", price: "₹120", rating: 4.0, badge: "", img: "https://www.allrecipes.com/thmb/zubQvhsfRJO8K5SnyqimqyKrG1k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8760150-How-to-Steam-Broccoli-ddmfs-7559-4x3-beauty-b270504788b64c51996dfcf3d61fcab9.jpg" },
    { id: 3, name: "Fresh Milk 1L", price: "₹75", rating: 5.0, badge: "-15%", img: "https://dairynutrition.ca/sites/dairynutrition/files/image_file_browser/dn_article/2023-03/shutterstock_4305538_1182x788px.jpg" },
    { id: 4, name: "Juicy Orange", price: "₹250", rating: 4.8, badge: "", img: "https://t3.ftcdn.net/jpg/15/22/58/88/360_F_1522588854_lTBbT8XB5j1vBlRw6ogdYwFqQBGvbO4x.jpg" },
  ];

  // State for Theme (Dark/Light)
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  // State for Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Effect to apply theme to body class
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle Theme Handler
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set deadline to 2 days from now for demo purposes
    // In a real app, this would come from an API or prop
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

  // Calculate Lowest Prices
  const getMinPrice = (category) => {
    const products = category
      ? productsData.filter(p => p.category === category)
      : productsData;

    if (!products.length) return 0;
    const prices = products.map(p => parseFloat(p.price.replace(/[^0-9.]/g, '')));
    return Math.min(...prices);
  };

  const minAll = getMinPrice();
  const minFruit = getMinPrice('Fruit');
  const minVeg = getMinPrice('Vegetable');

  // Helper to render price with bold integer part
  const renderPrice = (price) => (
    <>starting at ₹<b>{Math.floor(price)}</b>{(price % 1 > 0) ? (price % 1).toFixed(2).substring(1) : '.00'}</>
  );

  return (
    <>
      {/* Main Grid Layout */}
      <main className="promo-container">
        {/* Large Left Box */}
        <div className="box box1">
          <div className="box-content">
            <span className="sub-title">Fresh & Healthy</span>
            <span className="main-title">FRUITS &<br />VEGETABLES</span>
            <span className="price-tag">{renderPrice(minAll)}</span>
            <Link to="/products" className="shop-btn">Shop Now <i className="fa-solid fa-angles-right"></i></Link>
          </div>
          {/* Decorative Images */}
          <img src="https://png.pngtree.com/png-vector/20240708/ourmid/pngtree-fresh-vegetables-with-wicker-basket-png-image_13008114.png" className="deco-img box1-main-img" alt="Veg Basket" />
          <img src="https://static.vecteezy.com/system/resources/previews/015/100/064/non_2x/mixed-fruits-in-wicker-bowl-free-png.png" className="deco-img box1-top-left" alt="Fruit Bowl" />
          <img src="./visualhunter.png" className="deco-img box1-bottom-left" alt="Leaf" />
        </div>

        {/* Top Right Box */}
        <div className="box box2">
          <div className="box-content">
            <span className="sub-title">Fresh</span>
            <span className="main-title">Fruits</span>
            <span className="price-tag">{renderPrice(minFruit)}</span>
            <Link to="/products?category=Fruit" className="shop-btn">Shop Now <i className="fa-solid fa-angles-right"></i></Link>
          </div>
          <img src="https://png.pngtree.com/png-clipart/20250104/original/pngtree-vibrant-fruit-basket-with-fresh-and-juicy-assorted-fruits-for-a-png-image_20072050.png" className="deco-img box2-img" alt="Fruits" />
        </div>

        {/* Bottom Right Box */}
        <div className="box box3">
          <div className="box-content">
            <span className="sub-title">Organic</span>
            <span className="main-title">Vegetables</span>
            <span className="price-tag">{renderPrice(minVeg)}</span>
            <Link to="/products?category=Vegetable" className="shop-btn">Shop Now <i className="fa-solid fa-angles-right"></i></Link>
          </div>
          <img src="https://png.pngtree.com/png-vector/20240811/ourmid/pngtree-fruit-and-vegetable-png-image_13446283.png" className="deco-img box3-img" alt="Veg" />
        </div>
      </main>

      {/* Categories Grid */}
      <section className="categories-container">
        <div className="section-header">
          <span>Browse Categories</span>
          <Link to="/categories">View All <i className="fa-solid fa-arrow-right"></i></Link>
        </div>
        <div className="categories-grid">
          <Link to="/products?category=Snacks" className="cat-card">
            <img src="cashew.png" className="cat-img" alt="Cashew" />
            <div>
              <div className="cat-title">SNACK & SPICE</div>
              <div className="cat-items">{getCategoryCount('Snacks')} items</div>
            </div>
          </Link>
          <Link to="/products?category=Juice" className="cat-card">
            <img src="drink.png" className="cat-img" alt="Drink" />
            <div>
              <div className="cat-title">JUICE & DRINKS</div>
              <div className="cat-items">{getCategoryCount('Juice')} items</div>
            </div>
          </Link>
          <Link to="/products?category=Seafood" className="cat-card">
            <img src="fish.png" className="cat-img" alt="Fish" />
            <div>
              <div className="cat-title">SEAFOOD</div>
              <div className="cat-items">{getCategoryCount('Seafood')} items</div>
            </div>
          </Link>
          <Link to="/products?category=Fruit" className="cat-card">
            <img src="fruits.png" className="cat-img" alt="Fruits" />
            <div>
              <div className="cat-title">FRUITS</div>
              <div className="cat-items">{getCategoryCount('Fruit')} items</div>
            </div>
          </Link>
          <Link to="/products?category=Vegetable" className="cat-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2153/2153788.png" className="cat-img" alt="Vegetables" />
            <div>
              <div className="cat-title">VEGETABLES</div>
              <div className="cat-items">{getCategoryCount('Vegetable')} items</div>
            </div>
          </Link>
          <Link to="/products?category=FastFood" className="cat-card">
            <img src="fast-food.png" className="cat-img" alt="Fast Food" />
            <div>
              <div className="cat-title">FAST FOOD</div>
              <div className="cat-items">{getCategoryCount('Fast Food')} items</div>
            </div>
          </Link>
        </div>
      </section >

      {/* Featured Products */}
      < section className="products-container" >
        <div className="section-header">
          <span>Featured Products</span>
          <Link to="/products">See All <i className="fa-solid fa-arrow-right"></i></Link>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              {product.badge && <span className="product-badge">{product.badge}</span>}
              <Link to={`/product/${product.id}`} className="product-card-link">
                <div className="product-img-wrapper">
                  <img src={product.img} alt={product.name} />
                  <button
                    className="wishlist-icon-btn"
                    onClick={(e) => {
                      e.preventDefault();
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
      </section >

      {/* Deal Banner */}
      < section className="deal-banner" >
        <div className="deal-content">
          <span className="deal-tag">Deal of the Day</span>
          <div className="deal-title">Organic Avocado Premium</div>
          <div className="countdown">
            <div className="time-box">
              <span>{String(timeLeft.days).padStart(2, '0')}</span>
              <label>Days</label>
            </div>
            <div className="time-box">
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <label>Hrs</label>
            </div>
            <div className="time-box">
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <label>Mins</label>
            </div>
            <div className="time-box">
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              <label>Secs</label>
            </div>
          </div>
          <Link to="/deal" className="shop-btn">Grab Deal <i className="fa-solid fa-arrow-right"></i></Link>
        </div>
        <img src="https://cdn.dribbble.com/userupload/25625222/file/original-31b1189ef53f5cefbf0234519d014de8.gif" className="deal-img" alt="Avocado" />
      </section >

      {/* Features */}
      < section className="features-section" >
        <div className="feature-item">
          <div className="feature-icon">
            <i className="fa-solid fa-truck-fast"></i>
          </div>
          <div className="feature-text">
            <h4>Free Shipping</h4>
            <p>On orders over $50</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon">
            <i className="fa-solid fa-leaf"></i>
          </div>
          <div className="feature-text">
            <h4>Always Fresh</h4>
            <p>Farm to table direct</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon">
            <i className="fa-solid fa-headset"></i>
          </div>
          <div className="feature-text">
            <h4>Support 24/7</h4>
            <p>Contact us anytime</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon">
            <i className="fa-solid fa-credit-card"></i>
          </div>
          <div className="feature-text">
            <h4>Secure Pay</h4>
            <p>100% protected payment</p>
          </div>
        </div>
      </section >

      {/* Blog Preview */}
      < section className="blog-preview-section" >
        <div className="section-header">
          <span>Fresh from our Blog</span>
          <Link to="/blog">Read More <i className="fa-solid fa-arrow-right"></i></Link>
        </div>
        <div className="blog-grid">
          <div className="blog-card">
            <div className="blog-img">
              <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1738&auto=format&fit=crop" alt="Blog 1" />
            </div>
            <div className="blog-content">
              <span className="blog-date">Oct 15, 2025</span>
              <h4>Meet the Farmers Behind Your Morning Coffee</h4>
              <p>A journey into the sustainable practices of our local coffee bean suppliers in Coorg.</p>
              <Link to="/blog/1" className="read-more">Read Article</Link>
            </div>
          </div>
          <div className="blog-card">
            <div className="blog-img">
              <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1613&auto=format&fit=crop" alt="Blog 2" />
            </div>
            <div className="blog-content">
              <span className="blog-date">Oct 12, 2025</span>
              <h4>Zero Waste Kitchen: Simple Swaps for 2025</h4>
              <p>Easy actionable steps to reduce food waste and plastic usage in your daily cooking routine.</p>
              <Link to="/blog/2" className="read-more">Read Article</Link>
            </div>
          </div>
          <div className="blog-card">
            <div className="blog-img">
              <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1671&auto=format&fit=crop" alt="Blog 3" />
            </div>
            <div className="blog-content">
              <span className="blog-date">Oct 10, 2025</span>
              <h4>Traditional Spicy Vegetable Curry</h4>
              <p>Warm your soul with this authentic family recipe passed down through generations.</p>
              <Link to="/blog/3" className="read-more">Read Article</Link>
            </div>
          </div>
        </div>
      </section >

      {/* Featured Brands */}
      < section className="brands-section" >
        <div className="brands-title">Trusted Partners</div>
        <div className="brands-grid">
          <i className="fa-solid fa-vial-virus" title="Organic Life"></i>
          <i className="fa-brands fa-nutritionix" title="NutriGood"></i>
          <i className="fa-solid fa-leaf" title="Green Earth"></i>
          <i className="fa-brands fa-pagelines" title="Pure Nature"></i>
          <i className="fa-solid fa-money-bill-wheat" title="Grain Master"></i>
          <i className="fa-solid fa-lemon" title="lemon"></i>
          <i className="fa-solid fa-carrot" title="carrot"></i>
        </div>
      </section >



      {/* Newsletter */}
      < section className="newsletter-section" >
        <div className="newsletter-container">
          <h2 className="newsletter-title">Join Our Newsletter</h2>
          <p className="newsletter-desc">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" className="newsletter-input" placeholder="Enter your email address" required />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </section >
    </>
  );
};

export default Home;