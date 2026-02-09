@echo off
echo ========================================
echo   KrishakMart Frontend
echo   "Mitti Se Digital Tak"
echo ========================================
echo.

cd frontend

echo Checking if dependencies are installed...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Starting frontend server...
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
