import ChildrenWrapper from '@/components/WorkScoutLayout/ChildrenWrapper'
import ProfileForm from '@/components/workscoutprofile/Profile-form'
import React from 'react'

const page = () => {
  return (
    <ChildrenWrapper>
      <div className='flex flex-col gap-2'>
        <ProfileForm /></div>
    </ChildrenWrapper>
  )
}

export default page