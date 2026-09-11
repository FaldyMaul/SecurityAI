@echo off
title Moonshot Frontend (Next.js)
echo Starting Moonshot Frontend on port 3001...
cd /d "%~dp0\moonshot-ui"
npm run dev
pause
