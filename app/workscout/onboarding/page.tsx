import { JobApplicationForm } from '@/components/onboarding/JobOnboardingForm'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import React from 'react'

const page = () => {


  return (
    <div>
      <JobApplicationForm />
    </div>
  )
}

export default page