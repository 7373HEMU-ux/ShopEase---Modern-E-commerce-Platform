import React, { useEffect, useState } from 'react';
import API from '../api';

export default function CartPage(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const load = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (token){
        const res = await API.get('/cart');
        setItems(res.data);
        calculateTotal(res.data);
      } else {
        // Load guest cart
        const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
        setItems(guestCart);
        calculateTotal(guestCart);
      }
    } catch (err) {
      console.error('Failed to load cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.item?.price || 0) * (item.qty || 0);
    }, 0);
    setTotal(total);
  };

  useEffect(()=>{ load(); }, []);

  const updateQty = async (itemId, qty) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await API.post('/cart/update', { itemId, qty });
        load();
      } else {
        // Update guest cart
        const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
        const idx = guestCart.findIndex(x => x.itemId === itemId);
        if (idx > -1) {
          if (qty <= 0) {
            guestCart.splice(idx, 1);
          } else {
            guestCart[idx].qty = qty;
          }
          localStorage.setItem('guest_cart', JSON.stringify(guestCart));
          load();
        }
      }
    } catch (err) {
      alert('❌ Failed to update cart');
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await API.post('/cart/clear');
      } else {
        localStorage.removeItem('guest_cart');
      }
      load();
    } catch (err) {
      alert('❌ Failed to clear cart');
    }
  };

  if (loading) {
    return (
      <div className="cart-container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container fade-in">
      <h2 className="cart-title">🛒 Your Shopping Cart</h2>
      
      {items.length === 0 ? (
        <div className="empty-state">
          <h3>🛒 Your cart is empty</h3>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        <>
          {items.map(ci=> (
            <div key={ci.item?._id || ci.itemId} className="cart-item">
              <div className="cart-item-info">
                <div className="cart-item-title">{ci.item?.title || 'Unknown Item'}</div>
                <div className="cart-item-price">₹{ci.item?.price || 0} each</div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <label style={{fontSize: '0.9rem', color: '#666'}}>Qty:</label>
                <input 
                  className="cart-item-qty"
                  type="number" 
                  min="0"
                  value={ci.qty} 
                  onChange={e=>updateQty(ci.item?._id || ci.itemId, Number(e.target.value))} 
                />
                <div style={{fontWeight: 'bold', color: '#667eea'}}>
                  ₹{(ci.item?.price || 0) * ci.qty}
                </div>
              </div>
            </div>
          ))}
          
          <div style={{
            borderTop: '2px solid #e1e5e9', 
            paddingTop: '1rem', 
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#333'}}>
              Total: ₹{total}
            </div>
            <div style={{display: 'flex', gap: '1rem'}}>
              <button 
                className="btn" 
                onClick={clearCart}
                style={{background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)'}}
              >
                🗑️ Clear Cart
              </button>
              <button className="btn">
                💳 Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


