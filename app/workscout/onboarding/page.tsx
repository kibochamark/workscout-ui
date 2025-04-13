import { JobApplicationForm } from '@/components/onboarding/JobOnboardingForm'
import React from 'react'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

const page = async() => {

  const { getAccessTokenRaw } = getKindeServerSession();
  const accessToken = await getAccessTokenRaw();

  console.log(accessToken, "access token");
  return (
    <div>
      <JobApplicationForm />
    </div>
  )
}

export default page