import React, { useState, useEffect } from 'react';
import { productAPI } from '../utils/api';
import './AdminProductsPage.css';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      alert('Error al cargar los productos');
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
    
    if (!formData.name || !formData.price) {
      alert('Nombre y precio son obligatorios');
      return;
    }

    try {
      if (editingProduct) {
        await productAPI.update(editingProduct.id, {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          image: formData.image,
          category: formData.category,
          stock: parseInt(formData.stock) || 0
        });
      } else {
        await productAPI.create({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          image: formData.image,
          category: formData.category,
          stock: parseInt(formData.stock) || 0
        });
      }
      
      resetForm();
      fetchProducts();
    } catch (err) {
      alert('Error al guardar el producto');
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      image: product.image || '',
      category: product.category || '',
      stock: product.stock.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await productAPI.delete(id);
        fetchProducts();
      } catch (err) {
        alert('Error al eliminar el producto');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      stock: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="admin-products-page">
      <div className="container">
        <div className="admin-header">
          <h1>Administración de Productos</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? 'Cancelar' : '+ Nuevo Producto'}
          </button>
        </div>

        {showForm && (
          <div className="product-form-card">
            <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="name">Nombre *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Nombre del producto"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="category">Categoría</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Ej: Snacks, Bebidas, Dulces"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="price">Precio *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                  />
                </div>
                <div className="input-group full-width">
                  <label htmlFor="image">URL de Imagen</label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
                <div className="input-group full-width">
                  <label htmlFor="description">Descripción</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Descripción del producto"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Actualizar' : 'Crear'} Producto
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-message">
                    No hay productos. Crea uno nuevo para comenzar.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <img
                        src={product.image || 'https://via.placeholder.com/50x50'}
                        alt={product.name}
                        className="product-thumb"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category || '-'}</td>
                    <td>${parseFloat(product.price).toLocaleString('es-CL')}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleEdit(product)}
                          className="btn-edit"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="btn-delete"
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage;

