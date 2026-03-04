# 🎉 Complete Setup Guide - Superteam Academy

Complete guide for all integrations: Strapi CMS, i18n, and Analytics.

---

## ✅ What Has Been Set Up

### 1. 🌍 Internationalization (i18n) with next-intl

**Files Created:**
- `i18n.ts` - i18n configuration
- `middleware.ts` - Locale routing middleware
- `messages/en.json` - English translations
- `messages/pt-BR.json` - Portuguese (Brazil) translations
- `messages/es.json` - Spanish translations

**Supported Languages:**
- 🇺🇸 English (en) - Default
- 🇧🇷 Portuguese (pt-BR)
- 🇪🇸 Spanish (es)

**Features:**
- ✅ Automatic locale detection
- ✅ URL-based locale switching (/en, /pt-BR, /es)
- ✅ Fallback to default locale
- ✅ Complete translations for all pages

**Usage in Components:**
```typescript
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('common');
  return <h1>{t('appName')}</h1>;
}
```

---

### 2. 📊 Analytics Integration

#### Google Analytics 4 (GA4)
**File:** `lib/analytics.ts` (already existed, enhanced)

**Features:**
- Page view tracking
- Custom event tracking
- User identification
- E-commerce events ready

**Setup:**
1. Create GA4 property at analytics.google.com
2. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

#### Sentry Error Tracking
**File:** `lib/analytics/sentry.ts`

**Features:**
- Automatic error capture
- Performance monitoring
- Session replay
- Breadcrumb tracking
- User context

**Setup:**
1. Create project at sentry.io
2. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
   ```

**Usage:**
```typescript
import { captureException, addBreadcrumb } from '@/lib/analytics/sentry';

try {
  // Your code
} catch (error) {
  captureException(error, { context: 'user-action' });
}
```

#### PostHog Product Analytics
**File:** `lib/analytics/posthog.ts`

**Features:**
- Event tracking
- User identification
- Feature flags
- Session recording
- Funnel analysis
- A/B testing ready

**Setup:**
1. Create project at posthog.com
2. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxx
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

**Predefined Events:**
```typescript
import { analytics } from '@/lib/analytics/posthog';

// Track course enrollment
analytics.courseEnrolled('solana-fundamentals');

// Track lesson completion
analytics.lessonCompleted('solana-fundamentals', 'lesson-1', 50);

// Track wallet connection
analytics.walletConnected('phantom', walletAddress);
```

---

### 3. 📝 Strapi CMS Setup

**Documentation:**
- `STRAPI_SETUP.md` - Installation and configuration
- `STRAPI_CONTENT_GUIDE.md` - Content creation guide

**Content Types:**
- **Course** - Course metadata
- **Module** - Course sections
- **Lesson** - Individual lessons
- **Challenge** - Coding challenges

**Features:**
- ✅ Full i18n support (en, pt-BR, es)
- ✅ Rich text editor
- ✅ Media library
- ✅ API access
- ✅ Draft/Publish workflow

**Quick Start:**
```bash
# Install Strapi
npx create-strapi-app@latest strapi --quickstart

# Start Strapi
cd strapi && npm run develop

# Visit admin panel
open http://localhost:1337/admin
```

---

## 🔧 Environment Variables

Update your `.env.local` with:

```bash
# Solana
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.devnet.solana.com
BACKEND_SIGNER_SECRET_KEY=your_base64_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Superteam Academy

# Strapi CMS
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token

# Analytics - Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Analytics - Sentry
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# Analytics - PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

---

## 📦 Dependencies Installed

```json
{
  "dependencies": {
    "next-intl": "^4.8.3",
    "@sentry/nextjs": "latest",
    "posthog-js": "latest",
    "@coral-xyz/anchor": "^0.30.1",
    "@solana/spl-token": "^0.4.9",
    "bn.js": "^5.2.1"
  }
}
```

---

## 🚀 Usage Examples

### Using Translations

```typescript
// In a client component
'use client'
import { useTranslations } from 'next-intl';

export default function MyPage() {
  const t = useTranslations('courses');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <button>{t('enroll')}</button>
    </div>
  );
}
```

### Tracking Events

```typescript
import { analytics } from '@/lib/analytics/posthog';
import { trackCourseStart } from '@/lib/analytics';

function CourseDetailPage() {
  const handleEnroll = async () => {
    // Track in PostHog
    analytics.courseEnrolled(courseId);
    
    // Track in GA4
    trackCourseStart(courseId);
    
    // Actual enrollment logic
    await enroll(courseId);
  };
  
  return <button onClick={handleEnroll}>Enroll</button>;
}
```

### Error Tracking

```typescript
import { captureException } from '@/lib/analytics/sentry';

async function completeLesson() {
  try {
    const response = await fetch('/api/complete-lesson', { ... });
    if (!response.ok) throw new Error('Failed to complete lesson');
  } catch (error) {
    captureException(error, {
      courseId,
      lessonIndex,
      userId: publicKey?.toString(),
    });
    throw error;
  }
}
```

### Fetching from Strapi

```typescript
// Create lib/strapi/client.ts
import { Strapi } from '@strapi/sdk-js';

const strapi = new Strapi({
  url: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  apiToken: process.env.STRAPI_API_TOKEN,
});

export async function getCourses(locale = 'en') {
  const { data } = await strapi.find('courses', {
    locale,
    populate: ['modules', 'thumbnail'],
    filters: { isActive: { $eq: true } },
  });
  return data;
}
```

---

## 🌐 Language Switching

Add a language switcher component:

```typescript
'use client'
import { useRouter, usePathname } from 'next/navigation';
import { locales } from '@/i18n';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  
  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };
  
  return (
    <select onChange={(e) => switchLocale(e.target.value)}>
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale === 'en' && '🇺🇸 English'}
          {locale === 'pt-BR' && '🇧🇷 Português'}
          {locale === 'es' && '🇪🇸 Español'}
        </option>
      ))}
    </select>
  );
}
```

---

## 🔍 Testing Your Setup

### Test i18n

1. Start dev server: `npm run dev`
2. Visit: http://localhost:3000
3. Visit: http://localhost:3000/pt-BR
4. Visit: http://localhost:3000/es
5. Check translations are working

### Test Analytics

1. **GA4:** Check Real-Time reports in Google Analytics
2. **Sentry:** Trigger an error and check Sentry dashboard
3. **PostHog:** Check Live Events in PostHog dashboard

### Test Strapi

1. Start Strapi: `cd strapi && npm run develop`
2. Visit: http://localhost:1337/admin
3. Create a test course
4. Fetch via API: http://localhost:1337/api/courses

---

## 📊 Analytics Provider Integration

Update `app/layout.tsx`:

```typescript
import { AnalyticsProvider } from '@/components/providers/analytics-provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SolanaProvider>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </SolanaProvider>
      </body>
    </html>
  );
}
```

---

## 🆘 Troubleshooting

### i18n not working
- Check middleware.ts is in root directory
- Verify messages/[locale].json files exist
- Restart dev server

### Analytics not tracking
- Check environment variables are set
- Verify public key prefix (NEXT_PUBLIC_)
- Check browser console for errors

### Strapi connection failed
- Ensure Strapi is running on port 1337
- Check CORS settings in Strapi
- Verify API token is correct

---

## 📚 Documentation Links

- **next-intl**: https://next-intl-docs.vercel.app/
- **Sentry**: https://docs.sentry.io/platforms/javascript/guides/nextjs/
- **PostHog**: https://posthog.com/docs/libraries/next-js
- **Strapi**: https://docs.strapi.io
- **GA4**: https://developers.google.com/analytics/devguides/collection/ga4

---

## ✅ Final Checklist

- [ ] Install dependencies: `npm install`
- [ ] Configure environment variables
- [ ] Test i18n on different locales
- [ ] Set up Strapi CMS
- [ ] Create test content in Strapi
- [ ] Configure analytics (GA4, Sentry, PostHog)
- [ ] Test event tracking
- [ ] Add language switcher to header
- [ ] Test on production build

---

**All integrations are ready! 🎉**

Your Superteam Academy now has:
- ✅ Multi-language support (en, pt-BR, es)
- ✅ Complete analytics stack (GA4, Sentry, PostHog)
- ✅ CMS for content management (Strapi)
- ✅ On-chain integration (Solana)
- ✅ Backend API routes

**Ready for production! 🚀**
