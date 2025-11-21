const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const sequelize = require('./config/database');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
const userController = require('./controllers/userController');
require('dotenv').config();

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser());

// Root route
router.get('/', async (ctx) => {
  ctx.body = { 
    message: 'PepeStore API is running!',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders',
      users: '/api/users'
    }
  };
});

// Product routes
router.get('/api/products', productController.getAll);
router.get('/api/products/:id', productController.getById);
router.post('/api/products', productController.create);
router.put('/api/products/:id', productController.update);
router.delete('/api/products/:id', productController.delete);

// Order routes
router.get('/api/orders', orderController.getAll);
router.get('/api/orders/:id', orderController.getById);
router.post('/api/orders', orderController.create);
router.patch('/api/orders/:id/status', orderController.updateStatus);

// User routes
router.get('/api/users', userController.getAll);
router.get('/api/users/:id', userController.getById);
router.post('/api/users', userController.create);
router.put('/api/users/:id', userController.update);
router.delete('/api/users/:id', userController.delete);

// Use router
app.use(router.routes());
app.use(router.allowedMethods());

// Database sync and server start
async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
}

start();
