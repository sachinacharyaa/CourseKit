# Backend Redeployment Fix 🔧

## Problem Identified

Your backend `vercel.json` was misconfigured, causing **404 errors on all API endpoints** including `/user/signup`.

### What Was Wrong

```json
{
    "version": 3,
    "builds": [{
        "src": "api/**/*.js",  ❌ Looking for api/ directory that doesn't exist
        "use": "@vercel/node"
    }]
}
```

### What's Fixed

```json
{
    "version": 2,
    "builds": [{
        "src": "index.js",  ✅ Correctly points to your Express server
        "use": "@vercel/node"
    }],
    "routes": [{
        "src": "/(.*)",
        "dest": "index.js"  ✅ Routes all requests to index.js
    }]
}
```

---

## How to Redeploy Backend

### Option 1: Git Push + Vercel Auto-Deploy (Recommended)

1. **Commit the fix**
   ```bash
   cd backend
   git add vercel.json
   git commit -m "Fix: Correct Vercel configuration for Express server"
   git push origin main
   ```

2. **Vercel will auto-deploy**
   - If your backend repo is connected to Vercel, it will automatically redeploy
   - Check your Vercel dashboard to monitor the deployment
   - Wait for deployment to complete (~1-2 minutes)

### Option 2: Vercel CLI Manual Deploy

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Deploy to production**
   ```bash
   vercel --prod
   ```

3. **Wait for deployment to complete**

---

## After Redeployment

### Test the Backend

Once redeployed, test the signup endpoint:

**Method 1: Using PowerShell**
```powershell
Invoke-WebRequest -Uri "https://course-kit-backend.vercel.app/user/signup" -Method POST -ContentType "application/json" -Body '{"email":"test@example.com","password":"test123","firstname":"Test","lastname":"User"}'
```

**Method 2: Using Browser DevTools**
1. Open your deployed frontend
2. Open DevTools (F12) → Console tab
3. Try signing up a user
4. Check Network tab - you should see 200 OK instead of 404

### Expected Results

✅ **Before Fix**: 404 Not Found  
✅ **After Fix**: 200 OK with success message or 400 with validation error

---

## Why This Happened

Vercel has two deployment modes:

1. **Serverless Functions** (api/ directory) - For individual function files
2. **Express Server** (index.js) - For full Express applications

Your backend uses Express (full server), but the config was set for serverless functions.

---

## Next Steps

1. Redeploy backend using one of the methods above
2. Test signup on your deployed frontend
3. If it works, you're all set! 🎉
