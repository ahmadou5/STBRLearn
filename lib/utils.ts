import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100))
}

export function getXPForNextLevel(currentLevel: number): number {
  return (currentLevel + 1) ** 2 * 100
}

export function getLevelProgress(xp: number): number {
  const currentLevel = calculateLevel(xp)
  const currentLevelXP = currentLevel ** 2 * 100
  const nextLevelXP = getXPForNextLevel(currentLevel)
  return ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
}
