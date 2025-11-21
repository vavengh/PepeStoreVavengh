import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get or create session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`)
};

export const cartAPI = {
  get: () => api.get('/cart', { params: { sessionId: getSessionId() } }),
  add: (productId, quantity = 1) => 
    api.post('/cart', { sessionId: getSessionId(), productId, quantity }),
  update: (id, quantity) => 
    api.put(`/cart/${id}`, { quantity }),
  remove: (id) => api.delete(`/cart/${id}`),
  clear: () => api.delete('/cart', { params: { sessionId: getSessionId() } })
};

export const orderAPI = {
  create: (customerName, customerEmail) => 
    api.post('/orders', { 
      sessionId: getSessionId(), 
      customerName, 
      customerEmail 
    }),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => 
    api.put(`/orders/${id}/status`, { status })
};

export default api;

