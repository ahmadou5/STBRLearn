import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

/**
 * On-Chain Account Types
 */

export interface Config {
  authority: PublicKey;
  backendSigner: PublicKey;
  xpMint: PublicKey;
}

export interface Course {
  courseId: string;
  creator: PublicKey;
  contentTxId: number[]; // 32-byte Arweave transaction ID
  lessonCount: number;
  difficulty: number; // 1 = beginner, 2 = intermediate, 3 = advanced
  xpPerLesson: number;
  trackId: number;
  trackLevel: number;
  prerequisite: PublicKey | null;
  creatorRewardXp: number;
  minCompletionsForReward: number;
  totalCompletions: number;
  isActive: boolean;
  createdAt: BN;
}

export interface Enrollment {
  course: PublicKey;
  learner: PublicKey;
  lessonFlags: BN[]; // [u64; 4] bitmap for 256 lessons
  enrolledAt: BN;
  completedAt: BN | null;
  credentialAsset: PublicKey | null;
}

export interface MinterRole {
  minter: PublicKey;
  label: string;
  maxXpPerCall: BN; // 0 = unlimited
  totalXpMinted: BN;
  isActive: boolean;
  createdAt: BN;
}

export interface AchievementType {
  achievementId: string;
  name: string;
  metadataUri: string;
  collection: PublicKey;
  currentSupply: number;
  maxSupply: number;
  xpReward: number;
  isActive: boolean;
  createdAt: BN;
}

export interface AchievementReceipt {
  achievementType: PublicKey;
  recipient: PublicKey;
  asset: PublicKey;
  awardedAt: BN;
}

/**
 * Instruction Parameter Types
 */

export interface EnrollParams {
  courseId: string;
  prerequisiteCoursePda?: PublicKey;
  prerequisiteEnrollmentPda?: PublicKey;
}

export interface CompleteLessonParams {
  courseId: string;
  lessonIndex: number;
}

export interface FinalizeCourseParams {
  courseId: string;
}

export interface IssueCredentialParams {
  courseId: string;
  credentialName: string;
  metadataUri: string;
  coursesCompleted: number;
  totalXp: BN;
}

export interface CloseEnrollmentParams {
  courseId: string;
}

/**
 * Helper Types
 */

export interface LessonProgress {
  lessonIndex: number;
  isCompleted: boolean;
}

export interface EnrollmentStatus {
  enrolled: boolean;
  completedLessons: number;
  totalLessons: number;
  isCompleted: boolean;
  completedAt: Date | null;
  credentialAsset: PublicKey | null;
  progress: number; // 0-100
}
