const db = require('../models');

const getCart = async (req, res) => {
  try {
    const { sessionId } = req.query;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    
    const cartItems = await db.Cart.findAll({
      where: { sessionId },
      include: [{
        model: db.Product,
        as: 'product'
      }]
    });
    
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { sessionId, productId, quantity = 1 } = req.body;
    
    if (!sessionId || !productId) {
      return res.status(400).json({ error: 'Session ID and Product ID are required' });
    }
    
    // Check if product exists
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Check if item already in cart
    const existingCartItem = await db.Cart.findOne({
      where: { sessionId, productId }
    });
    
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.json(existingCartItem);
    }
    
    // Create new cart item
    const cartItem = await db.Cart.create({
      sessionId,
      productId,
      quantity
    });
    
    const cartItemWithProduct = await db.Cart.findByPk(cartItem.id, {
      include: [{
        model: db.Product,
        as: 'product'
      }]
    });
    
    res.json(cartItemWithProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }
    
    const cartItem = await db.Cart.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    cartItem.quantity = quantity;
    await cartItem.save();
    
    const cartItemWithProduct = await db.Cart.findByPk(cartItem.id, {
      include: [{
        model: db.Product,
        as: 'product'
      }]
    });
    
    res.json(cartItemWithProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    
    const cartItem = await db.Cart.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    await cartItem.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const { sessionId } = req.query;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    
    await db.Cart.destroy({
      where: { sessionId }
    });
    
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};

