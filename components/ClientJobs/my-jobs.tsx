"use client"

import { useState } from "react"
import { Calendar, MoreVertical, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data for jobs
const jobs = [
  {
    id: 1,
    name: "Product manager",
    company: "Jewel Joe",
    category: "Technology",
    appliedDate: "18/04/2023",
    status: "submitted",
  },
  {
    id: 2,
    name: "Product manager",
    company: "Jewel Joe",
    category: "Technology",
    appliedDate: "18/04/2023",
    status: "submitted",
  },
  {
    id: 3,
    name: "Product manager",
    company: "Jewel Joe",
    category: "Technology",
    appliedDate: "18/04/2023",
    status: "submitted",
  },
  {
    id: 4,
    name: "Product manager",
    company: "Jewel Joe",
    category: "Technology",
    appliedDate: "18/04/2023",
    status: "rejected",
  },
  {
    id: 5,
    name: "Product manager",
    company: "Jewel Joe",
    category: "Technology",
    appliedDate: "18/04/2023",
    status: "in progress",
  },
  {
    id: 6,
    name: "Product manager",
    company: "Jewel Joe",
    category: "Technology",
    appliedDate: "18/04/2023",
    status: "rejected",
  },
  {
    id: 7,
    name: "Product manager",
    company: "Jewel Joe",
    category: "Technology",
    appliedDate: "18/04/2023",
    status: "in progress",
  },
]

export default function MyJobs() {
  const [selectedJobs, setSelectedJobs] = useState<number[]>([])
  const [dateRange, setDateRange] = useState("6 Jan 2023 - 13 Jan 2023")
  const [activeActionRow, setActiveActionRow] = useState<number | null>(null)

  // Handle checkbox selection
  const handleSelectAll = () => {
    if (selectedJobs.length === jobs.length) {
      setSelectedJobs([])
    } else {
      setSelectedJobs(jobs.map((job) => job.id))
    }
  }

  const handleSelectJob = (jobId: number) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter((id) => id !== jobId))
    } else {
      setSelectedJobs([...selectedJobs, jobId])
    }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      case "in progress":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">My Jobs</h1>

      <Card className="overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search Anything..." className="pl-9 w-full" />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <span className="text-sm">{dateRange}</span>
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-4">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs">Start Date</label>
                      <Input type="date" className="h-8" defaultValue="2023-01-06" />
                    </div>
                    <div>
                      <label className="text-xs">End Date</label>
                      <Input type="date" className="h-8" defaultValue="2023-01-13" />
                    </div>
                  </div>
                  <Button size="sm" className="w-full">
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedJobs.length === jobs.length && jobs.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Job Name</TableHead>
                <TableHead>Work Scout</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Applied date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id} className="relative">
                  <TableCell>
                    <Checkbox checked={selectedJobs.includes(job.id)} onCheckedChange={() => handleSelectJob(job.id)} />
                  </TableCell>
                  <TableCell>{job.name}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.category}</TableCell>
                  <TableCell>{job.appliedDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(job.status)} mr-2`}></span>
                      {job.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Bookmark</DropdownMenuItem>
                        <DropdownMenuItem>Version History</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Expanded action menu for the third row as shown in the screenshot */}
                    {job.id === 3 && (
                      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-white border rounded-md shadow-md p-2 z-10">
                        <div className="py-1 px-3 hover:bg-gray-100 cursor-pointer">Bookmark</div>
                        <div className="py-1 px-3 hover:bg-gray-100 cursor-pointer">Version History</div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {jobs.map((job) => (
            <div key={job.id} className="border-b p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <Checkbox
                    checked={selectedJobs.includes(job.id)}
                    onCheckedChange={() => handleSelectJob(job.id)}
                    className="mr-3"
                  />
                  <div>
                    <h3 className="font-medium">{job.name}</h3>
                    <p className="text-sm text-gray-500">{job.company}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="-mt-1">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Bookmark</DropdownMenuItem>
                    <DropdownMenuItem>Version History</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Category:</span> {job.category}
                </div>
                <div>
                  <span className="text-gray-500">Applied:</span> {job.appliedDate}
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Status:</span>
                  <span className="flex items-center">
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(job.status)} mx-2`}></span>
                    {job.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 text-sm text-gray-500">Showing 1 - 50 of 1000 entries</div>
      </Card>
    </div>
  )
}

