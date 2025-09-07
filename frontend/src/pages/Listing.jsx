import React, { useEffect, useState } from 'react';
import API from '../api';
import ItemCard from '../components/ItemCard.jsx';

export default function Listing(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search:'', category:'', minPrice:'', maxPrice:'' });

  const load = async (currentFilters = filters) => {
    setLoading(true);
    try {
      // Clean up empty filters
      const cleanFilters = {};
      if (currentFilters.search) cleanFilters.search = currentFilters.search;
      if (currentFilters.category) cleanFilters.category = currentFilters.category;
      if (currentFilters.minPrice) cleanFilters.minPrice = currentFilters.minPrice;
      if (currentFilters.maxPrice) cleanFilters.maxPrice = currentFilters.maxPrice;
      
      const res = await API.get('/items', { params: cleanFilters });
      setItems(res.data);
    } catch (err) {
      console.error('Failed to load items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ load(); }, []);

  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem('token');
      if (token){
        await API.post('/cart/add', { itemId: item._id, qty: 1 });
        alert('✅ Added to cart!');
      } else {
        const guest = JSON.parse(localStorage.getItem('guest_cart') || '[]');
        const idx = guest.findIndex(x=>x.itemId===item._id);
        if (idx>-1) guest[idx].qty += 1; else guest.push({ itemId: item._id, qty:1 });
        localStorage.setItem('guest_cart', JSON.stringify(guest));
        alert('✅ Added to cart (guest mode)');
      }
    } catch (err) {
      alert('❌ Failed to add to cart');
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = {...filters, [key]: value};
    setFilters(newFilters);
    
    // Auto-apply search filter with debounce
    if (key === 'search') {
      clearTimeout(window.searchTimeout);
      window.searchTimeout = setTimeout(() => {
        load(newFilters);
      }, 500); // 500ms delay
    }
  };

  const applyFilters = () => {
    load(filters);
  };

  const clearFilters = () => {
    const emptyFilters = { search:'', category:'', minPrice:'', maxPrice:'' };
    setFilters(emptyFilters);
    load(emptyFilters);
  };

  return (
    <div className="items-container">
      <div className="filters-section fade-in">
        <h3 style={{marginBottom: '1rem', textAlign: 'center', color: '#333'}}>🔍 Filter Products</h3>
        <div className="filters-grid">
          <input 
            className="filter-input"
            placeholder="Search products..." 
            value={filters.search} 
            onChange={e=>handleFilterChange('search', e.target.value)} 
          />
          <select 
            className="filter-input"
            value={filters.category} 
            onChange={e=>handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="home">Home</option>
            <option value="sports">Sports</option>
            <option value="beauty">Beauty</option>
            <option value="automotive">Automotive</option>
            <option value="toys">Toys</option>
            <option value="food">Food</option>
            <option value="other">Other</option>
          </select>
          <input 
            className="filter-input"
            placeholder="Min Price ($)" 
            type="number"
            min="0"
            value={filters.minPrice} 
            onChange={e=>handleFilterChange('minPrice', e.target.value)} 
          />
          <input 
            className="filter-input"
            placeholder="Max Price ($)" 
            type="number"
            min="0"
            value={filters.maxPrice} 
            onChange={e=>handleFilterChange('maxPrice', e.target.value)} 
          />
          <button className="btn-filter" onClick={applyFilters}>
            🔍 Apply Filters
          </button>
          <button className="btn-filter" onClick={clearFilters} style={{backgroundColor: '#ff6b6b'}}>
            🗑️ Clear
          </button>
        </div>
      </div>
      
      {!loading && items.length > 0 && (
        <div style={{textAlign: 'center', margin: '1rem 0', color: '#666'}}>
          <p>Found {items.length} product{items.length !== 1 ? 's' : ''}</p>
        </div>
      )}
      
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <h3>🔍 No products found</h3>
          <p>Try adjusting your filters or check back later for new items!</p>
        </div>
      ) : (
        <div className="items-grid">
          {items.map(item=> <ItemCard key={item._id} item={item} onAdd={addToCart} />)}
        </div>
      )}
    </div>
  );
}



