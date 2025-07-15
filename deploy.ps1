# deploy.ps1
# Simple deployment helper script

Write-Host "🚀 HopeAlong Deployment Helper" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "📋 Pre-Deployment Checklist:" -ForegroundColor Yellow
Write-Host "✓ MongoDB Atlas cluster created" -ForegroundColor Green
Write-Host "✓ Environment variables ready" -ForegroundColor Green
Write-Host "✓ GitHub repository updated" -ForegroundColor Green

Write-Host ""
Write-Host "🔗 Deployment Links:" -ForegroundColor Yellow
Write-Host "1. MongoDB Atlas: https://cloud.mongodb.com" -ForegroundColor Blue
Write-Host "2. Railway (Backend): https://railway.app" -ForegroundColor Blue
Write-Host "3. Vercel (Frontend): https://vercel.com" -ForegroundColor Blue

Write-Host ""
Write-Host "📝 Don't forget to:" -ForegroundColor Yellow
Write-Host "• Set environment variables in Railway" -ForegroundColor White
Write-Host "• Set VITE_API_URL in Vercel" -ForegroundColor White
Write-Host "• Update Google OAuth callback URLs" -ForegroundColor White
Write-Host "• Test all features after deployment" -ForegroundColor White

Write-Host ""
Write-Host "📖 Full guide available in DEPLOYMENT_GUIDE.md" -ForegroundColor Green
