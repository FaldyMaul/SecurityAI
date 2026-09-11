@echo off
title Moonshot Suite
echo Starting Moonshot Backend and Frontend...
cd /d "%~dp0"
start "Moonshot Backend" cmd /c ".\venv_311\Scripts\python.exe -m moonshot web-api"
start "Moonshot Frontend" cmd /c "cd /d moonshot-ui && npm run dev"
echo Both services are starting up in separate windows.
echo - Backend: http://127.0.0.1:5001
echo - Frontend: http://localhost:3001
echo.
pause
