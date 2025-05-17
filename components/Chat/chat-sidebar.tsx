"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, User } from "lucide-react"
import UserSearch from "@/components/Chat/user-search"
import ConversationList from "@/components/Chat/conversation-list"

export default function ChatSidebar({
  currentUser,
  conversations,
  onSelectConversation,
  onSelectNewUser,
  activeConversationId,
}:{
  currentUser: {
    id: string;
    profile: {
      name: string;
    }
  } | {};
  conversations: {
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
  onSelectConversation: (conversationId: string) => void
  onSelectNewUser: (userId: string) => Promise<void>
  activeConversationId: string | null
}) {

  


  const [showUserSearch, setShowUserSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conv) =>
    conv.sender.profile.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gray-100 p-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-green-100 p-2 rounded-full mr-2">
            <User className="h-5 w-5 text-green-600" />
          </div>
          <span className="font-medium">{currentUser?.profile?.name}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowUserSearch(!showUserSearch)}
          className="text-gray-600 hover:bg-gray-200"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Search or New Chat UI */}
      {showUserSearch ? (
        <div className="p-3 border-b">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">New Chat</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowUserSearch(false)} className="text-xs">
              Cancel
            </Button>
          </div>
          <UserSearch
            onSelectUser={(user) => {
              onSelectNewUser(user)
              setShowUserSearch(false)
            }}
            currentUserId={currentUser.id}
          />
        </div>
      ) : (
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search or start new chat"
              className="pl-9 bg-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <ConversationList
          conversations={filteredConversations}
          onSelectConversation={onSelectConversation}
          activeConversationId={activeConversationId}
        />
      </div>
    </div>
  )
}
