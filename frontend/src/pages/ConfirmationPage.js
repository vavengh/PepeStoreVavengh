import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderAPI } from '../utils/api';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

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

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      // Simular confirmación (sin implementar Fintoc aún)
      await orderAPI.updateStatus(orderId, 'confirmed');
      navigate(`/thank-you/${orderId}`);
    } catch (err) {
      alert('Error al confirmar la orden');
      console.error(err);
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Cargando orden...</div>
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
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-content">
          <div className="card">
            <h1>Confirmar Pedido</h1>
            <div className="order-details">
              <div className="detail-row">
                <span>Número de Orden:</span>
                <span className="order-number">#{order.id}</span>
              </div>
              <div className="detail-row">
                <span>Cliente:</span>
                <span>{order.customerName}</span>
              </div>
              <div className="detail-row">
                <span>Email:</span>
                <span>{order.customerEmail}</span>
              </div>
              <div className="detail-row">
                <span>Estado:</span>
                <span className={`status status-${order.status}`}>
                  {order.status === 'pending' && 'Pendiente'}
                  {order.status === 'confirmed' && 'Confirmado'}
                  {order.status === 'completed' && 'Completado'}
                  {order.status === 'cancelled' && 'Cancelado'}
                </span>
              </div>
            </div>
            <div className="order-items-section">
              <h2>Productos</h2>
              {order.items && order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="order-item-info">
                    <span className="order-item-name">{item.product.name}</span>
                    <span className="order-item-quantity">Cantidad: {item.quantity}</span>
                  </div>
                  <span className="order-item-price">
                    ${(parseFloat(item.price) * item.quantity).toLocaleString('es-CL')}
                  </span>
                </div>
              ))}
            </div>
            <div className="order-total-section">
              <div className="total-row">
                <span>Total:</span>
                <span>${parseFloat(order.total).toLocaleString('es-CL')}</span>
              </div>
            </div>
            <div className="confirmation-note">
              <p>Por favor, revisa los detalles de tu pedido antes de confirmar.</p>
              <p className="note-small">Nota: El pago con Fintoc se implementará próximamente.</p>
            </div>
            <div className="confirmation-actions">
              <button
                onClick={() => navigate('/')}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={confirming || order.status !== 'pending'}
                className="btn btn-primary"
              >
                {confirming ? 'Confirmando...' : 'Confirmar Pedido'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;

