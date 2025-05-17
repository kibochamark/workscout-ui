"use client"

import { formatDistanceToNow } from "date-fns"

export default function ConversationList({ conversations, onSelectConversation, activeConversationId }:{
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
  activeConversationId: string | null
}) {
  if (conversations.length === 0) {
    return <div className="flex items-center justify-center h-32 text-gray-500">No conversations found</div>
  }

  return (
    <div>
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onSelectConversation(conversation)}
          className={`
            flex items-center p-3 border-b cursor-pointer hover:bg-gray-50
            ${activeConversationId === conversation.id ? "bg-gray-100" : ""}
          `}
        >
          <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-gray-600 font-medium">{conversation.sender.profile.name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <h3 className="font-medium text-gray-900 truncate">{conversation.sender.profile.name}</h3>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(conversation.createdAt), { addSuffix: true })}
              </span>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-gray-500 truncate">{conversation.content}</p>
              {conversation.read && (
                <span className="ml-2 bg-green-500 rounded-full h-2 w-2 flex-shrink-0"></span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
