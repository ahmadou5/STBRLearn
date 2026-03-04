'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Globe, Palette, Shield, User, Wallet } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"

export default function SettingsPage() {
  const { publicKey } = useWallet()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">
          Manage your account preferences and learning experience
        </p>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Settings
              </CardTitle>
              <CardDescription>
                Update your profile information and display preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Name</label>
                <input
                  type="text"
                  placeholder="Enter your display name"
                  className="w-full px-3 py-2 rounded-md border bg-background"
                  defaultValue="Solana Developer"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  placeholder="Tell us about yourself"
                  className="w-full px-3 py-2 rounded-md border bg-background min-h-[100px]"
                  defaultValue="Learning Solana development to build the future of Web3"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Profile Visibility</label>
                <select className="w-full px-3 py-2 rounded-md border bg-background">
                  <option>Public - Visible to everyone</option>
                  <option>Private - Only visible to you</option>
                  <option>Community - Visible to Superteam members</option>
                </select>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Wallet Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet & Blockchain
              </CardTitle>
              <CardDescription>
                Manage your connected wallet and on-chain settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Connected Wallet</label>
                <div className="flex items-center gap-2">
                  {publicKey ? (
                    <>
                      <code className="flex-1 px-3 py-2 rounded-md border bg-muted text-sm">
                        {publicKey.toString()}
                      </code>
                      <Badge variant="default">Connected</Badge>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">No wallet connected</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Network</label>
                <select className="w-full px-3 py-2 rounded-md border bg-background">
                  <option>Devnet (Development)</option>
                  <option>Mainnet Beta (Production)</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="auto-sign" defaultChecked />
                <label htmlFor="auto-sign" className="text-sm">
                  Auto-sign transactions for XP rewards
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Choose what updates you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Course Updates</p>
                  <p className="text-sm text-muted-foreground">New lessons and content releases</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Achievement Unlocks</p>
                  <p className="text-sm text-muted-foreground">When you earn new badges</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Leaderboard Changes</p>
                  <p className="text-sm text-muted-foreground">Rank updates and competitions</p>
                </div>
                <input type="checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Summary</p>
                  <p className="text-sm text-muted-foreground">Your progress recap every week</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize how the app looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme</label>
                <select className="w-full px-3 py-2 rounded-md border bg-background">
                  <option>Dark (Default)</option>
                  <option>Light</option>
                  <option>System</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="reduce-motion" />
                <label htmlFor="reduce-motion" className="text-sm">
                  Reduce animations
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Language */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language & Region
              </CardTitle>
              <CardDescription>
                Set your preferred language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <select className="w-full px-3 py-2 rounded-md border bg-background">
                  <option>English (EN)</option>
                  <option>Português (PT-BR)</option>
                  <option>Español (ES)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Timezone</label>
                <select className="w-full px-3 py-2 rounded-md border bg-background">
                  <option>UTC-3 (São Paulo)</option>
                  <option>UTC-5 (New York)</option>
                  <option>UTC+0 (London)</option>
                  <option>UTC+8 (Singapore)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Control your data and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show on Leaderboard</p>
                  <p className="text-sm text-muted-foreground">Display your rank publicly</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Analytics</p>
                  <p className="text-sm text-muted-foreground">Help us improve with usage data</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="pt-4 border-t space-y-2">
                <Button variant="outline" className="w-full">Export My Data</Button>
                <Button variant="outline" className="w-full text-destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
