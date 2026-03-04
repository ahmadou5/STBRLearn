import BN from "bn.js";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_2022_PROGRAM_ID } from "./constants";

/**
 * Lesson Bitmap Utilities
 */

/**
 * Check if a specific lesson is complete
 * @param lessonFlags - Array of BN representing lesson bitmap [u64; 4]
 * @param lessonIndex - Lesson index (0-255)
 */
export function isLessonComplete(lessonFlags: BN[], lessonIndex: number): boolean {
  if (lessonIndex < 0 || lessonIndex >= 256) {
    return false;
  }
  
  const wordIndex = Math.floor(lessonIndex / 64);
  const bitIndex = lessonIndex % 64;
  
  if (wordIndex >= lessonFlags.length) {
    return false;
  }
  
  return !lessonFlags[wordIndex].and(new BN(1).shln(bitIndex)).isZero();
}

/**
 * Count total completed lessons
 * @param lessonFlags - Array of BN representing lesson bitmap
 */
export function countCompletedLessons(lessonFlags: BN[]): number {
  return lessonFlags.reduce((sum, word) => {
    let count = 0;
    let w = word.clone();
    while (!w.isZero()) {
      count += w.and(new BN(1)).toNumber();
      w = w.shrn(1);
    }
    return sum + count;
  }, 0);
}

/**
 * Get indices of all completed lessons
 * @param lessonFlags - Array of BN representing lesson bitmap
 * @param lessonCount - Total number of lessons in the course
 */
export function getCompletedLessonIndices(
  lessonFlags: BN[],
  lessonCount: number
): number[] {
  const completed: number[] = [];
  for (let i = 0; i < lessonCount; i++) {
    if (isLessonComplete(lessonFlags, i)) {
      completed.push(i);
    }
  }
  return completed;
}

/**
 * Check if all lessons are completed
 * @param lessonFlags - Array of BN representing lesson bitmap
 * @param lessonCount - Total number of lessons in the course
 */
export function areAllLessonsComplete(
  lessonFlags: BN[],
  lessonCount: number
): boolean {
  return countCompletedLessons(lessonFlags) === lessonCount;
}

/**
 * XP Token Account Utilities
 */

/**
 * Get XP token account address for a wallet
 * @param xpMint - XP token mint address
 * @param wallet - User's wallet public key
 */
export function getXpTokenAccount(
  xpMint: PublicKey,
  wallet: PublicKey
): PublicKey {
  return getAssociatedTokenAddressSync(
    xpMint,
    wallet,
    false,
    TOKEN_2022_PROGRAM_ID
  );
}

/**
 * Calculate progress percentage
 * @param completedLessons - Number of completed lessons
 * @param totalLessons - Total lessons in course
 */
export function calculateProgress(
  completedLessons: number,
  totalLessons: number
): number {
  if (totalLessons === 0) return 0;
  return Math.round((completedLessons / totalLessons) * 100);
}

/**
 * Format XP amount for display
 * @param xp - XP amount as BN or number
 */
export function formatXp(xp: BN | number): string {
  const amount = typeof xp === "number" ? xp : xp.toNumber();
  
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(1)}K`;
  }
  return amount.toString();
}

/**
 * Convert Arweave transaction ID array to string
 * @param contentTxId - 32-byte array from on-chain
 */
export function arweaveIdToString(contentTxId: number[]): string {
  return Buffer.from(contentTxId).toString("base64url");
}

/**
 * Convert string to Arweave transaction ID array
 * @param txId - Base64url encoded Arweave transaction ID
 */
export function stringToArweaveId(txId: string): number[] {
  const buffer = Buffer.from(txId, "base64url");
  return Array.from(buffer);
}
