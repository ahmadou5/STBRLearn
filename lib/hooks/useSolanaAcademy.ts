'use client'

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { getTokenAccountBalance, createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { 
  getConfigPda, 
  getCoursePda, 
  getEnrollmentPda 
} from "@/lib/solana/pdas";
import { 
  createEnrollInstruction, 
  createCloseEnrollmentInstruction 
} from "@/lib/solana/instructions";
import { 
  getXpTokenAccount,
  isLessonComplete,
  countCompletedLessons,
  calculateProgress
} from "@/lib/solana/utils";
import { TOKEN_2022_PROGRAM_ID } from "@/lib/solana/constants";
import { 
  Config, 
  Course, 
  Enrollment, 
  EnrollmentStatus 
} from "@/lib/solana/types";
import BN from "bn.js";

/**
 * Main hook for interacting with Superteam Academy on-chain program
 * Handles learner actions: enroll, unenroll, read progress, read XP
 */
export function useSolanaAcademy() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  
  const [config, setConfig] = useState<Config | null>(null);
  const [xpBalance, setXpBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch config account (contains xpMint address)
   */
  const fetchConfig = useCallback(async () => {
    try {
      const [configPda] = getConfigPda();
      const accountInfo = await connection.getAccountInfo(configPda);
      
      if (!accountInfo) {
        throw new Error("Config account not found. Program may not be initialized.");
      }

      // TODO: Deserialize account data using Anchor IDL
      // For now, return mock data
      const mockConfig: Config = {
        authority: new PublicKey("11111111111111111111111111111111"),
        backendSigner: new PublicKey("11111111111111111111111111111111"),
        xpMint: new PublicKey("11111111111111111111111111111111"),
      };
      
      setConfig(mockConfig);
      return mockConfig;
    } catch (err) {
      console.error("Error fetching config:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch config");
      return null;
    }
  }, [connection]);

  /**
   * Fetch XP balance for connected wallet
   */
  const fetchXpBalance = useCallback(async () => {
    if (!publicKey || !config?.xpMint) return 0;

    try {
      const xpAta = getXpTokenAccount(config.xpMint, publicKey);
      const balance = await connection.getTokenAccountBalance(xpAta);
      const xpAmount = Number(balance.value.amount);
      setXpBalance(xpAmount);
      return xpAmount;
    } catch (err) {
      // Account might not exist yet
      console.log("XP account not found (may not have earned XP yet)");
      setXpBalance(0);
      return 0;
    }
  }, [connection, publicKey, config]);

  /**
   * Fetch course data by ID
   */
  const fetchCourse = useCallback(async (courseId: string): Promise<Course | null> => {
    try {
      const [coursePda] = getCoursePda(courseId);
      const accountInfo = await connection.getAccountInfo(coursePda);
      
      if (!accountInfo) {
        return null;
      }

      // TODO: Deserialize account data using Anchor IDL
      // For now, return mock data
      const mockCourse: Course = {
        courseId,
        creator: new PublicKey("11111111111111111111111111111111"),
        contentTxId: new Array(32).fill(0),
        lessonCount: 10,
        difficulty: 1,
        xpPerLesson: 100,
        trackId: 1,
        trackLevel: 1,
        prerequisite: null,
        creatorRewardXp: 50,
        minCompletionsForReward: 3,
        totalCompletions: 0,
        isActive: true,
        createdAt: new BN(Date.now() / 1000),
      };

      return mockCourse;
    } catch (err) {
      console.error("Error fetching course:", err);
      return null;
    }
  }, [connection]);

  /**
   * Fetch enrollment status for a course
   */
  const fetchEnrollmentStatus = useCallback(
    async (courseId: string): Promise<EnrollmentStatus> => {
      if (!publicKey) {
        return {
          enrolled: false,
          completedLessons: 0,
          totalLessons: 0,
          isCompleted: false,
          completedAt: null,
          credentialAsset: null,
          progress: 0,
        };
      }

      try {
        const [enrollmentPda] = getEnrollmentPda(courseId, publicKey);
        const accountInfo = await connection.getAccountInfo(enrollmentPda);

        if (!accountInfo) {
          // Not enrolled
          return {
            enrolled: false,
            completedLessons: 0,
            totalLessons: 0,
            isCompleted: false,
            completedAt: null,
            credentialAsset: null,
            progress: 0,
          };
        }

        // TODO: Deserialize enrollment data using Anchor IDL
        // For now, return mock data
        const mockEnrollment: Enrollment = {
          course: new PublicKey("11111111111111111111111111111111"),
          learner: publicKey,
          lessonFlags: [new BN(0), new BN(0), new BN(0), new BN(0)],
          enrolledAt: new BN(Date.now() / 1000),
          completedAt: null,
          credentialAsset: null,
        };

        const course = await fetchCourse(courseId);
        const totalLessons = course?.lessonCount || 0;
        const completedLessons = countCompletedLessons(mockEnrollment.lessonFlags);
        const isCompleted = mockEnrollment.completedAt !== null;
        const progress = calculateProgress(completedLessons, totalLessons);

        return {
          enrolled: true,
          completedLessons,
          totalLessons,
          isCompleted,
          completedAt: isCompleted && mockEnrollment.completedAt 
            ? new Date(mockEnrollment.completedAt.toNumber() * 1000) 
            : null,
          credentialAsset: mockEnrollment.credentialAsset,
          progress,
        };
      } catch (err) {
        console.error("Error fetching enrollment:", err);
        return {
          enrolled: false,
          completedLessons: 0,
          totalLessons: 0,
          isCompleted: false,
          completedAt: null,
          credentialAsset: null,
          progress: 0,
        };
      }
    },
    [connection, publicKey, fetchCourse]
  );

  /**
   * Enroll in a course
   */
  const enroll = useCallback(
    async (courseId: string, prerequisiteCourseId?: string) => {
      if (!publicKey) {
        throw new Error("Wallet not connected");
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch prerequisite PDAs if needed
        let prerequisiteCoursePda: PublicKey | undefined;
        let prerequisiteEnrollmentPda: PublicKey | undefined;

        if (prerequisiteCourseId) {
          [prerequisiteCoursePda] = getCoursePda(prerequisiteCourseId);
          [prerequisiteEnrollmentPda] = getEnrollmentPda(prerequisiteCourseId, publicKey);
        }

        // TODO: Initialize Anchor program
        // const program = new Program(...);
        
        // For now, throw error with instructions
        throw new Error(
          "On-chain integration requires Anchor program setup. " +
          "See lib/hooks/useSolanaAcademy.ts for implementation details."
        );

        // Example implementation (uncomment when program is set up):
        /*
        const instruction = await createEnrollInstruction(
          program,
          publicKey,
          {
            courseId,
            prerequisiteCoursePda,
            prerequisiteEnrollmentPda,
          }
        );

        const transaction = new Transaction().add(instruction);
        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, "confirmed");

        return signature;
        */
      } catch (err) {
        const message = err instanceof Error ? err.message : "Enrollment failed";
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [connection, publicKey, sendTransaction]
  );

  /**
   * Close enrollment (unenroll and reclaim rent)
   */
  const closeEnrollment = useCallback(
    async (courseId: string) => {
      if (!publicKey) {
        throw new Error("Wallet not connected");
      }

      setLoading(true);
      setError(null);

      try {
        // TODO: Initialize Anchor program
        throw new Error(
          "On-chain integration requires Anchor program setup. " +
          "See lib/hooks/useSolanaAcademy.ts for implementation details."
        );

        // Example implementation:
        /*
        const instruction = await createCloseEnrollmentInstruction(
          program,
          publicKey,
          { courseId }
        );

        const transaction = new Transaction().add(instruction);
        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, "confirmed");

        return signature;
        */
      } catch (err) {
        const message = err instanceof Error ? err.message : "Close enrollment failed";
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [connection, publicKey, sendTransaction]
  );

  /**
   * Fetch all courses from on-chain
   */
  const fetchAllCourses = useCallback(async (): Promise<Course[]> => {
    try {
      // TODO: Use program.account.course.all() when Anchor is set up
      // For now, return empty array
      return [];
    } catch (err) {
      console.error("Error fetching courses:", err);
      return [];
    }
  }, [connection]);

  /**
   * Fetch all enrollments for connected wallet
   */
  const fetchMyEnrollments = useCallback(async (): Promise<Enrollment[]> => {
    if (!publicKey) return [];

    try {
      // TODO: Use program.account.enrollment.all() and filter by learner
      // For now, return empty array
      return [];
    } catch (err) {
      console.error("Error fetching enrollments:", err);
      return [];
    }
  }, [connection, publicKey]);

  // Auto-fetch config and XP on wallet connect
  useEffect(() => {
    if (publicKey) {
      fetchConfig();
    }
  }, [publicKey, fetchConfig]);

  useEffect(() => {
    if (publicKey && config) {
      fetchXpBalance();
    }
  }, [publicKey, config, fetchXpBalance]);

  return {
    // State
    config,
    xpBalance,
    loading,
    error,
    
    // Learner actions (wallet-signed)
    enroll,
    closeEnrollment,
    
    // Read functions
    fetchCourse,
    fetchEnrollmentStatus,
    fetchXpBalance,
    fetchAllCourses,
    fetchMyEnrollments,
  };
}
