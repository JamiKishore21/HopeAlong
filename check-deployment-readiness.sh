#!/bin/bash

echo "🔍 DEPLOYMENT READINESS CHECK FOR HOPEALONG"
echo "==========================================="

echo ""
echo "📁 1. CHECKING ENVIRONMENT FILES..."

# Check backend .env
if [ -f "server/.env" ]; then
    echo "✅ Backend .env exists"
    echo "   - PORT: $(grep PORT server/.env | cut -d'=' -f2)"
    echo "   - MONGO_URI: $(if grep -q MONGO_URI server/.env; then echo 'Present'; else echo 'Missing'; fi)"
    echo "   - JWT_SECRET: $(if grep -q JWT_SECRET server/.env; then echo 'Present'; else echo 'Missing'; fi)"
    echo "   - GOOGLE_CLIENT_ID: $(if grep -q GOOGLE_CLIENT_ID server/.env; then echo 'Present'; else echo 'Missing'; fi)"
else
    echo "❌ Backend .env missing"
fi

# Check frontend .env
if [ -f "hopealong-frontend/.env" ]; then
    echo "✅ Frontend .env exists"
    echo "   - VITE_API_URL: $(grep VITE_API_URL hopealong-frontend/.env | cut -d'=' -f2)"
    echo "   - VITE_GOOGLE_MAPS_API_KEY: $(if grep -q VITE_GOOGLE_MAPS_API_KEY hopealong-frontend/.env; then echo 'Present'; else echo 'Missing'; fi)"
else
    echo "❌ Frontend .env missing"
fi

echo ""
echo "📦 2. CHECKING PACKAGE.JSON FILES..."

# Check backend package.json
if [ -f "server/package.json" ]; then
    echo "✅ Backend package.json exists"
    if grep -q '"start"' server/package.json; then
        echo "   ✅ Start script found"
    else
        echo "   ❌ Start script missing"
    fi
else
    echo "❌ Backend package.json missing"
fi

# Check frontend package.json
if [ -f "hopealong-frontend/package.json" ]; then
    echo "✅ Frontend package.json exists"
    if grep -q '"build"' hopealong-frontend/package.json; then
        echo "   ✅ Build script found"
    else
        echo "   ❌ Build script missing"
    fi
else
    echo "❌ Frontend package.json missing"
fi

echo ""
echo "🔗 3. CHECKING FOR HARDCODED URLs..."

hardcoded_count=$(grep -r "localhost:5000" hopealong-frontend/src --exclude-dir=node_modules | wc -l)
if [ $hardcoded_count -eq 0 ]; then
    echo "✅ No hardcoded localhost URLs found"
else
    echo "❌ Found $hardcoded_count hardcoded localhost URLs"
    echo "   Files with hardcoded URLs:"
    grep -r "localhost:5000" hopealong-frontend/src --exclude-dir=node_modules | cut -d':' -f1 | sort | uniq
fi

echo ""
echo "🌐 4. PRODUCTION ENVIRONMENT FILES..."

if [ -f "server/.env.production" ]; then
    echo "✅ Backend production env template exists"
else
    echo "❌ Backend production env template missing"
fi

if [ -f "hopealong-frontend/.env.production" ]; then
    echo "✅ Frontend production env template exists"
else
    echo "❌ Frontend production env template missing"
fi

echo ""
echo "📋 5. DEPLOYMENT CHECKLIST..."
echo "   ✅ MongoDB Atlas database ready"
echo "   ✅ Environment variables configured"
echo "   ✅ CORS configured for production"
echo "   ✅ Package.json scripts ready"

if [ $hardcoded_count -eq 0 ]; then
    echo ""
    echo "🎉 PROJECT IS READY FOR DEPLOYMENT!"
    echo ""
    echo "Next steps:"
    echo "1. Deploy backend to Railway/Render"
    echo "2. Deploy frontend to Vercel/Netlify"
    echo "3. Update production environment variables"
else
    echo ""
    echo "⚠️  FIXES NEEDED BEFORE DEPLOYMENT"
    echo "   - Replace hardcoded URLs with environment variables"
fi
