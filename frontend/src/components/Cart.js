import React from 'react';
import './Cart.css';

function Cart({ cart, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="cart-item-actions">
                  <span className="cart-item-total">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </span>
                  <button onClick={() => onRemove(index)} className="remove-btn">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={onCheckout} className="checkout-btn">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
