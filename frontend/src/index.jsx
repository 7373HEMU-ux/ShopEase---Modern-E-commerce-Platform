import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Listing from './pages/Listing.jsx';
import CartPage from './pages/CartPage.jsx';
import Admin from './pages/Admin.jsx';
import './styles/global.css';

function App(){
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">🛍️ MERN Store</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Listing/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App/>);
