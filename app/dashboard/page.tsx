'use client'

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Flame, Award, TrendingUp, BookOpen, Target } from "lucide-react"
import Link from "next/link"
import { mockCourses, mockAchievements } from "@/lib/mock-data"
import { calculateLevel, getLevelProgress } from "@/lib/utils"

export default function DashboardPage() {
  const { connected, publicKey } = useWallet()

  if (!connected) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-purple-600 mx-auto flex items-center justify-center">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Connect Your Wallet</h1>
          <p className="text-muted-foreground">
            Connect your Solana wallet to access your dashboard and start earning XP
          </p>
          <WalletMultiButton />
        </div>
      </div>
    )
  }

  // Mock user data - replace with actual data from service
  const userXP = 1250
  const userLevel = calculateLevel(userXP)
  const levelProgress = getLevelProgress(userXP)
  const currentStreak = 5
  const coursesInProgress = mockCourses.slice(0, 2)
  const unlockedAchievements = mockAchievements.filter(a => a.unlockedAt)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {publicKey?.toBase58().slice(0, 8)}...
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total XP</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userXP.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Level {userLevel}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Flame className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentStreak} days</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Keep it going!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{unlockedAchievements.length}/{mockAchievements.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Unlocked
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Level Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Level Progress</CardTitle>
              <CardDescription>
                {Math.floor(levelProgress)}% to Level {userLevel + 1}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={levelProgress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                Keep learning to level up and unlock new achievements
              </p>
            </CardContent>
          </Card>

          {/* Courses in Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Courses in Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coursesInProgress.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {course.modules.length} modules • {course.xpReward} XP
                        </p>
                      </div>
                      <Badge variant="secondary">{course.difficulty}</Badge>
                    </div>
                    <Progress value={course.progress || 0} className="mb-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {course.progress || 0}% complete
                      </span>
                      <Link href={`/courses/${course.slug}`}>
                        <Button size="sm" variant="outline">Continue</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/courses">
                <Button variant="link" className="mt-4">Browse All Courses</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">Completed "What is Solana?"</span>
                  <span className="ml-auto text-xs">+25 XP</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-muted-foreground">Started "Solana Fundamentals"</span>
                  <span className="ml-auto text-xs">2h ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  <span className="text-muted-foreground">Unlocked "First Steps" achievement</span>
                  <span className="ml-auto text-xs">+25 XP</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {mockAchievements.slice(0, 6).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`aspect-square rounded-lg border-2 flex items-center justify-center text-3xl ${
                      achievement.unlockedAt
                        ? "bg-purple-500/20 border-purple-500/50"
                        : "bg-muted/20 border-muted grayscale opacity-50"
                    }`}
                    title={achievement.name}
                  >
                    {achievement.icon}
                  </div>
                ))}
              </div>
              <Link href="/profile">
                <Button variant="link" className="mt-4 w-full">View All</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Streak Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold">{currentStreak}</div>
                <div className="text-sm text-muted-foreground">day streak</div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded ${
                      i >= 28 - currentStreak
                        ? "bg-orange-500"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Complete a lesson today to continue your streak!
              </p>
            </CardContent>
          </Card>

          {/* Leaderboard Rank */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Rank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold">#42</div>
                <div className="text-sm text-muted-foreground mb-4">Global Rank</div>
                <Link href="/leaderboard">
                  <Button variant="outline" className="w-full">View Leaderboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
