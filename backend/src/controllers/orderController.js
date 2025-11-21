const { Order, OrderItem, Product } = require('../models');

class OrderController {
  async getAll(ctx) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: OrderItem,
            include: [Product]
          }
        ]
      });
      ctx.body = { success: true, data: orders };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { success: false, error: error.message };
    }
  }

  async getById(ctx) {
    try {
      const order = await Order.findByPk(ctx.params.id, {
        include: [
          {
            model: OrderItem,
            include: [Product]
          }
        ]
      });
      if (!order) {
        ctx.status = 404;
        ctx.body = { success: false, error: 'Order not found' };
        return;
      }
      ctx.body = { success: true, data: order };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { success: false, error: error.message };
    }
  }

  async create(ctx) {
    try {
      const { userId, items } = ctx.request.body;
      
      // Calculate total
      let total = 0;
      for (const item of items) {
        const product = await Product.findByPk(item.productId);
        if (!product) {
          ctx.status = 404;
          ctx.body = { success: false, error: `Product ${item.productId} not found` };
          return;
        }
        total += parseFloat(product.price) * item.quantity;
      }

      // Create order
      const order = await Order.create({
        userId,
        total,
        status: 'pending'
      });

      // Create order items
      for (const item of items) {
        const product = await Product.findByPk(item.productId);
        await OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: product.price
        });
      }

      // Fetch complete order with items
      const completeOrder = await Order.findByPk(order.id, {
        include: [
          {
            model: OrderItem,
            include: [Product]
          }
        ]
      });

      ctx.status = 201;
      ctx.body = { success: true, data: completeOrder };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { success: false, error: error.message };
    }
  }

  async updateStatus(ctx) {
    try {
      const order = await Order.findByPk(ctx.params.id);
      if (!order) {
        ctx.status = 404;
        ctx.body = { success: false, error: 'Order not found' };
        return;
      }
      await order.update({ status: ctx.request.body.status });
      ctx.body = { success: true, data: order };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { success: false, error: error.message };
    }
  }
}

module.exports = new OrderController();
