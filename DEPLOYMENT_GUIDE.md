# 🚀 Complete Deployment Guide for HopeAlong

## Overview
This guide will help you deploy your HopeAlong application with:
- **Frontend**: Vercel (Free)
- **Backend**: Railway (Free tier)
- **Database**: MongoDB Atlas (Free)

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Click "Try Free" or "Sign Up"
3. Create account with your email
4. Choose "Shared Clusters" (Free tier)

### 1.2 Create a Cluster
1. Choose a cloud provider (AWS recommended)
2. Select a region close to you
3. Choose "M0 Sandbox" (FREE)
4. Give your cluster a name (e.g., "hopealong-cluster")
5. Click "Create Cluster"

### 1.3 Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: hopealong-user
5. Password: Generate a secure password (SAVE THIS!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### 1.4 Set Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Clusters"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "4.1 or later"
5. Copy the connection string
6. Replace `<password>` with your actual password
7. Save this connection string!

Example: `mongodb+srv://hopealong-user:<password>@hopealong-cluster.xxxxx.mongodb.net/hopealong?retryWrites=true&w=majority`

---

## 🖥️ Step 2: Deploy Backend to Railway

### 2.1 Prepare Backend
1. Make sure your `server/package.json` has the correct start script:
   ```json
   "scripts": {
     "start": "node server.js",
     "build": "npm install"
   }
   ```

### 2.2 Create Railway Account
1. Go to https://railway.app
2. Sign up with your GitHub account
3. Connect your GitHub repository

### 2.3 Deploy Backend
1. Click "New Project"
2. Choose "Deploy from GitHub repo"
3. Select your `KhadirShaikL21/HopeAlongL21` repository
4. Railway will detect it's a Node.js project
5. Set the root directory to `server`

### 2.4 Set Environment Variables in Railway
1. Go to your project dashboard
2. Click on "Variables" tab
3. Add these environment variables:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key_here
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=https://your-app.railway.app/api/auth/google/callback
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   PORT=5000
   ```

### 2.5 Get Your Backend URL
- After deployment, Railway will give you a URL like: `https://your-app.railway.app`
- Save this URL - you'll need it for the frontend!

---

## 🌐 Step 3: Deploy Frontend to Vercel

### 3.1 Prepare Frontend
1. Update the API URL in your frontend environment

### 3.2 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with your GitHub account

### 3.3 Deploy Frontend
1. Click "New Project"
2. Import your GitHub repository `KhadirShaikL21/HopeAlongL21`
3. Set root directory to `hopealong-frontend`
4. Vercel will auto-detect it's a Vite React app
5. Click "Deploy"

### 3.4 Set Environment Variables in Vercel
1. Go to your project dashboard
2. Go to Settings → Environment Variables
3. Add:
   ```
   VITE_API_URL=https://your-backend-railway-url.railway.app
   ```

---

## 🔧 Step 4: Update Code for Production

### 4.1 Update Frontend API URL
Update your API calls to use the environment variable

### 4.2 Update CORS in Backend
Update your backend to allow your frontend domain

---

## ✅ Step 5: Test Your Deployment

1. Visit your Vercel frontend URL
2. Test user registration/login
3. Test all major features
4. Check browser console for any errors

---

## 🎯 Quick Summary

1. **Database**: MongoDB Atlas (Free)
2. **Backend**: Railway (Free)
3. **Frontend**: Vercel (Free)
4. **Total Cost**: $0 (Free tier)

## 🆘 Troubleshooting

### Common Issues:
- **CORS errors**: Update CORS settings in backend
- **API not found**: Check environment variables
- **Database connection**: Verify MongoDB Atlas connection string
- **Google OAuth**: Update callback URLs in Google Console

---

*Need help? Check the console logs and error messages!*
