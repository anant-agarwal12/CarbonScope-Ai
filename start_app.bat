@echo off
echo Starting CarbonScope AI Ecosystem...
echo.

:: Check for MongoDB
echo Checking MongoDB Service...
net session >nul 2>&1
if %errorLevel% == 0 (
    net start MongoDB
) else (
    echo Note: Admin privileges recommended to auto-start MongoDB Service.
    echo If MongoDB is not running, please start it manually via services.msc
)

echo.
echo Seeding Database with latest factors...
python seed_db.py

echo.
echo Launching Apps...
npm start

echo.
pause
