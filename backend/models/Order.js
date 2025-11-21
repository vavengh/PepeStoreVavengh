module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
      defaultValue: 'pending'
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'orders',
    timestamps: true
  });

  return Order;
};

