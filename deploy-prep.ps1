# Quick deployment preparation script for Windows

Write-Host "🚀 Preparing HopeAlong for deployment..." -ForegroundColor Cyan

Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
Set-Location server
npm install

Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location ..\hopealong-frontend
npm install

Write-Host "🏗️ Building frontend for production..." -ForegroundColor Yellow
npm run build

Write-Host "✅ Deployment preparation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Deploy backend to Railway/Render using the server folder"
Write-Host "2. Deploy frontend to Vercel/Netlify using the hopealong-frontend folder"
Write-Host "3. Update environment variables on both platforms"
Write-Host "4. Test your deployed application!"
Write-Host ""
Write-Host "📖 See DEPLOYMENT.md for detailed instructions" -ForegroundColor Yellow
