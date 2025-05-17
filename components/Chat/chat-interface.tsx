"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, Loader2 } from "lucide-react"
import MessageBubble from "@/components/Chat/message-bubble"

export default function ChatInterface({ currentUser, selectedUser, roomId, onBack, onMessageSent }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef(null)

  // Fetch messages when room changes or periodically
  useEffect(() => {
    if (!roomId) return

    const fetchMessages = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:8000/api/v1/messages/${roomId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch messages")
        }
        const data = await response.json()
        setMessages(data)
      } catch (error) {
        console.error("Error fetching messages:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Initial fetch
    fetchMessages()

    // Set up polling for new messages (simulating WebSocket)
    const intervalId = setInterval(fetchMessages, 3000)

    return () => clearInterval(intervalId)
  }, [roomId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!newMessage.trim() || !roomId) return

    setIsSending(true)

    // Optimistically add message to UI
    const tempMessage = {
      id: `temp-${Date.now()}`,
      content: newMessage,
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      timestamp: new Date().toISOString(),
      pending: true,
    }

    setMessages((prev) => [...prev, tempMessage])
    setNewMessage("")

    try {
      const response = await fetch("http://localhost:8000/api/v1/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId,
          content: tempMessage.content,
          senderId: currentUser.id,
          receiverId: selectedUser.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      // Replace optimistic message with real one from server
      const data = await response.json()
      const sentMessage = { ...data, pending: false }

      setMessages((prev) => prev.map((msg) => (msg.id === tempMessage.id ? sentMessage : msg)))

      // Update the conversation list with the new message
      if (onMessageSent) {
        onMessageSent(sentMessage)
      }
    } catch (error) {
      console.error("Error sending message:", error)
      // Mark message as failed
      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempMessage.id ? { ...msg, failed: true, pending: false } : msg)),
      )
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="bg-gray-100 p-3 flex items-center border-b">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="text-gray-600 hover:bg-gray-200 mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center mr-3 flex-shrink-0">
          <span className="text-gray-600 font-medium">{selectedUser.name.charAt(0).toUpperCase()}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{selectedUser.name}</h3>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#e5ded8]">
        {isLoading && messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-6 w-6 animate-spin text-green-500" />
            <p className="ml-2 text-gray-600">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} isCurrentUser={message.senderId === currentUser.id} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-3 bg-white border-t flex items-center">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 mr-2"
          disabled={isSending}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!newMessage.trim() || isSending}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  )
}
