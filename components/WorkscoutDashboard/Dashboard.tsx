"use client"

import { useState } from "react"
import { Calendar, ChevronRight, Info, MoreVertical, Search } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function JobDashboard() {
//   const [month, setMonth] = useState("January")
//   const [year, setYear] = useState("2023")
  const [filter, setFilter] = useState("All")
  const [calendarView, setCalendarView] = useState("Jan")

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Hi, Jane</h1>
        <p className="text-gray-600">Welcome to your personalised metrics dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Metrics Cards */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium flex items-center">
                  No. of Jobs applied
                  <Info className="h-4 w-4 ml-1 text-gray-400" />
                </p>
                <h2 className="text-3xl font-bold mt-2">10,678,678</h2>
                <p className="text-sm text-green-500 mt-1 flex items-center">
                  <ChevronRight className="h-4 w-4 rotate-90" />
                  32%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium flex items-center">
                  No. of Jobs Accepted
                  <Info className="h-4 w-4 ml-1 text-gray-400" />
                </p>
                <h2 className="text-3xl font-bold mt-2">12,678</h2>
                <p className="text-sm text-red-500 mt-1 flex items-center">
                  <ChevronRight className="h-4 w-4 -rotate-90" />
                  83%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium flex items-center">
                  No. of Jobs Rejected
                  <Info className="h-4 w-4 ml-1 text-gray-400" />
                </p>
                <h2 className="text-3xl font-bold mt-2">10,000</h2>
                <p className="text-sm text-green-500 mt-1 flex items-center">
                  <ChevronRight className="h-4 w-4 rotate-90" />
                  32%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Job Insights Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Job Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full relative">
              {/* Area Chart Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-red-200 opacity-20"></div>
              <svg className="w-full h-full" viewBox="0 0 600 300">
                <path
                  d="M0,300 L0,250 C20,230 40,180 60,200 C80,220 100,260 120,240 C140,220 160,150 180,140 C200,130 220,180 240,200 C260,220 280,240 300,220 C320,200 340,150 360,140 C380,130 400,160 420,180 C440,200 460,220 480,200 C500,180 520,120 540,100 C560,80 580,100 600,120 L600,300 Z"
                  fill="url(#redGradient)"
                  stroke="none"
                />
                <defs>
                  <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,250 C20,230 40,180 60,200 C80,220 100,260 120,240 C140,220 160,150 180,140 C200,130 220,180 240,200 C260,220 280,240 300,220 C320,200 340,150 360,140 C380,130 400,160 420,180 C440,200 460,220 480,200 C500,180 520,120 540,100 C560,80 580,100 600,120"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2"
                />
              </svg>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                <span>500</span>
                <span>400</span>
                <span>300</span>
                <span>200</span>
                <span>100</span>
                <span>0</span>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500 px-6">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Responses */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Application Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="Hired">Hired</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <div className="relative w-48 h-48">
                {/* Circular progress chart */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Outer circle - Shortlisted 79% */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#1e1b4b"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset="59.4"
                    transform="rotate(-90 50 50)"
                  />

                  {/* Middle circle - Hired 59% */}
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="10"
                    strokeDasharray="219.9"
                    strokeDashoffset="90.2"
                    transform="rotate(-90 50 50)"
                  />

                  {/* Inner circle - Rejected 40% */}
                  <circle cx="50" cy="50" r="25" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="25"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="10"
                    strokeDasharray="157.1"
                    strokeDashoffset="94.3"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-indigo-900 mr-2"></span>
                <span className="text-sm">Shortlisted 79%</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-600 mr-2"></span>
                <span className="text-sm">Hired 59%</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-black mr-2"></span>
                <span className="text-sm">Rejected 40%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Recent Activities</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search Jobs..." className="pl-8 h-9 w-[200px]" />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <span className="text-xs">6 Jan 2023 - 13 Jan 2023</span>
                      <Calendar className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    {/* Date picker would go here */}
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
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Name</TableHead>
                  <TableHead>Work Scout</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Applied date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Product manager</TableCell>
                  <TableCell>Jewel Joe</TableCell>
                  <TableCell>Technology</TableCell>
                  <TableCell>18/04/2023</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      submitted
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product manager</TableCell>
                  <TableCell>Jewel Joe</TableCell>
                  <TableCell>Technology</TableCell>
                  <TableCell>18/04/2023</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                      in progress
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product manager</TableCell>
                  <TableCell>Jewel Joe</TableCell>
                  <TableCell>Technology</TableCell>
                  <TableCell>18/04/2023</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-indigo-900 mr-2"></span>
                      shortlisted
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product manager</TableCell>
                  <TableCell>Jewel Joe</TableCell>
                  <TableCell>Technology</TableCell>
                  <TableCell>18/04/2023</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-red-600 mr-2"></span>
                      Rejected
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4">
              <Button variant="link" className="text-sm text-blue-600 p-0">
                View all Jobs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Calendar and Reminder */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Calendar 2024</CardTitle>
              <Select value={calendarView} onValueChange={setCalendarView}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Jan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jan">Jan</SelectItem>
                  <SelectItem value="Feb">Feb</SelectItem>
                  <SelectItem value="Mar">Mar</SelectItem>
                  <SelectItem value="Apr">Apr</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              <div className="text-xs text-gray-500">Mon</div>
              <div className="text-xs text-gray-500">Tue</div>
              <div className="text-xs text-gray-500">Wed</div>
              <div className="text-xs text-gray-500">Thu</div>
              <div className="text-xs text-gray-500">Fri</div>
              <div className="text-xs text-gray-500">Sat</div>
              <div className="text-xs text-gray-500">Sun</div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Calendar days */}
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1
                const isSelected = day === 21
                const hasEvent = day === 18

                return (
                  <div
                    key={day}
                    className={`
                      relative p-2 rounded-md text-sm
                      ${isSelected ? "bg-indigo-900 text-white" : ""}
                      ${day > 23 ? "opacity-30" : ""}
                    `}
                  >
                    <div>{day}</div>
                    <div className="text-[10px] text-gray-500">
                      {day === 18 && "Mon"}
                      {day === 19 && "Tue"}
                      {day === 20 && "Wed"}
                      {day === 21 && "Thu"}
                      {day === 22 && "Fri"}
                      {day === 23 && "Sat"}
                    </div>
                    {hasEvent && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-1 h-1 bg-indigo-900 rounded-full"></div>
                      </div>
                    )}
                  </div>
                )
              }).slice(0, 23)}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Reminder</h3>

              <div className="space-y-3">
                <div className="bg-indigo-900 text-white p-3 rounded-md">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Delta Consultancy Agreement</h4>
                      <p className="text-xs mt-1">12:00 - 16:00</p>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-900 text-white p-3 rounded-md">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Delta Consultancy Agreement</h4>
                      <p className="text-xs mt-1">12:00 - 16:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trending Jobs Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Trending Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="overflow-hidden">
              <div className="flex">
                <div className="w-1/4">
                  <Image
                    src={`/placeholder.svg?height=100&width=100&text=Job+${item}`}
                    alt="Job thumbnail"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="w-3/4 p-4">
                  <div className="text-sm text-blue-600 mb-1">Savanna</div>
                  <h3 className="font-medium mb-1">Product manager</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Defining the overall strategy and vision for the product. This involves understanding the market,
                    identifying customer needs...
                  </p>
                  <div className="mt-2 flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${item % 2 === 0 ? "bg-indigo-900" : "bg-green-500"}`}
                    ></span>
                    <span className="text-sm">{item % 2 === 0 ? "shortlisted" : "submitted"}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

