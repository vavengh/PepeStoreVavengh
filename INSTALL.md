# Guía de Instalación Paso a Paso - PepeStore

## ✅ Estado Actual
- ✅ Estructura de archivos creada
- ✅ Migraciones y modelos definidos
- ❌ Dependencias NO instaladas
- ❌ Base de datos NO creada
- ❌ Archivos .env NO configurados

## 📋 Requisitos Previos

Asegúrate de tener instalado:
- **Node.js** (v14 o superior) - [Descargar](https://nodejs.org/)
- **PostgreSQL** (v12 o superior) - [Descargar](https://www.postgresql.org/download/)
- **npm** (viene con Node.js)

Verificar instalación:
```bash
node --version
npm --version
psql --version
```

## 🚀 Pasos de Instalación

### Opción Rápida: Scripts Automáticos

```bash
# Dar permisos de ejecución
chmod +x install.sh setup-db.sh start.sh

# Instalar dependencias
./install.sh

# Configurar base de datos
./setup-db.sh

# Iniciar aplicación
./start.sh
```

### Instalación Manual

### Paso 1: Configurar PostgreSQL

1. **Iniciar PostgreSQL** (si no está corriendo como servicio)
```bash
# Ubuntu/Debian
sudo systemctl start postgresql

# O verificar estado
sudo systemctl status postgresql
```

2. **Crear la base de datos**:
```bash
# Conectar a PostgreSQL
sudo -u postgres psql

# Crear la base de datos
CREATE DATABASE pepestore;

# Salir de psql
\q
```

O desde la línea de comandos:
```bash
sudo -u postgres createdb pepestore
```

### Paso 2: Configurar Backend

1. **Navegar a la carpeta backend**:
```bash
cd backend
```

2. **Crear archivo .env**:
Crea un archivo `.env` en la carpeta `backend/` con este contenido:
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pepestore
DB_USER=postgres
DB_PASSWORD=tu_contraseña_postgres
NODE_ENV=development
```

**⚠️ IMPORTANTE**: Reemplaza `tu_contraseña_postgres` con tu contraseña real de PostgreSQL.

3. **Instalar dependencias**:
```bash
npm install
```

4. **Ejecutar migraciones** (crear las tablas):
```bash
npm run db:migrate
```

5. **Ejecutar seeders** (poblar con datos de ejemplo):
```bash
npm run db:seed
```

6. **Iniciar el servidor** (en otra terminal):
```bash
npm run dev
```

El backend debería estar corriendo en `http://localhost:3001`

### Paso 3: Configurar Frontend

1. **Abrir una nueva terminal** y navegar a la carpeta frontend:
```bash
cd frontend
```

2. **Crear archivo .env**:
Crea un archivo `.env` en la carpeta `frontend/` con este contenido:
```env
REACT_APP_API_URL=http://localhost:3001/api
```

3. **Instalar dependencias**:
```bash
npm install
```

4. **Iniciar la aplicación**:
```bash
npm start
```

El frontend debería abrirse automáticamente en `http://localhost:3000`

## ✅ Verificación

Una vez completados los pasos:

1. **Backend funcionando**: 
   - Visita `http://localhost:3001/api/health`
   - Deberías ver: `{"status":"ok","message":"PepeStore API is running"}`

2. **Frontend funcionando**:
   - Debería abrirse automáticamente en el navegador
   - Deberías ver la página de inicio con productos

3. **Base de datos**:
   - Conecta a PostgreSQL y verifica:
   ```sql
   \c pepestore
   \dt
   ```
   Deberías ver las tablas: products, carts, orders, order_items

## 🐛 Solución de Problemas

### Error: "Cannot find module"
- Ejecuta `npm install` en la carpeta correspondiente

### Error: "password authentication failed"
- Verifica las credenciales en el archivo `.env`
- Asegúrate de que PostgreSQL esté corriendo

### Error: "database does not exist"
- Crea la base de datos manualmente: `CREATE DATABASE pepestore;`

### Error: "relation does not exist"
- Ejecuta las migraciones: `npm run db:migrate`

### Error CORS en el frontend
- Verifica que el backend esté corriendo en el puerto 3001
- Verifica que `REACT_APP_API_URL` en `.env` sea correcto

## 📝 Notas

- El backend debe estar corriendo antes de usar el frontend
- Mantén ambas terminales abiertas (backend y frontend)
- Los cambios en el código se reflejarán automáticamente con `npm run dev`


