"use client"

import { useState } from "react"
import ChatSidebar from "@/components/Chat/chat-sidebar"
import ChatInterface from "@/components/Chat/chat-interface"
import useMobile from "@/hooks/use-mobile"
import { Loader2 } from "lucide-react"
import ChildrenWrapper from "@/components/WorkScoutLayout/ChildrenWrapper"
import { createRoom } from "@/app/data-access/actions/messages.service"



// Mock existing conversations
const MOCK_CONVERSATIONS = [
    {
        id: "room1",
        user: { id: "admin1", name: "Alice Workscout" },
        lastMessage: {
            content: "Can you review the new candidate profiles?",
            timestamp: "2023-05-16T14:30:00Z",
            unread: true,
        },
    },
    {
        id: "room2",
        user: { id: "admin2", name: "Bob Recruiter" },
        lastMessage: {
            content: "The interview went well. Let's schedule a follow-up.",
            timestamp: "2023-05-15T09:45:00Z",
            unread: false,
        },
    },
    {
        id: "room3",
        user: { id: "admin3", name: "Charlie HR" },
        lastMessage: {
            content: "I've updated the job descriptions as requested.",
            timestamp: "2023-05-14T16:20:00Z",
            unread: false,
        },
    },
]

type User = {
    id: string
    profile: {
        name: string
       
    }
}

export default function ChatClient({ user, mock_conversations }: {
    user: {
        id: string;
        profile: {
            name: string;
        }
    } | {}; mock_conversations: {
        content: string;
        createdAt: string;
        id: string
        read: boolean
        receiver: {
            id: string;
            profile: {
                name: string;
                email: string;
            }
        }
        roomId: string;
        sender: {
            id: string;
            profile: {
                name: string;
                email: string;
            }
        }
    }[]
}) {



    const [conversations, setConversations] = useState(mock_conversations)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [currentRoom, setCurrentRoom] = useState(null)
    const [isCreatingRoom, setIsCreatingRoom] = useState(false)
    const [showSidebar, setShowSidebar] = useState(true)
    const isMobile = useMobile()

    // Handle selecting an existing conversation
    const handleSelectConversation = (conversation) => {
        setSelectedUser(conversation.sender)
        setCurrentRoom(conversation.roomId)
        if (isMobile) {
            setShowSidebar(false)
        }
    }

    // Handle creating a new conversation
    const handleUserSelect = async (user:{
        id: string;
        profile: {
            name: string;
        }
    }) => {
        if (!user) return

        // Check if conversation already exists
        const existingConversation = conversations.find((conv) => conv.sender.id === user.id)
        if (existingConversation) {
            handleSelectConversation(existingConversation)
            return
        }

        setSelectedUser(user)
        setIsCreatingRoom(true)

        try {
            // Create a new room when a user is selected
            const response = await createRoom()
            const newRoomId = response.data.roomId

           

            setCurrentRoom(newRoomId)

            if (isMobile) {
                setShowSidebar(false)
            }
        } catch (error) {
            console.error("Error creating room:", error)
        } finally {
            setIsCreatingRoom(false)
        }
    }

    const handleBackToSidebar = () => {
        setShowSidebar(true)
    }

    // Update last message when a new message is sent
    const handleMessageSent = (message) => {
        setConversations((prev) =>
            prev.map((conv) =>
                conv.id === currentRoom
                    ? {
                        ...conv,
                        lastMessage: {
                            content: message.content,
                            timestamp: message.timestamp,
                            unread: false,
                        },
                    }
                    : conv,
            ),
        )
    }

    return (
  
            <main className="flex max-h-[60vh] bg-gray-100">
                <div className="w-full h-screen max-w-7xl mx-auto flex bg-white shadow-lg">
                    {/* Sidebar - hidden on mobile when chat is open */}
                    {(!isMobile || showSidebar) && (
                        <div className="w-full md:w-1/3 border-r border-gray-200 h-full">
                            <ChatSidebar
                                currentUser={user}
                                conversations={conversations}
                                onSelectConversation={handleSelectConversation}
                                onSelectNewUser={handleUserSelect}
                                activeConversationId={currentRoom}
                            />
                        </div>
                    )}

                    {/* Chat area - full width on mobile, 2/3 on desktop */}
                    {(!isMobile || !showSidebar) && (
                        <div className="w-full md:w-2/3 h-full">
                            {isCreatingRoom ? (
                                <div className="flex items-center justify-center h-full">
                                    <Loader2 className="h-8 w-8 animate-spin text-green-500" />
                                    <p className="ml-2 text-gray-600">Creating chat room...</p>
                                </div>
                            ) : currentRoom && selectedUser ? (
                                <ChatInterface
                                    currentUser={user}
                                    selectedUser={selectedUser}
                                    roomId={currentRoom}
                                    onBack={isMobile ? handleBackToSidebar : null}
                                    onMessageSent={handleMessageSent}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full bg-gray-50">
                                    <div className="text-center p-6">
                                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Welcome to our chat portal</h2>
                                        <p className="text-gray-500">Select a conversation from the sidebar or start a new chat</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
    )
}
