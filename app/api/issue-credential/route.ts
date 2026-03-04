import { NextRequest, NextResponse } from "next/server";
import { Connection, Keypair, Transaction, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { getConfigPda, getCoursePda, getEnrollmentPda } from "@/lib/solana/pdas";
import { PROGRAM_ID, MPL_CORE_PROGRAM_ID } from "@/lib/solana/constants";
import BN from "bn.js";

/**
 * POST /api/issue-credential
 * 
 * Backend-signed transaction to issue a Metaplex Core NFT credential.
 * Creates a soulbound NFT with course completion data.
 * 
 * Body:
 * - courseId: string
 * - learner: string (wallet address)
 * - credentialName: string (e.g., "Solana Developer - Level 1")
 * - metadataUri: string (Arweave URI for NFT metadata)
 * - coursesCompleted: number
 * - totalXp: number
 * 
 * This endpoint should:
 * 1. Verify course is finalized
 * 2. Create the issue_credential instruction
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
    const { courseId, learner, credentialName, metadataUri, coursesCompleted, totalXp } = body;

    // Validate required fields
    if (!courseId || !learner || !credentialName || !metadataUri || coursesCompleted === undefined || totalXp === undefined) {
      return NextResponse.json(
        { 
          error: "Missing required fields",
          required: ["courseId", "learner", "credentialName", "metadataUri", "coursesCompleted", "totalXp"]
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

    // Validate metadata URI (should be Arweave or IPFS)
    if (!metadataUri.startsWith("https://arweave.net/") && !metadataUri.startsWith("ipfs://")) {
      return NextResponse.json(
        { error: "Invalid metadata URI. Must be Arweave or IPFS URL." },
        { status: 400 }
      );
    }

    // Initialize Solana connection
    const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST || "https://api.devnet.solana.com";
    const connection = new Connection(rpcUrl, "confirmed");

    // Get backend signer
    const backendSigner = getBackendSigner();

    // TODO: Initialize Anchor Program and issue credential
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
    // // Fetch config
    // const [configPda] = getConfigPda();
    // const config = await program.account.config.fetch(configPda);
    // 
    // // Fetch course to get track collection
    // const [coursePda] = getCoursePda(courseId);
    // const course = await program.account.course.fetch(coursePda);
    // 
    // // Fetch enrollment to verify it's finalized
    // const [enrollmentPda] = getEnrollmentPda(courseId, learnerPubkey);
    // const enrollment = await program.account.enrollment.fetch(enrollmentPda);
    // 
    // if (!enrollment.completedAt) {
    //   return NextResponse.json(
    //     { error: "Course not finalized. Complete all lessons first." },
    //     { status: 400 }
    //   );
    // }
    // 
    // if (enrollment.credentialAsset) {
    //   return NextResponse.json(
    //     { error: "Credential already issued for this course." },
    //     { status: 400 }
    //   );
    // }
    // 
    // // Generate credential asset keypair
    // const credentialAsset = Keypair.generate();
    // 
    // // Get track collection address (based on trackId)
    // // This should be stored in your config or fetched from somewhere
    // const trackCollectionPubkey = new PublicKey("11111111111111111111111111111111"); // Replace with actual collection
    // 
    // // Create issue credential instruction
    // const instruction = await program.methods
    //   .issueCredential(
    //     credentialName,
    //     metadataUri,
    //     coursesCompleted,
    //     new BN(totalXp)
    //   )
    //   .accountsPartial({
    //     config: configPda,
    //     course: coursePda,
    //     enrollment: enrollmentPda,
    //     learner: learnerPubkey,
    //     credentialAsset: credentialAsset.publicKey,
    //     trackCollection: trackCollectionPubkey,
    //     payer: backendSigner.publicKey,
    //     backendSigner: backendSigner.publicKey,
    //     mplCoreProgram: MPL_CORE_PROGRAM_ID,
    //     systemProgram: SystemProgram.programId,
    //   })
    //   .instruction();
    // 
    // // Create and send transaction
    // const transaction = new Transaction().add(instruction);
    // const signature = await provider.sendAndConfirm(
    //   transaction, 
    //   [backendSigner, credentialAsset]
    // );
    // 
    // return NextResponse.json({ 
    //   success: true, 
    //   signature,
    //   credentialAsset: credentialAsset.publicKey.toString(),
    //   courseId,
    //   learner: learner,
    //   credentialName,
    //   metadataUri,
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
            credentialName,
            metadataUri,
            coursesCompleted,
            totalXp,
          }
        }
      },
      { status: 501 } // 501 Not Implemented
    );

  } catch (error) {
    console.error("Issue credential error:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to issue credential",
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
      message: "Issue credential API is ready. Add Anchor IDL to activate on-chain functionality."
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Configuration error"
    }, { status: 500 });
  }
}
