"use client"
import { Calendar, MoreVertical, Search, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "../globalcomponents/DataTable"
import { columns, useBookmarkMutation, type Job } from "./columns"

import { useDebounce } from 'use-debounce'
import { useState, useMemo } from 'react'
// ... other imports

export default function MyJobs({ jobs }: { jobs: Job[] }) {
  const [dateRange] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)

  const itemsPerPage = 5

  // Filter jobs based on the debounced search term
  const filteredJobs = useMemo(() => {
    return jobs?.filter((job) =>
      job.jobName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      job.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      job.status.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ) ?? []
  }, [jobs, debouncedSearchTerm, dateRange])

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentJobs = filteredJobs.slice(startIndex, endIndex)

  // Handle pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
        return "bg-blue-500 text-white"
      case "rejected":
        return "bg-red-500 text-white"
      case "in progress":
        return "bg-amber-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const [jobId, setJobId] = useState("")
  const [bookmarked, setBookmarked] = useState(false)

  const { mutate } = useBookmarkMutation(jobId, !bookmarked);

  return (
    <div className="p-2 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">My Jobs</h1>

      <Card className="overflow-hidden border-none p-4 shadow-none">
        <div className="p-0 flex flex-col md:flex-row justify-between gap-4">
          {/* Search Input (Mobile View) */}
          <div className="relative w-full md:w-auto md:min-w-[300px] md:hidden">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search Anything..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto p-4">
          <DataTable
            columns={columns}
            data={currentJobs}
            filters={
              <>
                {/* Date Filter */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full md:w-auto">
                      <span className="text-sm text-muted-foreground">{dateRange.length > 0 ? dateRange : "filter by date applied"}</span>
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
                        <Button size="sm" className="w-full">Apply</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            }
          />
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 p-4">
          {currentJobs.map((job) => {

            return (<Card key={job.id} className="p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-base">{job.jobName}</h3>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="-mt-1">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                      setBookmarked(job.bookmarked)
                      setJobId(job.id)
                      return mutate()
                    }}>Bookmark</DropdownMenuItem>
                    {/* <DropdownMenuItem>Version History</DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
                <div>
                  <span className="text-gray-500">Category:</span> {job.category}
                </div>
                <div>
                  <span className="text-gray-500">Applied:</span> {new Date(job.appliedDate).toLocaleDateString()}
                </div>
                <div className="col-span-2 mt-2">
                  <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                </div>
              </div>
            </Card>
            )

          })}
        </div>

        {/* Pagination (Mobile View) */}
        <div className="p-4 border-t md:hidden flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {startIndex + 1} - {Math.min(endIndex, filteredJobs.length)} of {filteredJobs.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={goToPreviousPage} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
