import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockCourses } from "@/lib/mock-data"
import { Clock, BookOpen, Award, PlayCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import CourseDetailClient from "./CourseDetailClient"

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

  return <CourseDetailClient course={course} totalLessons={totalLessons} />
}
