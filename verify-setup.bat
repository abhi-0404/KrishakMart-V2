@echo off
echo ========================================
echo   KrishakMart Setup Verification
echo   "Mitti Se Digital Tak"
echo ========================================
echo.

echo Checking Backend Setup...
echo.

cd backend

echo [1/5] Checking if node_modules exists...
if exist "node_modules\" (
    echo ✓ Backend dependencies installed
) else (
    echo ✗ Backend dependencies NOT installed
    echo   Run: cd backend ^&^& npm install
)

echo.
echo [2/5] Checking if .env file exists...
if exist ".env" (
    echo ✓ Environment file exists
) else (
    echo ✗ Environment file NOT found
    echo   Run: copy .env.example .env
)

echo.
echo [3/5] Checking if uploads directory exists...
if exist "uploads\products\" (
    echo ✓ Uploads directory exists
) else (
    echo ✗ Uploads directory NOT found
    echo   Creating directory...
    mkdir uploads\products
    echo ✓ Directory created
)

cd ..

echo.
echo Checking Frontend Setup...
echo.

cd frontend

echo [4/5] Checking if node_modules exists...
if exist "node_modules\" (
    echo ✓ Frontend dependencies installed
) else (
    echo ✗ Frontend dependencies NOT installed
    echo   Run: cd frontend ^&^& npm install
)

cd ..

echo.
echo [5/5] Checking MongoDB...
echo.
echo Attempting to connect to MongoDB...
mongosh --eval "db.version()" --quiet >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ MongoDB is running
) else (
    echo ⚠ MongoDB connection failed
    echo   Make sure MongoDB is installed and running
    echo   Windows: net start MongoDB
    echo   Or install from: https://www.mongodb.com/try/download/community
)

echo.
echo ========================================
echo   Verification Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. If any checks failed, follow the instructions above
echo 2. Run seed-database.bat to populate test data
echo 3. Run start-backend.bat in one terminal
echo 4. Run start-frontend.bat in another terminal
echo 5. Open http://localhost:5173 in your browser
echo.
echo Test Credentials:
echo   Admin: 9999999999 / admin123
echo   Farmer: 9876543210 / farmer123
echo   Shop Owner: 9876543220 / shop123
echo.
pause
