# 🚀 Production Deployment Checklist

## Pre-Deployment Checklist

### Backend Security
- [ ] Change `JWT_SECRET` to a strong random string (min 32 characters)
- [ ] Set `NODE_ENV=production` in environment variables
- [ ] Use production MongoDB URI (MongoDB Atlas recommended)
- [ ] Enable MongoDB authentication
- [ ] Set up MongoDB backups
- [ ] Configure rate limiting for API endpoints
- [ ] Enable HTTPS/SSL certificates
- [ ] Update CORS to allow only production frontend domain
- [ ] Remove or secure all debug/test endpoints
- [ ] Set secure cookie flags if using cookies
- [ ] Enable helmet.js for security headers
- [ ] Configure proper logging (Winston/Morgan)
- [ ] Set up error monitoring (Sentry/Rollbar)

### Frontend Security
- [ ] Update API base URL to production backend
- [ ] Remove all console.log statements
- [ ] Enable production build optimizations
- [ ] Configure CSP (Content Security Policy)
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure proper CORS headers
- [ ] Minify and compress assets
- [ ] Enable service worker for PWA (optional)
- [ ] Set up CDN for static assets
- [ ] Configure analytics (Google Analytics/Mixpanel)

### Database
- [ ] Create production database
- [ ] Set up database indexes
- [ ] Configure database backups (daily recommended)
- [ ] Set up database monitoring
- [ ] Test database connection from production server
- [ ] Migrate/seed initial data if needed
- [ ] Set up database access controls
- [ ] Configure connection pooling

### Environment Variables

#### Backend Production .env
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/krishakmart?retryWrites=true&w=majority
JWT_SECRET=<STRONG_RANDOM_STRING_MIN_32_CHARS>
FRONTEND_URL=https://yourdomain.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Frontend Production
Update `src/services/api.ts`:
```typescript
const API = axios.create({
  baseURL: 'https://api.yourdomain.com/api',
  // ... rest of config
});
```

### Testing
- [ ] Test all user flows (signup, login, browse, cart, checkout)
- [ ] Test all API endpoints
- [ ] Test file uploads
- [ ] Test payment flows
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test with slow network conditions
- [ ] Load testing (Apache Bench, k6, or Artillery)
- [ ] Security testing (OWASP ZAP)
- [ ] Accessibility testing (WAVE, axe)

### Performance
- [ ] Enable gzip compression
- [ ] Optimize images (WebP format, lazy loading)
- [ ] Implement caching strategies
- [ ] Use CDN for static assets
- [ ] Minify CSS and JavaScript
- [ ] Enable HTTP/2
- [ ] Optimize database queries
- [ ] Add database indexes
- [ ] Implement pagination for large lists
- [ ] Use Redis for session management (optional)

### Monitoring & Logging
- [ ] Set up application monitoring (New Relic, Datadog)
- [ ] Configure error tracking (Sentry, Rollbar)
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure log aggregation (Loggly, Papertrail)
- [ ] Set up alerts for critical errors
- [ ] Monitor database performance
- [ ] Track API response times
- [ ] Monitor server resources (CPU, memory, disk)

### Backup & Recovery
- [ ] Set up automated database backups
- [ ] Test backup restoration process
- [ ] Document recovery procedures
- [ ] Set up file storage backups (if not using Cloudinary)
- [ ] Create disaster recovery plan

### Documentation
- [ ] Update README with production URLs
- [ ] Document deployment process
- [ ] Create API documentation (Swagger/Postman)
- [ ] Document environment variables
- [ ] Create user guides
- [ ] Document troubleshooting steps
- [ ] Create admin documentation

### Legal & Compliance
- [ ] Add Terms of Service
- [ ] Add Privacy Policy
- [ ] Add Cookie Policy
- [ ] Implement GDPR compliance (if applicable)
- [ ] Add contact information
- [ ] Set up support email/system
- [ ] Add refund/return policy

## Deployment Steps

### Option 1: Deploy to Heroku

#### Backend
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create krishakmart-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set FRONTEND_URL=https://krishakmart.vercel.app

# Deploy
git subtree push --prefix backend heroku main

# Check logs
heroku logs --tail
```

#### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

### Option 2: Deploy to Railway

#### Backend
1. Go to railway.app
2. Create new project
3. Connect GitHub repository
4. Select backend directory
5. Add environment variables
6. Deploy

#### Frontend
1. Deploy to Vercel/Netlify
2. Update API URL
3. Build and deploy

### Option 3: Deploy to VPS (DigitalOcean, AWS EC2, etc.)

#### Backend
```bash
# SSH into server
ssh user@your-server-ip

# Install Node.js and MongoDB
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs mongodb

# Clone repository
git clone <repository-url>
cd KrishakMart/backend

# Install dependencies
npm install --production

# Set up environment variables
nano .env

# Install PM2 for process management
npm install -g pm2

# Start application
pm2 start server.js --name krishakmart-api

# Set up PM2 to start on boot
pm2 startup
pm2 save

# Set up Nginx as reverse proxy
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/krishakmart

# Nginx configuration
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/krishakmart /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Set up SSL with Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

#### Frontend
```bash
# Build frontend
cd frontend
npm run build

# Deploy dist folder to Netlify/Vercel
# Or serve with Nginx
sudo cp -r dist/* /var/www/html/
```

## Post-Deployment

### Immediate Actions
- [ ] Test all critical user flows
- [ ] Verify all API endpoints are working
- [ ] Check error monitoring dashboard
- [ ] Verify database connections
- [ ] Test file uploads
- [ ] Check SSL certificates
- [ ] Verify email notifications (if implemented)
- [ ] Test payment processing (if implemented)

### First Week
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Review user feedback
- [ ] Monitor server resources
- [ ] Check database performance
- [ ] Review security logs
- [ ] Test backup restoration

### Ongoing Maintenance
- [ ] Weekly security updates
- [ ] Monthly dependency updates
- [ ] Regular database backups verification
- [ ] Performance optimization
- [ ] User feedback implementation
- [ ] Feature additions
- [ ] Bug fixes

## Rollback Plan

If deployment fails:

1. **Immediate Rollback**
   ```bash
   # Heroku
   heroku rollback
   
   # PM2
   pm2 restart krishakmart-api
   
   # Git
   git revert HEAD
   git push
   ```

2. **Database Rollback**
   - Restore from latest backup
   - Verify data integrity
   - Test application

3. **Communication**
   - Notify users of downtime
   - Update status page
   - Communicate ETA for fix

## Support Contacts

- **Technical Lead:** [email]
- **DevOps:** [email]
- **Database Admin:** [email]
- **Emergency:** [phone]

## Useful Commands

```bash
# Check application status
pm2 status

# View logs
pm2 logs krishakmart-api

# Restart application
pm2 restart krishakmart-api

# Check MongoDB status
sudo systemctl status mongodb

# Check Nginx status
sudo systemctl status nginx

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check disk space
df -h

# Check memory usage
free -m

# Check CPU usage
top
```

## Performance Benchmarks

Target metrics:
- API response time: < 200ms (p95)
- Page load time: < 3s
- Time to interactive: < 5s
- Uptime: > 99.9%
- Error rate: < 0.1%

## Security Checklist

- [ ] All passwords are hashed
- [ ] JWT tokens expire appropriately
- [ ] HTTPS is enforced
- [ ] CORS is properly configured
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using Mongoose)
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] Dependencies are up to date
- [ ] No sensitive data in logs
- [ ] No API keys in frontend code

## Final Verification

Before going live:
- [ ] All checklist items completed
- [ ] Stakeholder approval received
- [ ] Support team trained
- [ ] Documentation updated
- [ ] Monitoring configured
- [ ] Backups verified
- [ ] Rollback plan tested
- [ ] Performance benchmarks met
- [ ] Security audit passed
- [ ] Legal requirements met

---

**Deployment Date:** _____________
**Deployed By:** _____________
**Version:** _____________
**Status:** ⬜ Ready ⬜ In Progress ⬜ Complete

🎉 **Good luck with your deployment!**
