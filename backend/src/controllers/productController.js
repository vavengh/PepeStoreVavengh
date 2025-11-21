const { Product } = require('../models');

class ProductController {
  async getAll(ctx) {
    try {
      const products = await Product.findAll();
      ctx.body = { success: true, data: products };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { success: false, error: error.message };
    }
  }

  async getById(ctx) {
    try {
      const product = await Product.findByPk(ctx.params.id);
      if (!product) {
        ctx.status = 404;
        ctx.body = { success: false, error: 'Product not found' };
        return;
      }
      ctx.body = { success: true, data: product };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { success: false, error: error.message };
    }
  }

  async create(ctx) {
    try {
      const product = await Product.create(ctx.request.body);
      ctx.status = 201;
      ctx.body = { success: true, data: product };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { success: false, error: error.message };
    }
  }

  async update(ctx) {
    try {
      const product = await Product.findByPk(ctx.params.id);
      if (!product) {
        ctx.status = 404;
        ctx.body = { success: false, error: 'Product not found' };
        return;
      }
      await product.update(ctx.request.body);
      ctx.body = { success: true, data: product };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { success: false, error: error.message };
    }
  }

  async delete(ctx) {
    try {
      const product = await Product.findByPk(ctx.params.id);
      if (!product) {
        ctx.status = 404;
        ctx.body = { success: false, error: 'Product not found' };
        return;
      }
      await product.destroy();
      ctx.body = { success: true, message: 'Product deleted' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { success: false, error: error.message };
    }
  }
}

module.exports = new ProductController();
