'use client'

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Award, Calendar, ExternalLink, CheckCircle2 } from "lucide-react"
import { mockAchievements, mockCourses } from "@/lib/mock-data"
import { calculateLevel, getLevelProgress } from "@/lib/utils"

export default function ProfilePage() {
  const { connected, publicKey } = useWallet()

  if (!connected) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold">Connect Your Wallet</h1>
          <p className="text-muted-foreground">
            Connect your wallet to view your profile
          </p>
          <WalletMultiButton />
        </div>
      </div>
    )
  }

  const userXP = 1250
  const userLevel = calculateLevel(userXP)
  const levelProgress = getLevelProgress(userXP)
  const completedCourses = mockCourses.slice(0, 1)
  const unlockedAchievements = mockAchievements.filter(a => a.unlockedAt)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl flex-shrink-0">
              🎯
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-4)}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="text-lg px-3 py-1">Level {userLevel}</Badge>
                <Badge variant="outline" className="text-sm">{userXP.toLocaleString()} XP</Badge>
                <Badge variant="secondary" className="text-sm">Member since Mar 2026</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Aspiring Solana developer learning to build the future of Web3
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm">
                  Share Profile
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{userLevel}</div>
                <div className="text-xs text-muted-foreground">Level</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{completedCourses.length}</div>
                <div className="text-xs text-muted-foreground">Courses</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{unlockedAchievements.length}</div>
                <div className="text-xs text-muted-foreground">Badges</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Level Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Level Progress
              </CardTitle>
              <CardDescription>
                Level {userLevel} → Level {userLevel + 1}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={levelProgress} className="h-3 mb-2" />
              <p className="text-sm text-muted-foreground">
                {Math.floor(levelProgress)}% complete
              </p>
            </CardContent>
          </Card>

          {/* Completed Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Completed Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completedCourses.length > 0 ? (
                <div className="space-y-4">
                  {completedCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Completed Mar 2026
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="secondary">{course.difficulty}</Badge>
                            <Badge variant="outline">{course.xpReward} XP earned</Badge>
                          </div>
                        </div>
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No completed courses yet. Start learning!
                </p>
              )}
            </CardContent>
          </Card>

          {/* On-Chain Credentials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                On-Chain Credentials
              </CardTitle>
              <CardDescription>
                Verifiable NFT credentials stored on Solana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Complete courses to earn on-chain credentials</p>
                <Button variant="link" className="mt-2">
                  Learn More
                </Button>
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
              <CardDescription>
                {unlockedAchievements.length} of {mockAchievements.length} unlocked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {mockAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center p-2 ${
                      achievement.unlockedAt
                        ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50"
                        : "bg-muted/20 border-muted grayscale opacity-50"
                    }`}
                    title={achievement.description}
                  >
                    <div className="text-3xl mb-1">{achievement.icon}</div>
                    <div className="text-xs text-center font-medium line-clamp-2">
                      {achievement.name}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Wallet Info */}
          <Card>
            <CardHeader>
              <CardTitle>Wallet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Address</div>
                <div className="font-mono text-sm break-all">
                  {publicKey?.toBase58()}
                </div>
              </div>
              <Button variant="outline" className="w-full" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Explorer
              </Button>
            </CardContent>
          </Card>

          {/* Activity Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded ${
                      Math.random() > 0.7 ? "bg-green-500" :
                      Math.random() > 0.5 ? "bg-green-500/50" :
                      "bg-muted"
                    }`}
                    title={`Activity on day ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded bg-muted" />
                  <div className="w-3 h-3 rounded bg-green-500/30" />
                  <div className="w-3 h-3 rounded bg-green-500/60" />
                  <div className="w-3 h-3 rounded bg-green-500" />
                </div>
                <span>More</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
