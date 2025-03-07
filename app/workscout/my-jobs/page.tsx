import MyJobs from '@/components/ClientJobs/my-jobs'
import ChildrenWrapper from '@/components/WorkScoutLayout/ChildrenWrapper'
import React from 'react'

const page = () => {
  return (
    <ChildrenWrapper>
        <div><MyJobs/></div>
    </ChildrenWrapper>
    
  )
}

export default page