import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './Nav'; // Your Layout Component
import Home from './pages/Home';
import Blog from './pages/Blog';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Categories from './pages/Categories';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import BlogDetails from './pages/BlogDetails';
import Deal from './pages/Deal';

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter basename="/Masterkart/">
      <ScrollToTop />
      <Routes>
        {/* Pages inside the Main Layout (Nav) */}
        <Route element={<Nav />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/deal" element={<Deal />} />
        </Route>

        {/* Login Page (No Nav) */}
        {/* Login Page (No Nav) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;