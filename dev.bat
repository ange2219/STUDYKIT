@echo off
setlocal
cd /d "%~dp0"
set "APP_URL=http://localhost:5050/#/bibliotheque"

rem If both app and server are already available, reuse them.
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "try { $null = Invoke-WebRequest -Uri 'http://localhost:5050/' -TimeoutSec 2; Start-Process '%APP_URL%'; exit 0 } catch { exit 1 }"
if not errorlevel 1 exit /b 0

rem Reuse an API that is already listening on port 5052.
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "try { $null = Invoke-WebRequest -Uri 'http://127.0.0.1:5052/api/books' -TimeoutSec 2; exit 0 } catch { exit 1 }"
if errorlevel 1 (
  rem No API is active, so start both API and web app.
  start "StudyKit local server" cmd /k "cd /d ""%~dp0"" && npm run dev"
) else (
  rem API is active, so start only Vite and avoid an EADDRINUSE error.
  start "StudyKit local web app" cmd /k "cd /d ""%~dp0"" && npm run dev:web"
)

rem Open the library after Vite responds.
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$url='%APP_URL%'; for ($i = 0; $i -lt 90; $i++) { try { $null = Invoke-WebRequest -Uri 'http://localhost:5050/' -TimeoutSec 2; Start-Process $url; exit 0 } catch { Start-Sleep -Seconds 1 } }; Write-Host 'StudyKit did not start. Check the server window for an error.'; exit 1"
if errorlevel 1 pause
