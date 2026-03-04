# 🔀 Migration to Forked Repository Guide

Quick guide to move all your work to a forked repository.

---

## 🎯 Option 1: Fork First, Then Copy Files (Recommended)

### Step 1: Fork the Repository

1. Go to the original repository on GitHub
2. Click **Fork** button (top right)
3. Select your account/organization
4. Wait for fork to complete

### Step 2: Clone Your Fork

```bash
# Clone your forked repository
git clone https://github.com/YOUR_USERNAME/superteam-academy.git superteam-academy-fork

# Navigate to the new directory
cd superteam-academy-fork
```

### Step 3: Copy All Your Work

From your current project directory:

```bash
# Go back to your current project
cd /path/to/your/current/project

# Copy all custom files (excluding node_modules, .next, etc.)
rsync -av \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude 'strapi' \
  --progress \
  ./ /path/to/superteam-academy-fork/
```

Or manually copy these important directories/files:

**Core Application:**
```bash
cp -r app/ /path/to/fork/
cp -r components/ /path/to/fork/
cp -r lib/ /path/to/fork/
cp -r messages/ /path/to/fork/
cp -r public/ /path/to/fork/
```

**Configuration:**
```bash
cp i18n.ts /path/to/fork/
cp middleware.ts /path/to/fork/
cp package.json /path/to/fork/
cp package-lock.json /path/to/fork/
cp tsconfig.json /path/to/fork/
cp next.config.ts /path/to/fork/
cp tailwind.config.ts /path/to/fork/
cp postcss.config.mjs /path/to/fork/
cp eslint.config.mjs /path/to/fork/
cp .env.example /path/to/fork/
```

**Documentation:**
```bash
cp *.md /path/to/fork/
```

### Step 4: Install Dependencies

```bash
cd /path/to/superteam-academy-fork
npm install
```

### Step 5: Test the Build

```bash
npm run build
npm run dev
```

### Step 6: Commit and Push

```bash
git add .
git commit -m "feat: Add complete Superteam Academy implementation

- Multi-language support (en, pt-BR, es)
- On-chain Solana integration
- Backend API routes
- Analytics integration (GA4, PostHog, Sentry)
- Strapi CMS setup
- Complete documentation"

git push origin main
```

---

## 🎯 Option 2: Change Remote (If You Want to Keep Current Repo)

### Step 1: Fork the Repository on GitHub

Same as Option 1, Step 1.

### Step 2: Change Git Remote

```bash
# Remove current origin (if any)
git remote remove origin

# Add your fork as origin
git remote add origin https://github.com/YOUR_USERNAME/superteam-academy.git

# Verify
git remote -v
```

### Step 3: Push Your Work

```bash
# Create a new branch for your work
git checkout -b feat/complete-implementation

# Stage all your changes
git add .

# Commit
git commit -m "feat: Add complete Superteam Academy implementation"

# Push to your fork
git push -u origin feat/complete-implementation
```

---

## 🎯 Option 3: Fresh Fork + Manual File Copy (Cleanest)

### Step 1: Fork and Clone

```bash
# Fork on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/superteam-academy.git
cd superteam-academy
```

### Step 2: Create a Feature Branch

```bash
git checkout -b feat/your-implementation
```

### Step 3: Copy Files Systematically

**Important Files to Copy:**

1. **App Directory:**
   - Copy entire `app/` directory
   - Includes all pages and API routes

2. **Components:**
   - Copy entire `components/` directory
   - Includes UI components and providers

3. **Library:**
   - Copy entire `lib/` directory
   - Includes Solana integration, analytics, utilities

4. **Messages (i18n):**
   - Copy `messages/` directory
   - Copy `i18n.ts`
   - Copy `middleware.ts`

5. **Configuration:**
   - Copy `package.json` (merge dependencies)
   - Copy `next.config.ts`
   - Copy `tsconfig.json`
   - Copy `tailwind.config.ts`
   - Copy `.env.example`

6. **Documentation:**
   - Copy all `.md` files

### Step 4: Merge package.json

If the fork already has a `package.json`, merge the dependencies:

```json
{
  "dependencies": {
    // Keep existing dependencies, add these:
    "@coral-xyz/anchor": "^0.30.1",
    "@solana/spl-token": "^0.4.9",
    "@solana/wallet-adapter-react": "^0.15.35",
    "@solana/wallet-adapter-react-ui": "^0.9.35",
    "@solana/wallet-adapter-wallets": "^0.19.32",
    "@solana/web3.js": "^1.95.8",
    "bn.js": "^5.2.1",
    "next-intl": "^4.8.3",
    "posthog-js": "latest"
  }
}
```

### Step 5: Install and Build

```bash
npm install
npm run build
```

### Step 6: Commit and Push

```bash
git add .
git commit -m "feat: Complete implementation with all integrations"
git push -u origin feat/your-implementation
```

---

## 📋 Checklist - What to Copy

### Essential Files:
- [ ] `app/` - All pages and API routes
- [ ] `components/` - All components
- [ ] `lib/` - Solana, analytics, utilities
- [ ] `messages/` - i18n translations
- [ ] `i18n.ts` - i18n configuration
- [ ] `middleware.ts` - Locale routing
- [ ] `package.json` - Dependencies
- [ ] `next.config.ts` - Next.js config
- [ ] `tsconfig.json` - TypeScript config
- [ ] `.env.example` - Environment template

### Documentation:
- [ ] All `.md` files (15+ guides)
- [ ] `README.md` - Updated with your changes

### Optional:
- [ ] `strapi/` - If you set up Strapi already
- [ ] `.env.local` - Your local environment (DON'T commit!)

---

## 🔧 After Migration

### Update README

Update the README with your fork details:

```markdown
# Superteam Academy - My Implementation

Forked from: [original-repo-url]

## My Contributions

- ✅ Multi-language support (en, pt-BR, es)
- ✅ Complete on-chain Solana integration
- ✅ Backend API routes for server-signed transactions
- ✅ Analytics integration (GA4, PostHog, Sentry)
- ✅ Strapi CMS setup
- ✅ Comprehensive documentation (15+ guides)

## Live Demo

- **URL**: [your-vercel-url]
- **Video**: [your-demo-video]
```

### Create Pull Request

1. Go to your fork on GitHub
2. Click "Pull Request"
3. Select base: `original-repo:main` ← head: `your-fork:feat/your-implementation`
4. Use the template from `PR_SUBMISSION_TEMPLATE.md`
5. Submit!

---

## 🆘 Troubleshooting

### "Repository already exists"

If you already have a fork:
```bash
# Just add it as remote and push
git remote add upstream https://github.com/ORIGINAL/repo.git
git push origin main
```

### "Merge conflicts"

If the original repo has updates:
```bash
# Fetch upstream changes
git fetch upstream
git merge upstream/main

# Resolve conflicts
# Then commit and push
```

### "Dependencies not installing"

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🚀 Quick Command Sequence

**Fastest way to migrate:**

```bash
# 1. Fork on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/superteam-academy.git fork
cd fork

# 3. Copy all your work (from your current project)
cp -r ../your-current-project/app ./
cp -r ../your-current-project/components ./
cp -r ../your-current-project/lib ./
cp -r ../your-current-project/messages ./
cp ../your-current-project/i18n.ts ./
cp ../your-current-project/middleware.ts ./
cp ../your-current-project/package.json ./
cp ../your-current-project/*.md ./

# 4. Install and test
npm install
npm run build

# 5. Commit and push
git add .
git commit -m "feat: Complete implementation"
git push origin main

# 6. Create PR on GitHub
```

---

## ✅ Verification

After migration, verify:

- [ ] `npm run build` passes
- [ ] All pages load: `/`, `/courses`, `/dashboard`, etc.
- [ ] API routes work: `/api/complete-lesson`, etc.
- [ ] Translations work: `/en`, `/pt-BR`, `/es`
- [ ] Documentation is complete
- [ ] `.env.example` has all variables

---

**Migration is simple! Just copy your work to the fork and push. 🚀**

Let me know if you need help with any step!
