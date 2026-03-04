'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockCourses } from "@/lib/mock-data"
import { ChevronLeft, ChevronRight, Trophy, CheckCircle2, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [completed, setCompleted] = useState(false)

  const course = mockCourses.find((c) => c.slug === params.slug)
  
  if (!course) {
    return <div>Course not found</div>
  }

  const allLessons = course.modules.flatMap(m => m.lessons)
  const currentLessonIndex = allLessons.findIndex(l => l.id === params.lessonId)
  const lesson = allLessons[currentLessonIndex]
  
  if (!lesson) {
    return <div>Lesson not found</div>
  }

  const nextLesson = allLessons[currentLessonIndex + 1]
  const prevLesson = allLessons[currentLessonIndex - 1]
  const progressPercent = ((currentLessonIndex + 1) / allLessons.length) * 100

  const handleComplete = () => {
    setCompleted(true)
    // TODO: Save progress to service
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <Link href={`/courses/${params.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
              Back to Course
            </Link>
            <Badge variant="outline">
              Lesson {currentLessonIndex + 1} of {allLessons.length}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {lesson.type === "content" ? (
          // Content Lesson
          <div className="h-full overflow-y-auto">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, '<br/>') }} />
              </div>

              {!completed && (
                <div className="mt-8">
                  <Button onClick={handleComplete} size="lg">
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Mark as Complete (+{lesson.xpReward} XP)
                  </Button>
                </div>
              )}

              {completed && (
                <Card className="mt-8 border-green-500/50 bg-green-500/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-8 w-8 text-green-500" />
                      <div>
                        <div className="font-semibold text-lg">Lesson Complete!</div>
                        <div className="text-sm text-muted-foreground">You earned {lesson.xpReward} XP</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          // Challenge Lesson
          <div className="h-full grid md:grid-cols-2 divide-x">
            {/* Instructions */}
            <div className="overflow-y-auto p-6">
              <div className="max-w-2xl">
                <div className="prose prose-invert prose-sm">
                  <div dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, '<br/>') }} />
                </div>

                {/* Hints */}
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHint(!showHint)}
                  >
                    <Lightbulb className="mr-2 h-4 w-4" />
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>
                  {showHint && (
                    <Card className="mt-4 bg-blue-500/10 border-blue-500/50">
                      <CardContent className="pt-4">
                        <p className="text-sm">Try using the Connection class from @solana/web3.js to connect to the devnet cluster.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Test Cases */}
                {lesson.testCases && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Test Cases</h3>
                    <div className="space-y-2">
                      {lesson.testCases.map((test) => (
                        <Card key={test.id}>
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between">
                              <div className="text-sm">
                                <div className="font-medium">{test.description}</div>
                                <div className="text-muted-foreground mt-1">
                                  Expected: {test.expectedOutput}
                                </div>
                              </div>
                              {test.passed ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border-2" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {completed && (
                  <Card className="mt-8 border-green-500/50 bg-green-500/10">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <Trophy className="h-8 w-8 text-green-500" />
                        <div>
                          <div className="font-semibold text-lg">Challenge Complete!</div>
                          <div className="text-sm text-muted-foreground">You earned {lesson.xpReward} XP</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Code Editor */}
            <div className="overflow-y-auto p-6 bg-muted/20">
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Code Editor</h3>
                <p className="text-sm text-muted-foreground">Embedded Solana Playground</p>
              </div>
              
              {/* Embedded Solana Playground */}
              <div className="rounded-lg border overflow-hidden" style={{ height: "600px" }}>
                <iframe
                  src="https://beta.solpg.io/embed"
                  className="w-full h-full"
                  title="Solana Playground"
                />
              </div>

              <div className="mt-4 flex gap-2">
                <Button onClick={handleComplete} className="flex-1">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Submit Solution
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSolution(!showSolution)}
                >
                  {showSolution ? "Hide" : "Show"} Solution
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="border-t bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {prevLesson ? (
              <Link href={`/courses/${params.slug}/lessons/${prevLesson.id}`}>
                <Button variant="outline">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link href={`/courses/${params.slug}/lessons/${nextLesson.id}`}>
                <Button>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link href={`/courses/${params.slug}`}>
                <Button>
                  Complete Course
                  <Trophy className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
