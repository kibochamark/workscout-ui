import { getJobs } from '@/app/data-access/actions/job.service'
import MyJobs from '@/components/ClientJobs/my-jobs'
import ChildrenWrapper from '@/components/WorkScoutLayout/ChildrenWrapper'
import React from 'react'

const page = async() => {
  const jobs = (await getJobs()).data ?? []
  console.log(jobs, "jobs")


  return (
    <ChildrenWrapper>
        <div><MyJobs jobs={jobs}/></div>
    </ChildrenWrapper>
    
  )
}

export default page