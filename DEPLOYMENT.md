# CourseKit Deployment Guide 🚀

Complete guide for deploying CourseKit (MERN stack) to Vercel.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- [Vercel account](https://vercel.com) (free tier works)
- [MongoDB Atlas account](https://cloud.mongodb.com) (free tier works)
- Git repository (GitHub, GitLab, or Bitbucket)

---

## Environment Variables

### Backend Environment Variables (Required)

Set these in Vercel Dashboard: **Project Settings > Environment Variables**

| Variable             | Description                      | Example                                                                             |
| -------------------- | -------------------------------- | ----------------------------------------------------------------------------------- |
| `MONGO_URL`          | MongoDB connection string        | `mongodb+srv://user:pass@cluster.mongodb.net/coursekit?retryWrites=true&w=majority` |
| `JWT_USER_PASSWORD`  | Secret key for user JWT tokens   | `your-super-secret-user-key-min-32-chars`                                           |
| `JWT_ADMIN_PASSWORD` | Secret key for admin JWT tokens  | `your-super-secret-admin-key-min-32-chars`                                          |
| `FRONTEND_URL`       | (Optional) Frontend URL for CORS | `https://your-frontend.vercel.app`                                                  |
| `NODE_ENV`           | (Optional) Environment mode      | `production`                                                                        |

### Frontend Environment Variables (Required for Production)

Set these in Vercel Dashboard: **Project Settings > Environment Variables**

| Variable            | Description     | Example                           |
| ------------------- | --------------- | --------------------------------- |
| `VITE_API_BASE_URL` | Backend API URL | `https://your-backend.vercel.app` |

### Generating Secure JWT Secrets

```bash
# Using OpenSSL (recommended)
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Backend Deployment

### Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user with password
4. Add `0.0.0.0/0` to IP Access List (allows Vercel serverless functions)
5. Get connection string: **Database > Connect > Connect your application**
6. Replace `<password>` with your actual password

### Step 2: Deploy Backend to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. **Push your code to Git**

   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**

   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - **Important**: Set Root Directory to `backend`
   - Click "Deploy"

3. **Add Environment Variables**
   - Go to Project Settings > Environment Variables
   - Add all required backend variables (see table above)
   - Redeploy: Deployments > Three dots > Redeploy

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to backend directory
cd backend

# Deploy
vercel

# Follow prompts, then deploy to production
vercel --prod
```

### Step 3: Verify Backend Deployment

Visit your deployed backend URL:

```
https://your-backend.vercel.app/health
```

Expected response:

```json
{
  "status": "healthy",
  "service": "CourseKit API",
  "version": "1.0.0",
  "timestamp": "2026-01-29T...",
  "environment": "production"
}
```

---

## Frontend Deployment

### Step 1: Deploy Frontend to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. **Create a new project in Vercel**

   - Go to [vercel.com/new](https://vercel.com/new)
   - Import the same repository
   - **Important**: Set Root Directory to `frontend`
   - Vercel will auto-detect Vite
   - Click "Deploy"

2. **Add Environment Variables**
   - Go to Project Settings > Environment Variables
   - Add: `VITE_API_BASE_URL` = `https://your-backend.vercel.app`
   - Redeploy for changes to take effect

#### Option B: Via Vercel CLI

```bash
# Navigate to frontend directory
cd frontend

# Deploy
vercel

# Follow prompts, then deploy to production
vercel --prod
```

### Step 2: Update Backend CORS (Optional)

After frontend deployment, update backend's `FRONTEND_URL` environment variable:

1. Go to Backend Project > Settings > Environment Variables
2. Add/Update: `FRONTEND_URL` = `https://your-frontend.vercel.app`
3. Redeploy backend

---

## Post-Deployment Verification

### Health Check

```bash
# Test backend health
curl https://your-backend.vercel.app/health

# Test root endpoint
curl https://your-backend.vercel.app/
```

### Verification Checklist

#### User Flow

- [ ] Visit frontend homepage
- [ ] User Signup at `/signup`
- [ ] User Signin at `/signin`
- [ ] Browse courses at `/courses`
- [ ] Purchase a course
- [ ] View purchased courses at `/my-courses`

#### Admin Flow

- [ ] Admin Signup at `/admin/signup`
- [ ] Admin Signin at `/admin/signin`
- [ ] Create a new course
- [ ] Edit an existing course
- [ ] Delete a course

#### Technical Checks

- [ ] No CORS errors in browser console
- [ ] All API calls return expected data
- [ ] JWT tokens are stored correctly
- [ ] Protected routes redirect properly
- [ ] Page refresh doesn't cause 404 errors

---

## Troubleshooting

### CORS Errors

**Symptoms**: Console shows "Access-Control-Allow-Origin" errors

**Solutions**:

1. Verify `FRONTEND_URL` is set correctly in backend env vars
2. Check that your frontend URL ends with `.vercel.app`
3. Redeploy backend after changing environment variables

### MongoDB Connection Errors

**Symptoms**: "MongoServerError" or connection timeout

**Solutions**:

1. Verify `MONGO_URL` is correct in Vercel env vars
2. Check MongoDB Atlas IP Access List includes `0.0.0.0/0`
3. Verify database user credentials
4. Check MongoDB Atlas cluster is running

### Environment Variables Not Working

**Symptoms**: API calls go to wrong URL, JWT errors

**Solutions**:

1. For frontend: Variables must start with `VITE_`
2. After adding/changing env vars, you MUST redeploy
3. Check spelling and case sensitivity
4. Verify no extra spaces in values

### 404 Errors on Page Refresh

**Symptoms**: Refreshing a page shows 404

**Solutions**:

1. Verify `vercel.json` exists in frontend folder
2. Check rewrites configuration is correct
3. Redeploy frontend

### JWT Token Errors

**Symptoms**: "Invalid or expired token" errors

**Solutions**:

1. Verify `JWT_USER_PASSWORD` and `JWT_ADMIN_PASSWORD` are set
2. Ensure tokens use same secret for signing and verification
3. Clear browser localStorage and sign in again

### Serverless Function Timeout

**Symptoms**: Requests timeout after 10 seconds

**Solutions**:

1. MongoDB connection might be slow - check Atlas cluster region
2. Consider using same region for Vercel and MongoDB
3. Check Vercel function logs for errors

---

## URLs Reference

| Service        | URL                                      |
| -------------- | ---------------------------------------- |
| Backend API    | `https://your-backend.vercel.app`        |
| Frontend       | `https://your-frontend.vercel.app`       |
| Health Check   | `https://your-backend.vercel.app/health` |
| Local Frontend | `http://localhost:5173`                  |
| Local Backend  | `http://localhost:3000`                  |

---

## Local Development

### Backend

```bash
cd backend
cp .env.example .env
# Fill in .env with your values
npm install
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env.local
# Set VITE_API_BASE_URL=http://localhost:3000
npm install
npm run dev
```

---

## Quick Reference: All Environment Variables

### Backend (.env / Vercel)

```env
MONGO_URL=mongodb+srv://...
JWT_USER_PASSWORD=your-secret-32-chars-min
JWT_ADMIN_PASSWORD=your-secret-32-chars-min
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

### Frontend (.env.local / Vercel)

```env
VITE_API_BASE_URL=https://your-backend.vercel.app
```

---

## Support

If you encounter issues not covered here:

1. Check Vercel deployment logs
2. Check browser DevTools Console and Network tabs
3. Verify all environment variables are set correctly
4. Ensure MongoDB Atlas is accessible
