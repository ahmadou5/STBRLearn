// Mock data for development
import type { Course, Achievement } from "./types"

export const mockCourses: Course[] = [
  {
    id: "1",
    slug: "solana-fundamentals",
    title: "Solana Fundamentals",
    description: "Learn the basics of Solana blockchain development from scratch",
    difficulty: "beginner",
    duration: 240,
    xpReward: 500,
    track: "fundamentals",
    progress: 0,
    modules: [
      {
        id: "m1",
        title: "Introduction to Solana",
        description: "Understanding Solana's architecture and key concepts",
        order: 1,
        lessons: [
          {
            id: "l1",
            title: "What is Solana?",
            type: "content",
            content: "# What is Solana?\n\nSolana is a high-performance blockchain...",
            moduleId: "m1",
            order: 1,
            xpReward: 25,
          },
          {
            id: "l2",
            title: "Your First Transaction",
            type: "challenge",
            content: "# Challenge: Send a Transaction\n\nCreate and send your first Solana transaction.",
            moduleId: "m1",
            order: 2,
            xpReward: 50,
            starterCode: `import { Connection, Keypair } from '@solana/web3.js';\n\n// TODO: Create a connection to devnet\nconst connection = ;\n`,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    slug: "anchor-framework",
    title: "Anchor Framework",
    description: "Master Solana smart contract development with Anchor",
    difficulty: "intermediate",
    duration: 360,
    xpReward: 1000,
    track: "development",
    progress: 0,
    modules: [
      {
        id: "m1",
        title: "Getting Started with Anchor",
        description: "Learn the basics of the Anchor framework",
        order: 1,
        lessons: [
          {
            id: "l1",
            title: "Anchor Project Structure",
            type: "content",
            content: "# Anchor Project Structure\n\nAnchor projects follow a standard structure...",
            moduleId: "m1",
            order: 1,
            xpReward: 25,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    slug: "defi-development",
    title: "DeFi Protocol Development",
    description: "Build production-ready DeFi applications on Solana",
    difficulty: "advanced",
    duration: 480,
    xpReward: 2000,
    track: "defi",
    progress: 0,
    modules: [
      {
        id: "m1",
        title: "DeFi Fundamentals",
        description: "Understanding DeFi protocols and patterns",
        order: 1,
        lessons: [
          {
            id: "l1",
            title: "AMM Design Patterns",
            type: "content",
            content: "# Automated Market Makers\n\nLearn how AMMs work on Solana...",
            moduleId: "m1",
            order: 1,
            xpReward: 50,
          },
        ],
      },
    ],
  },
]

export const mockAchievements: Achievement[] = [
  {
    id: "a1",
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    xpReward: 25,
    category: "progress",
  },
  {
    id: "a2",
    name: "Course Completer",
    description: "Finish your first course",
    icon: "🏆",
    xpReward: 100,
    category: "progress",
  },
  {
    id: "a3",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    xpReward: 50,
    category: "streak",
  },
  {
    id: "a4",
    name: "Rust Rookie",
    description: "Complete 5 Rust challenges",
    icon: "🦀",
    xpReward: 75,
    category: "skill",
  },
  {
    id: "a5",
    name: "Early Adopter",
    description: "Join during beta period",
    icon: "⭐",
    xpReward: 200,
    category: "special",
    unlockedAt: new Date(),
  },
]
