import { JobApplicationForm } from '@/components/onboarding/JobOnboardingForm'
import React from 'react'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

const page = async () => {
  const { getAccessToken } = getKindeServerSession();
  const accessToken = await getAccessToken();

  console.log(accessToken, "access token");
  return (
    <div>
      <JobApplicationForm />
    </div>
  )
}

export default page