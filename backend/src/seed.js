const sequelize = require('./config/database');
const { Product, User, Order, OrderItem } = require('./models');

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database reset successfully.');

    // Create users
    const users = await User.bulkCreate([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        address: '123 Main St, New York, NY 10001'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password456',
        address: '456 Oak Ave, Los Angeles, CA 90001'
      }
    ]);
    console.log('Users created.');

    // Create products
    const products = await Product.bulkCreate([
      {
        name: 'Rare Pepe NFT',
        description: 'A rare and valuable Pepe collectible',
        price: 99.99,
        stock: 5,
        imageUrl: 'https://via.placeholder.com/300x200?text=Rare+Pepe+NFT',
        category: 'NFT'
      },
      {
        name: 'Pepe T-Shirt',
        description: 'Comfortable cotton t-shirt with Pepe design',
        price: 24.99,
        stock: 50,
        imageUrl: 'https://via.placeholder.com/300x200?text=Pepe+T-Shirt',
        category: 'Clothing'
      },
      {
        name: 'Pepe Mug',
        description: 'Ceramic mug with funny Pepe face',
        price: 14.99,
        stock: 100,
        imageUrl: 'https://via.placeholder.com/300x200?text=Pepe+Mug',
        category: 'Accessories'
      },
      {
        name: 'Pepe Stickers Pack',
        description: 'Set of 10 waterproof Pepe stickers',
        price: 9.99,
        stock: 200,
        imageUrl: 'https://via.placeholder.com/300x200?text=Pepe+Stickers',
        category: 'Accessories'
      },
      {
        name: 'Pepe Poster',
        description: 'High-quality poster for your wall',
        price: 19.99,
        stock: 30,
        imageUrl: 'https://via.placeholder.com/300x200?text=Pepe+Poster',
        category: 'Decor'
      },
      {
        name: 'Pepe Hoodie',
        description: 'Cozy hoodie with embroidered Pepe',
        price: 49.99,
        stock: 25,
        imageUrl: 'https://via.placeholder.com/300x200?text=Pepe+Hoodie',
        category: 'Clothing'
      }
    ]);
    console.log('Products created.');

    // Create sample order
    const order = await Order.create({
      userId: users[0].id,
      total: 139.97,
      status: 'completed'
    });

    await OrderItem.bulkCreate([
      {
        orderId: order.id,
        productId: products[0].id,
        quantity: 1,
        price: products[0].price
      },
      {
        orderId: order.id,
        productId: products[1].id,
        quantity: 1,
        price: products[1].price
      },
      {
        orderId: order.id,
        productId: products[2].id,
        quantity: 1,
        price: products[2].price
      }
    ]);
    console.log('Sample order created.');

    console.log('\\n✅ Database seeded successfully!');
    console.log(`- Created ${users.length} users`);
    console.log(`- Created ${products.length} products`);
    console.log(`- Created 1 sample order`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
