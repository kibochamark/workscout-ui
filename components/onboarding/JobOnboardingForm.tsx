"use client"

import { useState } from "react"
import { useFormik } from "formik"
import axios, { AxiosError } from "axios"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import DashBoardLoader from "../DashBoardLoader"
import { SubscriptionPlans } from "../subscriptionplans"
import { baseUrl } from "@/app/utils/constants"
import React, { InputHTMLAttributes } from "react"
import { CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

const LOCATIONS = [
  "London", "Manchester", "Birmingham", "Leeds", "Glasgow",
  "Edinburgh", "Liverpool", "Bristol", "Remote"
]

const JOB_SUGGESTIONS = [
  "Product Manager", "Web Design", "Software Engineer", "UX Designer", "Data Analyst"
]
interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
}
export function JobApplicationForm({ subscribed, onboardingstep }: { subscribed: boolean; onboardingstep:string | number }) {
  const formattedstep = onboardingstep === "ONE" ? 1 : onboardingstep === "TWO"  ? 2 : onboardingstep === "THREE"  ? 3 : 1
  const [step, setStep] = useState(formattedstep)
  const [jobSearch, setJobSearch] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setResumeFile(e.target.files[0])
    }
  }




const {user} = useKindeBrowserClient();
// const alsoUser = getUser();

console.log(user, "user");

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      dob: "",
      gender: "",
      location: "",
      salaryMin: "",
      salaryMax: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      dob: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      salaryMin: Yup.number().required("Required"),
      salaryMax: Yup.number().required("Required"),
    }),
    onSubmit: async (values) => {
      if (!resumeFile) {
        alert("Please upload a resume.")
        return
      }

      const form = new FormData()
      form.append("name", values.fullName)
      form.append("bio", jobSearch)
      form.append("file", resumeFile)
      form.append("kindeId", user?.id as string)
      form.append("gender", values.gender);
      form.append("location", values.location);
      form.append("salary", values.salaryMin.toString());
      form.append("jobtitle", jobSearch)

      console.log(values.gender, "data to send")
      

      try {
        const response = await axios.post(`${baseUrl}create`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        })

        console.log("Submitted:", response.data)
        setStep(3)
      } catch (err) {
        const error = err as AxiosError
        console.error(error.response?.data || error.message)
        alert("Submission failed. Check console.")
      }
    },
  })

  return (
    <>
      {subscribed ? (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Subscription Status</CardTitle>
              <CardDescription>Your subscription information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <AlertTitle className="ml-2 text-green-800 font-medium">Active Subscription</AlertTitle>
                <AlertDescription className="ml-7 text-green-700">
                  You are already subscribed to our premium plan. You can manage your billing details from your dashboard.
                </AlertDescription>
              </Alert>

              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-2 font-medium">Subscription Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-500">Plan:</span>
                  <span className="font-medium">Premium</span>
                  <span className="text-gray-500">Billing Cycle:</span>
                  <span className="font-medium">Monthly</span>
                  <span className="text-gray-500">Next Billing Date:</span>
                  <span className="font-medium">May 15, 2025</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button className="w-full"  >
                Manage Billing in Dashboard
              </Button>
              <div className="text-center text-sm text-gray-500">
                Need help?{" "}
                <Link href="/support" className="text-blue-600 hover:underline">
                  Contact support
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      ) : (

        <div className="grid lg:grid-cols-2 min-h-screen relative">
          {step === 3 ? (
            <div className="col-span-2">
              <SubscriptionPlans />
            </div>
          ) : step !== 4 && (
            <>
              <div className="block bg-cover bg-transparent col-span-1 bg-fixed bg-center" style={{ backgroundImage: "url('/onboarding.jpg')" }} />

              <div className="p-8 flex flex-col bg-transparent">
                <div className="mb-8">
                  <Link href="/" className="flex items-center space-x-2">
                    <Image src={"/logo (2).png"} alt="logo" width="200" height="32" />
                  </Link>
                </div>

                <div className="w-full">
                  {step === 1 ? (
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Let us get started</p>
                        <h1 className="text-2xl font-semibold mt-1">What is your job description?</h1>
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

                      <Button
                        className="w-full bg-[#1e1666] hover:bg-[#1e1666]/90"
                        onClick={() => {
                          if (!jobSearch) {
                            alert("Please enter your job description to continue.")
                          } else {
                            setStep(2)
                          }
                        }}
                      >
                        Next
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                      <h1 className="md:text-2xl text-labe font-semibold mt-1">Please fill out the below details to continue</h1>

                      <div className="space-y-4">
                        <InputGroup label="Full Name" id="fullName" {...formik.getFieldProps("fullName")} />
                        <InputGroup label="Email" id="email" type="email" {...formik.getFieldProps("email")} />
                        <InputGroup label="Date of Birth" id="dob" type="date" {...formik.getFieldProps("dob")} />

                        <div className="space-y-2">
                          <Label>Gender</Label>
                          <RadioGroup
                            value={formik.values.gender}
                            onValueChange={(val) => formik.setFieldValue("gender", val)}
                          >
                            {["male", "female", "other"].map((g) => (
                              <div key={g} className="flex items-center space-x-2">
                                <RadioGroupItem value={g} id={g} />
                                <Label htmlFor={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Preferred Job Location</Label>
                          <Select
                            value={formik.values.location}
                            onValueChange={(val) => formik.setFieldValue("location", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              {LOCATIONS.map((loc) => (
                                <SelectItem key={loc} value={loc.toLowerCase()}>{loc}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <InputGroup label="Minimum Salary" id="salaryMin" type="number" {...formik.getFieldProps("salaryMin")} />
                          <InputGroup label="Maximum Salary" id="salaryMax" type="number" {...formik.getFieldProps("salaryMax")} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="resume">Upload Resume</Label>
                          <Input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                          {resumeFile && (
                            <p className="text-sm text-muted-foreground">Selected file: {resumeFile.name}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 mt-8">
                        <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                          Back
                        </Button>
                        <Button type="submit" className="flex-1 bg-[#1e1666] hover:bg-[#1e1666]/90">
                          Continue
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </>
          )}
          {step === 4 && (
            <div className="col-span-2">
              <DashBoardLoader />
            </div>
          )}
        </div>
      )}
    </>


  )
}

const InputGroup: React.FC<InputGroupProps> = ({ label, id, type = "text", ...props }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} {...props} />
  </div>
)
