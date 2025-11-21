# Backend - PepeStore API

## Estructura

- `config/` - Configuración de Sequelize y base de datos
- `controllers/` - Lógica de negocio y manejo de requests
- `models/` - Modelos de Sequelize (Product, Cart, Order, OrderItem)
- `routes/` - Definición de rutas de la API
- `migrations/` - Migraciones de base de datos
- `seeders/` - Datos de ejemplo para poblar la base de datos

## Scripts Disponibles

- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon
- `npm run db:migrate` - Ejecuta las migraciones
- `npm run db:migrate:undo` - Revierte la última migración
- `npm run db:seed` - Ejecuta los seeders
- `npm run db:seed:undo` - Revierte los seeders

## Endpoints

### Productos
- `GET /api/products` - Lista todos los productos
- `GET /api/products/:id` - Obtiene un producto por ID

### Carrito
- `GET /api/cart?sessionId=xxx` - Obtiene items del carrito
- `POST /api/cart` - Agrega producto al carrito
- `PUT /api/cart/:id` - Actualiza cantidad de un item
- `DELETE /api/cart/:id` - Elimina un item del carrito
- `DELETE /api/cart?sessionId=xxx` - Limpia todo el carrito

### Órdenes
- `POST /api/orders` - Crea una nueva orden
- `GET /api/orders/:id` - Obtiene una orden por ID
- `PUT /api/orders/:id/status` - Actualiza el estado de una orden

## Modelos

### Product
- id, name, description, price, image, category, stock

### Cart
- id, sessionId, productId, quantity

### Order
- id, sessionId, total, status, customerName, customerEmail

### OrderItem
- id, orderId, productId, quantity, price

