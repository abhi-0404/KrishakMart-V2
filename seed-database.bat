@echo off
echo ========================================
echo   KrishakMart Database Seeder
echo   "Mitti Se Digital Tak"
echo ========================================
echo.
echo This will populate the database with:
echo - 5 test users (Admin, Farmers, Shop Owners)
echo - 15 sample products across all categories
echo.
echo Make sure MongoDB is running!
echo.
pause

cd backend

echo.
echo Seeding database...
echo.

call npm run seed

echo.
echo ========================================
echo   Database seeding complete!
echo ========================================
echo.
pause
