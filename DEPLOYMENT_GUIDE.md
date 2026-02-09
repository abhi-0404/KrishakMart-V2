# KrishakMart - Production Deployment Guide

This guide covers deploying KrishakMart to production using popular hosting platforms.

---

## 📋 Pre-Deployment Checklist

### Backend
- [ ] All environment variables configured
- [ ] MongoDB Atlas database created
- [ ] JWT secret is strong and unique
- [ ] CORS configured for production frontend URL
- [ ] Error handling tested
- [ ] API endpoints tested
- [ ] File upload working
- [ ] Database indexes created

### Frontend
- [ ] API base URL updated for production
- [ ] Build tested locally (`npm run build`)
- [ ] Environment variables configured
- [ ] Error boundaries implemented
- [ ] Loading states working
- [ ] Toast notifications working
- [ ] Responsive design tested

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new project: "KrishakMart"

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select cloud provider and region (closest to your users)
4. Name cluster: "krishakmart-cluster"
5. Click "Create"

### Step 3: Configure Database Access
1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and strong password
4. Set privileges to "Read and write to any database"
5. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Or add specific IPs for better security
5. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `krishakmart`

Example:
```
mongodb+srv://username:password@krishakmart-cluster.xxxxx.mongodb.net/krishakmart?retryWrites=true&w=majority
```

---

## 🚀 Backend Deployment (Render.com)

### Why Render?
- Free tier available
- Easy deployment
- Automatic HTTPS
- Environment variables support
- Auto-deploy from Git

### Step 1: Prepare Backend
1. Ensure `package.json` has start script:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

2. Create `.gitignore` (already exists):
```
node_modules/
.env
uploads/
*.log
```

3. Push code to GitHub

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access repositories

### Step 3: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `krishakmart-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 4: Add Environment Variables
Click "Advanced" → "Add Environment Variable":

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/krishakmart
JWT_SECRET=your_super_secret_production_key_change_this
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://krishakmart-api.onrender.com`

### Step 6: Test Backend
Visit: `https://krishakmart-api.onrender.com/api/health`

Should see:
```json
{
  "status": "OK",
  "message": "KrishakMart API is running"
}
```

---

## 🌐 Frontend Deployment (Vercel)

### Why Vercel?
- Free tier available
- Optimized for React/Vite
- Automatic HTTPS
- CDN included
- Easy deployment

### Step 1: Update API URL
Edit `frontend/src/services/api.ts`:

```typescript
const API = axios.create({
  baseURL: 'https://krishakmart-api.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### Step 2: Test Build Locally
```bash
cd frontend
npm run build
```

Ensure no errors.

### Step 3: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### Step 4: Deploy
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 5: Deploy
1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Note your frontend URL: `https://krishakmart.vercel.app`

### Step 6: Update Backend CORS
Update `FRONTEND_URL` in Render environment variables:
```
FRONTEND_URL=https://krishakmart.vercel.app
```

Redeploy backend on Render.

---

## 🔄 Alternative Deployment Options

### Backend Alternatives

#### Heroku
```bash
# Install Heroku CLI
heroku login
heroku create krishakmart-api
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

#### Railway
1. Go to https://railway.app
2. Connect GitHub
3. Deploy from repository
4. Add environment variables
5. Deploy

#### DigitalOcean App Platform
1. Create account
2. Create new app
3. Connect GitHub
4. Configure environment
5. Deploy

### Frontend Alternatives

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

#### GitHub Pages
```bash
# Add to package.json
"homepage": "https://username.github.io/krishakmart"

# Deploy
npm run build
npx gh-pages -d dist
```

---

## 🔐 Security Best Practices

### Environment Variables
- Never commit `.env` files
- Use strong JWT secrets (32+ characters)
- Rotate secrets regularly
- Use different secrets for dev/prod

### Database
- Use strong passwords
- Restrict IP access when possible
- Enable MongoDB Atlas encryption
- Regular backups
- Monitor access logs

### API
- Enable rate limiting
- Implement request validation
- Use HTTPS only
- Set secure CORS policies
- Sanitize user inputs

### Frontend
- Don't expose API keys
- Implement CSP headers
- Use HTTPS only
- Validate all inputs
- Handle errors gracefully

---

## 📊 Monitoring & Maintenance

### Backend Monitoring
- Check Render logs regularly
- Monitor API response times
- Track error rates
- Set up uptime monitoring (UptimeRobot)

### Database Monitoring
- Monitor MongoDB Atlas metrics
- Check storage usage
- Review slow queries
- Set up alerts

### Frontend Monitoring
- Check Vercel analytics
- Monitor page load times
- Track user errors
- Review console logs

---

## 🔄 Continuous Deployment

### Auto-Deploy on Git Push

**Render (Backend):**
- Automatically deploys on push to main branch
- Configure in Render dashboard

**Vercel (Frontend):**
- Automatically deploys on push to main branch
- Preview deployments for PRs

### Manual Deployment

**Render:**
1. Go to dashboard
2. Click "Manual Deploy"
3. Select branch
4. Deploy

**Vercel:**
1. Go to dashboard
2. Click "Redeploy"
3. Confirm

---

## 🐛 Troubleshooting

### Backend Issues

**Error: Cannot connect to MongoDB**
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check database user permissions

**Error: 502 Bad Gateway**
- Check Render logs
- Verify start command
- Check environment variables

**Error: CORS issues**
- Update FRONTEND_URL in environment
- Check CORS configuration in server.js

### Frontend Issues

**Error: API calls failing**
- Verify API base URL
- Check CORS on backend
- Verify backend is running

**Error: Build fails**
- Check for TypeScript errors
- Verify all dependencies installed
- Check build logs

**Error: 404 on refresh**
- Add `vercel.json` for SPA routing:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📈 Scaling Considerations

### When to Scale

**Backend:**
- Response times > 1 second
- CPU usage > 80%
- Memory usage > 80%
- Request queue building up

**Database:**
- Storage > 80% capacity
- Slow query times
- Connection pool exhausted

### Scaling Options

**Backend:**
- Upgrade Render plan
- Add more instances
- Implement caching (Redis)
- Optimize database queries

**Database:**
- Upgrade MongoDB Atlas tier
- Add read replicas
- Implement sharding
- Optimize indexes

**Frontend:**
- Already on CDN (Vercel)
- Implement code splitting
- Optimize images
- Enable compression

---

## 💰 Cost Estimates

### Free Tier (Suitable for MVP)
- **MongoDB Atlas**: Free (512MB storage)
- **Render**: Free (750 hours/month)
- **Vercel**: Free (100GB bandwidth)
- **Total**: $0/month

### Paid Tier (Production)
- **MongoDB Atlas**: $9/month (2GB storage)
- **Render**: $7/month (512MB RAM)
- **Vercel**: $20/month (1TB bandwidth)
- **Total**: ~$36/month

### Enterprise Tier
- **MongoDB Atlas**: $57+/month
- **Render**: $25+/month
- **Vercel**: $150+/month
- **Total**: $232+/month

---

## 📝 Post-Deployment Tasks

### Immediate
- [ ] Test all features in production
- [ ] Verify database connections
- [ ] Check API endpoints
- [ ] Test user registration/login
- [ ] Test order flow
- [ ] Verify image uploads
- [ ] Check notifications

### Within 24 Hours
- [ ] Set up monitoring
- [ ] Configure alerts
- [ ] Test from different devices
- [ ] Test from different locations
- [ ] Review error logs
- [ ] Optimize performance

### Within 1 Week
- [ ] Gather user feedback
- [ ] Monitor performance metrics
- [ ] Review security
- [ ] Plan improvements
- [ ] Document issues
- [ ] Create backup strategy

---

## 🎯 Success Metrics

### Technical
- API response time < 500ms
- Page load time < 3 seconds
- Uptime > 99.9%
- Error rate < 1%

### Business
- User registrations
- Orders placed
- Products added
- Revenue generated

---

## 📞 Support Resources

### Render
- Docs: https://render.com/docs
- Status: https://status.render.com
- Support: support@render.com

### Vercel
- Docs: https://vercel.com/docs
- Status: https://www.vercel-status.com
- Support: support@vercel.com

### MongoDB Atlas
- Docs: https://docs.atlas.mongodb.com
- Status: https://status.mongodb.com
- Support: https://support.mongodb.com

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Code tested locally
- [ ] Environment variables documented
- [ ] Database backup created
- [ ] API documentation updated
- [ ] Security review completed

### Deployment
- [ ] MongoDB Atlas configured
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set
- [ ] CORS configured

### Post-Deployment
- [ ] Health check passing
- [ ] All features tested
- [ ] Monitoring configured
- [ ] Alerts set up
- [ ] Documentation updated
- [ ] Team notified

---

**Congratulations! Your KrishakMart application is now live! 🎉**

**"Mitti Se Digital Tak"**

---

**Last Updated:** February 9, 2026
