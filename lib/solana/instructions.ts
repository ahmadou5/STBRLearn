import { PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { getCoursePda, getEnrollmentPda, getConfigPda } from "./pdas";
import { getXpTokenAccount } from "./utils";
import { TOKEN_2022_PROGRAM_ID } from "./constants";
import {
  EnrollParams,
  CompleteLessonParams,
  FinalizeCourseParams,
  CloseEnrollmentParams,
} from "./types";

/**
 * Learner Instructions
 * These are signed by the connected wallet (learner)
 */

/**
 * Create enroll instruction
 * Enrolls the learner in a course
 */
export async function createEnrollInstruction(
  program: Program,
  wallet: PublicKey,
  params: EnrollParams
): Promise<TransactionInstruction> {
  const [coursePda] = getCoursePda(params.courseId);
  const [enrollmentPda] = getEnrollmentPda(params.courseId, wallet);

  const instruction = await program.methods
    .enroll(params.courseId)
    .accountsPartial({
      course: coursePda,
      enrollment: enrollmentPda,
      learner: wallet,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  // If course has prerequisite, add as remaining accounts
  if (params.prerequisiteCoursePda && params.prerequisiteEnrollmentPda) {
    instruction.keys.push(
      { pubkey: params.prerequisiteCoursePda, isWritable: false, isSigner: false },
      { pubkey: params.prerequisiteEnrollmentPda, isWritable: false, isSigner: false }
    );
  }

  return instruction;
}

/**
 * Create close enrollment instruction
 * Closes enrollment and reclaims rent
 */
export async function createCloseEnrollmentInstruction(
  program: Program,
  wallet: PublicKey,
  params: CloseEnrollmentParams
): Promise<TransactionInstruction> {
  const [coursePda] = getCoursePda(params.courseId);
  const [enrollmentPda] = getEnrollmentPda(params.courseId, wallet);

  return await program.methods
    .closeEnrollment()
    .accountsPartial({
      course: coursePda,
      enrollment: enrollmentPda,
      learner: wallet,
    })
    .instruction();
}

/**
 * Backend Instructions
 * These are signed by the backend signer (require API call)
 */

/**
 * Create complete lesson instruction (backend-signed)
 * This will be called by your backend API after validating lesson completion
 */
export async function createCompleteLessonInstruction(
  program: Program,
  learner: PublicKey,
  xpMint: PublicKey,
  backendSigner: PublicKey,
  params: CompleteLessonParams
): Promise<TransactionInstruction> {
  const [configPda] = getConfigPda();
  const [coursePda] = getCoursePda(params.courseId);
  const [enrollmentPda] = getEnrollmentPda(params.courseId, learner);
  const learnerXpAta = getXpTokenAccount(xpMint, learner);

  return await program.methods
    .completeLesson(params.lessonIndex)
    .accountsPartial({
      config: configPda,
      course: coursePda,
      enrollment: enrollmentPda,
      learner: learner,
      learnerTokenAccount: learnerXpAta,
      xpMint: xpMint,
      backendSigner: backendSigner,
      tokenProgram: TOKEN_2022_PROGRAM_ID,
    })
    .instruction();
}

/**
 * Create finalize course instruction (backend-signed)
 * This will be called by your backend API after all lessons are complete
 */
export async function createFinalizeCourseInstruction(
  program: Program,
  learner: PublicKey,
  creator: PublicKey,
  xpMint: PublicKey,
  backendSigner: PublicKey,
  params: FinalizeCourseParams
): Promise<TransactionInstruction> {
  const [configPda] = getConfigPda();
  const [coursePda] = getCoursePda(params.courseId);
  const [enrollmentPda] = getEnrollmentPda(params.courseId, learner);
  const learnerXpAta = getXpTokenAccount(xpMint, learner);
  const creatorXpAta = getXpTokenAccount(xpMint, creator);

  return await program.methods
    .finalizeCourse()
    .accountsPartial({
      config: configPda,
      course: coursePda,
      enrollment: enrollmentPda,
      learner: learner,
      learnerTokenAccount: learnerXpAta,
      creatorTokenAccount: creatorXpAta,
      creator: creator,
      xpMint: xpMint,
      backendSigner: backendSigner,
      tokenProgram: TOKEN_2022_PROGRAM_ID,
    })
    .instruction();
}
