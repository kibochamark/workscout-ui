"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { motion } from "framer-motion";

export function ContactForm() {
  return (
    <div className="pb-10">
      <div className="grid lg:grid-cols-2 gap-12 px-6 py-12 max-w-7xl mx-auto">
        {/* Left Section (Text & Contact Info) */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <motion.h1
              className="text-displayMedium font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Relax and Get in Touch
            </motion.h1>

            <motion.p
              className="text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Have questions or need support? We&apos;re here to help! Whether you&apos;re seeking guidance, updates, or
              more information about our services, our team is just a message away. Let&apos;s connect and simplify your
              job search journey together.
            </motion.p>
          </div>

          <motion.div
            className="pb-6 space-y-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Image
              src="/contact.jpg"
              alt="WorkScout Office"
              width={500}
              height={500}
              className="rounded-lg mb-4 w-full"
            />
            <div className="space-y-2">
              <h2 className="font-semibold text-lg">WorkScout Office</h2>
              <a href="mailto:info@workscoutuk.co.uk" className="text-primary900 hover:underline block">
                info@workscoutuk.co.uk
              </a>
              <p className="text-muted-foreground"></p>
              <address className="not-italic text-muted-foreground">
                124 Clarence road
                <br />
                Manchester,
                <br />
                U.K. M13 0ZJ
              </address>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Section (Form) */}
        <motion.form
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="space-y-6">
            {[
              { id: "fullName", label: "Full Name", placeholder: "Olivia Alexa" },
              { id: "email", label: "Email", type: "email", placeholder: "olivia@gmail.com" },
              { id: "phone", label: "Phone Number", type: "tel", placeholder: "+447 7865434" },
              { id: "jobTitle", label: "Job Title", placeholder: "Tech" },
              { id: "region", label: "Market Region", placeholder: "UK" }
            ].map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.8 }}
              >
                <label htmlFor={field.id} className="block text-sm mb-4">
                  {field.label}
                </label>
                <Input id={field.id} type={field.type || "text"} placeholder={field.placeholder} />
              </motion.div>
            ))}

            {/* Comment Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <label htmlFor="comment" className="block text-sm mb-4">
                Comment
              </label>
              <Textarea id="comment" placeholder="Comment" className="min-h-[120px]" />
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <Button className="w-full bg-primary900 hover:bg-black/90">Submit</Button>

          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}
