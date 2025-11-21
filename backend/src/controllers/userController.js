const { User } = require('../models');

class UserController {
  async getAll(ctx) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] }
      });
      ctx.body = { success: true, data: users };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { success: false, error: error.message };
    }
  }

  async getById(ctx) {
    try {
      const user = await User.findByPk(ctx.params.id, {
        attributes: { exclude: ['password'] }
      });
      if (!user) {
        ctx.status = 404;
        ctx.body = { success: false, error: 'User not found' };
        return;
      }
      ctx.body = { success: true, data: user };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { success: false, error: error.message };
    }
  }

  async create(ctx) {
    try {
      const user = await User.create(ctx.request.body);
      const userData = user.toJSON();
      delete userData.password;
      ctx.status = 201;
      ctx.body = { success: true, data: userData };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { success: false, error: error.message };
    }
  }

  async update(ctx) {
    try {
      const user = await User.findByPk(ctx.params.id);
      if (!user) {
        ctx.status = 404;
        ctx.body = { success: false, error: 'User not found' };
        return;
      }
      await user.update(ctx.request.body);
      const userData = user.toJSON();
      delete userData.password;
      ctx.body = { success: true, data: userData };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { success: false, error: error.message };
    }
  }

  async delete(ctx) {
    try {
      const user = await User.findByPk(ctx.params.id);
      if (!user) {
        ctx.status = 404;
        ctx.body = { success: false, error: 'User not found' };
        return;
      }
      await user.destroy();
      ctx.body = { success: true, message: 'User deleted' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { success: false, error: error.message };
    }
  }
}

module.exports = new UserController();
