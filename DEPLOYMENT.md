# Deployment Guide

This guide covers deployment options and best practices for the AI Museum platform.

## Prerequisites

- Node.js 18+
- Database (MongoDB, PostgreSQL, or similar)
- Cloud storage (AWS S3, Cloudflare R2, etc.)
- CDN (Cloudflare, AWS CloudFront, etc.)

## Environment Setup

1. Copy and configure environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`

2. Configure all required variables (see .env.example)

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the best Next.js deployment experience with automatic optimization.

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   \`\`\`

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Configure environment variables
   - Deploy

3. **Configure Domain**
   - Add custom domain in Vercel dashboard
   - Update DNS records
   - Enable HTTPS (automatic)

4. **Post-Deployment**
   - Set up monitoring
   - Configure analytics
   - Enable edge caching

**Vercel Configuration:**
\`\`\`json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1", "sfo1"]
}
\`\`\`

### Option 2: AWS (Amplify, ECS, or EC2)

#### AWS Amplify

1. Connect repository to Amplify
2. Configure build settings
3. Set environment variables
4. Deploy

#### AWS ECS (Docker)

1. **Create Dockerfile:**
   \`\`\`dockerfile
   FROM node:18-alpine AS base

   # Dependencies
   FROM base AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci

   # Build
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   # Production
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production

   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs
   EXPOSE 3000
   ENV PORT 3000

   CMD ["node", "server.js"]
   \`\`\`

2. **Build and push to ECR:**
   \`\`\`bash
   docker build -t ai-museum .
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
   docker tag ai-museum:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/ai-museum:latest
   docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/ai-museum:latest
   \`\`\`

3. **Deploy to ECS**

### Option 3: DigitalOcean App Platform

1. Connect repository
2. Configure app settings
3. Set environment variables
4. Deploy

### Option 4: Self-Hosted (VPS)

1. **Setup server:**
   \`\`\`bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   sudo npm install -g pm2

   # Clone repository
   git clone <your-repo-url>
   cd ai-museum

   # Install dependencies
   npm install

   # Build
   npm run build

   # Start with PM2
   pm2 start npm --name "ai-museum" -- start
   pm2 save
   pm2 startup
   \`\`\`

2. **Configure Nginx:**
   \`\`\`nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

3. **Setup SSL with Let's Encrypt:**
   \`\`\`bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   \`\`\`

## Database Setup

### MongoDB Atlas

1. Create cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Configure network access
3. Create database user
4. Get connection string
5. Add to environment variables

### PostgreSQL (AWS RDS or similar)

1. Create RDS instance
2. Configure security groups
3. Create database
4. Add connection string to env

## Storage Setup

### AWS S3

1. **Create S3 bucket:**
   \`\`\`bash
   aws s3 mb s3://ai-museum-artworks
   \`\`\`

2. **Configure CORS:**
   \`\`\`json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedOrigins": ["https://your-domain.com"],
       "ExposeHeaders": ["ETag"]
     }
   ]
   \`\`\`

3. **Set up CloudFront CDN**

### Cloudflare R2

1. Create R2 bucket
2. Generate API tokens
3. Configure in environment

## CDN Setup

### Cloudflare

1. Add domain to Cloudflare
2. Update nameservers
3. Enable:
   - Auto minify (JS, CSS, HTML)
   - Brotli compression
   - Image optimization
   - Caching rules

## Monitoring & Analytics

### Application Monitoring

1. **Vercel Analytics:**
   - Automatically enabled on Vercel
   - View in dashboard

2. **Sentry (Error Tracking):**
   \`\`\`bash
   npm install @sentry/nextjs
   \`\`\`

3. **LogRocket (Session Replay):**
   \`\`\`bash
   npm install logrocket
   \`\`\`

### Infrastructure Monitoring

1. **AWS CloudWatch** (if using AWS)
2. **DigitalOcean Monitoring** (if using DO)
3. **Uptime monitoring** (UptimeRobot, Pingdom)

## Performance Optimization

### Build Optimization

1. **Enable SWC Minification:**
   \`\`\`js
   // next.config.js
   module.exports = {
     swcMinify: true,
   }
   \`\`\`

2. **Configure Image Optimization:**
   \`\`\`js
   module.exports = {
     images: {
       domains: ['your-cdn-domain.com'],
       formats: ['image/avif', 'image/webp'],
     },
   }
   \`\`\`

3. **Enable Compression:**
   - Brotli compression (automatic on Vercel)
   - Gzip fallback

### Caching Strategy

1. **Static Assets:**
   - Cache-Control: public, max-age=31536000, immutable

2. **API Responses:**
   - Cache frequently accessed data
   - Use Redis for session storage

3. **CDN Caching:**
   - Configure edge caching rules
   - Purge cache on deployment

## Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured (see middleware.ts)
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Environment variables secured
- [ ] API authentication implemented
- [ ] GDPR compliance measures active
- [ ] Regular security audits
- [ ] Dependency updates scheduled
- [ ] Backup strategy in place

## Scaling Considerations

### Horizontal Scaling

1. **Load Balancing:**
   - Use AWS ALB, Nginx, or Cloudflare Load Balancing
   - Configure health checks

2. **Auto Scaling:**
   - Set up auto-scaling groups (AWS)
   - Define scaling policies

### Database Scaling

1. **Read Replicas:**
   - Set up read replicas for heavy read operations
   - Route read queries appropriately

2. **Connection Pooling:**
   - Use PgBouncer (PostgreSQL) or similar
   - Configure max connections

### Caching Layer

1. **Redis:**
   \`\`\`bash
   # Install Redis
   npm install redis
   \`\`\`

2. **Configuration:**
   - Cache API responses
   - Session storage
   - Rate limiting data

## Backup Strategy

### Database Backups

1. **Automated Backups:**
   - Daily automated backups
   - 30-day retention
   - Point-in-time recovery

2. **Manual Backups:**
   - Before major deployments
   - Before schema changes

### File Storage Backups

1. **S3 Versioning:**
   - Enable versioning
   - Lifecycle policies

2. **Cross-Region Replication:**
   - For critical data
   - Disaster recovery

## CI/CD Pipeline

### GitHub Actions Example

\`\`\`yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
\`\`\`

## Troubleshooting

### Common Issues

1. **Build Failures:**
   - Check Node.js version
   - Clear .next directory
   - Verify environment variables

2. **Performance Issues:**
   - Check bundle size
   - Review database queries
   - Check CDN configuration

3. **API Errors:**
   - Verify API endpoints
   - Check rate limiting
   - Review CORS settings

## Support

For deployment support:
- Documentation: [Next.js Docs](https://nextjs.org/docs/deployment)
- Community: [Next.js Discord](https://discord.gg/nextjs)
- Support: support@aimuseum.com
