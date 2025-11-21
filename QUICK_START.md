# Inicio Rápido - PepeStore (Linux)

## 🚀 Instalación Rápida

### Opción 1: Script Automático (Recomendado)

1. **Dar permisos de ejecución a los scripts**:
```bash
chmod +x install.sh setup-db.sh start.sh
```

2. **Instalar dependencias**:
```bash
./install.sh
```

3. **Configurar base de datos**:
```bash
./setup-db.sh
```

4. **Iniciar la aplicación**:
```bash
./start.sh
```

### Opción 2: Instalación Manual

## 📋 Requisitos Previos

Asegúrate de tener instalado:
- **Node.js** (v14 o superior) - [Instalar](https://nodejs.org/)
- **PostgreSQL** (v12 o superior)
- **npm** (viene con Node.js)

Verificar instalación:
```bash
node --version
npm --version
psql --version
```

## 📋 Pasos para Completar la Instalación

### 1. Instalar Dependencias del Backend
```bash
cd backend
npm install
```

### 2. Crear Archivo .env del Backend
Crea `backend/.env`:
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pepestore
DB_USER=postgres
DB_PASSWORD=Upcmns132
NODE_ENV=development
```

### 3. Crear la Base de Datos PostgreSQL
```bash
# Conectar a PostgreSQL
sudo -u postgres psql

# Crear la base de datos
CREATE DATABASE pepestore;

# Salir
\q
```

O desde la línea de comandos:
```bash
sudo -u postgres createdb pepestore
```

### 4. Ejecutar Migraciones (Crear Tablas)
```bash
cd backend
npm run db:migrate
```

### 5. Poblar con Datos de Ejemplo
```bash
cd backend
npm run db:seed
```

### 6. Iniciar el Servidor Backend
```bash
cd backend
npm run dev
```

El backend estará en: `http://localhost:3001`

### 7. Instalar Dependencias del Frontend (en otra terminal)
```bash
cd frontend
npm install
```

### 8. Crear Archivo .env del Frontend
Crea `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:3001/api
```

### 9. Iniciar el Frontend
```bash
cd frontend
npm start
```

El frontend se abrirá en: `http://localhost:3000`

## 🔍 Verificar Instalación

Ejecuta:
```bash
node --version
npm --version
```

Si estos comandos funcionan, Node.js está instalado correctamente.

## 📝 Notas

- Los archivos `.env` se crean automáticamente con el script `install.sh`
- Asegúrate de que PostgreSQL esté corriendo antes de ejecutar las migraciones
- El backend debe estar corriendo antes de iniciar el frontend
- En Linux, puede que necesites usar `sudo` para comandos de PostgreSQL


