import { JobApplicationForm } from '@/components/onboarding/JobOnboardingForm'
import React from 'react'

import { getUserSubscriptionStatus } from '@/app/data-access/actions/subscription.service';
import { getUserOnboardingStep } from '@/app/data-access/actions/onboardingstatus.service';


const page = async () => {

 

  // subscription status
  const isSubscribed = await getUserSubscriptionStatus()
  const step = await getUserOnboardingStep()

  // console.log(isSubscribed, "s")

  console.log(step, "s")
  

  // if (isSubscribed.status == 200 && isSubscribed.data.data === true) {
  //   return redirect("/workscout/redirected-route")
  // }

  return (
    <div className='bg-[#fff]'>
      <JobApplicationForm onboardingstep={step.data.data ?? 1} subscribed = {isSubscribed.status == 200 && isSubscribed.data.data === true}/>
    </div>
  )
}

export default page