import { PublicKey } from "@solana/web3.js";

/**
 * Superteam Academy On-Chain Program Constants
 */

export const PROGRAM_ID = new PublicKey(
  "ACADBRCB3zGvo1KSCbkztS33ZNzeBv2d7bqGceti3ucf"
);

export const TOKEN_2022_PROGRAM_ID = new PublicKey(
  "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
);

export const MPL_CORE_PROGRAM_ID = new PublicKey(
  "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
);

/**
 * PDA Seeds
 */
export const SEEDS = {
  CONFIG: "config",
  COURSE: "course",
  ENROLLMENT: "enrollment",
  MINTER: "minter",
  ACHIEVEMENT: "achievement",
  ACHIEVEMENT_RECEIPT: "achievement_receipt",
} as const;
