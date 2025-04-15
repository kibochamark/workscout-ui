import { JobApplicationForm } from '@/components/onboarding/JobOnboardingForm'
import React from 'react'
import { getUserSubscriptionStatus } from '../data-access/actions/subscription.service';
import { redirect } from 'next/navigation';

const page = async () => {
  // subscription status
  const isSubscribed = await getUserSubscriptionStatus()

  if(isSubscribed.status == 200 && isSubscribed.data === true){
    return redirect("/workscout/redirected-route")
  }

  // console.log(accessToken, "access token");
  return (
    <div>
      <JobApplicationForm />
    </div>
  )
}

export default page