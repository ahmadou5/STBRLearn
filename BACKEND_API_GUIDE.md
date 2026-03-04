# Backend API Routes Guide

Complete guide for the backend API routes that handle on-chain transactions.

---

## 📋 Overview

Three backend API routes have been created to handle server-signed transactions:

1. **`/api/complete-lesson`** - Mark a lesson as complete and mint XP
2. **`/api/finalize-course`** - Finalize course and award bonus XP
3. **`/api/issue-credential`** - Issue Metaplex Core NFT credential

---

## 🔐 Security Model

### Why Backend Signing?

These transactions are signed by the **backend server** (not the user's wallet) to prevent cheating:

- ✅ Backend validates lesson completion before signing
- ✅ XP amounts are read from on-chain Course PDA (not user input)
- ✅ Prevents users from minting arbitrary XP
- ✅ Ensures anti-cheat mechanisms are enforced

### Backend Signer Keypair

The backend signer is a Solana keypair stored as an environment variable:

```bash
# Generate a new keypair
solana-keygen new --outfile backend-signer.json

# Convert to base64 for environment variable
base64 < backend-signer.json

# Add to .env.local (NEVER commit this!)
BACKEND_SIGNER_SECRET_KEY=your_base64_encoded_key_here
```

**CRITICAL:** Keep this key secret! Anyone with access can sign transactions.

---

## 🛠️ API Routes

### 1. POST `/api/complete-lesson`

Mark a lesson as complete and mint XP to the learner.

**Request Body:**
```typescript
{
  courseId: string,        // e.g., "solana-fundamentals"
  lessonIndex: number,     // 0-255 (lesson number in course)
  learner: string          // Learner's wallet address
}
```

**Response (Success):**
```typescript
{
  success: true,
  signature: string,       // Transaction signature
  courseId: string,
  lessonIndex: number,
  learner: string
}
```

**Response (Error - Not Configured):**
```typescript
{
  error: "On-chain integration not yet configured",
  message: "Please add the Anchor IDL...",
  debug: {
    backendSignerPublicKey: string,
    rpcUrl: string,
    requestedAction: { ... }
  }
}
```

**How to Call:**

```typescript
// In your lesson viewer component
async function handleCompleteLesson(lessonIndex: number) {
  const response = await fetch("/api/complete-lesson", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      courseId: "solana-fundamentals",
      lessonIndex,
      learner: publicKey.toString(),
    }),
  });

  const data = await response.json();
  
  if (data.success) {
    console.log("Lesson completed! Tx:", data.signature);
    // Refresh enrollment status
    await fetchEnrollmentStatus("solana-fundamentals");
  } else {
    console.error("Failed:", data.error);
  }
}
```

**Validation You Should Add:**

Before signing the transaction, add your own validation logic:

```typescript
// In app/api/complete-lesson/route.ts

// Example: Check quiz answers
const quizAnswers = await getQuizAnswers(learner, courseId, lessonIndex);
const isCorrect = validateQuizAnswers(quizAnswers);

if (!isCorrect) {
  return NextResponse.json(
    { error: "Quiz answers incorrect" },
    { status: 403 }
  );
}

// Example: Check code submission
const codeSubmission = await getCodeSubmission(learner, courseId, lessonIndex);
const testsPassed = await runTests(codeSubmission);

if (!testsPassed) {
  return NextResponse.json(
    { error: "Tests did not pass" },
    { status: 403 }
  );
}
```

---

### 2. POST `/api/finalize-course`

Finalize a course after all lessons are complete. Awards 50% bonus XP.

**Request Body:**
```typescript
{
  courseId: string,        // e.g., "solana-fundamentals"
  learner: string          // Learner's wallet address
}
```

**Response (Success):**
```typescript
{
  success: true,
  signature: string,
  courseId: string,
  learner: string,
  bonusXp: number          // 50% of total course XP
}
```

**How to Call:**

```typescript
// After all lessons complete
async function handleFinalizeCourse() {
  const response = await fetch("/api/finalize-course", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      courseId: "solana-fundamentals",
      learner: publicKey.toString(),
    }),
  });

  const data = await response.json();
  
  if (data.success) {
    console.log("Course finalized! Bonus XP:", data.bonusXp);
  }
}
```

**On-Chain Checks:**

The program verifies:
- ✅ All lessons are complete (bitmap check)
- ✅ Course not already finalized
- ✅ Mints 50% bonus XP to learner
- ✅ Mints creator reward (if threshold met)

---

### 3. POST `/api/issue-credential`

Issue a Metaplex Core NFT credential to the learner.

**Request Body:**
```typescript
{
  courseId: string,           // e.g., "solana-fundamentals"
  learner: string,            // Learner's wallet address
  credentialName: string,     // e.g., "Solana Developer - Level 1"
  metadataUri: string,        // Arweave URI for NFT metadata
  coursesCompleted: number,   // Total courses completed in track
  totalXp: number             // Total XP earned
}
```

**Response (Success):**
```typescript
{
  success: true,
  signature: string,
  credentialAsset: string,    // NFT public key
  courseId: string,
  learner: string,
  credentialName: string,
  metadataUri: string
}
```

**How to Call:**

```typescript
// After course finalized
async function handleIssueCredential() {
  const response = await fetch("/api/issue-credential", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      courseId: "solana-fundamentals",
      learner: publicKey.toString(),
      credentialName: "Solana Developer - Level 1",
      metadataUri: "https://arweave.net/your-metadata-json",
      coursesCompleted: 1,
      totalXp: xpBalance,
    }),
  });

  const data = await response.json();
  
  if (data.success) {
    console.log("Credential issued! Asset:", data.credentialAsset);
  }
}
```

**Metadata JSON Format:**

Upload to Arweave with this structure:

```json
{
  "name": "Solana Developer - Level 1",
  "symbol": "SOLDEV",
  "description": "Completed Solana Fundamentals course",
  "image": "https://arweave.net/your-image.png",
  "attributes": [
    {
      "trait_type": "Track",
      "value": "Solana Development"
    },
    {
      "trait_type": "Level",
      "value": "1"
    },
    {
      "trait_type": "Courses Completed",
      "value": "1"
    },
    {
      "trait_type": "Total XP",
      "value": "1250"
    }
  ]
}
```

---

## 🧪 Testing the APIs

### Health Check Endpoints

All routes have GET endpoints for health checks:

```bash
# Test complete-lesson
curl http://localhost:3000/api/complete-lesson

# Test finalize-course
curl http://localhost:3000/api/finalize-course

# Test issue-credential
curl http://localhost:3000/api/issue-credential
```

**Response:**
```json
{
  "status": "ready",
  "backendSigner": "PublicKeyString",
  "message": "API is ready. Add Anchor IDL to activate..."
}
```

### Testing with Postman

```bash
POST http://localhost:3000/api/complete-lesson
Content-Type: application/json

{
  "courseId": "solana-fundamentals",
  "lessonIndex": 0,
  "learner": "YourWalletAddressHere"
}
```

---

## 🚀 Activation Steps

### 1. Generate Backend Signer

```bash
# Install Solana CLI if needed
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Generate keypair
solana-keygen new --outfile backend-signer.json

# Convert to base64
base64 < backend-signer.json

# Copy the output and add to .env.local
```

### 2. Add to .env.local

```bash
BACKEND_SIGNER_SECRET_KEY=paste_base64_key_here
NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.devnet.solana.com
```

### 3. Add Anchor IDL

```bash
mkdir -p lib/solana/idl
# Copy onchain_academy.json to lib/solana/idl/
```

### 4. Uncomment Code in API Routes

In each route file, uncomment the code sections marked with:
```typescript
// TODO: Initialize Anchor Program and verify completion
// ========================================
// Once you add the Anchor IDL, uncomment this code:
```

### 5. Fund Backend Signer (Devnet)

```bash
# Get the public key from health check endpoint
curl http://localhost:3000/api/complete-lesson

# Airdrop SOL on devnet
solana airdrop 2 <BACKEND_SIGNER_PUBKEY> --url devnet
```

### 6. Register as Minter

The backend signer needs to be registered as a MinterRole in the program:

```typescript
// Run this once (as admin)
await program.methods
  .registerMinter({
    minter: backendSignerPubkey,
    label: "backend-api",
    maxXpPerCall: new BN(0), // 0 = unlimited
  })
  .accounts({ ... })
  .rpc();
```

---

## 🔒 Security Best Practices

### Environment Variables

- ✅ **NEVER** commit `.env.local` to git
- ✅ Use `.env.example` for documentation only
- ✅ Rotate backend signer periodically
- ✅ Use different signers for dev/staging/production

### Rate Limiting

Add rate limiting to prevent abuse:

```typescript
// Install: npm install @upstash/ratelimit @upstash/redis

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
});

export async function POST(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }
  
  // ... rest of the code
}
```

### Input Validation

Always validate user input:

```typescript
// Validate wallet address
if (!PublicKey.isOnCurve(learnerPubkey.toBytes())) {
  return NextResponse.json(
    { error: "Invalid wallet address" },
    { status: 400 }
  );
}

// Validate course ID format
if (!/^[a-z0-9-]+$/.test(courseId)) {
  return NextResponse.json(
    { error: "Invalid course ID format" },
    { status: 400 }
  );
}
```

---

## 📊 Monitoring

### Log Important Events

```typescript
// Add logging to track usage
console.log({
  event: "lesson_completed",
  courseId,
  lessonIndex,
  learner: learner.toString(),
  signature,
  timestamp: new Date().toISOString(),
});
```

### Error Tracking

Use Sentry or similar:

```typescript
import * as Sentry from "@sentry/nextjs";

try {
  // ... transaction code
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      action: "complete_lesson",
      courseId,
      learner,
    },
  });
  throw error;
}
```

---

## 🆘 Troubleshooting

### "BACKEND_SIGNER_SECRET_KEY not found"

- Check `.env.local` file exists
- Restart Next.js dev server after adding env vars

### "Invalid BACKEND_SIGNER_SECRET_KEY format"

- Ensure it's base64 encoded
- Re-generate and encode the keypair

### "Insufficient funds"

- Airdrop SOL to backend signer on devnet
- Check `backendSigner.publicKey` in health check

### "Account not found"

- Program may not be initialized
- Course/enrollment PDAs don't exist
- Check on Solana Explorer

---

## 📚 Related Documentation

- [ONCHAIN_INTEGRATION.md](./ONCHAIN_INTEGRATION.md) - Full integration guide
- [lib/solana/README.md](./lib/solana/README.md) - Utility functions
- [INTEGRATION_COMPLETE.md](./INTEGRATION_COMPLETE.md) - Frontend integration

---

**Backend APIs are ready! Add the Anchor IDL to activate! 🚀**
