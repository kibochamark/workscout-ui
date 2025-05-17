import JobDashboard from '@/components/WorkscoutDashboard/Dashboard'
import ChildrenWrapper from '@/components/WorkScoutLayout/ChildrenWrapper'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'

const page = async() => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(user)

  return (
    <ChildrenWrapper>
      <div className=''> 
          <JobDashboard/>

      </div>
    </ChildrenWrapper>
    
  )
}

export default page