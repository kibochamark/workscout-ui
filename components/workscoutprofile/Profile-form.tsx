"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function ProfileForm() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Card className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image src="/profile.png" alt="Profile picture" width={40} height={40} className="rounded-full" />
            </div>
            <div>
              <h2 className="font-medium">Patrick Kingundi</h2>
              <p className="text-sm text-muted-foreground">patrick@gmail.com</p>
            </div>
          </div>
          <Button variant="default" className="bg-[#14012C] hover:bg-[#14012C]/90">
            Edit
          </Button>
        </div>

        <form className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="Patrick" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="patrick@gmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="0161 706 0549" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" defaultValue="28/11/1995" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" defaultValue="male" />
            </div>
            <div className="space-y-2">
              <Label>Upload Doc</Label>
              <Select defaultValue="select">
                <SelectTrigger>
                  <SelectValue placeholder="Select file" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="select">Select file</SelectItem>
                  <SelectItem value="browse">Browse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-[#14012C]/10 text-[#14012C] hover:bg-[#14012C]/20">
                Pro Plan
              </Badge>
              <span className="text-sm text-muted-foreground">Active until Dec 31, 2024</span>
            </div>
            <Link href="/workscout/subscriptions" className="text-sm text-primary900 cursor-pointer hover:underline">
              Change subscription plan
            </Link>
          </div>

          <div className="flex justify-start gap-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-primary900 hover:bg-[#14012C]/90">Save</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

