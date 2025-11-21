# PepeStore - E-commerce de Snacks y Bebidas

## Descripción

PepeStore es un mini e-commerce desarrollado para la prueba técnica de Fintoc. La aplicación permite a los usuarios comprar snacks y bebidas con un flujo completo desde la visualización de productos hasta la confirmación de compra.

## Estado del Proyecto

✅ **Backend completo**: API REST con Node.js, Express, PostgreSQL y Sequelize
✅ **Frontend completo**: Aplicación React con todas las vistas implementadas
⏳ **Pendiente**: Integración con Fintoc Payments (preparado para implementar)

## Características Implementadas

### Vistas Completadas

- ✅ **Vista Landing Page**: Catálogo de productos con precios
- ✅ **Vista Producto**: Detalles del producto con botón para agregar al carrito
- ✅ **Vista de Carrito**: Gestión de productos en el carrito con cantidades
- ✅ **Vista de Pago**: Formulario de información del cliente
- ✅ **Vista de Confirmación**: Revisión y confirmación del pedido
- ✅ **Vista de Thank You**: Página de agradecimiento post-compra

### Funcionalidades

- Catálogo de productos con categorías
- Carrito de compras persistente (sessionId)
- Gestión de cantidades en el carrito
- Creación y seguimiento de órdenes
- Sistema de estados de órdenes (pending, confirmed, completed, cancelled)

## Tecnologías Utilizadas

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize
- sequelize-cli

### Frontend
- React.js
- React Router DOM
- Axios

## Instalación y Configuración

Para instrucciones detalladas de instalación, consulta el archivo [SETUP.md](./SETUP.md)

### Inicio Rápido

1. **Backend**:
   ```bash
   cd backend
   npm install
   # Configurar .env con credenciales de PostgreSQL
   npm run db:migrate
   npm run db:seed
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   # Configurar .env con REACT_APP_API_URL
   npm start
   ```

## Estructura del Proyecto

```
PepeStoreVavengh/
├── backend/          # API REST con Express y Sequelize
├── frontend/         # Aplicación React
├── SETUP.md         # Guía de instalación detallada
└── README.md        # Este archivo
```

## Próximos Pasos

- [ ] Integración con Fintoc Payments API
- [ ] Implementar webhooks para actualización de estados
- [ ] Mejorar manejo de errores
- [ ] Agregar tests unitarios y de integración
- [ ] Deploy en producción

## Notas

- El sistema de pago con Fintoc está preparado pero no implementado aún
- Las órdenes se pueden crear y confirmar manualmente
- El carrito utiliza localStorage para mantener la sesión del usuario