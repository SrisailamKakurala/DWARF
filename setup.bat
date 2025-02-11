@echo off
cd /d "%~dp0"

:: Create backend directories and files
mkdir backend
mkdir backend\routes
echo. > backend\server.js
echo. > backend\routes\generate.js
echo. > backend\package.json

:: Create frontend directories and files
mkdir frontend
mkdir frontend\src
mkdir frontend\src\components
mkdir frontend\src\styles
echo. > frontend\src\App.js
echo. > frontend\src\components\CodeEditor.js
echo. > frontend\src\components\Preview.js
echo. > frontend\src\components\GenerateButton.js
echo. > frontend\src\styles\tailwind.css
echo. > frontend\package.json

:: Create README file
echo. > README.md

echo Structure created successfully!
pause
