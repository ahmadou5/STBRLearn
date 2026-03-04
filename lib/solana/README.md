# Superteam Academy - On-Chain Integration

This directory contains all the utilities and hooks for integrating with the Superteam Academy Solana program.

## 📁 File Structure

```
lib/solana/
├── constants.ts      # Program IDs and seeds
├── pdas.ts          # PDA derivation functions
├── types.ts         # TypeScript types for on-chain accounts
├── utils.ts         # Helper functions (bitmap, XP formatting)
├── instructions.ts  # Instruction builders (learner actions)
└── README.md        # This file

lib/hooks/
└── useSolanaAcademy.ts  # Main React hook for frontend
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install @coral-xyz/anchor @solana/web3.js @solana/spl-token bn.js
```

### 2. Set Up Anchor Program

You need to add the Anchor IDL for the on-chain program:

```bash
# Get the IDL from your Anchor build
# Place it in: lib/solana/idl/onchain_academy.json
```

### 3. Initialize Program in Hook

Update `lib/hooks/useSolanaAcademy.ts` to initialize the Anchor program:

```typescript
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { OnchainAcademy, IDL } from "@/lib/solana/idl/onchain_academy";
import { PROGRAM_ID } from "@/lib/solana/constants";

// In your hook
const provider = new AnchorProvider(connection, wallet, {});
const program = new Program<OnchainAcademy>(IDL, PROGRAM_ID, provider);
```

## 📖 Usage Examples

### In a Course Detail Page

```typescript
'use client'

import { useSolanaAcademy } from "@/lib/hooks/useSolanaAcademy";

export default function CourseDetailPage() {
  const { enroll, fetchEnrollmentStatus, loading } = useSolanaAcademy();
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);

  useEffect(() => {
    async function loadStatus() {
      const status = await fetchEnrollmentStatus("solana-fundamentals");
      setEnrollmentStatus(status);
    }
    loadStatus();
  }, []);

  const handleEnroll = async () => {
    try {
      const signature = await enroll("solana-fundamentals");
      console.log("Enrolled! Transaction:", signature);
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };

  return (
    <div>
      {enrollmentStatus?.enrolled ? (
        <p>Progress: {enrollmentStatus.progress}%</p>
      ) : (
        <button onClick={handleEnroll} disabled={loading}>
          {loading ? "Enrolling..." : "Enroll Now"}
        </button>
      )}
    </div>
  );
}
```

### Displaying XP Balance

```typescript
import { useSolanaAcademy } from "@/lib/hooks/useSolanaAcademy";
import { formatXp } from "@/lib/solana/utils";

export default function Dashboard() {
  const { xpBalance } = useSolanaAcademy();

  return (
    <div>
      <h2>Your XP: {formatXp(xpBalance)}</h2>
    </div>
  );
}
```

### Checking Lesson Completion

```typescript
import { useSolanaAcademy } from "@/lib/hooks/useSolanaAcademy";
import { isLessonComplete } from "@/lib/solana/utils";

export default function LessonViewer() {
  const { fetchEnrollmentStatus } = useSolanaAcademy();
  
  // Fetch enrollment and check lesson
  // enrollment.lessonFlags is the bitmap
  // const completed = isLessonComplete(enrollment.lessonFlags, lessonIndex);
}
```

## 🔐 Backend Integration

Lesson completion, course finalization, and credential issuance require **backend signing**.

### Backend API Route Example

Create `app/api/complete-lesson/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { PublicKey, Keypair } from "@solana/web3.js";
import { Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { createCompleteLessonInstruction } from "@/lib/solana/instructions";

// Load backend signer from environment
const BACKEND_SIGNER = Keypair.fromSecretKey(
  Buffer.from(process.env.BACKEND_SIGNER_SECRET_KEY!, "base64")
);

export async function POST(request: NextRequest) {
  const { courseId, lessonIndex, learner } = await request.json();

  // TODO: Validate that learner actually completed the lesson
  // Check quiz answers, code submission, etc.

  try {
    // Initialize program with backend signer
    const connection = new Connection(process.env.SOLANA_RPC_URL!);
    const provider = new AnchorProvider(
      connection,
      new Wallet(BACKEND_SIGNER),
      {}
    );
    const program = new Program(...);

    // Create instruction
    const instruction = await createCompleteLessonInstruction(
      program,
      new PublicKey(learner),
      config.xpMint,
      BACKEND_SIGNER.publicKey,
      { courseId, lessonIndex }
    );

    // Send transaction
    const transaction = new Transaction().add(instruction);
    const signature = await provider.sendAndConfirm(transaction, [BACKEND_SIGNER]);

    return NextResponse.json({ signature });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to complete lesson" },
      { status: 500 }
    );
  }
}
```

### Call from Frontend

```typescript
async function completeLesson(lessonIndex: number) {
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
  console.log("Lesson completed!", signature);
}
```

## 🛠️ Utility Functions

### PDA Derivation

```typescript
import { getCoursePda, getEnrollmentPda } from "@/lib/solana/pdas";

const [coursePda, bump] = getCoursePda("solana-fundamentals");
const [enrollmentPda] = getEnrollmentPda("solana-fundamentals", walletPubkey);
```

### Lesson Bitmap

```typescript
import { 
  isLessonComplete, 
  countCompletedLessons,
  getCompletedLessonIndices 
} from "@/lib/solana/utils";

// Check if lesson 5 is complete
const completed = isLessonComplete(enrollment.lessonFlags, 5);

// Count total completed
const total = countCompletedLessons(enrollment.lessonFlags);

// Get all completed lesson indices
const indices = getCompletedLessonIndices(enrollment.lessonFlags, 10);
// Returns: [0, 2, 5, 7] (example)
```

### XP Formatting

```typescript
import { formatXp } from "@/lib/solana/utils";

formatXp(1500);      // "1.5K"
formatXp(50000);     // "50.0K"
formatXp(2500000);   // "2.5M"
```

## 📊 Reading On-Chain Data

### Fetch All Courses

```typescript
const courses = await program.account.course.all();
const activeCourses = courses.filter(c => c.account.isActive);
```

### Fetch Specific Course

```typescript
const [coursePda] = getCoursePda("solana-fundamentals");
const course = await program.account.course.fetch(coursePda);

console.log(course.lessonCount, course.xpPerLesson);
```

### Fetch Enrollment

```typescript
const [enrollmentPda] = getEnrollmentPda("solana-fundamentals", walletPubkey);
const enrollment = await program.account.enrollment.fetchNullable(enrollmentPda);

if (enrollment) {
  console.log("Enrolled at:", new Date(enrollment.enrolledAt.toNumber() * 1000));
}
```

## 🎯 Next Steps

1. **Add Anchor IDL**: Place the program IDL in `lib/solana/idl/`
2. **Initialize Program**: Update the hook to create Program instance
3. **Implement Backend**: Create API routes for backend-signed transactions
4. **Test on Devnet**: Test all flows on Solana devnet
5. **Add Error Handling**: Implement proper error messages for each instruction
6. **Event Listeners**: Subscribe to program events for real-time updates

## 📚 Resources

- [Anchor Documentation](https://www.anchor-lang.com/)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [Program Spec](../../PROGRAM_SPEC.md) - Full on-chain program specification

## 🆘 Troubleshooting

**"Config account not found"**
- Program may not be initialized. Run `initialize` instruction as admin.

**"Insufficient funds"**
- Ensure wallet has SOL for transaction fees and rent.

**"Prerequisite not met"**
- Complete the prerequisite course before enrolling.

**"Lesson already completed"**
- Lesson can only be completed once (on-chain check).

---

**Ready to integrate! 🚀**

Uncomment the instruction code in `useSolanaAcademy.ts` once you've set up the Anchor program.
