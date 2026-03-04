# Superteam Academy - Solana Learning Platform

The ultimate learning platform for Solana-native developers. Interactive courses, gamified progression, and on-chain credentials built for LATAM builders.

## 🚀 Features

- **Interactive Courses** - Learn Solana development with hands-on coding challenges
- **Gamification** - Earn XP, unlock achievements, climb the leaderboard
- **On-Chain Credentials** - Verifiable NFT credentials for course completion
- **Multi-Language** - Support for Portuguese, Spanish, and English
- **Embedded Code Editor** - Practice Solana development with integrated Solana Playground
- **Wallet Integration** - Connect with Phantom, Solflare, and other Solana wallets

## 📋 Tech Stack

- **Framework**: Next.js 15 (App Router with Turbopack)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3
- **Blockchain**: Solana Web3.js, Wallet Adapter (Phantom, Solflare)
- **UI Components**: Radix UI + shadcn/ui Components
- **Code Editor**: Solana Playground (embedded iframe)
- **Analytics**: Google Analytics 4 ready, Sentry integration ready

## 🛠️ Local Development

### Prerequisites

- Node.js 20+ 
- npm 10+
- Solana wallet (Phantom/Solflare recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/solanabr/superteam-academy.git
cd superteam-academy/app

# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file (see `.env.example` for template):

```env
# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.devnet.solana.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Superteam Academy

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

## 📁 Project Structure

```
app/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── courses/           # Course catalog & details
│   ├── dashboard/         # User dashboard
│   ├── leaderboard/       # Global rankings
│   └── profile/           # User profile
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Header, Footer
│   └── providers/         # Solana wallet provider
├── lib/
│   ├── types.ts           # TypeScript types
│   ├── utils.ts           # Utility functions
│   ├── mock-data.ts       # Mock course data
│   └── services/          # Service layer for on-chain integration
└── public/                # Static assets
```

## 🎯 Core Pages

1. **Landing Page** (`/`) - Hero, features, course previews
2. **Course Catalog** (`/courses`) - Filterable course grid
3. **Course Detail** (`/courses/[slug]`) - Module/lesson breakdown
4. **Lesson Viewer** (`/courses/[slug]/lessons/[id]`) - Content + code editor
5. **Dashboard** (`/dashboard`) - Progress, XP, achievements, streaks
6. **Leaderboard** (`/leaderboard`) - Global rankings by XP
7. **Profile** (`/profile`) - User stats, credentials, achievements
8. **Settings** (`/settings`) - Profile, wallet, notifications, preferences

## 🎮 Gamification System

### XP & Leveling
- XP is tracked as soulbound Token-2022 tokens
- Level calculation: `Level = floor(sqrt(XP / 100))`
- Earn XP by completing lessons and challenges

### Achievements
- Progress-based (First Steps, Course Completer)
- Streak-based (Week Warrior, Monthly Master)
- Skill-based (Rust Rookie, Anchor Expert)
- Community & Special badges

### Streaks
- Track consecutive days of learning
- Visual calendar with activity history
- Milestone rewards at 7, 30, 100 days

## 🔗 On-Chain Integration

The platform integrates with the Superteam Academy Anchor program for:

- **XP Tokens**: Soulbound SPL tokens (Token-2022, NonTransferable)
- **Credentials**: Metaplex Core NFTs with PermanentFreezeDelegate
- **Progress**: On-chain enrollment and lesson completion tracking

### Service Layer

Clean abstraction in `lib/services/learning-progress.service.ts`:

```typescript
interface LearningProgressService {
  getXPBalance(walletAddress: string): Promise<number>
  getCredentials(walletAddress: string): Promise<Credential[]>
  getLeaderboard(timeframe: string): Promise<LeaderboardEntry[]>
  completeLesson(userId: string, courseId: string, lessonId: string): Promise<void>
}
```

Currently uses mock implementation - swap for on-chain calls when ready.

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment guide.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/solanabr/superteam-academy)

Or manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Required Environment Variables

Add these in Vercel dashboard:
- `NEXT_PUBLIC_SOLANA_NETWORK=devnet`
- `NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.devnet.solana.com`
- `NEXT_PUBLIC_APP_URL=https://your-app.vercel.app`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for premium RPC providers (Helius, QuickNode, Alchemy).

## 📊 Performance Targets

- **Lighthouse Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1

## 🌍 Internationalization

Multi-language support for:
- 🇧🇷 Portuguese (PT-BR)
- 🇪🇸 Spanish (ES)
- 🇺🇸 English (EN)

(Implementation ready - language files to be added)

## 🤝 Contributing

This is an open-source project. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - See [LICENSE](LICENSE) file

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design, patterns, and technical decisions
- **[CUSTOMIZATION.md](./CUSTOMIZATION.md)** - How to customize for your own learning platform
- **[CMS_GUIDE.md](./CMS_GUIDE.md)** - Content management workflow and best practices
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[TODO_PROGRESS.md](./TODO_PROGRESS.md)** - Development progress tracker

## 🔗 Links

- **Live Demo**: [TBD - Deploy and add URL here]
- **Demo Video**: [TBD - Add Loom/YouTube link]
- **GitHub**: https://github.com/solanabr/superteam-academy
- **Twitter**: [@SuperteamBR](https://twitter.com/SuperteamBR)
- **Discord**: [discord.gg/superteambrasil](https://discord.gg/superteambrasil)

## 🙏 Acknowledgments

Built for the Superteam Brazil bounty program. Special thanks to the Solana and Metaplex communities.

---

**Built with ❤️ for the Solana ecosystem**
