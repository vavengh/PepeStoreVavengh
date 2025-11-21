import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartAPI } from '../utils/api';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.get();
      setCartItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(itemId);
    try {
      await cartAPI.update(itemId, newQuantity);
      await fetchCart();
    } catch (err) {
      alert('Error al actualizar la cantidad');
    } finally {
      setUpdating(null);
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto del carrito?')) {
      try {
        await cartAPI.remove(itemId);
        await fetchCart();
      } catch (err) {
        alert('Error al eliminar el producto');
      }
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.product.price) * item.quantity);
    }, 0);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Cargando carrito...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Carrito de Compras</h1>
          <div className="empty-cart">
            <p>Tu carrito está vacío</p>
            <Link to="/" className="btn btn-primary">
              Ver Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Carrito de Compras</h1>
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img 
                    src={item.product.image || 'https://via.placeholder.com/100x100'} 
                    alt={item.product.name} 
                  />
                </div>
                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <p className="cart-item-price">
                    ${item.product.price.toLocaleString('es-CL')} c/u
                  </p>
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={updating === item.id}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    disabled={updating === item.id}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(parseFloat(item.product.price) * item.quantity).toLocaleString('es-CL')}
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-btn"
                  title="Eliminar"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="summary-card">
              <h2>Resumen</h2>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${calculateTotal().toLocaleString('es-CL')}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${calculateTotal().toLocaleString('es-CL')}</span>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="btn btn-primary btn-large"
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

