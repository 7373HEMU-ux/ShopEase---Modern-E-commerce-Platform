# 🚀 Deployment Guide

This guide will help you deploy your ShopEase e-commerce application to production.

## 📋 Prerequisites

- GitHub account
- Railway account (for backend)
- Vercel account (for frontend)
- MongoDB Atlas account

## 🔧 Backend Deployment (Railway)

### 1. Prepare Backend for Deployment

1. **Update package.json scripts** (already done):
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

2. **Set up environment variables** in Railway:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key for JWT tokens
   - `PORT`: Railway will set this automatically

### 2. Deploy to Railway

1. **Connect GitHub Repository**:
   - Go to [Railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `backend` folder

2. **Configure Environment Variables**:
   - Go to your project dashboard
   - Click on "Variables" tab
   - Add the following variables:
     ```
     MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/shopease
     JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure
     ```

3. **Deploy**:
   - Railway will automatically deploy your backend
   - Note the generated URL (e.g., `https://your-app.railway.app`)

## 🎨 Frontend Deployment (Vercel)

### 1. Prepare Frontend for Deployment

1. **Update API configuration** (already done):
```javascript
const API = axios.create({ 
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.railway.app/api' 
    : 'http://localhost:5000/api' 
});
```

2. **Update the backend URL** in `frontend/src/api.js`:
   - Replace `https://shopease-api.railway.app` with your actual Railway URL

### 2. Deploy to Vercel

1. **Connect GitHub Repository**:
   - Go to [Vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Set the root directory to `frontend`

2. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically deploy your frontend
   - Note the generated URL (e.g., `https://your-app.vercel.app`)

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Cluster

1. **Sign up** at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create a new cluster** (free tier is sufficient)
3. **Create a database user**:
   - Username: `shopease-user`
   - Password: Generate a strong password
4. **Whitelist IP addresses**:
   - Add `0.0.0.0/0` for Railway deployment
   - Add your local IP for development

### 2. Get Connection String

1. **Click "Connect"** on your cluster
2. **Choose "Connect your application"**
3. **Copy the connection string**:
   ```
   mongodb+srv://shopease-user:<password>@cluster0.xxxxx.mongodb.net/shopease?retryWrites=true&w=majority
   ```
4. **Replace `<password>`** with your actual password

## 🔄 Update Configuration

### 1. Update Frontend API URL

After deploying your backend to Railway, update the frontend API configuration:

```javascript
// frontend/src/api.js
const API = axios.create({ 
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://YOUR-RAILWAY-URL.railway.app/api'  // Replace with your Railway URL
    : 'http://localhost:5000/api' 
});
```

### 2. Redeploy Frontend

After updating the API URL, redeploy your frontend to Vercel.

## 🧪 Test Your Deployment

### 1. Test Backend API

Visit your Railway URL to test:
```
https://your-app.railway.app
```
Should return: `"API is running..."`

### 2. Test Frontend

Visit your Vercel URL to test:
```
https://your-app.vercel.app
```
Should show your e-commerce website.

### 3. Test Full Functionality

1. **Register a new user**
2. **Browse products**
3. **Add items to cart**
4. **Test search and filters**

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Make sure CORS is enabled in your backend
   - Check that your frontend URL is whitelisted

2. **Database Connection Issues**:
   - Verify your MongoDB Atlas connection string
   - Check that your IP is whitelisted
   - Ensure the database user has proper permissions

3. **Environment Variables**:
   - Double-check all environment variables are set correctly
   - Make sure there are no typos in variable names

4. **Build Failures**:
   - Check the build logs in Railway/Vercel
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

### Getting Help

- Check Railway logs: Project Dashboard → Deployments → View Logs
- Check Vercel logs: Project Dashboard → Functions → View Logs
- Check MongoDB Atlas logs: Project → Activity Feed

## 📝 Final Steps

1. **Update README.md** with your actual deployment URLs
2. **Test all functionality** on the live site
3. **Set up monitoring** (optional)
4. **Configure custom domain** (optional)

## 🎉 Congratulations!

Your ShopEase e-commerce application is now live and ready for users!

**Live URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-app.railway.app`
- GitHub Repository: `https://github.com/yourusername/shopease`
