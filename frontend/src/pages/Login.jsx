import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();
  const { login } = useAuth();
  
  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.token, res.data.user);

      // Sync guest cart with server cart
      const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
      if (guestCart.length){
        for (const ci of guestCart){
          await API.post('/cart/add', { itemId: ci.itemId, qty: ci.qty });
        }
        localStorage.removeItem('guest_cart');
      }

      nav('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="form-container fade-in">
      <h2 className="form-title">Welcome Back</h2>
      {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '1rem'}}>{error}</div>}
      <form onSubmit={submit}>
        <div className="form-group">
          <input 
            className="form-input"
            placeholder="Email Address" 
            type="email"
            value={form.email} 
            onChange={e=>setForm({...form,email:e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input 
            className="form-input"
            placeholder="Password" 
            type="password" 
            value={form.password} 
            onChange={e=>setForm({...form,password:e.target.value})}
            required
          />
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Login'}
        </button>
      </form>
      <p style={{textAlign: 'center', marginTop: '1rem', color: '#666'}}>
        Don't have an account? <Link to="/signup" style={{color: '#667eea', textDecoration: 'none'}}>Sign up here</Link>
      </p>
    </div>
  );
}


