const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const sequelize = require('./config/database');
const router = require('./routes');
require('dotenv').config();

const app = new Koa();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser());

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

// Health check
app.use(async (ctx) => {
  if (ctx.path === '/') {
    ctx.body = { 
      message: 'PepeStore API is running!',
      endpoints: {
        products: '/api/products',
        orders: '/api/orders',
        users: '/api/users'
      }
    };
  }
});

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
