"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image";


import DashBoardLoader from "../DashBoardLoader"
import { SubscriptionPlans } from "../subscriptionplans"

const LOCATIONS = [
    "London",
    "Manchester",
    "Birmingham",
    "Leeds",
    "Glasgow",
    "Edinburgh",
    "Liverpool",
    "Bristol",
    "Remote",
]

const JOB_SUGGESTIONS = ["Product Manager", "Web Design", "Software Engineer", "UX Designer", "Data Analyst"]

export function JobApplicationForm() {
    const [step, setStep] = useState(1)
    const [jobSearch, setJobSearch] = useState("")
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        dob: "",
        gender: "",
        location: "",
        salaryMin: "",
        salaryMax: "",
        resume: null as File | null,
    })

    const formatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFormData((prev) => ({ ...prev, resume: e.target.files![0] }))
        }
    }

    const handleNext = () => setStep((prev) => prev + 1)
    const handleBack = () => setStep((prev) => prev - 1)

    return (
        <div className="grid lg:grid-cols-2 min-h-screen relative">
            {step == 3 ? (
                <div className="col-span-2">
                    <SubscriptionPlans/>
                </div>
            ) : step != 4 && (
                <>
                    <div
                        className="block bg-cover col-span-1 bg-fixed bg-center"
                        style={{
                            backgroundImage:
                                "url('/onboarding.jpg')",
                        }}
                    />

                    <div className="p-8 flex flex-col">
                        <div className="mb-8">
                            <Link href="/" className="flex items-center space-x-2">
                              
                                 <Image src={"/logo (2).png"} alt="logo" width="200" height="32" />
                              

                            </Link>        </div>

                        <div className="w-full">
                            {step == 1 ? (
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Lets get started</p>
                                        <h1 className="text-2xl font-semibold mt-1">What is your job description ?</h1>
                                    </div>

                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            className="pl-9"
                                            placeholder="UX"
                                            value={jobSearch}
                                            onChange={(e) => setJobSearch(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Examples</p>
                                        <div className="space-y-2">
                                            {JOB_SUGGESTIONS.map((job) => (
                                                <button
                                                    key={job}
                                                    className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100"
                                                    onClick={() => setJobSearch(job)}
                                                >
                                                    {job}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div>
                                        {/* <p className="text-sm text-muted-foreground">Personal Information</p> */}
                                        <h1 className="md:text-2xl text-labe font-semibold mt-1">Please fill out the below details to continue</h1>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="fullName">Full Name</Label>
                                            <Input
                                                id="fullName"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="dob">Date of Birth</Label>
                                            <Input
                                                id="dob"
                                                type="date"
                                                value={formData.dob}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, dob: e.target.value }))}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Gender</Label>
                                            <RadioGroup
                                                value={formData.gender}
                                                onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="male" id="male" />
                                                    <Label htmlFor="male">Male</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="female" id="female" />
                                                    <Label htmlFor="female">Female</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="other" id="other" />
                                                    <Label htmlFor="other">Other</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="location">Preferred Job Location</Label>
                                            <Select
                                                value={formData.location}
                                                onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select location" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {LOCATIONS.map((location) => (
                                                        <SelectItem key={location} value={location.toLowerCase()}>
                                                            {location}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="salaryMin">Minimum Salary</Label>
                                                <Input
                                                    id="salaryMin"
                                                    type="number"
                                                    placeholder="30000"
                                                    value={formData.salaryMin}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, salaryMin: e.target.value }))}
                                                />
                                                {formData.salaryMin && (
                                                    <p className="text-sm text-muted-foreground">{formatter.format(Number(formData.salaryMin))}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="salaryMax">Maximum Salary</Label>
                                                <Input
                                                    id="salaryMax"
                                                    type="number"
                                                    placeholder="50000"
                                                    value={formData.salaryMax}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, salaryMax: e.target.value }))}
                                                />
                                                {formData.salaryMax && (
                                                    <p className="text-sm text-muted-foreground">{formatter.format(Number(formData.salaryMax))}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="resume">Upload Resume</Label>
                                            <Input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                                            {formData.resume && (
                                                <p className="text-sm text-muted-foreground">Selected file: {formData.resume.name}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4 mt-8">
                                {step != 1 && (
                                    <Button variant="outline" onClick={handleBack} className="flex-1">
                                        Back
                                    </Button>
                                )}


                                <Button onClick={handleNext} className="flex-1 bg-[#1e1666] hover:bg-[#1e1666]/90">
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
            {step == 4 && (
                <div className="col-span-2">
                    <DashBoardLoader />
                </div>
            )}

        </div >
    )
}

