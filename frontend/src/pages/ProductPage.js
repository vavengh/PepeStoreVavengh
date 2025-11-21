import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI, cartAPI } from '../utils/api';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getById(id);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el producto');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await cartAPI.add(product.id, quantity);
      navigate('/cart');
    } catch (err) {
      alert('Error al agregar al carrito');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Cargando producto...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container">
        <div className="error">{error || 'Producto no encontrado'}</div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Volver
        </button>
        <div className="product-detail">
          <div className="product-image-large">
            <img src={product.image || 'https://via.placeholder.com/500x500'} alt={product.name} />
          </div>
          <div className="product-details">
            <h1>{product.name}</h1>
            <p className="product-category">{product.category}</p>
            <p className="product-description">{product.description}</p>
            <div className="product-price-large">
              ${product.price.toLocaleString('es-CL')}
            </div>
            <div className="product-stock">
              Stock disponible: {product.stock}
            </div>
            <div className="quantity-selector">
              <label>Cantidad:</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={product.stock}
                  className="quantity-input"
                />
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || product.stock === 0}
              className="btn btn-primary btn-large"
            >
              {addingToCart ? 'Agregando...' : 'Agregar al Carrito'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

