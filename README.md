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

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Blockchain**: Solana (Devnet), Wallet Adapter, Metaplex
- **UI Components**: Radix UI + Custom Components
- **Analytics**: Ready for GA4, Sentry integration

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

Create a `.env.local` file:

```env
# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
SENTRY_DSN=
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
5. **Dashboard** (`/dashboard`) - Progress, XP, achievements
6. **Leaderboard** (`/leaderboard`) - Global rankings by XP
7. **Profile** (`/profile`) - User stats, credentials, achievements

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

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Environment Variables

Add these in Vercel dashboard:
- `NEXT_PUBLIC_SOLANA_NETWORK=devnet`
- `NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com`

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

## 🔗 Links

- **Live Demo**: [TBD]
- **GitHub**: https://github.com/solanabr/superteam-academy
- **Twitter**: [@SuperteamBR](https://twitter.com/SuperteamBR)
- **Discord**: [discord.gg/superteambrasil](https://discord.gg/superteambrasil)

## 🙏 Acknowledgments

Built for the Superteam Brazil bounty program. Special thanks to the Solana and Metaplex communities.

---

**Built with ❤️ for the Solana ecosystem**
