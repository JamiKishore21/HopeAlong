# 🚀 HopeAlong Deployment Guide

## Prerequisites

- GitHub account
- Your environment variables ready

## 🗄️ Database Setup (MongoDB Atlas) - ALREADY DONE ✅

Your MongoDB connection string is already configured:
`mongodb+srv://khadir190305:V0Kr3rdRKfQgPSvJ@cluster0.vindjsc.mongodb.net/hopeAlong`

## 🎯 Backend Deployment (Choose One)

### Option A: Railway (Recommended for beginners)

1. **Sign up for Railway**

   - Go to: https://railway.app
   - Sign up with your GitHub account

2. **Deploy Backend**

   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository: `KhadirShaikL21/HopeAlongL21`
   - Select the `server` folder as root directory
   - Railway will auto-detect it's a Node.js app

3. **Add Environment Variables**

   - In Railway dashboard, go to your project
   - Click "Variables" tab
   - Add these variables one by one:

   ```
   PORT=5000
   MONGO_URI=mongodb+srv://khadir190305:V0Kr3rdRKfQgPSvJ@cluster0.vindjsc.mongodb.net/hopeAlong?retryWrites=true&w=majority&appName=Cluster0
   GOOGLE_CLIENT_ID=248244395536-9et1ul62dblkonj4asp4te03rg51e7kc.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=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
   JWT_SECRET=hopealong_super_secret_jwt_key_2024_production
   GOOGLE_MAPS_API_KEY=AIzaSyBLw087tIiGukZr2DLKwDkVPEyRxBE_tXA
   RAZORPAY_KEY_ID=rzp_test_2DY4WhMDDHSBLH
   RAZORPAY_KEY_SECRET=FZKutgPwS5RoKOqheAK6KetG
   ```

4. **Get Your Backend URL**

   - After deployment, Railway will give you a URL like: `https://your-app-name.railway.app`
   - Copy this URL, you'll need it for frontend

5. **Update Google Callback URL**
   - Go back to Railway Variables
   - Update: `GOOGLE_CALLBACK_URL=https://your-app-name.railway.app/api/auth/google/callback`

### Option B: Render

1. **Sign up for Render**

   - Go to: https://render.com
   - Sign up with your GitHub account

2. **Deploy Backend**

   - Click "New Web Service"
   - Connect your GitHub repo: `KhadirShaikL21/HopeAlongL21`
   - Set Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables** (same as Railway above)

## 🌐 Frontend Deployment

### Option A: Vercel (Recommended)

1. **Sign up for Vercel**

   - Go to: https://vercel.com
   - Sign up with your GitHub account

2. **Deploy Frontend**

   - Click "New Project"
   - Import your repository: `KhadirShaikL21/HopeAlongL21`
   - Set Root Directory: `hopealong-frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variables**

   - In Vercel dashboard, go to Settings → Environment Variables
   - Add:

   ```
   VITE_API_URL=https://your-backend-url.railway.app
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyBLw087tIiGukZr2DLKwDkVPEyRxBE_tXA
   ```

4. **Redeploy**
   - After adding environment variables, trigger a new deployment

### Option B: Netlify

1. **Sign up for Netlify**

   - Go to: https://netlify.com
   - Sign up with your GitHub account

2. **Deploy Frontend**
   - Drag and drop the `hopealong-frontend/dist` folder after building
   - Or connect to GitHub repository

## 🔄 Quick Deployment Commands

```bash
# 1. Build frontend locally (optional)
cd hopealong-frontend
npm install
npm run build

# 2. Test backend locally before deploying
cd ../server
npm install
npm start
```

## 🎯 Deployment Checklist

### Backend Deployment:

- [ ] Railway/Render account created
- [ ] Repository connected
- [ ] Environment variables added
- [ ] Backend URL obtained
- [ ] Google callback URL updated

### Frontend Deployment:

- [ ] Vercel/Netlify account created
- [ ] Repository connected
- [ ] Environment variables added (with backend URL)
- [ ] Frontend URL obtained

### Final Steps:

- [ ] Test login functionality
- [ ] Test Google OAuth
- [ ] Test API endpoints
- [ ] Update README with live URLs

## 🔗 Expected Result

After successful deployment:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-api.railway.app`
- **Database**: Already hosted on MongoDB Atlas

## 🐛 Common Issues & Solutions

1. **CORS Errors**: Make sure your backend URL is correct in frontend env
2. **Google OAuth Not Working**: Update the callback URL in Google Console
3. **Database Connection**: Check MongoDB Atlas whitelist (allow all IPs: 0.0.0.0/0)
4. **Environment Variables**: Make sure all variables are set correctly

## 📞 Need Help?

If you encounter any issues:

1. Check the deployment logs in Railway/Render/Vercel
2. Verify all environment variables are set
3. Test API endpoints manually
4. Check CORS configuration

Ready to deploy! 🚀
