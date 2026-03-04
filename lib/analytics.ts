// Analytics utility functions for tracking user events

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Google Analytics pageview tracking
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID as string, {
      page_path: url,
    })
  }
}

// Google Analytics event tracking
type GTagEvent = {
  action: string
  category: string
  label?: string
  value?: number
}

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Predefined event helpers
export const trackCourseStart = (courseSlug: string) => {
  event({
    action: 'course_start',
    category: 'engagement',
    label: courseSlug,
  })
}

export const trackLessonComplete = (lessonId: string, xpEarned: number) => {
  event({
    action: 'lesson_complete',
    category: 'engagement',
    label: lessonId,
    value: xpEarned,
  })
}

export const trackWalletConnect = (walletType: string) => {
  event({
    action: 'wallet_connect',
    category: 'user',
    label: walletType,
  })
}

export const trackAchievementUnlock = (achievementId: string) => {
  event({
    action: 'achievement_unlock',
    category: 'gamification',
    label: achievementId,
  })
}

export const trackChallengeSubmit = (challengeId: string, success: boolean) => {
  event({
    action: 'challenge_submit',
    category: 'engagement',
    label: challengeId,
    value: success ? 1 : 0,
  })
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}
