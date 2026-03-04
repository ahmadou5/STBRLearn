import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockCourses } from "@/lib/mock-data"
import { Clock, BookOpen, Award, PlayCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return mockCourses.map((course) => ({
    slug: course.slug,
  }))
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = mockCourses.find((c) => c.slug === slug)

  if (!course) {
    notFound()
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = 0 // TODO: Get from user progress

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

        {course.progress !== undefined && course.progress > 0 ? (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Your Progress</span>
              <span className="font-medium">{completedLessons}/{totalLessons} lessons</span>
            </div>
            <Progress value={(completedLessons / totalLessons) * 100} className="h-3" />
          </div>
        ) : null}

        <Link href={`/courses/${course.slug}/lessons/${course.modules[0]?.lessons[0]?.id || 'l1'}`}>
          <Button size="lg">
            {course.enrolled ? "Continue Course" : "Start Course"}
          </Button>
        </Link>
      </div>

      {/* Course Modules */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        {course.modules.map((module, index) => (
          <Card key={module.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-muted-foreground">Module {index + 1}:</span>
                {module.title}
              </CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {module.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/courses/${course.slug}/lessons/${lesson.id}`}
                    className="block"
                  >
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      {lesson.completed ? (
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
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
