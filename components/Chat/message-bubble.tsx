import { formatDistanceToNow } from "date-fns"

export default function MessageBubble({ message, isCurrentUser }) {
  // Format timestamp to relative time (e.g., "5 minutes ago")
  const formattedTime = message.timestamp
    ? formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })
    : "just now"

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`
          max-w-[70%] px-3 py-2 rounded-lg 
          ${isCurrentUser ? "bg-green-100 text-gray-800 rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none"}
          ${message.pending ? "opacity-70" : ""}
          ${message.failed ? "border border-red-300 bg-red-50" : ""}
        `}
      >
        <p className="break-words">{message.content}</p>
        <div className="flex justify-end items-center mt-1">
          <span className="text-xs text-gray-500">{formattedTime}</span>
          {message.pending && <span className="ml-1 text-xs text-gray-400">Sending...</span>}
          {message.failed && <span className="ml-1 text-xs text-red-500">Failed to send</span>}
        </div>
      </div>
    </div>
  )
}
