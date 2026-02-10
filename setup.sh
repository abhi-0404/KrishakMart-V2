#!/bin/bash

# KrishakMart Setup Script
# This script sets up the entire project for development

echo "🌾 KrishakMart Setup Script"
echo "=========================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Check if MongoDB is running (optional)
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✓ MongoDB found${NC}"
else
    echo -e "${YELLOW}⚠ MongoDB not found locally. Make sure you have MongoDB Atlas URI configured.${NC}"
fi

echo ""
echo "📦 Installing Backend Dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

echo ""
echo "📦 Installing Frontend Dependencies..."
cd ../frontend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

cd ..

echo ""
echo "🔧 Setting up Backend..."
cd backend

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠ .env file not found. Creating from .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created. Please edit it with your configuration.${NC}"
else
    echo -e "${GREEN}✓ .env file exists${NC}"
fi

# Create uploads directory
echo "📁 Creating uploads directory..."
node scripts/createDirectories.js
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Directories created${NC}"
else
    echo -e "${RED}❌ Failed to create directories${NC}"
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Edit backend/.env with your MongoDB URI and JWT secret"
echo "2. Start MongoDB (if using local instance)"
echo "3. Run 'npm run dev' in backend directory"
echo "4. Run 'npm run dev' in frontend directory"
echo ""
echo "🚀 Quick Start Commands:"
echo "   Backend:  cd backend && npm run dev"
echo "   Frontend: cd frontend && npm run dev"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Project overview"
echo "   - INTEGRATION_COMPLETE.md - Integration details"
echo "   - API_REFERENCE.md - API documentation"
echo ""
echo "Happy coding! 🌾"
