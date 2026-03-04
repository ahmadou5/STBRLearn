import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, BookOpen } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-purple-500">
            404
          </h1>
          <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
          <p className="text-muted-foreground text-lg">
            Oops! Looks like you've ventured into uncharted territory. This page doesn't exist in our academy.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Home className="h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <Link href="/courses">
            <Button size="lg" variant="outline" className="gap-2">
              <BookOpen className="h-5 w-5" />
              Browse Courses
            </Button>
          </Link>
        </div>

        <div className="mt-12 p-6 rounded-lg border bg-card">
          <h3 className="font-semibold mb-2 flex items-center justify-center gap-2">
            <Search className="h-5 w-5" />
            Looking for something specific?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try one of these popular destinations:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/courses">
              <Button variant="secondary" size="sm">Courses</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="sm">Dashboard</Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="secondary" size="sm">Leaderboard</Button>
            </Link>
            <Link href="/profile">
              <Button variant="secondary" size="sm">Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
