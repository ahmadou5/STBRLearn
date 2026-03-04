# Architecture Documentation

## System Overview

Superteam Academy is a full-stack learning management system built on Next.js 16 with on-chain gamification powered by Solana.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │  Components  │  │  Services    │      │
│  │  (App Router)│  │   (UI/UX)    │  │  (Business)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Solana Blockchain (Devnet)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Anchor Program│  │  Token-2022  │  │  Metaplex    │      │
│  │  (Academy)   │  │   (XP)       │  │  (NFTs)      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Technology Stack

- **Framework**: Next.js 16 (App Router, React Server Components)
- **Language**: TypeScript 5 (strict mode, no `any` types)
- **Styling**: Tailwind CSS 4 with CSS variables for theming
- **State**: React hooks + Solana Wallet Adapter
- **UI Components**: Radix UI primitives + custom components

### Directory Structure

```
app/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Landing page
│   ├── courses/
│   │   ├── page.tsx         # Course catalog
│   │   └── [slug]/
│   │       ├── page.tsx     # Course detail
│   │       └── lessons/
│   │           └── [id]/page.tsx  # Lesson viewer
│   ├── dashboard/page.tsx
│   ├── leaderboard/page.tsx
│   └── profile/page.tsx
│
├── components/
│   ├── ui/                  # Base UI components (shadcn-style)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── progress.tsx
│   ├── layout/              # Layout components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   └── providers/
│       └── solana-provider.tsx  # Wallet adapter config
│
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   ├── utils.ts             # Utility functions
│   ├── mock-data.ts         # Development data
│   └── services/
│       └── learning-progress.service.ts  # Business logic
│
└── public/                  # Static assets
```

### Component Structure

Components follow a consistent pattern:

1. **Server Components** (default) - For static content
2. **Client Components** (`'use client'`) - For interactivity, wallet integration

Example component hierarchy:

```
RootLayout (Server)
├── SolanaProvider (Client)
│   ├── Header (Client - wallet button)
│   ├── Page Content (Server/Client mix)
│   └── Footer (Server)
```

### Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
Service Layer (lib/services/)
    ↓
Solana Web3.js / Wallet Adapter
    ↓
Blockchain Transaction / Query
    ↓
UI Update (React State)
```

## Service Layer Architecture

### LearningProgressService Interface

The `LearningProgressService` provides a clean abstraction for all learning-related operations:

```typescript
interface LearningProgressService {
  // Progress tracking
  getProgress(userId: string, courseId: string): Promise<UserProgress | null>
  completeLesson(userId: string, courseId: string, lessonId: string): Promise<void>
  
  // XP management
  getXPBalance(walletAddress: string): Promise<number>
  awardXP(userId: string, amount: number): Promise<void>
  
  // Credentials
  getCredentials(walletAddress: string): Promise<Credential[]>
  issueCredential(walletAddress: string, courseId: string): Promise<string>
  
  // Leaderboard
  getLeaderboard(timeframe: string, limit?: number): Promise<LeaderboardEntry[]>
  
  // Streaks
  getStreak(userId: string): Promise<Streak>
  updateStreak(userId: string): Promise<Streak>
}
```

### Current Implementation

- **MockLearningProgressService**: In-memory implementation for development
- Uses Map data structures to simulate database
- Returns realistic mock data

### Future On-Chain Implementation

To integrate with the Anchor program:

1. **XP Balance**: Query Token-2022 account balance
```typescript
const xpBalance = await connection.getTokenAccountBalance(xpTokenAccount)
```

2. **Credentials**: Fetch Metaplex Core NFTs owned by wallet
```typescript
const credentials = await metaplex.nfts().findAllByOwner({ owner: publicKey })
```

3. **Lesson Completion**: Submit transaction to update enrollment PDA
```typescript
await program.methods.completeLesson(lessonId)
  .accounts({ enrollment, user, course })
  .rpc()
```

4. **Leaderboard**: Index XP token balances (Helius DAS API or custom indexer)

## On-Chain Integration Points

### Account Structures (from Anchor program)

**Enrollment PDA**
- Seeds: `["enrollment", course, user]`
- Tracks: completedLessons bitmap (256 lessons)

**XP Token Account**
- Type: Token-2022 with NonTransferable extension
- Balance = user's total XP
- Level derived: `floor(sqrt(xp / 100))`

**Credential NFT (Metaplex Core)**
- One NFT per learning track
- Attributes: track, level, coursesCompleted, totalXP
- PermanentFreezeDelegate for soulbound behavior

**Achievement Receipt PDA**
- Seeds: `["achievement_receipt", achievement_type, user]`
- Tracks: timestamp, metadata
- Each receipt mints a soulbound NFT

### Integration Strategy

**Phase 1: Read Operations**
- ✅ Display XP balance from devnet
- ✅ Show credentials (NFTs) owned by wallet
- ✅ Leaderboard from indexed XP balances

**Phase 2: Write Operations (Backend-Signed)**
- Lesson completion (requires backend signing authority)
- Course finalization
- Achievement claiming

**Phase 3: User-Signed Transactions**
- Course enrollment (user signs directly)
- Optional: Tip instructors, donate XP

## Component Patterns

### Server Component Example
```typescript
// app/courses/page.tsx
export default function CoursesPage() {
  const courses = mockCourses // In production: fetch from CMS
  return <CourseGrid courses={courses} />
}
```

### Client Component Example
```typescript
'use client'
import { useWallet } from '@solana/wallet-adapter-react'

export function Dashboard() {
  const { publicKey } = useWallet()
  const [xp, setXP] = useState(0)
  
  useEffect(() => {
    if (publicKey) {
      learningProgressService.getXPBalance(publicKey.toBase58())
        .then(setXP)
    }
  }, [publicKey])
  
  return <div>XP: {xp}</div>
}
```

## Styling Architecture

### Tailwind Configuration

Uses CSS variables for theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  /* ... */
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

### Component Styling Pattern

```typescript
// Use cn() utility for conditional classes
<div className={cn(
  "base-classes",
  variant === "primary" && "primary-classes",
  className // Allow override
)} />
```

## State Management

### Wallet State
- Managed by `@solana/wallet-adapter-react`
- Available via `useWallet()` hook
- Auto-connects on app load

### User Data State
- Fetched on wallet connection
- Stored in component state (useState)
- Future: Consider React Query for caching

### Course Progress State
- Currently mock data in components
- Future: Sync with on-chain enrollment PDAs

## Code Editor Integration

### Embedded Solana Playground

```typescript
<iframe
  src="https://beta.solpg.io/embed"
  className="w-full h-full"
  title="Solana Playground"
/>
```

**Pros:**
- Zero setup, works immediately
- Full Solana development environment
- Users can build/deploy directly

**Cons:**
- Less control over UI/UX
- Requires iframe communication for programmatic interaction

**Future Enhancement:**
Use Monaco Editor or CodeMirror for more control:
- Custom test runner
- Real-time feedback
- Save code to user account

## Performance Considerations

### Code Splitting
- Automatic with Next.js App Router
- Client components lazy-loaded
- Route-based splitting

### Image Optimization
- Use Next.js `<Image>` component
- WebP format with fallbacks
- Lazy loading below the fold

### Bundle Size
- Solana dependencies are large (~500KB)
- Use dynamic imports for wallet adapters
- Tree-shake unused UI components

## Security Considerations

### Wallet Security
- Never request private keys
- Always use wallet adapter for signing
- Validate transaction contents before signing

### XSS Prevention
- Sanitize user-generated content
- Use `dangerouslySetInnerHTML` only for trusted markdown

### On-Chain Security
- Validate PDAs before transactions
- Check instruction discriminators
- Use TypeScript for type safety

## Testing Strategy

### Unit Tests
- Utility functions (calculateLevel, etc.)
- Service layer methods
- Component logic

### Integration Tests
- Page rendering
- Wallet connection flow
- Course enrollment

### E2E Tests (Playwright)
- Complete user journey
- Wallet connection mock
- Course completion flow

## Deployment Architecture

### Vercel Deployment
- Automatic from GitHub
- Edge functions for API routes (future)
- Preview deployments per PR

### Environment Variables
```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

### Build Optimization
```json
{
  "output": "standalone",
  "images": { "formats": ["image/webp"] }
}
```

## Future Enhancements

1. **Backend API** - Node.js server for transaction signing
2. **Database** - Supabase/PostgreSQL for user profiles, progress caching
3. **CMS Integration** - Strapi for course content management
4. **Analytics** - GA4 events, Sentry error tracking
5. **PWA** - Offline support, installable app
6. **i18n** - next-intl for multi-language support

## Monitoring & Analytics

### Planned Integrations

**Google Analytics 4**
- Page views
- Course enrollments
- Lesson completions
- XP earned events

**Sentry**
- Error tracking
- Performance monitoring
- User feedback

**Hotjar/PostHog**
- Heatmaps
- Session recordings
- User behavior insights

---

*This architecture is designed to be flexible and scalable. The service layer abstraction allows swapping mock implementations for real on-chain calls without touching UI components.*
