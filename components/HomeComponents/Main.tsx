"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Main() {
    return (
        <div className="grid lg:grid-cols-4 relative gap-12  pt-20 lg:px-0 h-screen">
            {/* Text Section */}
            <motion.div
                className="space-y-6 mt-10 px-2  md:p-10 md:mt-[150]   col-span-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="space-y-8 lg:space-y-0">
                    {/* Title */}
                    <motion.h1
                        className="text-displayMedium   text-balance font-bold mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Welcome to WorkScout UK, Your Trusted Job Search Partner
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="text-muted-foreground text-labelLarge leading-10 mb-4 tracking-wide text-balance"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Workscout UK simplifies job hunting by handling searches, applications, and updates for you.
                        We save you time and reduce stress so that you can focus on your goals while we turn opportunities into success.
                    </motion.p>

                    {/* Button */}
                    <motion.div
                        className="my-8 w-1/2 lg:w-full right-0  "
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <Link href="/contact-us">
                            <Button className="w-32  mt-6 text-balance bg-primary900 text-center">
                                Contact Us
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
            

            {/* Image Section */}
            <motion.div
                className="col-span-2 relative  overflow-hidden h-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            >
                <Image
                    alt="main-image"
                    fill
                    src={"/main.jpg"}
                    className="w-full rounded-none absolute hidden lg:block -z-10 inset-y-0 object-cover h-full"
                />
            </motion.div>
        </div>
    );
}
