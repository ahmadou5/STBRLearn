'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, TrendingUp } from "lucide-react"

const mockLeaderboard = [
  { rank: 1, username: "SolanaDevMaster", xp: 15420, level: 12, streak: 45, avatar: "🥇" },
  { rank: 2, username: "AnchorPro", xp: 12850, level: 11, streak: 32, avatar: "🥈" },
  { rank: 3, username: "RustWizard", xp: 11200, level: 10, streak: 28, avatar: "🥉" },
  { rank: 4, username: "DeFiBuilder", xp: 9800, level: 9, streak: 21, avatar: "👨‍💻" },
  { rank: 5, username: "BlockchainQueen", xp: 8950, level: 9, streak: 19, avatar: "👩‍💻" },
  { rank: 6, username: "SmartContractGuru", xp: 7600, level: 8, streak: 15, avatar: "🧙" },
  { rank: 7, username: "Web3Ninja", xp: 6800, level: 8, streak: 12, avatar: "🥷" },
  { rank: 8, username: "CryptoEnthusiast", xp: 5900, level: 7, streak: 10, avatar: "🚀" },
  { rank: 9, username: "SolDeveloper", xp: 5200, level: 7, streak: 8, avatar: "⚡" },
  { rank: 10, username: "CodeWarrior", xp: 4750, level: 6, streak: 7, avatar: "⚔️" },
]

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "all-time">("all-time")

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-block p-3 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 mb-4">
          <Trophy className="h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          See how you rank against other Solana developers
        </p>
      </div>

      {/* Timeframe Filters */}
      <div className="flex justify-center gap-2 mb-8">
        <Button
          variant={timeframe === "weekly" ? "default" : "outline"}
          onClick={() => setTimeframe("weekly")}
        >
          Weekly
        </Button>
        <Button
          variant={timeframe === "monthly" ? "default" : "outline"}
          onClick={() => setTimeframe("monthly")}
        >
          Monthly
        </Button>
        <Button
          variant={timeframe === "all-time" ? "default" : "outline"}
          onClick={() => setTimeframe("all-time")}
        >
          All Time
        </Button>
      </div>

      {/* Top 3 Podium */}
      <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
        {/* 2nd Place */}
        <div className="md:order-1 order-2">
          <Card className="border-2 border-gray-400/50 bg-gradient-to-br from-gray-400/10 to-gray-500/10">
            <CardHeader className="text-center pb-4">
              <div className="text-6xl mb-2">🥈</div>
              <div className="text-2xl font-bold">#2</div>
              <CardTitle className="text-lg">{mockLeaderboard[1].username}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{mockLeaderboard[1].xp.toLocaleString()} XP</span>
              </div>
              <Badge variant="secondary">Level {mockLeaderboard[1].level}</Badge>
            </CardContent>
          </Card>
        </div>

        {/* 1st Place */}
        <div className="md:order-2 order-1">
          <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 scale-105">
            <CardHeader className="text-center pb-4">
              <div className="text-7xl mb-2">🥇</div>
              <div className="text-3xl font-bold">#1</div>
              <CardTitle className="text-xl">{mockLeaderboard[0].username}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-bold">{mockLeaderboard[0].xp.toLocaleString()} XP</span>
              </div>
              <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">Level {mockLeaderboard[0].level}</Badge>
            </CardContent>
          </Card>
        </div>

        {/* 3rd Place */}
        <div className="md:order-3 order-3">
          <Card className="border-2 border-orange-600/50 bg-gradient-to-br from-orange-600/10 to-orange-700/10">
            <CardHeader className="text-center pb-4">
              <div className="text-6xl mb-2">🥉</div>
              <div className="text-2xl font-bold">#3</div>
              <CardTitle className="text-lg">{mockLeaderboard[2].username}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{mockLeaderboard[2].xp.toLocaleString()} XP</span>
              </div>
              <Badge variant="secondary">Level {mockLeaderboard[2].level}</Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full Leaderboard */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockLeaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                  entry.rank <= 3 ? "bg-muted/50" : "hover:bg-muted/20"
                }`}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted font-bold">
                  {entry.rank <= 3 ? (
                    entry.rank === 1 ? "🥇" :
                    entry.rank === 2 ? "🥈" : "🥉"
                  ) : (
                    `#${entry.rank}`
                  )}
                </div>

                {/* Avatar & Username */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{entry.avatar}</span>
                    <div>
                      <div className="font-semibold">{entry.username}</div>
                      <div className="text-sm text-muted-foreground">
                        Level {entry.level} • {entry.streak} day streak
                      </div>
                    </div>
                  </div>
                </div>

                {/* XP */}
                <div className="text-right">
                  <div className="flex items-center gap-2 font-bold">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    {entry.xp.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">XP</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Rank Card */}
      <Card className="max-w-4xl mx-auto mt-6 border-2 border-primary/50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 font-bold text-primary">
              #42
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <div>
                  <div className="font-semibold">You</div>
                  <div className="text-sm text-muted-foreground">Keep learning to climb higher!</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 font-bold">
                <Trophy className="h-4 w-4 text-yellow-500" />
                1,250
              </div>
              <div className="text-xs text-muted-foreground">XP</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
