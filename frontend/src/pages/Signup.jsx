import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Signup(){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();
  const { login } = useAuth();
  
  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await API.post('/auth/signup', form);
      login(res.data.token, res.data.user);
      nav('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="form-container fade-in">
      <h2 className="form-title">Create Account</h2>
      {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '1rem'}}>{error}</div>}
      <form onSubmit={submit}>
        <div className="form-group">
          <input 
            className="form-input"
            placeholder="Full Name" 
            value={form.name} 
            onChange={e=>setForm({...form,name:e.target.value})}
            required
          />
        </div>
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
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      <p style={{textAlign: 'center', marginTop: '1rem', color: '#666'}}>
        Already have an account? <Link to="/login" style={{color: '#667eea', textDecoration: 'none'}}>Login here</Link>
      </p>
    </div>
  );
}


