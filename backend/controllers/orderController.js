const db = require('../models');

const createOrder = async (req, res) => {
  try {
    const { sessionId, customerName, customerEmail } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    
    // Get cart items
    const cartItems = await db.Cart.findAll({
      where: { sessionId },
      include: [{
        model: db.Product,
        as: 'product'
      }]
    });
    
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + (parseFloat(item.product.price) * item.quantity);
    }, 0);
    
    // Create order
    const order = await db.Order.create({
      sessionId,
      total,
      status: 'pending',
      customerName,
      customerEmail
    });
    
    // Create order items
    const orderItems = await Promise.all(
      cartItems.map(item =>
        db.OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price
        })
      )
    );
    
    // Clear cart
    await db.Cart.destroy({
      where: { sessionId }
    });
    
    // Get order with items
    const orderWithItems = await db.Order.findByPk(order.id, {
      include: [{
        model: db.OrderItem,
        as: 'items',
        include: [{
          model: db.Product,
          as: 'product'
        }]
      }]
    });
    
    res.json(orderWithItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await db.Order.findByPk(id, {
      include: [{
        model: db.OrderItem,
        as: 'items',
        include: [{
          model: db.Product,
          as: 'product'
        }]
      }]
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const order = await db.Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    order.status = status;
    await order.save();
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderStatus
};

