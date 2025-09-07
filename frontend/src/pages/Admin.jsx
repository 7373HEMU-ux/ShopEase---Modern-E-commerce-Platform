import React, { useState } from 'react';
import API from '../api';

export default function Admin(){
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    price: '', 
    category: '', 
    image: '', 
    stock: 100 
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const productData = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      };
      
      await API.post('/items', productData);
      setMessage('✅ Product added successfully!');
      setForm({ title: '', description: '', price: '', category: '', image: '', stock: 100 });
    } catch (err) {
      setMessage('❌ Failed to add product: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  return (
    <div className="form-container fade-in">
      <h2 className="form-title">➕ Add New Product</h2>
      {message && (
        <div style={{
          color: message.includes('✅') ? 'green' : 'red', 
          textAlign: 'center', 
          marginBottom: '1rem',
          padding: '0.5rem',
          background: message.includes('✅') ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)',
          borderRadius: '8px'
        }}>
          {message}
        </div>
      )}
      
      <form onSubmit={submit}>
        <div className="form-group">
          <input 
            className="form-input"
            name="title"
            placeholder="Product Title" 
            value={form.title} 
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <textarea 
            className="form-input"
            name="description"
            placeholder="Product Description" 
            value={form.description} 
            onChange={handleChange}
            rows="3"
            style={{resize: 'vertical', minHeight: '80px'}}
            required
          />
        </div>
        
        <div className="form-group">
          <input 
            className="form-input"
            name="price"
            type="number"
            placeholder="Price (₹)" 
            value={form.price} 
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input 
            className="form-input"
            name="category"
            placeholder="Category (e.g., Electronics, Clothing)" 
            value={form.category} 
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input 
            className="form-input"
            name="image"
            placeholder="Image URL (optional)" 
            value={form.image} 
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <input 
            className="form-input"
            name="stock"
            type="number"
            placeholder="Stock Quantity" 
            value={form.stock} 
            onChange={handleChange}
            required
          />
        </div>
        
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Adding Product...' : '➕ Add Product'}
        </button>
      </form>
    </div>
  );
}

