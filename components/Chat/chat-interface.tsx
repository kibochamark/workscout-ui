"use client"

import { useState, useEffect, useRef, useOptimistic } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, Loader2 } from "lucide-react"
import MessageBubble from "@/components/Chat/message-bubble"
import { get } from "http"
import { createMessage, getMessages } from "@/app/data-access/actions/messages.service"
import { useMutation } from "@tanstack/react-query"

type User = {
  id: string
  profile: {
    name: string
  }
}

export default function ChatInterface({ currentUser, selectedUser, roomId, onBack, onMessageSent }: {
  currentUser: User
  selectedUser: User
  roomId: string | null
  onBack?: () => void
  onMessageSent?: (message: any) => void
  onSelectNewUser?: (userId: string) => void,
}) {
  type Message = {
    id?: string
    content: string
    senderId: string
    receiverId: string
    roomId: string
    sender?: {
      id: string
      profile: {
        name: string
      }
    }
    receiver?: {
      id: string
      profile: {
        name: string
      }
    }
    createdAt?: string
    pending?: boolean
    failed?: boolean
  }

  const [messages, setMessages] = useState<Message[]>([])
  const [optimisticmessages, addOptimisticMesssages] = useOptimistic(
    messages,
    (state, newMessage) => [

      ...state,
    ]
  )
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Fetch messages when room changes or periodically
  useEffect(() => {
    if (!roomId) return

    const fetchMessages = async () => {
      setIsLoading(true)
      // console.log("Fetching messages for room:", roomId)
      try {
        const response = await getMessages(roomId)
        console.log("Fetched messages:", response)
        setMessages(response.data)
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

  const handleSendMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!newMessage.trim() || !roomId) return

    setIsSending(true)

    // Optimistically add message to UI
    const tempMessage = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      roomId: roomId
    }

    setMessages((prev) => [...prev, tempMessage])
    setNewMessage("")

    try {
      
      handleSendMessageMutation.mutate({...tempMessage})
      
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


  const handleSendMessageMutation = useMutation({
    mutationFn: async (message:{
      roomId: string
      content: string
      senderId: string
      receiverId: string
    }) => {
      const res= await createMessage(message)
      return res
    },
    onSuccess: (data) => {
      console.log("Message sent successfully:", data)
   
      setMessages((prev) => [...prev, data.data])
         const sentMessage = { ...data, pending: false }
      setNewMessage("")
      if (onMessageSent) {
        onMessageSent(sentMessage)
      }
    },
    onError: (error) => {
      console.error("Error sending message:", error)
      
    }
  })

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
          <span className="text-gray-600 font-medium">{selectedUser.profile.name.charAt(0).toUpperCase()}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{selectedUser.profile.name}</h3>
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
            {messages
              .filter((message) => message.id) // Only render messages with a defined id
              .map((message, idx) => (
                <MessageBubble
                  key={message.id ?? `temp-${idx}`}
                  message={message}
                  isCurrentUser={message.senderId === currentUser.id || message.sender?.id === currentUser.id}
                />
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
