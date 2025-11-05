@echo off
echo Deploying to neuracoder.com...
git push origin main
echo Waiting for GitHub...
timeout /t 3 /nobreak > nul
echo Pulling changes on server...
ssh -p 65002 u777479293@147.79.84.35 "cd domains/neuracoder.com/public_html && git pull origin main"
echo.
echo Deploy completed!
pause
