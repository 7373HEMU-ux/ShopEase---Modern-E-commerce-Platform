import React from 'react';
export default function ItemCard({item, onAdd}){
  return (
    <div className="item-card fade-in">
      <div className="item-image">
        {item.images && item.images.length > 0 ? (
          <img src={item.images[0]} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px'}} />
        ) : (
          <span>📦 No Image</span>
        )}
      </div>
      <h3 className="item-title">{item.name}</h3>
      <span className="item-category">{item.category}</span>
      <div className="item-price">${item.price}</div>
      {item.description && <p className="item-description">{item.description}</p>}
      <button className="btn-add-cart" onClick={()=>onAdd(item)}>
        🛒 Add to Cart
      </button>
    </div>
  );
}


