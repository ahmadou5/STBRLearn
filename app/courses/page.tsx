import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen, Award } from "lucide-react"
import Link from "next/link"
import { mockCourses } from "@/lib/mock-data"

export default function CoursesPage() {
  const courses = mockCourses

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Course Catalog</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Explore our curated learning paths. From Solana fundamentals to advanced DeFi development.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button variant="outline" size="sm">All Courses</Button>
        <Button variant="ghost" size="sm">Beginner</Button>
        <Button variant="ghost" size="sm">Intermediate</Button>
        <Button variant="ghost" size="sm">Advanced</Button>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant={
                  course.difficulty === "beginner" ? "default" :
                  course.difficulty === "intermediate" ? "secondary" :
                  "destructive"
                }>
                  {course.difficulty}
                </Badge>
                <Badge variant="outline">{course.track}</Badge>
              </div>
              <CardTitle className="line-clamp-1">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1">
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.modules.length} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>{course.xpReward} XP</span>
                </div>
              </div>

              {course.progress !== undefined && course.progress > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
              )}
            </CardContent>

            <CardFooter>
              <Link href={`/courses/${course.slug}`} className="w-full">
                <Button className="w-full">
                  {course.enrolled ? "Continue Learning" : "View Course"}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
