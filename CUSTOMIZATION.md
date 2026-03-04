# 🎨 Customization Guide

This guide explains how to customize Superteam Academy for your own learning platform or community.

---

## 📋 Table of Contents

1. [Branding & Theming](#branding--theming)
2. [Course Content](#course-content)
3. [Gamification System](#gamification-system)
4. [Wallet Integration](#wallet-integration)
5. [Analytics & Tracking](#analytics--tracking)
6. [Deployment Configuration](#deployment-configuration)

---

## 🎨 Branding & Theming

### Update Site Metadata

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Academy Name - Learn Solana Development",
  description: "Your custom description here",
};
```

### Customize Colors

Edit `app/globals.css` to change the color scheme:

```css
@layer base {
  :root {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;
    --primary: 210 40% 98%;
    /* Modify these values for your brand colors */
  }
}
```

### Update Logo & Favicon

- Replace `app/favicon.ico` with your logo
- Update header logo in `components/layout/header.tsx`

### Modify Footer

Edit `components/layout/footer.tsx` to change:
- Social media links
- Footer navigation
- Copyright text

---

## 📚 Course Content

### Adding New Courses

Edit `lib/mock-data.ts` and add to the `mockCourses` array:

```typescript
{
  id: 'your-course-id',
  slug: 'your-course-slug',
  title: 'Your Course Title',
  description: 'Course description',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  duration: 120, // minutes
  xpReward: 500,
  track: 'development' | 'defi' | 'nfts',
  modules: [
    {
      id: 'm1',
      title: 'Module Title',
      description: 'Module description',
      lessons: [
        {
          id: 'l1',
          title: 'Lesson Title',
          type: 'lesson' | 'challenge',
          duration: 30,
          xpReward: 50,
          content: 'Markdown content here...',
          completed: false,
        }
      ]
    }
  ]
}
```

### Course Tracks

Available tracks (defined in `lib/types.ts`):
- `development` - Core programming
- `defi` - Decentralized Finance
- `nfts` - NFT development
- `security` - Security & auditing

Add new tracks by updating the `CourseTrack` type.

### Lesson Types

- **lesson** - Theory and explanations
- **challenge** - Interactive coding exercises with Solana Playground

### Adding Code Challenges

For challenge lessons, include:

```typescript
{
  type: 'challenge',
  content: `
    ## Challenge: Build a Token Program
    
    Your task is to...
    
    ### Requirements:
    - Requirement 1
    - Requirement 2
    
    ### Hints:
    - Hint 1
    - Hint 2
  `,
  // Challenge-specific fields can be added
}
```

---

## 🎮 Gamification System

### XP & Leveling

Modify XP calculations in `lib/utils.ts`:

```typescript
export function calculateLevel(xp: number): number {
  // Customize the leveling formula
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

export function getXPForNextLevel(currentLevel: number): number {
  // Customize XP required per level
  return (currentLevel ** 2) * 100
}
```

### Achievements

Add new achievements in `lib/mock-data.ts`:

```typescript
export const mockAchievements: Achievement[] = [
  {
    id: 'your-achievement',
    title: 'Achievement Title',
    description: 'How to unlock this',
    icon: '🏆', // Emoji or icon
    unlockedAt: new Date().toISOString(), // or null if locked
    rarity: 'common' | 'rare' | 'epic' | 'legendary',
  }
]
```

### Streaks

The streak calendar is in `app/dashboard/page.tsx`. Customize:
- Days required for streak bonuses
- XP multipliers
- Visual indicators

---

## 💰 Wallet Integration

### Supported Wallets

Edit `components/providers/solana-provider.tsx` to add/remove wallets:

```typescript
const wallets = useMemo(
  () => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    // Add more wallet adapters here
  ],
  [network]
);
```

### Network Configuration

Change the Solana network in `.env.example`:

```bash
NEXT_PUBLIC_SOLANA_NETWORK=devnet  # or mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.devnet.solana.com
```

### Custom RPC Endpoints

For better performance, use premium RPC providers:

```bash
# Helius
NEXT_PUBLIC_SOLANA_RPC_HOST=https://rpc.helius.xyz/?api-key=YOUR_KEY

# QuickNode
NEXT_PUBLIC_SOLANA_RPC_HOST=https://your-endpoint.solana-devnet.quiknode.pro/YOUR_KEY/
```

---

## 📊 Analytics & Tracking

### Google Analytics Setup

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Track Custom Events

Use the analytics helper in `lib/analytics.ts`:

```typescript
import { trackCourseStart, trackLessonComplete } from '@/lib/analytics'

// Track when user starts a course
trackCourseStart('solana-fundamentals')

// Track lesson completion
trackLessonComplete('lesson-1', 50) // lessonId, xpEarned
```

### Available Tracking Events

- `trackCourseStart(courseSlug)`
- `trackLessonComplete(lessonId, xpEarned)`
- `trackWalletConnect(walletType)`
- `trackAchievementUnlock(achievementId)`
- `trackChallengeSubmit(challengeId, success)`

### Sentry Error Tracking (Optional)

1. Create account at [sentry.io](https://sentry.io)
2. Get your DSN
3. Add to `.env.local`:

```bash
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

4. Install Sentry SDK:

```bash
npm install @sentry/nextjs
```

---

## 🚀 Deployment Configuration

### Environment Variables

Create `.env.local` for local development:

```bash
# Copy from .env.example
cp .env.example .env.local

# Edit with your values
nano .env.local
```

### Vercel Deployment

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

**Required Environment Variables for Production:**
- `NEXT_PUBLIC_SOLANA_NETWORK`
- `NEXT_PUBLIC_SOLANA_RPC_HOST`
- `NEXT_PUBLIC_APP_URL` (your production URL)

**Optional Environment Variables:**
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_SENTRY_DSN`

### Next.js Configuration

Edit `next.config.ts` for production optimizations:

```typescript
const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    domains: ['yourdomain.com'],
  },
  
  // Enable experimental features
  experimental: {
    optimizeCss: true,
  },
  
  // Redirect www to non-www
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.yourdomain.com' }],
        destination: 'https://yourdomain.com/:path*',
        permanent: true,
      },
    ]
  },
};
```

---

## 🔧 Advanced Customization

### Service Layer (Future On-Chain Integration)

The `LearningProgressService` interface in `lib/services/learning-progress.service.ts` is designed for easy migration to on-chain data:

1. Keep `MockLearningProgressService` for development
2. Create `SolanaLearningProgressService` for production
3. Swap implementations in your components

Example:

```typescript
// Current (mock)
import { mockProgressService } from '@/lib/services/learning-progress.service'

// Future (on-chain)
import { solanaProgressService } from '@/lib/services/solana-progress.service'
```

### Database Integration

To persist user data:

1. Add database (Supabase, PostgreSQL, MongoDB)
2. Create API routes in `app/api/`
3. Update service layer to use database
4. Add authentication (NextAuth.js recommended)

### Internationalization (i18n)

Add multiple languages:

```bash
npm install next-intl
```

Follow the [next-intl documentation](https://next-intl-docs.vercel.app/) to add:
- Portuguese (PT-BR)
- Spanish (ES)
- English (EN)

---

## 📝 Content Management System (CMS)

For easier content management, see `CMS_GUIDE.md`.

Consider integrating:
- **Notion** - Use Notion API for course content
- **Contentful** - Headless CMS
- **Sanity** - Structured content platform
- **MDX** - Store lessons as `.mdx` files

---

## 🎯 Quick Customization Checklist

- [ ] Update site metadata (title, description)
- [ ] Replace favicon and logo
- [ ] Customize color scheme
- [ ] Add your courses to `mock-data.ts`
- [ ] Update footer links and text
- [ ] Configure Solana network and RPC
- [ ] Set up Google Analytics
- [ ] Add environment variables
- [ ] Test wallet connection
- [ ] Deploy to Vercel
- [ ] Add custom domain

---

## 💡 Need Help?

- Check `ARCHITECTURE.md` for system design details
- See `README.md` for setup instructions
- Review `CMS_GUIDE.md` for content management
- Open an issue on GitHub for questions

---

**Happy Customizing! 🚀**
