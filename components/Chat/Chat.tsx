"use client"

import { useState } from "react"
import {  X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }

    // Chat box animation variants
    const chatVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 20,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },
    }

    // Icon animation variants
    const messageIconVariants = {
        hidden: { opacity: 0, rotate: 90, scale: 0 },
        visible: { opacity: 1, rotate: 0, scale: 1 },
    }

    const closeIconVariants = {
        hidden: { opacity: 0, rotate: 90, scale: 0 },
        visible: { opacity: 1, rotate: 0, scale: 1 },
    }

    return (
        <>
            {/* Chat Box */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mb-4 w-[380px] rounded-lg bg-[#fff] p-0 shadow-lg overflow-hidden"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={chatVariants}
                    >
                        {/* Header */}
                        <div className="border-b p-4 flex items-center gap-3">
                            <div className="relative">
                                <img
                                    src="https://github.com/shadcn.png?height=40&width=40"
                                    alt="Anil"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Anil</h3>
                                <p className="text-xs text-green-500">Online</p>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="h-[300px] overflow-y-auto p-4 flex flex-col gap-4">
                            {/* Received Message */}
                            <div className="flex items-start gap-2">
                                <img src="https://github.com/shadcn.png?height=32&width=32" alt="Anil" className="w-8 h-8 rounded-full mt-1" />
                                <div className="flex flex-col gap-1 max-w-[80%]">
                                    <div className="bg-gray-800 text-white p-3 rounded-lg rounded-tl-none">
                                        <p className="text-sm">👋 Hey, have you ever used design thinking in any of your projects?</p>
                                    </div>
                                </div>
                            </div>

                            {/* Sent Message */}
                            <div className="flex items-start gap-2 self-end">
                                <div className="flex flex-col gap-1 max-w-[80%]">
                                    <div className="bg-gray-100 p-3 rounded-lg rounded-tr-none">
                                        <p className="text-sm">
                                            Yeah, I've used it a lot! It's such a great framework for solving complex problems creatively.
                                            What about you?
                                        </p>
                                    </div>
                                </div>
                                <img src="https://github.com/shadcn.png?height=32&width=32" alt="You" className="w-8 h-8 rounded-full mt-1" />
                            </div>

                            {/* Received Message */}
                            <div className="flex items-start gap-2">
                                <img src="https://github.com/shadcn.png?height=32&width=32" alt="Anil" className="w-8 h-8 rounded-full mt-1" />
                                <div className="flex flex-col gap-1 max-w-[80%]">
                                    <div className="bg-gray-800 text-white p-3 rounded-lg rounded-tl-none">
                                        <p className="text-sm">
                                            Same here! I love how it puts the user at the center of everything. Do you follow all the steps?
                                            You know, empathize, define, ideate, prototype, and test?
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="border-t p-3 flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Type your message here..."
                                className="flex-1 py-2 px-3 text-sm bg-white rounded-full focus:outline-none"
                            />
                            <button className="text-gray-400 hover:text-gray-600">
                                <Send    size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="relative">
                <Button
                    onClick={toggleChat}
                    className="h-10 w-10 rounded-full shadow-lg relative bg-primary900 hover:bg-primary900  p-0"
                >
                    <div className="relative h-6 w-6">
                        <motion.div
                            // initial={isOpen ? "visible" : "hidden"}
                            // animate={isOpen ? "hidden" : "visible"}
                            // variants={messageIconVariants}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            {/* User Avatar on Button when closed */}
                            {!isOpen ? (
                                <motion.div
                                    className="w-6 h-6 rounded-full border-2 animate-pulse   border-white overflow-hidden"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <img src="/profile.PNG?height=24&width=24" alt="User" className="w-full h-full object-cover" />
                                </motion.div>
                            ) : (

                                <motion.div
                                    initial={isOpen ? "hidden" : "visible"}
                                    animate={isOpen ? "visible" : "hidden"}
                                    variants={closeIconVariants}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className=""
                                >
                                    <X size={24} className="text-white" />
                                </motion.div>
                            )}
                        </motion.div>

                    </div>
                </Button>


            </motion.div>
        </>
    )
}

