import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Listing from './pages/Listing.jsx';
import CartPage from './pages/CartPage.jsx';
import { useAuth } from './hooks/useAuth.js';

function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout clicked');
    logout();
    navigate('/');
  };

  console.log('Navigation render - user:', user);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo">
          🛍️ ShopEase
        </div>
        
        <div className="nav-links">
          <Link to="/">🏠 Home</Link>
          <Link to="/cart">🛒 Cart</Link>
        </div>
        
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {user ? (
            <>
              <span style={{ color: '#666', fontSize: '14px', marginRight: '10px' }}>
                👋 Welcome, {user.name}
              </span>
              <button 
                onClick={handleLogout}
                className="btn"
                style={{
                  background: '#ff6b6b',
                  padding: '8px 16px',
                  fontSize: '14px',
                  width: 'auto'
                }}
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-links">🔑 Login</Link>
              <Link to="/signup" className="nav-links">📝 Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function App(){
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        <Routes>
          <Route path="/" element={<Listing/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App/>);


