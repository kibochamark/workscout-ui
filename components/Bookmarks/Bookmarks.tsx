"use client"

import { useState } from "react"
import { Grid2X2, List, Search, SlidersHorizontal } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample bookmark data
const bookmarks = [
  {
    id: 1,
    company: "Savanna",
    title: "Product manager",
    description:
      "Defining the overall strategy and vision for the product. This involves understanding the market, identifying customer needs...",
    status: "submitted",
    image: "/savana.png?height=400&width=600&text=Job+1",
  },
  {
    id: 2,
    company: "Savanna",
    title: "Product manager",
    description:
      "Defining the overall strategy and vision for the product. This involves understanding the market, identifying customer needs...",
    status: "shortlisted",
    image: "/sava2.png?height=400&width=600&text=Job+2",
  },
  {
    id: 3,
    company: "Savanna",
    title: "Product manager",
    description:
      "Defining the overall strategy and vision for the product. This involves understanding the market, identifying customer needs...",
    status: "shortlisted",
    image: "/sava3.png?height=400&width=600&text=Job+3",
  },
  {
    id: 4,
    company: "Savanna",
    title: "Product manager",
    description:
      "Defining the overall strategy and vision for the product. This involves understanding the market, identifying customer needs...",
    status: "submitted",
    image: "/sava5.png?height=400&width=600&text=Job+4",
  },
  {
    id: 5,
    company: "Savanna",
    title: "Product manager",
    description:
      "Defining the overall strategy and vision for the product. This involves understanding the market, identifying customer needs...",
    status: "submitted",
    image: "/sava4.png?height=400&width=600&text=Job+5",
  },
  {
    id: 6,
    company: "Savanna",
    title: "Product manager",
    description:
      "Defining the overall strategy and vision for the product. This involves understanding the market, identifying customer needs...",
    status: "shortlisted",
    image: "/sava6.png?height=400&width=600&text=Job+6",
  },
]

export default function Bookmarks() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recent")
  const [, setFilterStatus] = useState("all")

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-500"
      case "shortlisted":
        return "bg-indigo-900"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Bookmarks</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-gray-100" : ""}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-gray-100" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search bookmarks..." className="pl-9 w-full" />
          </div>

          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="company">Company Name</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("submitted")}>Submitted Only</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("shortlisted")}>Shortlisted Only</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div
          className={`grid gap-4 ${
            viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
          }`}
        >
          {bookmarks.map((bookmark) => (
            <Card
              key={bookmark.id}
              className={`overflow-hidden transition-shadow hover:shadow-md ${viewMode === "list" ? "flex" : ""}`}
            >
              <div className={`relative ${viewMode === "list" ? "w-48 shrink-0" : "aspect-[4/3]"}`}>
                <Image
                  src={bookmark.image || "/savana.PNG"}
                  alt={`${bookmark.company} - ${bookmark.title}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-blue-600">{bookmark.company}</p>
                    <h3 className="font-medium mt-1">{bookmark.title}</h3>
                  </div>
                  <div className="flex items-center whitespace-nowrap">
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(bookmark.status)} mr-2`}></span>
                    <span className="text-sm">{bookmark.status}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{bookmark.description}</p>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" className="w-full">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

