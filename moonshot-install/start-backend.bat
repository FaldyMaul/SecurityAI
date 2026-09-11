@echo off
title Moonshot Backend (FastAPI)
echo Starting Moonshot Backend on port 5001...
cd /d "%~dp0"
.\venv_311\Scripts\python.exe -m moonshot web-api
pause
