import React from 'react';
import './Product.css';

function Product({ product }) {
  return (
    <div className="product">
      <div className="product-header">
        <img className="product-img" alt="product" loading="lazy" src={product.image.url}></img>
      </div>
      <div className="product-title">
        <p>{product.name}</p>
        <p>{product.collection}</p>
      </div>
    </div>
  )
}

export default Product;
