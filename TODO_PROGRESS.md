# 🚀 Superteam Academy - Build Progress Tracker

**Deadline:** 16 hours from start  
**Current Status:** 🟢 In Progress (11 iterations used)

---

## ✅ COMPLETED TASKS

### 1. ✅ Project Setup & Foundation (2 hours elapsed)

- [x] Install core dependencies (Solana, Radix UI, utilities)
- [x] Set up project structure (lib/, components/, services/)
- [x] Create utility functions (calculateLevel, XP calculations)
- [x] Configure Tailwind with dark theme
- [x] Set up TypeScript types (Course, Lesson, Achievement, etc.)
- [x] Create mock data for development

### 2. ✅ Solana Wallet Integration

- [x] Set up SolanaProvider with wallet adapters
- [x] Configure for Devnet
- [x] Multi-wallet support (Phantom, Solflare)
- [x] Wallet integration in layout

### 3. ✅ Core UI Components

- [x] Button component with variants
- [x] Card components
- [x] Badge component
- [x] Progress bar component
- [x] Header with wallet button
- [x] Footer with links

### 4. ✅ Service Layer Architecture

- [x] LearningProgressService interface
- [x] MockLearningProgressService implementation
- [x] Clean abstraction for future on-chain integration

### 5. ✅ Core Pages (7/10 pages done)

- [x] Landing Page (Hero, features, learning paths, CTA)
- [x] Course Catalog (/courses) - Grid with filters
- [x] Course Detail (/courses/[slug]) - Module breakdown
- [x] Lesson Viewer (/courses/[slug]/lessons/[id]) - Content + Editor
- [x] Dashboard (/dashboard) - XP, progress, achievements
- [x] Leaderboard (/leaderboard) - Rankings with podium
- [x] Profile (/profile) - User stats and credentials

### 6. ✅ Gamification Features

- [x] XP display and level calculation
- [x] Level progress bars
- [x] Achievement badges showcase
- [x] Streak calendar visualization
- [x] Leaderboard rankings

### 7. ✅ Code Editor Integration

- [x] Embedded Solana Playground iframe
- [x] Split layout for challenges (content + editor)
- [x] Test case display
- [x] Hints and solution toggles

### 8. ✅ Documentation

- [x] README.md - Setup, features, deployment
- [x] ARCHITECTURE.md - System design, patterns, integration
- [x] CMS_GUIDE.md - Content management workflow

---

## 🟡 IN PROGRESS TASKS

### 1. 🟡 Dependency Installation

- [~] Installing Solana wallet adapters (background process)
- [ ] Verify all packages installed correctly
- [ ] Test build process

---

## ⏳ REMAINING TASKS (5 hours remaining)

### Priority 1: Critical for Submission

#### A. Finish Core Setup (1 hour)

- [ ] Complete dependency installation
- [ ] Fix any build errors
- [ ] Test dev server runs successfully
- [ ] Verify all pages render without errors

#### B. Missing Pages (30 min)

- [ ] Settings page (/settings) - Profile editing, preferences
- [ ] Certificate view (/certificates/[id]) - Optional
- [ ] 404/Error pages - Basic error handling

#### C. Environment & Config (30 min)

- [ ] Create .env.example file
- [ ] Add Solana RPC configuration
- [ ] Configure next.config for production
- [ ] Add sitemap generation

#### D. Performance Optimization (1 hour)

- [ ] Image optimization (add Next Image to components)
- [ ] Lazy loading for heavy components
- [ ] Code splitting check
- [ ] Run Lighthouse audit
- [ ] Fix any critical performance issues

#### E. Responsive Design (30 min)

- [ ] Test all pages on mobile
- [ ] Fix any mobile layout issues
- [ ] Verify touch interactions work
- [ ] Test tablet breakpoints

#### F. Analytics Setup (30 min)

- [ ] Add GA4 script to layout
- [ ] Add Sentry error tracking
- [ ] Create analytics event helpers
- [ ] Document analytics events

### Priority 2: Polish & Deploy

#### G. Deployment (1 hour)

- [ ] Create Vercel account / connect GitHub
- [ ] Configure environment variables
- [ ] Deploy to Vercel
- [ ] Test production build
- [ ] Verify all features work on production
- [ ] Get production URL

#### H. Final Documentation (30 min)

- [ ] Create CUSTOMIZATION.md
- [ ] Add demo credentials to README
- [ ] Create .github/CONTRIBUTING.md (optional)
- [ ] Update all docs with production URL

#### I. Demo Video (30 min)

- [ ] Record screen walkthrough (3-5 min)
- [ ] Show key features: wallet connect, courses, gamification
- [ ] Explain architecture highlights
- [ ] Upload to YouTube/Loom
- [ ] Add link to README

#### J. Submission (15 min)

- [ ] Create PR to solanabr/superteam-academy
- [ ] Fill out PR description with all details
- [ ] Add demo URL, video, docs links
- [ ] Create Twitter post with screenshots
- [ ] Tag @SuperteamBR
- [ ] Submit via Superteam Earn platform

### Priority 3: Bonus Features (if time permits)

- [ ] Add i18n with next-intl (PT-BR, ES, EN)
- [ ] PWA manifest and service worker
- [ ] E2E tests with Playwright
- [ ] Admin dashboard mock
- [ ] On-chain XP reading from devnet
- [ ] Credential NFT display from devnet

---

## 🎯 TIME ALLOCATION

| Task Block               | Estimated | Priority    |
| ------------------------ | --------- | ----------- |
| Fix Dependencies & Build | 1h        | 🔴 Critical |
| Missing Pages            | 0.5h      | 🔴 Critical |
| Performance & Mobile     | 1.5h      | 🟠 High     |
| Analytics                | 0.5h      | 🟡 Medium   |
| Deploy to Vercel         | 1h        | 🔴 Critical |
| Documentation            | 0.5h      | 🟠 High     |
| Demo Video               | 0.5h      | 🔴 Critical |
| Submission               | 0.25h     | 🔴 Critical |
| **TOTAL**                | **5.75h** |             |
| **BUFFER**               | **0.25h** |             |

---

## 📊 COMPLETION STATUS

**Overall Progress:** 65% Complete

### By Category:

- ✅ Foundation & Setup: 100%
- ✅ Core Pages: 70%
- ✅ Gamification: 100%
- ✅ Documentation: 75%
- 🟡 Deployment: 0%
- 🟡 Testing: 0%
- 🟡 Submission: 0%

---

## 🚨 CRITICAL PATH (Must Complete)

1. ✅ ~~Core pages built~~
2. 🔴 **Dependencies installed & build works** ← CURRENT FOCUS
3. 🔴 **Deploy to Vercel**
4. 🔴 **Demo video recorded**
5. 🔴 **PR submitted**

---

## 💡 NOTES

- Focus on **working demo** over feature completeness
- **Deployed URL** is mandatory for submission
- **Demo video** is mandatory (3-5 min)
- **Twitter post** required with @SuperteamBR tag
- All 4 submission requirements must be met

---

## ⚡ NEXT ACTIONS (Immediate)

1. Check npm install status
2. Fix any dependency conflicts
3. Test `npm run dev`
4. Fix build errors
5. Deploy to Vercel
6. Record demo video
7. Submit PR

---

**Last Updated:** Sprint Start (11 iterations in)  
**Time Remaining:** ~5 hours to submission

Superteam Academy — Frontend Integration Guide
Program ID: ACADBRCB3zGvo1KSCbkztS33ZNzeBv2d7bqGceti3ucf

Architecture
┌───────────-──┐ ┌──────────────┐ ┌───────────────────┐
│ Next.js │────▶│ Backend │────▶│ On-Chain Program │
│ Frontend │ │ (signer) │ │ (Anchor) │
└──────┬───────┘ └──────────────┘ └───────────────────┘
│ │
│ wallet signs: enroll, close_enrollment │
│ │
│ backend signs: complete_lesson, │
│ finalize_course, issue_credential, │
│ upgrade_credential │
│ │
└──────────────────────────────────────────┘
Key pattern: Learners sign their own enrollment/close transactions. The backend server signs lesson completions, course finalization, and credential issuance (anti-cheat). Admin signs platform management via multisig.

Setup
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { OnchainAcademy, IDL } from "../target/types/onchain_academy";

const PROGRAM_ID = new PublicKey("ACADBRCB3zGvo1KSCbkztS33ZNzeBv2d7bqGceti3ucf");
const TOKEN_2022_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
const MPL_CORE_PROGRAM_ID = new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d");

const provider = AnchorProvider.env();
const program = new Program<OnchainAcademy>(IDL, PROGRAM_ID, provider);
PDA Derivation
// Config (singleton)
const [configPda] = PublicKey.findProgramAddressSync(
[Buffer.from("config")],
PROGRAM_ID
);

// Course
const [coursePda] = PublicKey.findProgramAddressSync(
[Buffer.from("course"), Buffer.from(courseId)],
PROGRAM_ID
);

// Enrollment
const [enrollmentPda] = PublicKey.findProgramAddressSync(
[Buffer.from("enrollment"), Buffer.from(courseId), learner.toBuffer()],
PROGRAM_ID
);

// MinterRole
const [minterRolePda] = PublicKey.findProgramAddressSync(
[Buffer.from("minter"), minter.toBuffer()],
PROGRAM_ID
);

// AchievementType
const [achievementTypePda] = PublicKey.findProgramAddressSync(
[Buffer.from("achievement"), Buffer.from(achievementId)],
PROGRAM_ID
);

// AchievementReceipt
const [receiptPda] = PublicKey.findProgramAddressSync(
[Buffer.from("achievement_receipt"), Buffer.from(achievementId), recipient.toBuffer()],
PROGRAM_ID
);
Instructions by Role
Learner (wallet signer)
enroll
Enrolls the connected wallet in a course. If the course has a prerequisite, pass the prerequisite Course PDA and the learner's completed Enrollment PDA as remaining accounts.

await program.methods
.enroll(courseId)
.accountsPartial({
course: coursePda,
enrollment: enrollmentPda,
learner: wallet.publicKey,
systemProgram: SystemProgram.programId,
})
// If course has prerequisite:
.remainingAccounts([
{ pubkey: prereqCoursePda, isWritable: false, isSigner: false },
{ pubkey: prereqEnrollmentPda, isWritable: false, isSigner: false },
])
.rpc();
close_enrollment
Closes enrollment and reclaims rent. Completed courses close immediately. Incomplete courses require 24h after enrollment.

await program.methods
.closeEnrollment()
.accountsPartial({
course: coursePda,
enrollment: enrollmentPda,
learner: wallet.publicKey,
})
.rpc();
Backend (backend_signer keypair)
complete_lesson
Marks a lesson complete and mints xp_per_lesson XP to the learner.

await program.methods
.completeLesson(lessonIndex)
.accountsPartial({
config: configPda,
course: coursePda,
enrollment: enrollmentPda,
learner: learnerPubkey,
learnerTokenAccount: learnerXpAta,
xpMint: xpMintPubkey,
backendSigner: backendSigner.publicKey,
tokenProgram: TOKEN_2022_PROGRAM_ID,
})
.signers([backendSigner])
.rpc();
finalize_course
Verifies all lessons complete, awards 50% bonus XP to learner, awards creator XP if threshold met.

await program.methods
.finalizeCourse()
.accountsPartial({
config: configPda,
course: coursePda,
enrollment: enrollmentPda,
learner: learnerPubkey,
learnerTokenAccount: learnerXpAta,
creatorTokenAccount: creatorXpAta,
creator: creatorPubkey,
xpMint: xpMintPubkey,
backendSigner: backendSigner.publicKey,
tokenProgram: TOKEN_2022_PROGRAM_ID,
})
.signers([backendSigner])
.rpc();
issue_credential
Creates a soulbound Metaplex Core NFT credential. Requires finalize_course first. coursesCompleted and totalXp are written to the NFT Attributes plugin.

const credentialAsset = Keypair.generate();

await program.methods
.issueCredential(credentialName, metadataUri, coursesCompleted, new BN(totalXp))
.accountsPartial({
config: configPda,
course: coursePda,
enrollment: enrollmentPda,
learner: learnerPubkey,
credentialAsset: credentialAsset.publicKey,
trackCollection: trackCollectionPubkey,
payer: payer.publicKey,
backendSigner: backendSigner.publicKey,
mplCoreProgram: MPL_CORE_PROGRAM_ID,
systemProgram: SystemProgram.programId,
})
.signers([backendSigner, credentialAsset, payer])
.rpc();
upgrade_credential
Updates an existing credential NFT with new name, URI, and attributes.

await program.methods
.upgradeCredential(newName, newUri, coursesCompleted, new BN(totalXp))
.accountsPartial({
config: configPda,
course: coursePda,
enrollment: enrollmentPda,
learner: learnerPubkey,
credentialAsset: existingAssetPubkey,
trackCollection: trackCollectionPubkey,
payer: payer.publicKey,
backendSigner: backendSigner.publicKey,
mplCoreProgram: MPL_CORE_PROGRAM_ID,
systemProgram: SystemProgram.programId,
})
.signers([backendSigner, payer])
.rpc();
Admin (config.authority signer)
initialize
One-time setup. Creates Config PDA, XP mint (Token-2022), and auto-registers authority as a MinterRole.

const xpMint = Keypair.generate();
const [backendMinterRolePda] = PublicKey.findProgramAddressSync(
[Buffer.from("minter"), authority.publicKey.toBuffer()],
PROGRAM_ID
);

await program.methods
.initialize()
.accountsPartial({
config: configPda,
xpMint: xpMint.publicKey,
authority: authority.publicKey,
backendMinterRole: backendMinterRolePda,
systemProgram: SystemProgram.programId,
tokenProgram: TOKEN_2022_PROGRAM_ID,
})
.signers([authority, xpMint])
.rpc();
update_config
Rotates backend signer. Optionally pass old MinterRole PDA as remaining account to deactivate it.

await program.methods
.updateConfig({ newBackendSigner: newSignerPubkey })
.accountsPartial({
config: configPda,
authority: authority.publicKey,
})
.remainingAccounts([
{ pubkey: oldMinterRolePda, isWritable: true, isSigner: false },
])
.signers([authority])
.rpc();
create_course
await program.methods
.createCourse({
courseId: "anchor-101",
creator: creatorPubkey,
contentTxId: Array.from(arweaveTxIdBytes),
lessonCount: 10,
difficulty: 1,
xpPerLesson: 100,
trackId: 1,
trackLevel: 1,
prerequisite: null,
creatorRewardXp: 50,
minCompletionsForReward: 3,
})
.accountsPartial({
course: coursePda,
config: configPda,
authority: authority.publicKey,
systemProgram: SystemProgram.programId,
})
.signers([authority])
.rpc();
update_course
await program.methods
.updateCourse({
newContentTxId: null,
newIsActive: true,
newXpPerLesson: 150,
newCreatorRewardXp: null,
newMinCompletionsForReward: null,
})
.accountsPartial({
config: configPda,
course: coursePda,
authority: authority.publicKey,
})
.signers([authority])
.rpc();
register_minter
await program.methods
.registerMinter({
minter: minterPubkey,
label: "irl-events",
maxXpPerCall: new BN(1000),
})
.accountsPartial({
config: configPda,
minterRole: minterRolePda,
authority: authority.publicKey,
payer: authority.publicKey,
systemProgram: SystemProgram.programId,
})
.signers([authority])
.rpc();
revoke_minter
Closes the MinterRole PDA and reclaims rent to authority.

await program.methods
.revokeMinter()
.accountsPartial({
config: configPda,
minterRole: minterRolePda,
authority: authority.publicKey,
})
.signers([authority])
.rpc();
create_achievement_type
const collection = Keypair.generate();

await program.methods
.createAchievementType({
achievementId: "hackathon-winner",
name: "Hackathon Winner",
metadataUri: "https://arweave.net/...",
maxSupply: 100,
xpReward: 500,
})
.accountsPartial({
config: configPda,
achievementType: achievementTypePda,
collection: collection.publicKey,
authority: authority.publicKey,
payer: authority.publicKey,
mplCoreProgram: MPL_CORE_PROGRAM_ID,
systemProgram: SystemProgram.programId,
})
.signers([authority, collection])
.rpc();
deactivate_achievement_type
await program.methods
.deactivateAchievementType()
.accountsPartial({
config: configPda,
achievementType: achievementTypePda,
authority: authority.publicKey,
})
.signers([authority])
.rpc();
Minter (registered MinterRole signer)
reward_xp
await program.methods
.rewardXp(new BN(500), "community event reward")
.accountsPartial({
config: configPda,
minterRole: minterRolePda,
xpMint: xpMintPubkey,
recipientTokenAccount: recipientXpAta,
minter: minter.publicKey,
tokenProgram: TOKEN_2022_PROGRAM_ID,
})
.signers([minter])
.rpc();
award_achievement
const asset = Keypair.generate();

await program.methods
.awardAchievement()
.accountsPartial({
config: configPda,
achievementType: achievementTypePda,
achievementReceipt: receiptPda,
minterRole: minterRolePda,
asset: asset.publicKey,
collection: collectionPubkey,
recipient: recipientPubkey,
recipientTokenAccount: recipientXpAta,
xpMint: xpMintPubkey,
payer: payer.publicKey,
minter: minter.publicKey,
mplCoreProgram: MPL_CORE_PROGRAM_ID,
tokenProgram: TOKEN_2022_PROGRAM_ID,
systemProgram: SystemProgram.programId,
})
.signers([minter, asset, payer])
.rpc();
Reading Accounts
// Config
const config = await program.account.config.fetch(configPda);
// config.authority, config.backendSigner, config.xpMint

// Course
const course = await program.account.course.fetch(coursePda);
// course.courseId, course.lessonCount, course.xpPerLesson, course.isActive

// Enrollment (returns null if closed/never created)
const enrollment = await program.account.enrollment.fetchNullable(enrollmentPda);
// enrollment.lessonFlags, enrollment.completedAt, enrollment.credentialAsset

// MinterRole
const role = await program.account.minterRole.fetch(minterRolePda);
// role.isActive, role.totalXpMinted, role.maxXpPerCall

// AchievementType
const achievement = await program.account.achievementType.fetch(achievementTypePda);
// achievement.currentSupply, achievement.maxSupply, achievement.xpReward

// AchievementReceipt (null = not yet awarded)
const receipt = await program.account.achievementReceipt.fetchNullable(receiptPda);
// receipt.asset, receipt.awardedAt
List all courses
const allCourses = await program.account.course.all();
const activeCourses = allCourses.filter(c => c.account.isActive);
List enrollments for a wallet
// Use getProgramAccounts with memcmp filter on course pubkey
// or iterate all enrollments (small dataset) and filter client-side
const enrollments = await program.account.enrollment.all();
XP Balance
XP uses Token-2022 with 0 decimals. Query the learner's Associated Token Account:

const xpAta = getAssociatedTokenAddressSync(
xpMintPubkey,
walletPubkey,
false,
TOKEN_2022_PROGRAM_ID
);

const balance = await provider.connection.getTokenAccountBalance(xpAta);
const xpAmount = Number(balance.value.amount);
Create XP Token Account
Before a learner can receive XP, they need a Token-2022 ATA. Your backend should create this before calling complete_lesson:

const ix = createAssociatedTokenAccountInstruction(
payer,
xpAta,
walletPubkey,
xpMintPubkey,
TOKEN_2022_PROGRAM_ID
);
Credential Queries (Helius DAS API)
Credential NFTs are Metaplex Core assets. Query via Helius DAS:

const response = await fetch(HELIUS_RPC_URL, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
jsonrpc: "2.0",
id: "1",
method: "getAssetsByOwner",
params: { ownerAddress: walletAddress, page: 1, limit: 100 },
}),
});

const data = await response.json();

// Filter by track collection
const credentials = data.result.items.filter(
item => item.grouping?.find(
g => g.group_key === "collection" && g.group_value === trackCollectionAddress
)
);

// Read credential attributes
for (const cred of credentials) {
const attrs = cred.content?.metadata?.attributes;
// { track_id, level, courses_completed, total_xp }
}
Events
Listen for program events via transaction logs:

program.addEventListener("LessonCompleted", (event) => {
// event.learner, event.course, event.lessonIndex, event.xpEarned, event.timestamp
});

program.addEventListener("CourseFinalized", (event) => {
// event.learner, event.course, event.totalXp, event.bonusXp, event.creator, event.creatorXp
});

program.addEventListener("AchievementAwarded", (event) => {
// event.achievementId, event.recipient, event.asset, event.xpReward
});
All 15 events: ConfigUpdated, CourseCreated, CourseUpdated, Enrolled, LessonCompleted, CourseFinalized, EnrollmentClosed, CredentialIssued, CredentialUpgraded, MinterRegistered, MinterRevoked, XpRewarded, AchievementAwarded, AchievementTypeCreated, AchievementTypeDeactivated

Note: XpRewarded.recipient is the Token-2022 ATA address, not the wallet pubkey. Derive the wallet from the ATA or use associated token account lookup.

Error Handling
try {
await program.methods.completeLesson(lessonIndex).accounts({...}).rpc();
} catch (err) {
if (err.error?.errorCode?.code === "LessonAlreadyCompleted") {
// Lesson already done — refresh UI
} else if (err.error?.errorCode?.code === "CourseNotActive") {
// Course deactivated — show message
}
}
Common error codes:

Code When
CourseNotActive Course deactivated
LessonOutOfBounds Invalid lesson index
LessonAlreadyCompleted Duplicate completion attempt
CourseNotCompleted Finalize before all lessons done
CourseAlreadyFinalized Double finalize
CourseNotFinalized Credential before finalize
PrerequisiteNotMet Missing prerequisite course
UnenrollCooldown Close too early (24h cooldown)
MinterNotActive Revoked minter
MinterAmountExceeded Over per-call XP cap
AchievementNotActive Deactivated achievement
AchievementSupplyExhausted Max supply reached
InvalidAmount Zero XP in reward_xp
Unauthorized Wrong signer
Lesson Bitmap Helpers
Enrollment tracks completed lessons as a bitmap ([u64; 4] = 256 bits):

function isLessonComplete(lessonFlags: BN[], lessonIndex: number): boolean {
const wordIndex = Math.floor(lessonIndex / 64);
const bitIndex = lessonIndex % 64;
return !lessonFlags[wordIndex].and(new BN(1).shln(bitIndex)).isZero();
}

function countCompletedLessons(lessonFlags: BN[]): number {
return lessonFlags.reduce((sum, word) => {
let count = 0;
let w = word.clone();
while (!w.isZero()) {
count += w.and(new BN(1)).toNumber();
w = w.shrn(1);
}
return sum + count;
}, 0);
}

function getCompletedLessonIndices(lessonFlags: BN[], lessonCount: number): number[] {
const completed: number[] = [];
for (let i = 0; i < lessonCount; i++) {
if (isLessonComplete(lessonFlags, i)) completed.push(i);
}
return completed;
}
Typical Frontend Flow
Connect wallet → derive configPda, fetch config for xpMint address
Browse courses → program.account.course.all() → filter active
Check enrollment → fetchNullable(enrollmentPda) → show progress or enroll button
Enroll → learner signs enroll tx (check prerequisites first)
Complete lessons → backend calls complete_lesson after verifying content completion
Show progress → read enrollment.lessonFlags bitmap → render progress bar
Finalize → backend calls finalize_course when all lessons done
Issue credential → backend calls issue_credential → NFT appears in wallet
Show XP → query Token-2022 ATA balance
Show credentials → Helius DAS getAssetsByOwner filtered by collection

# Superteam Academy — On-Chain Program Specification

**Version:** 3.0
**Network:** Solana Mainnet
**Framework:** Anchor + Metaplex Core

---

## Executive Summary

Superteam Academy is a decentralized learning platform on Solana that issues verifiable credentials, tracks learner XP, manages a course registry, and distributes creator incentives. The on-chain program enforces enrollment gating, lesson-completion bitmaps, XP minting, and soulbound NFT credential lifecycle. Anti-cheat, rate limiting, and content delivery are handled off-chain by a backend service that co-signs transactions with a rotatable keypair stored in the Config PDA.

---

## Account Types

| Account            | Seeds                                                                 | Size   | Closeable               | Purpose                                                            |
| ------------------ | --------------------------------------------------------------------- | ------ | ----------------------- | ------------------------------------------------------------------ |
| Config             | `["config"]`                                                          | 113 B  | No                      | Singleton: platform authority, backend signer, XP mint             |
| Course             | `["course", course_id.as_bytes()]`                                    | 192 B  | No                      | Course metadata, creator, XP amounts, lesson count, prerequisite   |
| Enrollment         | `["enrollment", course_id.as_bytes(), user.key()]`                    | 127 B  | Yes                     | Per-learner progress: lesson bitmap, timestamps, credential ref    |
| MinterRole         | `["minter", minter.key()]`                                            | 110 B  | Yes (via revoke_minter) | Registered XP minter: label, per-call cap, active flag             |
| AchievementType    | `["achievement", achievement_id.as_bytes()]`                          | 338 B  | No                      | Achievement definition: name, metadata URI, collection, supply cap |
| AchievementReceipt | `["achievement_receipt", achievement_id.as_bytes(), recipient.key()]` | 49 B   | No                      | Proof of award — init collision prevents double-awarding           |
| Credential NFT     | Metaplex Core asset (1 per learner per track)                         | ~200 B | No                      | Soulbound wallet-visible credential, upgradeable via plugins       |

---

## Instructions

### Platform Management

| Instruction     | Who Signs | Description                                                                                         |
| --------------- | --------- | --------------------------------------------------------------------------------------------------- |
| `initialize`    | authority | One-time setup: create Config PDA, XP mint (Token-2022), auto-register backend signer as MinterRole |
| `update_config` | authority | Rotate backend signer (optionally deactivate old MinterRole via remaining_accounts)                 |

### Course Management

| Instruction     | Who Signs | Description                                                                  |
| --------------- | --------- | ---------------------------------------------------------------------------- |
| `create_course` | authority | Register a new course PDA with XP amounts, lesson count, track, prerequisite |
| `update_course` | authority | Update course content, XP reward, active status, or creator reward           |

### Enrollment and Progress

| Instruction          | Who Signs      | Description                                                                                                                                       |
| -------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enroll`             | learner        | Create Enrollment PDA; checks course is active and prerequisite completed                                                                         |
| `complete_lesson`    | backend_signer | Set lesson bit in bitmap, mint `xp_per_lesson` to learner                                                                                         |
| `finalize_course`    | backend_signer | Verify full bitmap, mint completion bonus to learner, mint creator reward (if threshold met), set `completed_at`                                  |
| `issue_credential`   | backend_signer | Create Metaplex Core credential NFT for the learner's track. Params: `credential_name`, `metadata_uri`, `courses_completed: u32`, `total_xp: u64` |
| `upgrade_credential` | backend_signer | Upgrade an existing credential NFT URI and attributes. Params: `credential_name`, `metadata_uri`, `courses_completed: u32`, `total_xp: u64`       |
| `close_enrollment`   | learner        | Close Enrollment PDA; free immediately if completed, 24h cooldown if incomplete                                                                   |

### Minter Roles

| Instruction       | Who Signs | Description                                                               |
| ----------------- | --------- | ------------------------------------------------------------------------- |
| `register_minter` | authority | Create MinterRole PDA, set label and optional per-call XP cap             |
| `revoke_minter`   | authority | Close a MinterRole PDA, reclaiming rent to authority                      |
| `reward_xp`       | minter    | Mint arbitrary XP to a recipient, gated by MinterRole cap and active flag |

### Achievements

| Instruction                   | Who Signs | Description                                                                                |
| ----------------------------- | --------- | ------------------------------------------------------------------------------------------ |
| `create_achievement_type`     | authority | Define an achievement: name, metadata URI, Metaplex Core collection, supply cap, XP reward |
| `award_achievement`           | minter    | Mint achievement NFT to recipient; create AchievementReceipt PDA; mint XP reward           |
| `deactivate_achievement_type` | authority | Mark achievement type inactive, blocking future awards                                     |

---

## User Flows

### Learner Journey

- Learner calls `enroll` — Enrollment PDA created, prerequisite checked on-chain
- Backend validates quiz or content progress, then signs and submits `complete_lesson` for each lesson — XP minted per lesson
- Backend verifies full bitmap and submits `finalize_course` — completion bonus and creator reward minted
- Backend submits `issue_credential` — Metaplex Core NFT created (first track course) or upgraded (subsequent track courses); asset pubkey stored in Enrollment
- Learner optionally calls `close_enrollment` to reclaim rent; credential NFT remains in wallet permanently
- Learner can unenroll from an incomplete course after 24 hours by calling `close_enrollment`

### Admin Management

- Authority calls `initialize` once — Config PDA and XP mint created; backend signer auto-registered as MinterRole
- Authority calls `create_course` for each new course — sets lesson count, XP amounts, track, and optional prerequisite
- Authority calls `update_course` to adjust reward amounts, content tx ID, or deactivate a course
- Authority calls `update_config` to rotate backend signer without a program upgrade
- Authority calls `register_minter` to onboard external XP minters with optional per-call caps
- Authority calls `revoke_minter` to close a minter's PDA and reclaim rent
- Authority calls `create_achievement_type` to define new achievements
- Authority calls `deactivate_achievement_type` to stop awarding an achievement

### Minter XP Rewards

- Authority registers a minter via `register_minter` with a label and optional cap
- Minter calls `reward_xp` with an amount and recipient — program checks MinterRole is active and amount is within cap, then mints XP
- Minter's `total_xp_minted` counter increments on each call

### Achievement Awards

- Authority creates an achievement type via `create_achievement_type` — sets collection, supply cap, XP reward
- Minter calls `award_achievement` for a recipient — mints achievement NFT, creates AchievementReceipt PDA (collision = already awarded), mints XP reward
- Authority calls `deactivate_achievement_type` when the achievement is retired

---

## XP Economics

XP is earned through five mechanisms:

| Source                  | Amount                                               | Trigger                                                  |
| ----------------------- | ---------------------------------------------------- | -------------------------------------------------------- |
| Lesson completion       | `course.xp_per_lesson` per lesson                    | `complete_lesson` (each lesson)                          |
| Course completion bonus | 50% of total lesson XP (floor), computed dynamically | `finalize_course`                                        |
| Creator reward          | `course.creator_reward_xp`                           | `finalize_course`, gated by `min_completions_for_reward` |
| Minter reward           | Arbitrary, capped by MinterRole                      | `reward_xp`                                              |
| Achievement award       | `achievement_type.xp_reward`                         | `award_achievement`                                      |

The completion bonus is computed as `floor((xp_per_lesson * lesson_count) / 2)` at finalization — it is not stored on the Course account. Creator reward only mints once the course has reached `min_completions_for_reward` total completions, preventing alt-account farming.

---

## Credentials

Credentials are Metaplex Core NFTs — soulbound via PermanentFreezeDelegate plugin, universally visible in Phantom, Backpack, and Solflare. One credential NFT exists per learner per track (e.g., one for the Anchor track, one for the DeFi track). The credential upgrades in place as the learner completes higher-level courses in the same track — the NFT address never changes.

Config PDA is the update authority for all track collection NFTs. This means only the program (signing as Config PDA) can create or upgrade credentials via Metaplex Core CPI. The Enrollment account stores the `credential_asset` pubkey once issued — this field is the on-chain source of truth for create-vs-upgrade decisions, eliminating any DAS API dependency for writes.

Achievement NFTs are distinct from track credentials — each is a separate Metaplex Core asset in its own collection, awarded once per recipient per achievement type.

---

## Security

### Authority Roles

| Role           | Key                                  | Gated Instructions                                                                                                                            |
| -------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Authority      | `config.authority` (Squads multisig) | initialize, update_config, create_course, update_course, register_minter, revoke_minter, create_achievement_type, deactivate_achievement_type |
| Backend Signer | `config.backend_signer` (rotatable)  | complete_lesson, finalize_course, issue_credential, upgrade_credential                                                                        |
| Minter         | `minter_role.minter` (registered)    | reward_xp, award_achievement                                                                                                                  |
| Learner        | wallet signature                     | enroll, close_enrollment                                                                                                                      |

### Anti-Cheat Summary

- Lesson bitmap — cannot complete the same lesson twice (on-chain bit check)
- XP amounts — read from Course PDA, not from instruction parameters
- Backend co-signature required for all completions and credential issuance
- Rate limiting and fraud detection handled off-chain before the backend signs
- Creator reward gating — `min_completions_for_reward` blocks alt-account farming
- AchievementReceipt PDA init — account collision prevents double-awarding
- MinterRole cap — `max_xp_per_call` (0 = unlimited) limits per-call damage from a compromised minter
- Prerequisite enforcement — Enrollment checks completed_at on prerequisite Enrollment PDA at enroll time

---

## Error Codes

| Code                         | Message                                           |
| ---------------------------- | ------------------------------------------------- |
| `Unauthorized`               | Unauthorized signer                               |
| `CourseNotActive`            | Course not active                                 |
| `LessonOutOfBounds`          | Lesson index out of bounds                        |
| `LessonAlreadyCompleted`     | Lesson already completed                          |
| `CourseNotCompleted`         | Not all lessons completed                         |
| `CourseAlreadyFinalized`     | Course already finalized                          |
| `CourseNotFinalized`         | Course not finalized                              |
| `PrerequisiteNotMet`         | Prerequisite not met                              |
| `UnenrollCooldown`           | Close cooldown not met (24h)                      |
| `EnrollmentCourseMismatch`   | Enrollment/course mismatch                        |
| `Overflow`                   | Arithmetic overflow                               |
| `CourseIdEmpty`              | Course ID is empty                                |
| `CourseIdTooLong`            | Course ID exceeds max length                      |
| `InvalidLessonCount`         | Lesson count must be at least 1                   |
| `InvalidDifficulty`          | Difficulty must be 1, 2, or 3                     |
| `CredentialAssetMismatch`    | Credential asset does not match enrollment record |
| `CredentialAlreadyIssued`    | Credential already issued for this enrollment     |
| `MinterNotActive`            | Minter role is not active                         |
| `MinterAmountExceeded`       | Amount exceeds minter's per-call limit            |
| `LabelTooLong`               | Minter label exceeds max length                   |
| `AchievementNotActive`       | Achievement type is not active                    |
| `AchievementSupplyExhausted` | Achievement max supply reached                    |
| `AchievementIdTooLong`       | Achievement ID exceeds max length                 |
| `AchievementNameTooLong`     | Achievement name exceeds max length               |
| `AchievementUriTooLong`      | Achievement URI exceeds max length                |
| `InvalidAmount`              | Amount must be greater than zero                  |
| `InvalidXpReward`            | XP reward must be greater than zero               |

---

## Events

| Event                        | Emitted By                  |
| ---------------------------- | --------------------------- |
| `ConfigUpdated`              | update_config               |
| `CourseCreated`              | create_course               |
| `CourseUpdated`              | update_course               |
| `Enrolled`                   | enroll                      |
| `LessonCompleted`            | complete_lesson             |
| `CourseFinalized`            | finalize_course             |
| `EnrollmentClosed`           | close_enrollment            |
| `CredentialIssued`           | issue_credential            |
| `CredentialUpgraded`         | upgrade_credential          |
| `MinterRegistered`           | register_minter             |
| `MinterRevoked`              | revoke_minter               |
| `XpRewarded`                 | reward_xp                   |
| `AchievementAwarded`         | award_achievement           |
| `AchievementTypeCreated`     | create_achievement_type     |
| `AchievementTypeDeactivated` | deactivate_achievement_type |

---

## Cost Analysis

### Account Rent (Approximate)

| Account                        | Size   | Rent        | Closeable                |
| ------------------------------ | ------ | ----------- | ------------------------ |
| Config                         | 113 B  | ~0.001 SOL  | No                       |
| Course                         | 192 B  | ~0.002 SOL  | No                       |
| Enrollment                     | 127 B  | ~0.001 SOL  | Yes — reclaimed on close |
| MinterRole                     | 110 B  | ~0.001 SOL  | Yes (via revoke_minter)  |
| AchievementType                | 338 B  | ~0.003 SOL  | No                       |
| AchievementReceipt             | 49 B   | ~0.0004 SOL | No                       |
| Credential NFT (Metaplex Core) | ~200 B | ~0.006 SOL  | No                       |

### Per-Learner (Single Course)

| Action                            | Rent       | Notes                   |
| --------------------------------- | ---------- | ----------------------- |
| Enroll                            | 0.001 SOL  | Reclaimable             |
| Complete lessons                  | —          | TX fees only            |
| Finalize                          | —          | TX fees only            |
| Issue credential (first in track) | ~0.006 SOL | Permanent NFT in wallet |
| Issue credential (upgrade)        | —          | No new rent             |
| Close enrollment                  | -0.001 SOL | Reclaimed               |

---

_Specification v3.0 — Superteam Academy_
