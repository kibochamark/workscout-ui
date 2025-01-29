"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export function ContactForm() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 px-6 py-12 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-displayMedium  font-bold mb-6">Relax and Get in Touch</h1>
          <p className="text-muted-foreground mb-4">
            Have questions or need support? We&apos;re here to help! Whether you&apos;re seeking guidance, updates, or
            more information about our services, our team is just a message away. Let&apos;s connect and simplify your
            job search journey together.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg py-6 space-y-4">
          <Image
            src="/contact.jpg"
            alt="WorkScout Office"
            width={500}
            height={500}
            className="rounded-lg mb-4 w-full"
          />
          <div className="space-y-2">
            <h2 className="font-semibold text-lg">WorkScout Office</h2>
            <a href="mailto:info@workscoutuk.co.uk" className="text-blue-600 hover:underline block">
              info@workscoutuk.co.uk
            </a>
            <p className="text-muted-foreground">0161 706 0549</p>
            <address className="not-italic text-muted-foreground">
              124 Clarence road
              <br />
              Manchester,
              <br />
              U.K. M13 0ZJ
            </address>
          </div>
        </div>
      </div>

      <form className="space-y-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm mb-4">
              Full Name
            </label>
            <Input id="fullName" placeholder="olivia Alexa" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-4">
              Email
            </label>
            <Input id="email" type="email" placeholder="olivia@gmail.com" />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm mb-4">
              Phone Number
            </label>
            <Input id="phone" type="tel" placeholder="+447 7865434" />
          </div>

          <div>
            <label htmlFor="jobTitle" className="block text-sm mb-4">
              Job Title
            </label>
            <Input id="jobTitle" placeholder="Tech" />
          </div>

          <div>
            <label htmlFor="region" className="block text-sm mb-4">
              Market Region
            </label>
            <Input id="region" placeholder="UK" />
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm mb-4">
              Comment
            </label>
            <Textarea id="comment" placeholder="Comment" className="min-h-[120px]" />
          </div>
        </div>

        <Button className="w-full bg-black hover:bg-black/90">Submit</Button>
      </form>
    </div>
  )
}

