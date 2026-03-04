# 🚀 Deployment Guide

Step-by-step guide to deploy Superteam Academy to production.

---

## 📋 Pre-Deployment Checklist

- [x] Build completes successfully (`npm run build`)
- [x] All pages render without errors
- [x] Environment variables configured
- [x] Analytics setup (optional)
- [x] Responsive design tested
- [ ] Production RPC endpoint configured
- [ ] Custom domain ready (optional)

---

## 🎯 Vercel Deployment (Recommended)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Superteam Academy"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/superteam-academy.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Sign up/Login** to [Vercel](https://vercel.com)

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables**

   Click "Environment Variables" and add:

   ```
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.devnet.solana.com
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   NEXT_PUBLIC_APP_NAME=Superteam Academy
   ```

   **Optional (for analytics):**
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Get your production URL: `https://your-app.vercel.app`

### Step 3: Configure Custom Domain (Optional)

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `academy.superteam.fun`)
4. Follow Vercel's DNS configuration instructions
5. Wait for DNS propagation (5-30 minutes)

---

## 🔧 Environment Variables Explained

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SOLANA_NETWORK` | Solana network to use | `devnet` or `mainnet-beta` |
| `NEXT_PUBLIC_SOLANA_RPC_HOST` | RPC endpoint URL | `https://api.devnet.solana.com` |
| `NEXT_PUBLIC_APP_URL` | Your production URL | `https://academy.example.com` |

### Optional Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | [analytics.google.com](https://analytics.google.com) |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry error tracking | [sentry.io](https://sentry.io) |

---

## 🏃 Production RPC Configuration

### Free Options (Development/Testing)

```bash
# Solana Public RPC (rate-limited)
NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.devnet.solana.com
```

### Recommended Paid Options (Production)

#### Helius (Recommended)

```bash
# Sign up at https://www.helius.dev/
NEXT_PUBLIC_SOLANA_RPC_HOST=https://rpc.helius.xyz/?api-key=YOUR_API_KEY
```

#### QuickNode

```bash
# Sign up at https://www.quicknode.com/
NEXT_PUBLIC_SOLANA_RPC_HOST=https://your-endpoint.solana-devnet.quiknode.pro/YOUR_KEY/
```

#### Alchemy

```bash
# Sign up at https://www.alchemy.com/
NEXT_PUBLIC_SOLANA_RPC_HOST=https://solana-devnet.g.alchemy.com/v2/YOUR_API_KEY
```

---

## 📊 Post-Deployment Steps

### 1. Verify Deployment

- [ ] Visit your production URL
- [ ] Test wallet connection (Phantom, Solflare)
- [ ] Navigate through all pages
- [ ] Check mobile responsiveness
- [ ] Test a course lesson

### 2. Set Up Monitoring

#### Google Analytics (if configured)

1. Visit [analytics.google.com](https://analytics.google.com)
2. Verify data is coming in (may take 24-48 hours)
3. Set up goals for course completions

#### Sentry Error Tracking (optional)

1. Visit [sentry.io](https://sentry.io)
2. Monitor for runtime errors
3. Set up alerts for critical issues

### 3. Performance Optimization

Run Lighthouse audit:

1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Generate report"
4. Aim for:
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

### 4. Update Documentation

Update `README.md` with:
- Production URL
- Demo credentials (if applicable)
- Live demo link

---

## 🌐 Alternative Deployment Options

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod
```

### Self-Hosted (VPS/Docker)

```bash
# Build the app
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "superteam-academy" -- start
```

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t superteam-academy .
docker run -p 3000:3000 superteam-academy
```

---

## 🔒 Security Best Practices

### 1. Environment Variables

- ✅ Never commit `.env.local` to Git
- ✅ Use `.env.example` as template
- ✅ Keep RPC API keys secret
- ✅ Rotate keys regularly

### 2. Production Settings

```bash
# In Vercel, set these in Settings → Environment Variables
NODE_ENV=production
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta  # When ready for mainnet
```

### 3. Rate Limiting

Consider adding rate limiting for API routes (if you add them later):

```bash
npm install @vercel/edge
```

---

## 📈 Scaling Considerations

### When to Scale

- More than 10,000 monthly active users
- Slow RPC response times
- High API costs

### Scaling Strategies

1. **Upgrade RPC Plan** - Get higher rate limits
2. **Add Caching** - Use Redis/Upstash for user data
3. **CDN Optimization** - Leverage Vercel Edge Network
4. **Database** - Add PostgreSQL/Supabase for persistence

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Wallet Connection Issues

- Check `NEXT_PUBLIC_SOLANA_NETWORK` matches your RPC endpoint
- Verify RPC endpoint is accessible
- Test with different wallet (Phantom vs Solflare)

### Environment Variables Not Working

- Must start with `NEXT_PUBLIC_` to be available in browser
- Need to redeploy after changing env vars in Vercel
- Clear cache: `vercel env pull`

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created and connected
- [ ] Environment variables configured
- [ ] First deployment successful
- [ ] Production URL working
- [ ] Wallet connection tested
- [ ] All pages accessible
- [ ] Mobile responsive verified
- [ ] Analytics tracking (if configured)
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] README updated with live URL

---

## 🎬 Next Steps

After deployment:

1. **Create Demo Video** (see instructions below)
2. **Submit PR** to Superteam repository
3. **Share on Twitter** with @SuperteamBR
4. **Get feedback** from community
5. **Iterate** based on user feedback

---

## 📹 Demo Video Requirements

Create a 3-5 minute video showing:

1. **Landing Page** - Overview of the platform
2. **Course Catalog** - Browse courses
3. **Wallet Connection** - Connect Phantom/Solflare
4. **Course Lesson** - Show interactive lesson
5. **Dashboard** - XP, achievements, progress
6. **Leaderboard** - Rankings and competition
7. **Code Editor** - Solana Playground integration

Tools for recording:
- **Loom** - [loom.com](https://loom.com) (free)
- **OBS Studio** - [obsproject.com](https://obsproject.com) (free)
- **QuickTime** - Mac built-in screen recorder

---

## 📤 Submission Guide

### Create PR to Superteam Repository

```bash
# Fork the repository
# Clone your fork
git clone https://github.com/YOUR_USERNAME/superteam-academy.git

# Create feature branch
git checkout -b feature/your-implementation

# Add your changes
git add .
git commit -m "feat: Add Superteam Academy implementation"

# Push to your fork
git push origin feature/your-implementation

# Create PR on GitHub
```

### PR Description Template

```markdown
## Superteam Academy - Solana Learning Platform

### 🔗 Live Demo
- **Production URL:** https://your-app.vercel.app
- **Demo Video:** https://loom.com/your-video

### ✨ Features Implemented
- ✅ Interactive course catalog with 3 learning paths
- ✅ Gamification system (XP, levels, achievements, streaks)
- ✅ Solana wallet integration (Phantom, Solflare)
- ✅ Code editor integration with Solana Playground
- ✅ Dashboard with progress tracking
- ✅ Leaderboard with rankings
- ✅ Dark theme UI with responsive design
- ✅ Settings page for customization
- ✅ Analytics integration ready

### 🏗️ Architecture
- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS + Radix UI
- **Blockchain:** Solana Web3.js + Wallet Adapter
- **Deployment:** Vercel

### 📚 Documentation
- [README.md](./README.md) - Setup and features
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [CUSTOMIZATION.md](./CUSTOMIZATION.md) - Customization guide
- [CMS_GUIDE.md](./CMS_GUIDE.md) - Content management

### 🎯 Future Enhancements
- On-chain XP tracking with Solana program
- NFT-based credentials and certificates
- Multi-language support (PT-BR, ES, EN)
- Admin dashboard for content management

### 👤 Author
Your Name - [@YourTwitter](https://twitter.com/YourTwitter)
```

---

**Deployment Complete! 🎉**

Your Superteam Academy is now live and ready to onboard the next generation of Solana developers!
