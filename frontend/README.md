# Frontend - PepeStore React App

## Estructura

- `src/components/` - Componentes reutilizables (Navbar, etc.)
- `src/pages/` - Páginas/vistas principales
- `src/utils/` - Utilidades (API client, helpers)
- `public/` - Archivos estáticos

## Páginas Implementadas

1. **LandingPage** (`/`) - Catálogo de productos
2. **ProductPage** (`/product/:id`) - Detalles de un producto
3. **CartPage** (`/cart`) - Carrito de compras
4. **CheckoutPage** (`/checkout`) - Formulario de pago
5. **ConfirmationPage** (`/confirmation/:orderId`) - Confirmación de pedido
6. **ThankYouPage** (`/thank-you/:orderId`) - Página de agradecimiento

## Configuración

Crea un archivo `.env` en la raíz del frontend:

```
REACT_APP_API_URL=http://localhost:3001/api
```

## Scripts

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta los tests

## Características

- Routing con React Router
- Gestión de estado con hooks de React
- Manejo de sesión con localStorage
- Diseño responsive
- Integración con API REST del backend

