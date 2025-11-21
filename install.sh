#!/bin/bash

# Script de instalación para PepeStore en Linux
# Este script instala las dependencias del backend y frontend

set -e  # Salir si hay algún error

echo "🚀 Instalando PepeStore..."
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js no está instalado.${NC}"
    echo "Por favor instala Node.js desde https://nodejs.org/"
    exit 1
fi

# Verificar que npm esté instalado
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}⚠️  npm no está instalado.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js y npm encontrados${NC}"
echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"
echo ""

# Crear archivos .env si no existen
if [ ! -f "backend/.env" ]; then
    echo "📝 Creando backend/.env..."
    cat > backend/.env << EOF
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pepestore
DB_USER=postgres
DB_PASSWORD=Upcmns132
NODE_ENV=development
EOF
    echo -e "${GREEN}✅ backend/.env creado${NC}"
else
    echo -e "${YELLOW}⚠️  backend/.env ya existe${NC}"
fi

if [ ! -f "frontend/.env" ]; then
    echo "📝 Creando frontend/.env..."
    cat > frontend/.env << EOF
REACT_APP_API_URL=http://localhost:3001/api
EOF
    echo -e "${GREEN}✅ frontend/.env creado${NC}"
else
    echo -e "${YELLOW}⚠️  frontend/.env ya existe${NC}"
fi

echo ""
echo "📦 Instalando dependencias del backend..."
cd backend
npm install
echo -e "${GREEN}✅ Dependencias del backend instaladas${NC}"
cd ..

echo ""
echo "📦 Instalando dependencias del frontend..."
cd frontend
npm install
echo -e "${GREEN}✅ Dependencias del frontend instaladas${NC}"
cd ..

echo ""
echo -e "${GREEN}🎉 Instalación completada!${NC}"
echo ""
echo "📋 Próximos pasos:"
echo "1. Asegúrate de que PostgreSQL esté corriendo"
echo "2. Crea la base de datos: CREATE DATABASE pepestore;"
echo "3. Ejecuta las migraciones: cd backend && npm run db:migrate"
echo "4. Pobla con datos: cd backend && npm run db:seed"
echo "5. Inicia el backend: cd backend && npm run dev"
echo "6. Inicia el frontend (en otra terminal): cd frontend && npm start"

