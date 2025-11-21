'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Papas Fritas Clásicas',
        description: 'Papas fritas crujientes y deliciosas, perfectas para cualquier momento del día.',
        price: 1500,
        image: 'https://via.placeholder.com/300x300?text=Papas+Fritas',
        category: 'Snacks',
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Coca Cola 500ml',
        description: 'Refrescante bebida gaseosa de cola, ideal para acompañar tus snacks.',
        price: 1200,
        image: 'https://via.placeholder.com/300x300?text=Coca+Cola',
        category: 'Bebidas',
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chocolate Snickers',
        description: 'Barra de chocolate con maní, caramelo y nougat. Energía instantánea.',
        price: 800,
        image: 'https://via.placeholder.com/300x300?text=Snickers',
        category: 'Dulces',
        stock: 75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Agua Mineral 500ml',
        description: 'Agua mineral natural, hidratación pura y refrescante.',
        price: 600,
        image: 'https://via.placeholder.com/300x300?text=Agua+Mineral',
        category: 'Bebidas',
        stock: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Doritos Nacho Cheese',
        description: 'Tortillas de maíz con sabor a queso nacho, irresistibles.',
        price: 1800,
        image: 'https://via.placeholder.com/300x300?text=Doritos',
        category: 'Snacks',
        stock: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Red Bull 250ml',
        description: 'Bebida energética que te da alas. Perfecta para mantenerte activo.',
        price: 2000,
        image: 'https://via.placeholder.com/300x300?text=Red+Bull',
        category: 'Bebidas',
        stock: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Galletas Oreo',
        description: 'Galletas de chocolate rellenas de crema, clásicas y deliciosas.',
        price: 2200,
        image: 'https://via.placeholder.com/300x300?text=Oreo',
        category: 'Dulces',
        stock: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jugo de Naranja 1L',
        description: 'Jugo de naranja natural, rico en vitamina C.',
        price: 1500,
        image: 'https://via.placeholder.com/300x300?text=Jugo+Naranja',
        category: 'Bebidas',
        stock: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};

