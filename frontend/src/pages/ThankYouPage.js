import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderAPI } from '../utils/api';
import './ThankYouPage.css';

const ThankYouPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await orderAPI.getById(orderId);
      setOrder(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching order:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container">
        <div className="error">Orden no encontrada</div>
      </div>
    );
  }

  return (
    <div className="thank-you-page">
      <div className="container">
        <div className="thank-you-content">
          <div className="thank-you-icon">✓</div>
          <h1>¡Gracias por tu compra!</h1>
          <p className="thank-you-message">
            Tu pedido ha sido confirmado exitosamente.
          </p>
          <div className="order-summary">
            <div className="summary-item">
              <span>Número de Orden:</span>
              <span className="order-number">#{order.id}</span>
            </div>
            <div className="summary-item">
              <span>Total:</span>
              <span className="order-total">${parseFloat(order.total).toLocaleString('es-CL')}</span>
            </div>
            <div className="summary-item">
              <span>Estado:</span>
              <span className={`status status-${order.status}`}>
                {order.status === 'confirmed' && 'Confirmado'}
                {order.status === 'completed' && 'Completado'}
              </span>
            </div>
          </div>
          <div className="thank-you-actions">
            <Link to="/" className="btn btn-primary">
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;

