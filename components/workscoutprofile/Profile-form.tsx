"use client"

import { useEffect, useState } from "react"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

import axios from "axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { baseUrl } from "@/app/utils/constants"

interface ProfileData {
  name: string
  email: string
  gender: string
  location: string
  salary: string
  jobtitle: string
  bio: string
  document: {
    name: string
  }
  account: {
    subscription: {
      plan: string
    }
  }
}

export default function ProfileForm({customerid}:{customerid:string}) {
  const { user } = useKindeBrowserClient()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return
      try {
        const response = await axios.get(`${baseUrl}profile/${user.id}`)
        setProfile(response.data)
      } catch (err) {
        console.error("Failed to fetch profile", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user?.id])

  if (loading) {
    return <div className="p-6">Loading profile...</div>
  }

  if (!profile) {
    return <div className="p-6 text-red-500">Failed to load profile.</div>
  }


  function CustomerPortal() {
    const handleClick = async () => {
      const res = await fetch("/api/stripe/customer-portal?redirect=https://workscout-ui.vercel.app/workscout/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({
          customerid:customerid
        })
      });



      const data = await res.json();
      console.log(data, "data")
      if (data.url) {
        window.location.href = data.url;
      }
    };

    handleClick()
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Card className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image src="/profile.png" alt="Profile picture" width={40} height={40} className="rounded-full" />
            </div>
            <div>
              <h2 className="font-medium">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
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
              <Input id="fullName" defaultValue={profile.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={profile.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" defaultValue={profile.gender} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue={profile.location} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <Input id="salary" defaultValue={profile.salary} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobtitle">Job Title</Label>
              <Input id="jobtitle" defaultValue={profile.jobtitle} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-[#14012C]/10 text-[#14012C] hover:bg-[#14012C]/20">
                {profile.account.subscription.plan} Plan
              </Badge>
              <span className="text-sm text-muted-foreground">Subscription Active</span>
            </div>
            <button onClick={CustomerPortal} type="button" className="text-sm text-primary900 cursor-pointer hover:underline">
              Change subscription plan
            </button>
          </div>

          <div className="flex justify-start gap-4">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit" className="bg-primary900 hover:bg-[#14012C]/90">Save</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
