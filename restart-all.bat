@echo off
echo Restarting KrishakMart servers...
echo.
echo Close any running backend/frontend terminals first!
echo.
pause
echo.
echo Starting backend...
start cmd /k "cd backend && npm start"
timeout /t 3
echo.
echo Starting frontend...
start cmd /k "cd frontend && npm run dev"
echo.
echo Both servers starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Clear browser cache (Ctrl+Shift+R) after servers start!
pause
