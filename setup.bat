@echo off
REM KrishakMart Setup Script for Windows
REM This script sets up the entire project for development

echo.
echo ========================================
echo   KrishakMart Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo [OK] Node.js found
node --version

echo.
echo Installing Backend Dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)
echo [OK] Backend dependencies installed

echo.
echo Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)
echo [OK] Frontend dependencies installed

cd ..

echo.
echo Setting up Backend...
cd backend

REM Check if .env exists
if not exist .env (
    echo [WARNING] .env file not found. Creating from .env.example...
    copy .env.example .env
    echo [OK] .env file created. Please edit it with your configuration.
) else (
    echo [OK] .env file exists
)

REM Create uploads directory
echo Creating uploads directory...
node scripts\createDirectories.js
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to create directories
) else (
    echo [OK] Directories created
)

cd ..

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Edit backend\.env with your MongoDB URI and JWT secret
echo 2. Start MongoDB (if using local instance)
echo 3. Run 'npm run dev' in backend directory
echo 4. Run 'npm run dev' in frontend directory
echo.
echo Quick Start Commands:
echo   Backend:  cd backend ^&^& npm run dev
echo   Frontend: cd frontend ^&^& npm run dev
echo.
echo Documentation:
echo   - README.md - Project overview
echo   - INTEGRATION_COMPLETE.md - Integration details
echo   - API_REFERENCE.md - API documentation
echo.
echo Happy coding!
echo.
pause
