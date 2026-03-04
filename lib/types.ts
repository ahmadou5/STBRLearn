// Core types for the learning platform

export type Difficulty = "beginner" | "intermediate" | "advanced"

export interface Course {
  id: string
  slug: string
  title: string
  description: string
  difficulty: Difficulty
  duration: number // in minutes
  xpReward: number
  track: string
  thumbnail?: string
  modules: Module[]
  progress?: number
  enrolled?: boolean
}

export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  order: number
}

export interface Lesson {
  id: string
  title: string
  type: "content" | "challenge"
  content: string
  moduleId: string
  order: number
  xpReward: number
  completed?: boolean
  testCases?: TestCase[]
  starterCode?: string
  solution?: string
}

export interface TestCase {
  id: string
  description: string
  input: string
  expectedOutput: string
  passed?: boolean
}

export interface UserProgress {
  userId: string
  courseId: string
  completedLessons: string[]
  xpEarned: number
  enrolledAt: Date
  lastActivityAt: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  xpReward: number
  unlockedAt?: Date
  category: "progress" | "streak" | "skill" | "community" | "special"
}

export interface Credential {
  mintAddress: string
  track: string
  level: number
  coursesCompleted: number
  totalXP: number
  issuedAt: Date
  metadataUri: string
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  username: string
  avatar?: string
  xp: number
  level: number
  streak: number
}

export interface Streak {
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date
  streakHistory: Date[]
}
