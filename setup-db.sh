#!/bin/bash

# Script para configurar la base de datos PostgreSQL en Linux

set -e

echo "🗄️  Configurando base de datos PostgreSQL..."
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar que PostgreSQL esté instalado
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL no está instalado.${NC}"
    echo "Instala PostgreSQL con:"
    echo "  Ubuntu/Debian: sudo apt-get install postgresql postgresql-contrib"
    echo "  Fedora: sudo dnf install postgresql postgresql-server"
    echo "  Arch: sudo pacman -S postgresql"
    exit 1
fi

echo -e "${GREEN}✅ PostgreSQL encontrado${NC}"
echo ""

# Leer configuración del .env
if [ ! -f "backend/.env" ]; then
    echo -e "${RED}❌ backend/.env no encontrado${NC}"
    echo "Ejecuta primero: ./install.sh"
    exit 1
fi

# Extraer valores del .env
source <(grep -v '^#' backend/.env | sed 's/^/export /')

echo "Configuración detectada:"
echo "  DB_NAME: ${DB_NAME:-pepestore}"
echo "  DB_USER: ${DB_USER:-postgres}"
echo ""

# Crear base de datos
echo "Creando base de datos '${DB_NAME:-pepestore}'..."
if psql -U ${DB_USER:-postgres} -lqt | cut -d \| -f 1 | grep -qw ${DB_NAME:-pepestore}; then
    echo -e "${YELLOW}⚠️  La base de datos ya existe${NC}"
else
    createdb -U ${DB_USER:-postgres} ${DB_NAME:-pepestore}
    echo -e "${GREEN}✅ Base de datos creada${NC}"
fi

echo ""
echo "Ejecutando migraciones..."
cd backend
npm run db:migrate
echo -e "${GREEN}✅ Migraciones completadas${NC}"

echo ""
echo "Poblando con datos de ejemplo..."
npm run db:seed
echo -e "${GREEN}✅ Datos de ejemplo cargados${NC}"

cd ..
echo ""
echo -e "${GREEN}🎉 Base de datos configurada correctamente!${NC}"

