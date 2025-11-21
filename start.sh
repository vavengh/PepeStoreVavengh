#!/bin/bash

# Script para iniciar backend y frontend en Linux

set -e

echo "🚀 Iniciando PepeStore..."
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar que los .env existan
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  backend/.env no encontrado${NC}"
    echo "Ejecuta primero: ./install.sh"
    exit 1
fi

if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}⚠️  frontend/.env no encontrado${NC}"
    echo "Ejecuta primero: ./install.sh"
    exit 1
fi

# Verificar que node_modules existan
if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Dependencias del backend no instaladas${NC}"
    echo "Ejecuta: ./install.sh"
    exit 1
fi

if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Dependencias del frontend no instaladas${NC}"
    echo "Ejecuta: ./install.sh"
    exit 1
fi

# Función para limpiar al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    exit
}

trap cleanup SIGINT SIGTERM

# Iniciar backend
echo -e "${GREEN}📦 Iniciando backend...${NC}"
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Esperar un poco para que el backend inicie
sleep 3

# Iniciar frontend
echo -e "${GREEN}📦 Iniciando frontend...${NC}"
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${GREEN}✅ Servidores iniciados!${NC}"
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:3000"
echo ""
echo "Presiona Ctrl+C para detener los servidores"

# Esperar a que terminen
wait

