"use client";

import { useEffect, useState, useRef } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import socket from "@/lib/socket";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import axios from "axios";
import { baseUrl } from "@/app/utils/constants";

interface ChatMessage {
  senderId: string;
  content: string;
  createdAt: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string; createdAt?: string }[]>([]);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const pathname = usePathname();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useKindeBrowserClient();

  const otherUserId = "kp_62bf3eeeb84a4802b12b67aa73a601d9";

  // hooks must not be conditionally called
  useEffect(() => {
    if (!user?.id) return;

    const fetchOrCreateRoom = async () => {
      try {
        const res = await axios.post(`${baseUrl}create-room`, {
          participantAId: user.id,
          participantBId: otherUserId,
        });

        const data = res.data;
        setRoomId(data.roomId);
        socket.emit("joinRoom", data.roomId);
        socket.emit("join", user.id);
      } catch (error) {
        console.error("Room creation error:", error);
      }
    };

    fetchOrCreateRoom();

    socket.on("chatHistory", (history: ChatMessage[]) => {
      console.log("Loaded chat history:", history);
      setMessages(
        history.map((msg) => ({
          sender: msg.senderId === user.id ? "user" : "server",
          text: msg.content,
          createdAt: msg.createdAt,
        }))
      );
    });

    socket.on("receiveMessage", (data: ChatMessage) => {
      console.log("Received message:", data);
      setMessages((prev) => [
        ...prev,
        {
          sender: data.senderId === user.id ? "user" : "server",
          text: data.content,
          createdAt: data.createdAt,
        },
      ]);
    });

    socket.on("userTyping", (senderId: string) => {
      if (senderId !== user?.id) {
        setTypingUser(senderId);
        setTimeout(() => setTypingUser(null), 2000);
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userTyping");
      socket.off("chatHistory");
    };
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (!message.trim() || !roomId) return;

    const newMessage = { sender: "user", text: message };
    setMessages((prev) => [...prev, newMessage]);

    socket.emit("sendMessage", {
      content: message,
      roomId,
      senderId: user?.id,
    });

    setMessage("");
  };

  const handleTyping = () => {
    if (roomId && user?.id) {
      socket.emit("typing", { roomId, senderId: user.id });
    }
  };

  const chatVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const closeIconVariants = {
    hidden: { opacity: 0, rotate: 90, scale: 0 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  };

  // NOW safe to return conditionally (after hooks)
  if (pathname.includes("/workscout/onboarding")) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mb-4 w-[380px] rounded-lg bg-white p-0 shadow-lg overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={chatVariants}
          >
            <div className="border-b p-4 flex items-center gap-3">
              <div className="relative">
                <Image src="/chat.jpg" alt="WorkScout UK" width={40} height={40} className="w-10 h-10 rounded-full" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">WorkScout UK</h3>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>

            <div className="h-[300px] overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 ${msg.sender === "user" ? "justify-start" : "justify-end self-end"}`}
                >
                  {msg.sender === "user" && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarImage src={user?.picture || "https://github.com/shadcn.png"} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col gap-1 max-w-[80%]">
                    <div className={`${msg.sender === "user" ? "bg-gray-800 text-white rounded-tl-none" : "bg-gray-100 rounded-tr-none text-black"} p-3 rounded-lg`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                  {msg.sender === "server" && (
                    <Image src="/chat.jpg" alt="WorkScout" width={32} height={32} className="w-8 h-8 rounded-full mt-1" />
                  )}
                </div>
              ))}
              {typingUser && (
                <p className="text-xs text-gray-400 italic mt-1">{typingUser} is typing...</p>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-3 flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                  else handleTyping();
                }}
                placeholder="Type your message..."
                className="flex-1 py-2 px-3 text-sm bg-white rounded-full focus:outline-none"
              />
              <button className="text-gray-400 hover:text-gray-600" onClick={sendMessage}>
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="relative">
        <Button
          onClick={toggleChat}
          className="h-10 w-10 rounded-full shadow-lg relative bg-primary900 animate-pulse hover:bg-primary900 p-0"
        >
          <div className="relative h-8 w-8">
            <motion.div className="absolute inset-0">
              {!isOpen ? (
                <motion.div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image src="/chat.jpg" alt="Chat" width={32} height={32} className="w-full h-full object-cover" />
                </motion.div>
              ) : (
                <motion.div
                  initial={isOpen ? "hidden" : "visible"}
                  animate={isOpen ? "visible" : "hidden"}
                  variants={closeIconVariants}
                  className="w-8 h-8 flex justify-center items-center"
                >
                  <X className="text-white" />
                </motion.div>
              )}
            </motion.div>
          </div>
        </Button>
      </motion.div>
    </>
  );
}
