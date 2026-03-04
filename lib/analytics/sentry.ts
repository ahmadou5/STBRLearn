// NOTE: Install @sentry/nextjs to enable Sentry error tracking
// Run: npm install @sentry/nextjs
// import * as Sentry from "@sentry/nextjs";

type SentryModule = any;

/**
 * Initialize Sentry for error tracking
 * NOTE: Requires @sentry/nextjs package
 */
export function initSentry() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    console.log('[Sentry] Install @sentry/nextjs to enable error tracking');
    /* Uncomment when @sentry/nextjs is installed:
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      
      // Set sample rate for production
      tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
      
      // Capture errors and performance data
      integrations: [
        new Sentry.BrowserTracing({
          tracePropagationTargets: ["localhost", /^https:\/\/yourapp\.vercel\.app/],
        }),
        new Sentry.Replay({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      
      // Session Replay sample rate
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      
      // Environment
      environment: process.env.NODE_ENV,
      
      // Filter out specific errors
      beforeSend(event, hint) {
        // Don't send wallet connection errors
        if (event.exception?.values?.[0]?.value?.includes("User rejected")) {
          return null;
        }
        return event;
      },
    });
    */
  }
}

/**
 * Capture an exception
 */
export function captureException(error: Error, context?: Record<string, any>) {
  console.error('[Sentry]', error, context);
  // Uncomment when @sentry/nextjs is installed:
  // Sentry.captureException(error, { extra: context });
}

/**
 * Capture a message
 */
export function captureMessage(message: string, level: string = "info") {
  console.log(`[Sentry] ${level}:`, message);
  // Uncomment when @sentry/nextjs is installed:
  // Sentry.captureMessage(message, level as Sentry.SeverityLevel);
}

/**
 * Set user context
 */
export function setUser(user: { id: string; wallet?: string; email?: string }) {
  console.log('[Sentry] User:', user);
  // Uncomment when @sentry/nextjs is installed:
  // Sentry.setUser(user);
}

/**
 * Clear user context
 */
export function clearUser() {
  console.log('[Sentry] User cleared');
  // Uncomment when @sentry/nextjs is installed:
  // Sentry.setUser(null);
}

/**
 * Add breadcrumb
 */
export function addBreadcrumb(message: string, data?: Record<string, any>) {
  console.log('[Sentry] Breadcrumb:', message, data);
  // Uncomment when @sentry/nextjs is installed:
  // Sentry.addBreadcrumb({ message, data, timestamp: Date.now() / 1000 });
}
