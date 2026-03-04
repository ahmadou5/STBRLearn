'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen, Award, PlayCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useSolanaAcademy } from "@/lib/hooks/useSolanaAcademy"
import { useEffect, useState } from "react"
import { Course } from "@/lib/types"
import { EnrollmentStatus } from "@/lib/solana/types"
import { isLessonComplete } from "@/lib/solana/utils"

interface CourseDetailClientProps {
  course: Course
  totalLessons: number
}

export default function CourseDetailClient({ course, totalLessons }: CourseDetailClientProps) {
  const { enroll, fetchEnrollmentStatus, loading, error } = useSolanaAcademy()
  const [enrollmentStatus, setEnrollmentStatus] = useState<EnrollmentStatus | null>(null)

  useEffect(() => {
    async function loadEnrollment() {
      const status = await fetchEnrollmentStatus(course.slug)
      setEnrollmentStatus(status)
    }
    loadEnrollment()
  }, [course.slug, fetchEnrollmentStatus])

  const handleEnroll = async () => {
    try {
      await enroll(course.slug)
      // Refresh enrollment status
      const status = await fetchEnrollmentStatus(course.slug)
      setEnrollmentStatus(status)
    } catch (err) {
      console.error("Enrollment failed:", err)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Course Header */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant={
            course.difficulty === "beginner" ? "default" :
            course.difficulty === "intermediate" ? "secondary" :
            "destructive"
          }>
            {course.difficulty}
          </Badge>
          <Badge variant="outline">{course.track}</Badge>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-8">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span>{course.duration} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <span>{totalLessons} lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-muted-foreground" />
            <span>{course.xpReward} XP</span>
          </div>
        </div>

        {enrollmentStatus?.enrolled ? (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Your Progress</span>
              <span className="font-medium">
                {enrollmentStatus.completedLessons}/{enrollmentStatus.totalLessons} lessons
              </span>
            </div>
            <Progress value={enrollmentStatus.progress} className="h-3" />
          </div>
        ) : null}

        {enrollmentStatus?.enrolled ? (
          <Link href={`/courses/${course.slug}/lessons/${course.modules[0]?.lessons[0]?.id || 'l1'}`}>
            <Button size="lg">
              Continue Course
            </Button>
          </Link>
        ) : (
          <Button size="lg" onClick={handleEnroll} disabled={loading}>
            {loading ? "Enrolling..." : "Start Course (Enroll)"}
          </Button>
        )}

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>

      {/* Course Modules */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        {course.modules.map((module, moduleIndex) => {
          // Calculate lesson global index for bitmap checking
          let lessonGlobalIndex = 0
          for (let i = 0; i < moduleIndex; i++) {
            lessonGlobalIndex += course.modules[i].lessons.length
          }

          return (
            <Card key={module.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-muted-foreground">Module {moduleIndex + 1}:</span>
                  {module.title}
                </CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const currentLessonIndex = lessonGlobalIndex + lessonIndex
                    const isCompleted = enrollmentStatus?.enrolled 
                      ? false // TODO: Check bitmap when enrollment data is available
                      : false

                    return (
                      <Link
                        key={lesson.id}
                        href={`/courses/${course.slug}/lessons/${lesson.id}`}
                        className="block"
                      >
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <PlayCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className="font-medium">{lesson.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {lesson.type === "challenge" ? "Coding Challenge" : "Lesson"} • {lesson.xpReward} XP
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
