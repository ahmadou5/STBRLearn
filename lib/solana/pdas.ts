import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID, SEEDS } from "./constants";

/**
 * PDA Derivation Utilities for Superteam Academy
 */

/**
 * Derive Config PDA (singleton)
 */
export function getConfigPda(): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(SEEDS.CONFIG)],
    PROGRAM_ID
  );
}

/**
 * Derive Course PDA
 * @param courseId - Unique course identifier (e.g., "solana-fundamentals")
 */
export function getCoursePda(courseId: string): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(SEEDS.COURSE), Buffer.from(courseId)],
    PROGRAM_ID
  );
}

/**
 * Derive Enrollment PDA
 * @param courseId - Course identifier
 * @param learner - Learner's wallet public key
 */
export function getEnrollmentPda(
  courseId: string,
  learner: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(SEEDS.ENROLLMENT), Buffer.from(courseId), learner.toBuffer()],
    PROGRAM_ID
  );
}

/**
 * Derive MinterRole PDA
 * @param minter - Minter's public key
 */
export function getMinterRolePda(minter: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(SEEDS.MINTER), minter.toBuffer()],
    PROGRAM_ID
  );
}

/**
 * Derive AchievementType PDA
 * @param achievementId - Achievement identifier
 */
export function getAchievementTypePda(
  achievementId: string
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(SEEDS.ACHIEVEMENT), Buffer.from(achievementId)],
    PROGRAM_ID
  );
}

/**
 * Derive AchievementReceipt PDA
 * @param achievementId - Achievement identifier
 * @param recipient - Recipient's wallet public key
 */
export function getAchievementReceiptPda(
  achievementId: string,
  recipient: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(SEEDS.ACHIEVEMENT_RECEIPT),
      Buffer.from(achievementId),
      recipient.toBuffer(),
    ],
    PROGRAM_ID
  );
}
