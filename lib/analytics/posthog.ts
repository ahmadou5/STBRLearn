'use client'

import posthog from 'posthog-js'

/**
 * Initialize PostHog for product analytics
 */
export function initPostHog() {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          posthog.debug()
        }
      },
      capture_pageview: false, // We'll capture manually
      capture_pageleave: true,
      autocapture: true,
    })
  }
}

/**
 * Track a custom event
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties)
  }
}

/**
 * Track page view
 */
export function trackPageView(url?: string) {
  if (typeof window !== 'undefined') {
    posthog.capture('$pageview', {
      $current_url: url || window.location.href,
    })
  }
}

/**
 * Identify user
 */
export function identifyUser(userId: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, properties)
  }
}

/**
 * Reset user session
 */
export function resetUser() {
  if (typeof window !== 'undefined') {
    posthog.reset()
  }
}

/**
 * Set user properties
 */
export function setUserProperties(properties: Record<string, any>) {
  if (typeof window !== 'undefined') {
    posthog.people.set(properties)
  }
}

/**
 * Feature flags
 */
export function isFeatureEnabled(flag: string): boolean {
  if (typeof window !== 'undefined') {
    return posthog.isFeatureEnabled(flag) ?? false
  }
  return false
}

/**
 * Predefined event trackers
 */
export const analytics = {
  // Course events
  courseViewed: (courseId: string) => {
    trackEvent('course_viewed', { course_id: courseId })
  },
  
  courseEnrolled: (courseId: string) => {
    trackEvent('course_enrolled', { course_id: courseId })
  },
  
  lessonCompleted: (courseId: string, lessonId: string, xpEarned: number) => {
    trackEvent('lesson_completed', {
      course_id: courseId,
      lesson_id: lessonId,
      xp_earned: xpEarned,
    })
  },
  
  courseCompleted: (courseId: string, totalXp: number) => {
    trackEvent('course_completed', {
      course_id: courseId,
      total_xp: totalXp,
    })
  },
  
  // Wallet events
  walletConnected: (walletType: string, address: string) => {
    trackEvent('wallet_connected', {
      wallet_type: walletType,
      wallet_address: address,
    })
  },
  
  walletDisconnected: () => {
    trackEvent('wallet_disconnected')
  },
  
  // Challenge events
  challengeStarted: (challengeId: string) => {
    trackEvent('challenge_started', { challenge_id: challengeId })
  },
  
  challengeSubmitted: (challengeId: string, success: boolean) => {
    trackEvent('challenge_submitted', {
      challenge_id: challengeId,
      success,
    })
  },
  
  // Achievement events
  achievementUnlocked: (achievementId: string) => {
    trackEvent('achievement_unlocked', {
      achievement_id: achievementId,
    })
  },
  
  // Credential events
  credentialIssued: (credentialId: string, courseId: string) => {
    trackEvent('credential_issued', {
      credential_id: credentialId,
      course_id: courseId,
    })
  },
  
  // Social events
  leaderboardViewed: () => {
    trackEvent('leaderboard_viewed')
  },
  
  profileViewed: (userId?: string) => {
    trackEvent('profile_viewed', { user_id: userId })
  },
}

export default posthog
