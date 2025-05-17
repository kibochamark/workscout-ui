"use client"

import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

// Mock user data
const MOCK_USERS = [
  { id: "admin1", name: "Alice Workscout" },
  { id: "admin2", name: "Bob Recruiter" },
  { id: "admin3", name: "Charlie HR" },
  { id: "admin4", name: "David Manager" },
  { id: "admin5", name: "Eva Director" },
]

export default function UserSearch({ onSelectUser, currentUserId }) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter out current user and filter by search query
  const filteredUsers = MOCK_USERS.filter((user) => user.id !== currentUserId).filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="w-full">
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search users..." value={searchQuery} onValueChange={setSearchQuery} />
        <CommandList>
          <CommandEmpty>No users found.</CommandEmpty>
          <CommandGroup heading="Available Users">
            {filteredUsers.map((user) => (
              <CommandItem
                key={user.id}
                onSelect={() => onSelectUser(user)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-gray-600 font-medium">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <span>{user.name}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
