import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI, orderAPI } from '../utils/api';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: ''
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.get();
      setCartItems(response.data);
      setLoading(false);
      
      if (response.data.length === 0) {
        navigate('/cart');
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerEmail) {
      alert('Por favor completa todos los campos');
      return;
    }

    setSubmitting(true);
    try {
      const response = await orderAPI.create(formData.customerName, formData.customerEmail);
      navigate(`/confirmation/${response.data.id}`);
    } catch (err) {
      alert('Error al crear la orden');
      console.error(err);
    } finally {
      setSubmitting(false);
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
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Proceso de Pago</h1>
        <div className="checkout-content">
          <div className="checkout-form-section">
            <div className="card">
              <h2>Información de Contacto</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="customerName">Nombre Completo *</label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="customerEmail">Email *</label>
                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    required
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="checkout-note">
                  <p>Nota: El método de pago con Fintoc se implementará próximamente.</p>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-large"
                >
                  {submitting ? 'Procesando...' : 'Continuar'}
                </button>
              </form>
            </div>
          </div>
          <div className="checkout-summary">
            <div className="card">
              <h2>Resumen del Pedido</h2>
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="order-item-info">
                      <span className="order-item-name">{item.product.name}</span>
                      <span className="order-item-quantity">x{item.quantity}</span>
                    </div>
                    <span className="order-item-price">
                      ${(parseFloat(item.product.price) * item.quantity).toLocaleString('es-CL')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <span>Total:</span>
                <span>${calculateTotal().toLocaleString('es-CL')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

