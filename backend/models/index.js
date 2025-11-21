const { Sequelize } = require('sequelize');
const config = require('../config/database.js');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Product = require('./Product')(sequelize, Sequelize);
db.Cart = require('./Cart')(sequelize, Sequelize);
db.Order = require('./Order')(sequelize, Sequelize);
db.OrderItem = require('./OrderItem')(sequelize, Sequelize);

// Define associations
db.Cart.belongsTo(db.Product, { foreignKey: 'productId', as: 'product' });
db.OrderItem.belongsTo(db.Order, { foreignKey: 'orderId', as: 'order' });
db.OrderItem.belongsTo(db.Product, { foreignKey: 'productId', as: 'product' });
db.Order.hasMany(db.OrderItem, { foreignKey: 'orderId', as: 'items' });

module.exports = db;

