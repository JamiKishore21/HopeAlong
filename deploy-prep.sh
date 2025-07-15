#!/bin/bash
# Quick deployment preparation script

echo "🚀 Preparing HopeAlong for deployment..."

echo "📦 Installing backend dependencies..."
cd server
npm install

echo "📦 Installing frontend dependencies..."
cd ../hopealong-frontend
npm install

echo "🏗️ Building frontend for production..."
npm run build

echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Deploy backend to Railway/Render using the server folder"
echo "2. Deploy frontend to Vercel/Netlify using the hopealong-frontend folder"
echo "3. Update environment variables on both platforms"
echo "4. Test your deployed application!"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
