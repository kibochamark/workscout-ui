import JobDashboard from '@/components/WorkscoutDashboard/Dashboard'
import ChildrenWrapper from '@/components/WorkScoutLayout/ChildrenWrapper'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {

  return (
    <ChildrenWrapper>
      <div className=''> 
          <JobDashboard/>

      </div>
    </ChildrenWrapper>
    
  )
}

export default page