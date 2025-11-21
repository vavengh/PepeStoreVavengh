# PepeStore 🐸

A full-stack e-commerce application built with Node.js, Koa, Sequelize, and React.js.

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Koa** - Web framework
- **Sequelize** - ORM for database management
- **SQLite** - Database (can be easily switched to PostgreSQL, MySQL, etc.)

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client

## Project Structure

```
PepeStoreVavengh/
├── backend/              # Backend API
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── models/      # Sequelize models
│   │   ├── controllers/ # Business logic
│   │   ├── routes/      # API routes
│   │   └── index.js     # Entry point
│   ├── package.json
│   └── .env.example
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service
│   │   └── App.js       # Main app component
│   ├── package.json
│   └── .env.example
└── README.md
```

## Features

- 📦 Product catalog with details
- 🛒 Shopping cart functionality
- 👤 User management
- 📝 Order processing
- 🎨 Modern, responsive UI
- 🔌 RESTful API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vavengh/PepeStoreVavengh.git
cd PepeStoreVavengh
```

2. Set up the backend:
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The backend will start on `http://localhost:3001`

3. Set up the frontend (in a new terminal):
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Development

### Backend Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Database Models

### Product
- id (Primary Key)
- name
- description
- price
- stock
- imageUrl
- category
- timestamps

### User
- id (Primary Key)
- name
- email (Unique)
- password
- address
- timestamps

### Order
- id (Primary Key)
- userId (Foreign Key)
- total
- status
- timestamps

### OrderItem
- id (Primary Key)
- orderId (Foreign Key)
- productId (Foreign Key)
- quantity
- price
- timestamps

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
