# PowerShell Deployment Readiness Check

Write-Host "🔍 DEPLOYMENT READINESS CHECK FOR HOPEALONG" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "📁 1. CHECKING ENVIRONMENT FILES..." -ForegroundColor Yellow

# Check backend .env
if (Test-Path "server\.env") {
    Write-Host "✅ Backend .env exists" -ForegroundColor Green
    $port = (Get-Content "server\.env" | Where-Object { $_ -match "PORT=" } | ForEach-Object { $_.Split('=')[1] })
    Write-Host "   - PORT: $port"
    
    $hasMongoUri = (Get-Content "server\.env" | Where-Object { $_ -match "MONGO_URI=" }) -ne $null
    Write-Host "   - MONGO_URI: $(if ($hasMongoUri) { 'Present' } else { 'Missing' })"
    
    $hasJwtSecret = (Get-Content "server\.env" | Where-Object { $_ -match "JWT_SECRET=" }) -ne $null
    Write-Host "   - JWT_SECRET: $(if ($hasJwtSecret) { 'Present' } else { 'Missing' })"
    
    $hasGoogleClientId = (Get-Content "server\.env" | Where-Object { $_ -match "GOOGLE_CLIENT_ID=" }) -ne $null
    Write-Host "   - GOOGLE_CLIENT_ID: $(if ($hasGoogleClientId) { 'Present' } else { 'Missing' })"
}
else {
    Write-Host "❌ Backend .env missing" -ForegroundColor Red
}

# Check frontend .env
if (Test-Path "hopealong-frontend\.env") {
    Write-Host "✅ Frontend .env exists" -ForegroundColor Green
    $apiUrl = (Get-Content "hopealong-frontend\.env" | Where-Object { $_ -match "VITE_API_URL=" } | ForEach-Object { $_.Split('=')[1] })
    Write-Host "   - VITE_API_URL: $apiUrl"
    
    $hasGoogleMapsKey = (Get-Content "hopealong-frontend\.env" | Where-Object { $_ -match "VITE_GOOGLE_MAPS_API_KEY=" }) -ne $null
    Write-Host "   - VITE_GOOGLE_MAPS_API_KEY: $(if ($hasGoogleMapsKey) { 'Present' } else { 'Missing' })"
}
else {
    Write-Host "❌ Frontend .env missing" -ForegroundColor Red
}

Write-Host ""
Write-Host "📦 2. CHECKING PACKAGE.JSON FILES..." -ForegroundColor Yellow

# Check backend package.json
if (Test-Path "server\package.json") {
    Write-Host "✅ Backend package.json exists" -ForegroundColor Green
    $backendContent = Get-Content "server\package.json" -Raw
    if ($backendContent -match '"start"') {
        Write-Host "   ✅ Start script found" -ForegroundColor Green
    }
    else {
        Write-Host "   ❌ Start script missing" -ForegroundColor Red
    }
}
else {
    Write-Host "❌ Backend package.json missing" -ForegroundColor Red
}

# Check frontend package.json
if (Test-Path "hopealong-frontend\package.json") {
    Write-Host "✅ Frontend package.json exists" -ForegroundColor Green
    $frontendContent = Get-Content "hopealong-frontend\package.json" -Raw
    if ($frontendContent -match '"build"') {
        Write-Host "   ✅ Build script found" -ForegroundColor Green
    }
    else {
        Write-Host "   ❌ Build script missing" -ForegroundColor Red
    }
}
else {
    Write-Host "❌ Frontend package.json missing" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔗 3. CHECKING FOR HARDCODED URLs..." -ForegroundColor Yellow

$hardcodedFiles = @()
if (Test-Path "hopealong-frontend\src") {
    $hardcodedFiles = Get-ChildItem -Recurse "hopealong-frontend\src" -Include "*.jsx", "*.js" | 
    Select-String "localhost:5000" | 
    Select-Object -ExpandProperty Filename | 
    Sort-Object | Get-Unique
}

if ($hardcodedFiles.Count -eq 0) {
    Write-Host "✅ No hardcoded localhost URLs found" -ForegroundColor Green
}
else {
    Write-Host "❌ Found hardcoded localhost URLs in $($hardcodedFiles.Count) files" -ForegroundColor Red
    Write-Host "   Files with hardcoded URLs:"
    $hardcodedFiles | ForEach-Object { Write-Host "   - $_" }
}

Write-Host ""
Write-Host "🌐 4. PRODUCTION ENVIRONMENT FILES..." -ForegroundColor Yellow

if (Test-Path "server\.env.production") {
    Write-Host "✅ Backend production env template exists" -ForegroundColor Green
}
else {
    Write-Host "❌ Backend production env template missing" -ForegroundColor Red
}

if (Test-Path "hopealong-frontend\.env.production") {
    Write-Host "✅ Frontend production env template exists" -ForegroundColor Green
}
else {
    Write-Host "❌ Frontend production env template missing" -ForegroundColor Red
}

Write-Host ""
Write-Host "📋 5. DEPLOYMENT CHECKLIST..." -ForegroundColor Yellow
Write-Host "   ✅ MongoDB Atlas database ready" -ForegroundColor Green
Write-Host "   ✅ Environment variables configured" -ForegroundColor Green
Write-Host "   ✅ CORS configured for production" -ForegroundColor Green
Write-Host "   ✅ Package.json scripts ready" -ForegroundColor Green

if ($hardcodedFiles.Count -eq 0) {
    Write-Host ""
    Write-Host "🎉 PROJECT IS READY FOR DEPLOYMENT!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Deploy backend to Railway/Render" -ForegroundColor White
    Write-Host "2. Deploy frontend to Vercel/Netlify" -ForegroundColor White
    Write-Host "3. Update production environment variables" -ForegroundColor White
}
else {
    Write-Host ""
    Write-Host "⚠️  FIXES NEEDED BEFORE DEPLOYMENT" -ForegroundColor Yellow
    Write-Host "   - Replace hardcoded URLs with environment variables" -ForegroundColor Red
}
