import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { productService, orderService } from '../services/api';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      const orderData = {
        userId: 1, // In a real app, this would come from authentication
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      await orderService.create(orderData);
      alert('Order placed successfully!');
      setCart([]);
    } catch (err) {
      alert('Failed to place order. Please try again.');
      console.error('Error placing order:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home">
      <header className="header">
        <h1>🐸 PepeStore</h1>
        <p>Your favorite e-commerce store</p>
      </header>

      <div className="container">
        <div className="products-section">
          <h2>Products</h2>
          {products.length === 0 ? (
            <p className="no-products">No products available.</p>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>

        <div className="cart-section">
          <Cart
            cart={cart}
            onRemove={handleRemoveFromCart}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
