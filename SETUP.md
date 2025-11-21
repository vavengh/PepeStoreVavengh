# Guía de Instalación - PepeStore

Esta guía te ayudará a configurar y ejecutar la aplicación PepeStore en tu entorno local.

## Requisitos Previos

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

## Configuración del Backend

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar la base de datos

1. Crea una base de datos PostgreSQL llamada `pepestore`:

```sql
CREATE DATABASE pepestore;
```

2. Crea un archivo `.env` en la carpeta `backend` basándote en `.env.example`:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pepestore
DB_USER=postgres
DB_PASSWORD=tu_contraseña
NODE_ENV=development
```

### 3. Ejecutar migraciones

```bash
npm run db:migrate
```

### 4. Ejecutar seeders (datos de ejemplo)

```bash
npm run db:seed
```

### 5. Iniciar el servidor

```bash
npm run dev
```

El servidor estará corriendo en `http://localhost:3001`

## Configuración del Frontend

### 1. Instalar dependencias

```bash
cd frontend
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `frontend`:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

### 3. Iniciar la aplicación

```bash
npm start
```

La aplicación estará corriendo en `http://localhost:3000`

## Estructura del Proyecto

```
PepeStoreVavengh/
├── backend/
│   ├── config/          # Configuración de Sequelize
│   ├── controllers/     # Controladores de la API
│   ├── migrations/      # Migraciones de la base de datos
│   ├── models/          # Modelos de Sequelize
│   ├── routes/          # Rutas de Express
│   ├── seeders/         # Datos de ejemplo
│   └── server.js        # Punto de entrada del servidor
├── frontend/
│   ├── public/          # Archivos públicos
│   └── src/
│       ├── components/  # Componentes reutilizables
│       ├── pages/       # Páginas/vistas
│       ├── utils/       # Utilidades (API, etc.)
│       └── App.js       # Componente principal
└── README.md
```

## Endpoints de la API

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto por ID

### Carrito
- `GET /api/cart?sessionId=xxx` - Obtener items del carrito
- `POST /api/cart` - Agregar producto al carrito
- `PUT /api/cart/:id` - Actualizar cantidad de un item
- `DELETE /api/cart/:id` - Eliminar item del carrito
- `DELETE /api/cart?sessionId=xxx` - Limpiar carrito

### Órdenes
- `POST /api/orders` - Crear una nueva orden
- `GET /api/orders/:id` - Obtener una orden por ID
- `PUT /api/orders/:id/status` - Actualizar estado de una orden

## Flujo de la Aplicación

1. **Landing Page**: Vista principal con todos los productos
2. **Vista Producto**: Detalles de un producto individual con opción de agregar al carrito
3. **Carrito**: Ver y gestionar productos en el carrito
4. **Checkout**: Formulario de información del cliente
5. **Confirmación**: Revisar y confirmar el pedido
6. **Thank You**: Página de agradecimiento después de la compra

## Notas

- El sistema de pago con Fintoc aún no está implementado. Las órdenes se crean con estado "pending" y pueden ser confirmadas manualmente.
- El carrito se gestiona mediante un `sessionId` almacenado en localStorage del navegador.
- Los datos de ejemplo incluyen 8 productos (snacks y bebidas).

## Solución de Problemas

### Error de conexión a la base de datos
- Verifica que PostgreSQL esté corriendo
- Confirma las credenciales en el archivo `.env`
- Asegúrate de que la base de datos `pepestore` exista

### Error CORS en el frontend
- Verifica que el backend esté corriendo en el puerto 3001
- Confirma que `REACT_APP_API_URL` esté configurado correctamente

### Problemas con migraciones
- Si necesitas resetear la base de datos, puedes ejecutar:
  ```bash
  npm run db:migrate:undo:all
  npm run db:migrate
  npm run db:seed
  ```

