import { NextRequest, NextResponse } from "next/server";
import { Connection, Keypair, Transaction, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { createCompleteLessonInstruction } from "@/lib/solana/instructions";
import { getConfigPda } from "@/lib/solana/pdas";
import { PROGRAM_ID } from "@/lib/solana/constants";

/**
 * POST /api/complete-lesson
 * 
 * Backend-signed transaction to mark a lesson as complete and mint XP.
 * 
 * Body:
 * - courseId: string
 * - lessonIndex: number
 * - learner: string (wallet address)
 * 
 * This endpoint should:
 * 1. Validate that the learner actually completed the lesson (quiz, code, etc.)
 * 2. Create the complete_lesson instruction
 * 3. Sign with backend signer
 * 4. Send transaction to Solana
 */

// Load backend signer from environment variable
// IMPORTANT: Keep this key secure! Never expose it to the frontend.
function getBackendSigner(): Keypair {
  const secretKey = process.env.BACKEND_SIGNER_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error(
      "BACKEND_SIGNER_SECRET_KEY not found in environment variables. " +
      "Please add it to your .env.local file."
    );
  }

  try {
    const secretKeyBuffer = Buffer.from(secretKey, "base64");
    return Keypair.fromSecretKey(secretKeyBuffer);
  } catch (error) {
    throw new Error(
      "Invalid BACKEND_SIGNER_SECRET_KEY format. " +
      "Expected base64-encoded secret key."
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { courseId, lessonIndex, learner } = body;

    // Validate required fields
    if (!courseId || lessonIndex === undefined || !learner) {
      return NextResponse.json(
        { 
          error: "Missing required fields",
          required: ["courseId", "lessonIndex", "learner"]
        },
        { status: 400 }
      );
    }

    // Validate lesson index
    if (typeof lessonIndex !== "number" || lessonIndex < 0 || lessonIndex > 255) {
      return NextResponse.json(
        { error: "Invalid lessonIndex. Must be between 0 and 255." },
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

    // TODO: ADD YOUR VALIDATION LOGIC HERE
    // ========================================
    // Before signing the transaction, you should validate that the learner
    // actually completed the lesson. Examples:
    // 
    // - Check quiz answers against correct answers
    // - Validate code submission passed test cases
    // - Verify video watch time
    // - Check required reading completion
    // 
    // Example:
    // const isValid = await validateLessonCompletion(courseId, lessonIndex, learner);
    // if (!isValid) {
    //   return NextResponse.json({ error: "Lesson not completed" }, { status: 403 });
    // }
    // ========================================

    // Initialize Solana connection
    const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST || "https://api.devnet.solana.com";
    const connection = new Connection(rpcUrl, "confirmed");

    // Get backend signer
    const backendSigner = getBackendSigner();

    // TODO: Initialize Anchor Program
    // ========================================
    // Once you add the Anchor IDL, uncomment this code:
    // 
    // import { OnchainAcademy, IDL } from "@/lib/solana/idl/onchain_academy";
    // 
    // const provider = new AnchorProvider(
    //   connection,
    //   new Wallet(backendSigner),
    //   { commitment: "confirmed" }
    // );
    // 
    // const program = new Program<OnchainAcademy>(IDL, PROGRAM_ID, provider);
    // 
    // // Fetch config to get xpMint address
    // const [configPda] = getConfigPda();
    // const config = await program.account.config.fetch(configPda);
    // 
    // // Create complete lesson instruction
    // const instruction = await createCompleteLessonInstruction(
    //   program,
    //   learnerPubkey,
    //   config.xpMint,
    //   backendSigner.publicKey,
    //   { courseId, lessonIndex }
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
    //   lessonIndex,
    //   learner: learner,
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
            lessonIndex,
            learner: learner.toString(),
          }
        }
      },
      { status: 501 } // 501 Not Implemented
    );

  } catch (error) {
    console.error("Complete lesson error:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to complete lesson",
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
      rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_HOST || "https://api.devnet.solana.com",
      message: "Complete lesson API is ready. Add Anchor IDL to activate on-chain functionality."
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Configuration error"
    }, { status: 500 });
  }
}
