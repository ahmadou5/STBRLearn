import { NextRequest, NextResponse } from "next/server";
import { Connection, Keypair, Transaction, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { createFinalizeCourseInstruction } from "@/lib/solana/instructions";
import { getConfigPda, getCoursePda, getEnrollmentPda } from "@/lib/solana/pdas";
import { PROGRAM_ID } from "@/lib/solana/constants";

/**
 * POST /api/finalize-course
 * 
 * Backend-signed transaction to finalize a course after all lessons are complete.
 * Awards 50% bonus XP to learner and creator reward (if threshold met).
 * 
 * Body:
 * - courseId: string
 * - learner: string (wallet address)
 * 
 * This endpoint should:
 * 1. Verify all lessons are complete
 * 2. Create the finalize_course instruction
 * 3. Sign with backend signer
 * 4. Send transaction to Solana
 */

function getBackendSigner(): Keypair {
  const secretKey = process.env.BACKEND_SIGNER_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error(
      "BACKEND_SIGNER_SECRET_KEY not found in environment variables."
    );
  }

  try {
    const secretKeyBuffer = Buffer.from(secretKey, "base64");
    return Keypair.fromSecretKey(secretKeyBuffer);
  } catch (error) {
    throw new Error("Invalid BACKEND_SIGNER_SECRET_KEY format.");
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { courseId, learner } = body;

    // Validate required fields
    if (!courseId || !learner) {
      return NextResponse.json(
        { 
          error: "Missing required fields",
          required: ["courseId", "learner"]
        },
        { status: 400 }
      );
    }

    // Validate learner address
    let learnerPubkey: PublicKey;
    try {
      learnerPubkey = new PublicKey(learner);
    } catch {
      return NextResponse.json(
        { error: "Invalid learner address" },
        { status: 400 }
      );
    }

    // Initialize Solana connection
    const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST || "https://api.devnet.solana.com";
    const connection = new Connection(rpcUrl, "confirmed");

    // Get backend signer
    const backendSigner = getBackendSigner();

    // TODO: Initialize Anchor Program and verify completion
    // ========================================
    // Once you add the Anchor IDL, uncomment this code:
    // 
    // import { OnchainAcademy, IDL } from "@/lib/solana/idl/onchain_academy";
    // import { areAllLessonsComplete } from "@/lib/solana/utils";
    // 
    // const provider = new AnchorProvider(
    //   connection,
    //   new Wallet(backendSigner),
    //   { commitment: "confirmed" }
    // );
    // 
    // const program = new Program<OnchainAcademy>(IDL, PROGRAM_ID, provider);
    // 
    // // Fetch config to get xpMint
    // const [configPda] = getConfigPda();
    // const config = await program.account.config.fetch(configPda);
    // 
    // // Fetch course to get creator and lesson count
    // const [coursePda] = getCoursePda(courseId);
    // const course = await program.account.course.fetch(coursePda);
    // 
    // // Fetch enrollment to verify all lessons complete
    // const [enrollmentPda] = getEnrollmentPda(courseId, learnerPubkey);
    // const enrollment = await program.account.enrollment.fetch(enrollmentPda);
    // 
    // // Check if all lessons are complete
    // if (!areAllLessonsComplete(enrollment.lessonFlags, course.lessonCount)) {
    //   return NextResponse.json(
    //     { error: "Not all lessons completed" },
    //     { status: 400 }
    //   );
    // }
    // 
    // // Check if already finalized
    // if (enrollment.completedAt) {
    //   return NextResponse.json(
    //     { error: "Course already finalized" },
    //     { status: 400 }
    //   );
    // }
    // 
    // // Create finalize course instruction
    // const instruction = await createFinalizeCourseInstruction(
    //   program,
    //   learnerPubkey,
    //   course.creator,
    //   config.xpMint,
    //   backendSigner.publicKey,
    //   { courseId }
    // );
    // 
    // // Create and send transaction
    // const transaction = new Transaction().add(instruction);
    // const signature = await provider.sendAndConfirm(transaction, [backendSigner]);
    // 
    // return NextResponse.json({ 
    //   success: true, 
    //   signature,
    //   courseId,
    //   learner: learner,
    //   bonusXp: Math.floor((course.xpPerLesson * course.lessonCount) / 2),
    // });
    // ========================================

    // For now, return error indicating IDL is needed
    return NextResponse.json(
      {
        error: "On-chain integration not yet configured",
        message: "Please add the Anchor IDL to lib/solana/idl/ and uncomment the code in this API route.",
        debug: {
          backendSignerPublicKey: backendSigner.publicKey.toString(),
          rpcUrl,
          requestedAction: {
            courseId,
            learner: learner.toString(),
          }
        }
      },
      { status: 501 } // 501 Not Implemented
    );

  } catch (error) {
    console.error("Finalize course error:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to finalize course",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  try {
    const backendSigner = getBackendSigner();
    
    return NextResponse.json({
      status: "ready",
      backendSigner: backendSigner.publicKey.toString(),
      message: "Finalize course API is ready. Add Anchor IDL to activate on-chain functionality."
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Configuration error"
    }, { status: 500 });
  }
}
