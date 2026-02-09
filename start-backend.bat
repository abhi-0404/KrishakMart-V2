@echo off
echo ========================================
echo   KrishakMart Backend Server
echo   "Mitti Se Digital Tak"
echo ========================================
echo.

cd backend

echo Checking if dependencies are installed...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Starting backend server...
echo Backend will run on: http://localhost:5000
echo API Health Check: http://localhost:5000/api/health
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
