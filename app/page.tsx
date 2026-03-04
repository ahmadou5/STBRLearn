import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code2, Trophy, Zap, Users, BookOpen, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="mb-4" variant="secondary">
              🚀 Open Source • Built for LATAM Builders
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Learn Solana Development,{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Earn On-Chain Credentials
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Interactive courses, gamified progression, and NFT credentials. Go from zero to deploying production-ready dApps on Solana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Start Learning
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Learners</div>
              </div>
              <div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-muted-foreground">Open Source</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Superteam Academy?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built by developers, for developers. Learn Solana the right way with hands-on projects and real-world experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <Code2 className="h-10 w-10 mb-2 text-purple-500" />
                <CardTitle>Interactive Coding</CardTitle>
                <CardDescription>
                  Write and test Solana code directly in your browser with our integrated editor
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Trophy className="h-10 w-10 mb-2 text-pink-500" />
                <CardTitle>Gamified Learning</CardTitle>
                <CardDescription>
                  Earn XP, unlock achievements, and climb the leaderboard as you progress
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-10 w-10 mb-2 text-blue-500" />
                <CardTitle>On-Chain Credentials</CardTitle>
                <CardDescription>
                  Receive verifiable NFT credentials for completed courses stored on Solana
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 mb-2 text-yellow-500" />
                <CardTitle>Project-Based</CardTitle>
                <CardDescription>
                  Learn by building real dApps from DeFi protocols to NFT marketplaces
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 mb-2 text-green-500" />
                <CardTitle>Community Driven</CardTitle>
                <CardDescription>
                  Join a vibrant community of Solana builders across LATAM
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 mb-2 text-orange-500" />
                <CardTitle>Multi-Language</CardTitle>
                <CardDescription>
                  Content available in Portuguese, Spanish, and English
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Paths Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learning Paths</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Structured tracks to take you from beginner to expert
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-purple-500 transition-colors">
              <CardHeader>
                <Badge className="w-fit mb-2">Beginner</Badge>
                <CardTitle>Solana Fundamentals</CardTitle>
                <CardDescription>
                  Start your Solana journey with the basics of blockchain and web3 development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• Understanding Solana Architecture</div>
                  <div>• Wallets & Transactions</div>
                  <div>• SPL Tokens</div>
                  <div>• Your First dApp</div>
                </div>
                <Link href="/courses/solana-fundamentals">
                  <Button className="w-full mt-4" variant="outline">
                    Start Learning
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-pink-500 transition-colors">
              <CardHeader>
                <Badge className="w-fit mb-2" variant="secondary">Intermediate</Badge>
                <CardTitle>Anchor Framework</CardTitle>
                <CardDescription>
                  Master smart contract development with Anchor, the leading Solana framework
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• Anchor Program Structure</div>
                  <div>• Accounts & State Management</div>
                  <div>• Testing & Deployment</div>
                  <div>• Advanced Patterns</div>
                </div>
                <Link href="/courses/anchor-framework">
                  <Button className="w-full mt-4" variant="outline">
                    Start Learning
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <Badge className="w-fit mb-2" variant="destructive">Advanced</Badge>
                <CardTitle>DeFi Development</CardTitle>
                <CardDescription>
                  Build production-ready DeFi protocols with security best practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• AMM Design Patterns</div>
                  <div>• Lending Protocols</div>
                  <div>• Security Auditing</div>
                  <div>• MEV Protection</div>
                </div>
                <Link href="/courses/defi-development">
                  <Button className="w-full mt-4" variant="outline">
                    Start Learning
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/courses">
              <Button variant="link">
                View All Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Your Solana Journey?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join hundreds of developers learning to build on Solana. Start earning XP and credentials today.
            </p>
            <Link href="/courses">
              <Button size="lg">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
