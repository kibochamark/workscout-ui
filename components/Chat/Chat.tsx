"use client"
import { useState } from "react"
import { X, Send } from "lucide-react"
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
                                    src="/chat.jpg?height=40&width=40"
                                    alt="WorkScout UK"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">WorkScout UK</h3>
                                <p className="text-xs text-green-500">Online</p>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="h-[300px] overflow-y-auto p-4 flex flex-col gap-4">
                            {/* Client Message */}
                            <div className="flex items-start gap-2">
                                <img src="https://github.com/shadcn.png?height=32&width=32" alt="Client" className="w-8 h-8 rounded-full mt-1" />
                                <div className="flex flex-col gap-1 max-w-[80%]">
                                    <div className="bg-gray-800 text-white p-3 rounded-lg rounded-tl-none">
                                        <p className="text-sm">Hello! I came across WorkScout UK and wanted to know more about how your job application service works.</p>
                                    </div>
                                </div>
                            </div>

                            {/* WorkScout UK Response */}
                            <div className="flex items-start gap-2 self-end">
                                <div className="flex flex-col gap-1 max-w-[80%]">
                                    <div className="bg-gray-100 p-3 rounded-lg rounded-tr-none">
                                        <p className="text-sm">Hi there! We apply for jobs on your behalf based on your qualifications and preferences. We also offer CV and LinkedIn profile optimization to increase your chances of landing a job.</p>
                                    </div>
                                </div>
                                <img src="/chat.jpg?height=32&width=32" alt="WorkScout UK" className="w-8 h-8 rounded-full mt-1" />
                            </div>

                            {/* Client Message */}
                            <div className="flex items-start gap-2">
                                <img src="https://github.com/shadcn.png?height=32&width=32" alt="Client" className="w-8 h-8 rounded-full mt-1" />
                                <div className="flex flex-col gap-1 max-w-[80%]">
                                    <div className="bg-gray-800 text-white p-3 rounded-lg rounded-tl-none">
                                        <p className="text-sm">That sounds great! What are your subscription options, and how do they differ?</p>
                                    </div>
                                </div>
                            </div>

                            {/* WorkScout UK Response */}
                            <div className="flex items-start gap-2 self-end">
                                <div className="flex flex-col gap-1 max-w-[80%]">
                                    <div className="bg-gray-100 p-3 rounded-lg rounded-tr-none">
                                        <p className="text-sm">We have different subscription tiers, from Basic to Premium. The Basic plan includes a set number of job applications per month, while the Premium plan offers unlimited applications along with resume and LinkedIn optimization. Would you like a detailed breakdown?</p>
                                    </div>
                                </div>
                                <img src="/chat.jpg?height=32&width=32" alt="WorkScout UK" className="w-8 h-8 rounded-full mt-1" />
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
                                <Send size={20} />
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
                    <div className="relative h-10 w-10">
                        <motion.div
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            {!isOpen ? (
                                <motion.div
                                    className="w-10 h-10 rounded-full border-2 animate-pulse border-white overflow-hidden"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <img src="/chat.jpg" alt="User" className="w-full h-full object-cover" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={isOpen ? "hidden" : "visible"}
                                    animate={isOpen ? "visible" : "hidden"}
                                    variants={closeIconVariants}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
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
