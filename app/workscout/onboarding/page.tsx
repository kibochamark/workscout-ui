import { JobApplicationForm } from '@/components/onboarding/JobOnboardingForm'
import React from 'react'

import { getUserSubscriptionStatus } from '@/app/data-access/actions/subscription.service';


const page = async () => {

 

  // subscription status
  const isSubscribed = await getUserSubscriptionStatus()

  // console.log(isSubscribed, "s")

  // console.log(isSubscribed, "s")
  

  // if (isSubscribed.status == 200 && isSubscribed.data.data === true) {
  //   return redirect("/workscout/redirected-route")
  // }

  return (
    <div>
      <JobApplicationForm subscribed = {isSubscribed.status == 200 && isSubscribed.data.data === true}/>
    </div>
  )
}

export default page