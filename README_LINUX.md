# PepeStore - Guía de Instalación para Linux

## 🐧 Instalación en Linux

Esta guía está optimizada para sistemas Linux (Ubuntu, Debian, Fedora, Arch, etc.)

## 📋 Requisitos Previos

### 1. Instalar Node.js y npm

**Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Fedora:**
```bash
sudo dnf install nodejs npm
```

**Arch Linux:**
```bash
sudo pacman -S nodejs npm
```

**Verificar instalación:**
```bash
node --version
npm --version
```

### 2. Instalar PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

**Fedora:**
```bash
sudo dnf install postgresql postgresql-server
sudo postgresql-setup --initdb
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

**Arch Linux:**
```bash
sudo pacman -S postgresql
sudo -u postgres initdb -D /var/lib/postgres/data
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

**Verificar instalación:**
```bash
psql --version
sudo systemctl status postgresql
```

## 🚀 Instalación Rápida

### Método 1: Scripts Automáticos (Recomendado)

1. **Dar permisos de ejecución:**
```bash
chmod +x install.sh setup-db.sh start.sh
```

2. **Instalar dependencias:**
```bash
./install.sh
```

3. **Configurar base de datos:**
```bash
./setup-db.sh
```

4. **Iniciar aplicación:**
```bash
./start.sh
```

### Método 2: Instalación Manual

Sigue los pasos en `INSTALL.md` o `SETUP.md`

## 🔧 Configuración de PostgreSQL

### Crear usuario y base de datos

```bash
# Conectar como usuario postgres
sudo -u postgres psql

# Crear base de datos
CREATE DATABASE pepestore;

# (Opcional) Crear usuario específico
CREATE USER pepestore_user WITH PASSWORD 'tu_contraseña';
GRANT ALL PRIVILEGES ON DATABASE pepestore TO pepestore_user;

# Salir
\q
```

### Configurar autenticación (si es necesario)

Edita `/etc/postgresql/[version]/main/pg_hba.conf`:
```
# Cambiar de:
local   all             all                                     peer

# A:
local   all             all                                     md5
```

Luego reinicia PostgreSQL:
```bash
sudo systemctl restart postgresql
```

## 📝 Archivos .env

Los scripts automáticos crean los archivos `.env` automáticamente. Si los creas manualmente:

**backend/.env:**
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pepestore
DB_USER=postgres
DB_PASSWORD=tu_contraseña
NODE_ENV=development
```

**frontend/.env:**
```env
REACT_APP_API_URL=http://localhost:3001/api
```

## 🐛 Solución de Problemas

### Error: "psql: error: connection to server failed"
```bash
# Verificar que PostgreSQL esté corriendo
sudo systemctl status postgresql

# Iniciar si no está corriendo
sudo systemctl start postgresql
```

### Error: "password authentication failed"
- Verifica las credenciales en `backend/.env`
- Asegúrate de que el usuario tenga permisos

### Error: "permission denied"
- Usa `sudo` para comandos de PostgreSQL si es necesario
- Verifica permisos de archivos: `chmod +x install.sh`

### Error: "EACCES: permission denied"
```bash
# Dar permisos al directorio de npm global (si es necesario)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Puerto 3000 o 3001 ya en uso
```bash
# Encontrar proceso usando el puerto
sudo lsof -i :3001
sudo lsof -i :3000

# Matar proceso
kill -9 <PID>
```

## 📚 Comandos Útiles

### PostgreSQL
```bash
# Conectar a base de datos
sudo -u postgres psql -d pepestore

# Listar bases de datos
sudo -u postgres psql -l

# Ver tablas
\dt

# Salir
\q
```

### Node.js
```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Inicio Rápido

Una vez instalado:

1. **Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

2. **Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

3. **Abrir navegador:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api/health

## 📖 Documentación Adicional

- `SETUP.md` - Guía detallada de configuración
- `INSTALL.md` - Instrucciones paso a paso
- `QUICK_START.md` - Inicio rápido

