// Service layer for learning progress - clean abstraction for on-chain integration

import type { UserProgress, Credential, LeaderboardEntry, Streak } from "@/lib/types"

export interface LearningProgressService {
  // Progress tracking
  getProgress(userId: string, courseId: string): Promise<UserProgress | null>
  completeLesson(userId: string, courseId: string, lessonId: string): Promise<void>
  
  // XP management
  getXPBalance(walletAddress: string): Promise<number>
  awardXP(userId: string, amount: number): Promise<void>
  
  // Credentials
  getCredentials(walletAddress: string): Promise<Credential[]>
  issueCredential(walletAddress: string, courseId: string): Promise<string> // returns mint address
  
  // Leaderboard
  getLeaderboard(timeframe: "weekly" | "monthly" | "all-time", limit?: number): Promise<LeaderboardEntry[]>
  
  // Streaks
  getStreak(userId: string): Promise<Streak>
  updateStreak(userId: string): Promise<Streak>
}

// Mock implementation for MVP - will be replaced with on-chain calls
export class MockLearningProgressService implements LearningProgressService {
  private progressMap = new Map<string, UserProgress>()
  private xpMap = new Map<string, number>()
  private streakMap = new Map<string, Streak>()
  
  async getProgress(userId: string, courseId: string): Promise<UserProgress | null> {
    const key = `${userId}-${courseId}`
    return this.progressMap.get(key) || null
  }
  
  async completeLesson(userId: string, courseId: string, lessonId: string): Promise<void> {
    const key = `${userId}-${courseId}`
    const existing = this.progressMap.get(key)
    
    if (existing) {
      if (!existing.completedLessons.includes(lessonId)) {
        existing.completedLessons.push(lessonId)
        existing.lastActivityAt = new Date()
      }
    } else {
      this.progressMap.set(key, {
        userId,
        courseId,
        completedLessons: [lessonId],
        xpEarned: 0,
        enrolledAt: new Date(),
        lastActivityAt: new Date(),
      })
    }
  }
  
  async getXPBalance(walletAddress: string): Promise<number> {
    return this.xpMap.get(walletAddress) || 0
  }
  
  async awardXP(userId: string, amount: number): Promise<void> {
    const current = this.xpMap.get(userId) || 0
    this.xpMap.set(userId, current + amount)
  }
  
  async getCredentials(walletAddress: string): Promise<Credential[]> {
    // Mock credentials - in production, fetch from Metaplex
    return []
  }
  
  async issueCredential(walletAddress: string, courseId: string): Promise<string> {
    // Mock - in production, mint Metaplex Core NFT
    return `mock-nft-${Date.now()}`
  }
  
  async getLeaderboard(timeframe: "weekly" | "monthly" | "all-time", limit = 10): Promise<LeaderboardEntry[]> {
    // Mock leaderboard
    const entries: LeaderboardEntry[] = Array.from(this.xpMap.entries())
      .map(([userId, xp], index) => ({
        rank: index + 1,
        userId,
        username: `User${userId.slice(0, 6)}`,
        xp,
        level: Math.floor(Math.sqrt(xp / 100)),
        streak: 5,
      }))
      .sort((a, b) => b.xp - a.xp)
      .slice(0, limit)
    
    return entries
  }
  
  async getStreak(userId: string): Promise<Streak> {
    return this.streakMap.get(userId) || {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: new Date(),
      streakHistory: [],
    }
  }
  
  async updateStreak(userId: string): Promise<Streak> {
    const existing = await this.getStreak(userId)
    const now = new Date()
    const lastActivity = existing.lastActivityDate
    const daysDiff = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
    
    let currentStreak = existing.currentStreak
    if (daysDiff === 1) {
      currentStreak++
    } else if (daysDiff > 1) {
      currentStreak = 1
    }
    
    const streak: Streak = {
      currentStreak,
      longestStreak: Math.max(currentStreak, existing.longestStreak),
      lastActivityDate: now,
      streakHistory: [...existing.streakHistory, now],
    }
    
    this.streakMap.set(userId, streak)
    return streak
  }
}

// Export singleton instance
export const learningProgressService = new MockLearningProgressService()
