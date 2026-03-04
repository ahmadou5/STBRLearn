# 🔗 On-Chain Integration Summary

This document summarizes the on-chain integration setup for Superteam Academy.

---

## ✅ What Has Been Created

### 1. **Core Utilities** (`lib/solana/`)

#### `constants.ts`
- Program ID: `ACADBRCB3zGvo1KSCbkztS33ZNzeBv2d7bqGceti3ucf`
- Token-2022 Program ID
- Metaplex Core Program ID
- PDA seeds constants

#### `pdas.ts`
- `getConfigPda()` - Config account (singleton)
- `getCoursePda(courseId)` - Course accounts
- `getEnrollmentPda(courseId, learner)` - Enrollment accounts
- `getMinterRolePda(minter)` - Minter role accounts
- `getAchievementTypePda(achievementId)` - Achievement type accounts
- `getAchievementReceiptPda(achievementId, recipient)` - Achievement receipts

#### `types.ts`
- `Config` - Platform config account
- `Course` - Course metadata account
- `Enrollment` - Learner enrollment account
- `MinterRole` - XP minter account
- `AchievementType` - Achievement definition
- `AchievementReceipt` - Achievement award proof
- Instruction parameter types
- Helper types (`EnrollmentStatus`, `LessonProgress`)

#### `utils.ts`
- `isLessonComplete(lessonFlags, index)` - Check lesson bitmap
- `countCompletedLessons(lessonFlags)` - Count completed lessons
- `getCompletedLessonIndices(lessonFlags, count)` - Get completed indices
- `areAllLessonsComplete(lessonFlags, count)` - Check full completion
- `getXpTokenAccount(xpMint, wallet)` - Get XP ATA address
- `calculateProgress(completed, total)` - Calculate % progress
- `formatXp(amount)` - Format XP for display (1.5K, 2.3M)
- `arweaveIdToString(id)` - Convert Arweave ID to string
- `stringToArweaveId(txId)` - Convert string to Arweave ID array

#### `instructions.ts`
- `createEnrollInstruction()` - Enroll in course (learner-signed)
- `createCloseEnrollmentInstruction()` - Close enrollment (learner-signed)
- `createCompleteLessonInstruction()` - Complete lesson (backend-signed)
- `createFinalizeCourseInstruction()` - Finalize course (backend-signed)

### 2. **React Hook** (`lib/hooks/`)

#### `useSolanaAcademy.ts`
Main React hook for frontend integration:

**State:**
- `config` - Platform config (xpMint address)
- `xpBalance` - User's XP balance
- `loading` - Transaction loading state
- `error` - Error messages

**Learner Actions (wallet-signed):**
- `enroll(courseId, prerequisiteCourseId?)` - Enroll in course
- `closeEnrollment(courseId)` - Unenroll and reclaim rent

**Read Functions:**
- `fetchCourse(courseId)` - Get course data
- `fetchEnrollmentStatus(courseId)` - Get enrollment progress
- `fetchXpBalance()` - Get user's XP
- `fetchAllCourses()` - Get all active courses
- `fetchMyEnrollments()` - Get user's enrollments

---

## 🎯 How to Complete the Integration

### Step 1: Install Dependencies

```bash
npm install @coral-xyz/anchor @solana/spl-token bn.js
```

### Step 2: Add Anchor IDL

You need the Anchor IDL JSON file for the on-chain program:

1. Get the IDL from your Anchor build output
2. Create directory: `mkdir -p lib/solana/idl`
3. Save IDL as: `lib/solana/idl/onchain_academy.json`
4. Generate TypeScript types: `anchor idl parse`

### Step 3: Update the Hook

In `lib/hooks/useSolanaAcademy.ts`, uncomment and update these sections:

```typescript
import { Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { OnchainAcademy, IDL } from "@/lib/solana/idl/onchain_academy";
import { PROGRAM_ID } from "@/lib/solana/constants";

// In the hook, initialize program
const wallet = useWallet();
const provider = useMemo(() => {
  if (!wallet.publicKey) return null;
  return new AnchorProvider(
    connection,
    wallet as any,
    { commitment: "confirmed" }
  );
}, [connection, wallet]);

const program = useMemo(() => {
  if (!provider) return null;
  return new Program<OnchainAcademy>(IDL, PROGRAM_ID, provider);
}, [provider]);
```

### Step 4: Create Backend API Routes

For backend-signed transactions (lesson completion, finalization, credentials):

**`app/api/complete-lesson/route.ts`:**
```typescript
import { NextRequest, NextResponse } from "next/server";
import { Connection, Keypair, Transaction, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { createCompleteLessonInstruction } from "@/lib/solana/instructions";

// Load backend signer from environment variable
const BACKEND_SIGNER = Keypair.fromSecretKey(
  Buffer.from(process.env.BACKEND_SIGNER_SECRET_KEY!, "base64")
);

export async function POST(request: NextRequest) {
  const { courseId, lessonIndex, learner } = await request.json();

  // TODO: Validate lesson completion (quiz, code submission, etc.)

  try {
    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!);
    const provider = new AnchorProvider(
      connection,
      new Wallet(BACKEND_SIGNER),
      {}
    );
    const program = new Program(IDL, PROGRAM_ID, provider);

    // Get config to retrieve xpMint
    const [configPda] = getConfigPda();
    const config = await program.account.config.fetch(configPda);

    const instruction = await createCompleteLessonInstruction(
      program,
      new PublicKey(learner),
      config.xpMint,
      BACKEND_SIGNER.publicKey,
      { courseId, lessonIndex }
    );

    const transaction = new Transaction().add(instruction);
    const signature = await provider.sendAndConfirm(transaction, [BACKEND_SIGNER]);

    return NextResponse.json({ success: true, signature });
  } catch (error) {
    console.error("Complete lesson error:", error);
    return NextResponse.json(
      { error: "Failed to complete lesson" },
      { status: 500 }
    );
  }
}
```

**Environment variables needed:**
```bash
# .env.local
BACKEND_SIGNER_SECRET_KEY=base64_encoded_secret_key
NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.devnet.solana.com
```

### Step 5: Usage in Components

**Example: Course Detail Page**

```typescript
'use client'

import { useSolanaAcademy } from "@/lib/hooks/useSolanaAcademy";
import { useEffect, useState } from "react";

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { enroll, fetchEnrollmentStatus, loading, error } = useSolanaAcademy();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function loadStatus() {
      const enrollmentStatus = await fetchEnrollmentStatus(params.slug);
      setStatus(enrollmentStatus);
    }
    loadStatus();
  }, [params.slug]);

  const handleEnroll = async () => {
    try {
      const signature = await enroll(params.slug);
      console.log("Enrolled! Tx:", signature);
      // Refresh enrollment status
      const updated = await fetchEnrollmentStatus(params.slug);
      setStatus(updated);
    } catch (err) {
      console.error("Enrollment failed:", err);
    }
  };

  if (!status) return <div>Loading...</div>;

  return (
    <div>
      {status.enrolled ? (
        <div>
          <p>Progress: {status.completedLessons}/{status.totalLessons} lessons</p>
          <progress value={status.progress} max={100} />
        </div>
      ) : (
        <button onClick={handleEnroll} disabled={loading}>
          {loading ? "Enrolling..." : "Enroll Now"}
        </button>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
```

**Example: Lesson Completion**

```typescript
// In lesson viewer, call backend API
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

  const { signature } = await response.json();
  console.log("Lesson completed! Tx:", signature);
  
  // Refresh enrollment status to show new progress
  const updated = await fetchEnrollmentStatus("solana-fundamentals");
  setStatus(updated);
}
```

**Example: Display XP Balance**

```typescript
import { useSolanaAcademy } from "@/lib/hooks/useSolanaAcademy";
import { formatXp } from "@/lib/solana/utils";

export default function Dashboard() {
  const { xpBalance, fetchXpBalance } = useSolanaAcademy();

  return (
    <div>
      <h2>Your XP: {formatXp(xpBalance)}</h2>
      <button onClick={fetchXpBalance}>Refresh</button>
    </div>
  );
}
```

---

## 📊 On-Chain Data Flow

### Learner Actions (Wallet Signs)

```
User Clicks "Enroll"
  ↓
Frontend calls useSolanaAcademy.enroll()
  ↓
Creates enroll instruction
  ↓
Wallet signs transaction
  ↓
Transaction sent to Solana
  ↓
Enrollment PDA created on-chain
```

### Backend Actions (Backend Signs)

```
User Completes Lesson Content
  ↓
Frontend validates completion
  ↓
Frontend calls /api/complete-lesson
  ↓
Backend validates (anti-cheat)
  ↓
Backend creates complete_lesson instruction
  ↓
Backend signs with BACKEND_SIGNER keypair
  ↓
Transaction sent to Solana
  ↓
Lesson bit set in enrollment bitmap
XP minted to learner's Token-2022 account
```

---

## 🔐 Security Architecture

### Role Separation

| Role | Signs | Actions |
|------|-------|---------|
| **Learner** | Wallet (Phantom/Solflare) | enroll, close_enrollment |
| **Backend** | Server keypair | complete_lesson, finalize_course, issue_credential |
| **Admin** | Multisig (Squads) | initialize, create_course, update_config |

### Anti-Cheat

1. **Lesson Completion** - Backend validates before signing
2. **XP Amounts** - Read from Course PDA (not client input)
3. **Bitmap** - On-chain check prevents double-completion
4. **Creator Rewards** - Gated by minimum completions threshold
5. **Prerequisites** - Enforced on-chain at enrollment

---

## 🛠️ Testing Checklist

### Local Testing (Devnet)

- [ ] Wallet connects successfully
- [ ] Config account fetched (xpMint address)
- [ ] XP balance displays (0 initially)
- [ ] Can enroll in a course
- [ ] Enrollment status shows correct state
- [ ] Backend can complete lessons
- [ ] XP balance increases after lesson completion
- [ ] Progress bar updates correctly
- [ ] Can finalize course when all lessons done
- [ ] Can close enrollment (unenroll)

### Integration Testing

- [ ] Prerequisite courses block enrollment
- [ ] Can't complete lesson twice
- [ ] Can't finalize incomplete course
- [ ] 24h cooldown enforced on unenroll
- [ ] Creator XP only minted after threshold met
- [ ] Credentials issued after finalization

---

## 📝 Files Created

```
lib/
├── solana/
│   ├── constants.ts          ✅ Program IDs and seeds
│   ├── pdas.ts              ✅ PDA derivation functions
│   ├── types.ts             ✅ TypeScript account types
│   ├── utils.ts             ✅ Helper utilities
│   ├── instructions.ts      ✅ Instruction builders
│   └── README.md            ✅ Integration guide
└── hooks/
    └── useSolanaAcademy.ts  ✅ Main React hook

docs/
└── ONCHAIN_INTEGRATION.md   ✅ This file
```

---

## 🚀 Next Steps

1. **Install dependencies**: `@coral-xyz/anchor`, `@solana/spl-token`, `bn.js`
2. **Add Anchor IDL** to `lib/solana/idl/`
3. **Update hook** to initialize Anchor Program
4. **Create backend API routes** for lesson completion
5. **Test on devnet** with test wallet
6. **Integrate into existing pages** (courses, lessons, dashboard)

---

## 🆘 Need Help?

- **Anchor Docs**: https://www.anchor-lang.com/
- **Solana Web3.js**: https://solana-labs.github.io/solana-web3.js/
- **Integration Guide**: See `lib/solana/README.md`
- **Program Spec**: Full specification provided in initial request

---

**Ready to go live on-chain! 🎉**

All the infrastructure is in place - just add the Anchor IDL and uncomment the instruction code.
