import { getAccount } from '@/app/data-access/actions/account.service'
import ChildrenWrapper from '@/components/WorkScoutLayout/ChildrenWrapper'
import ProfileForm from '@/components/workscoutprofile/Profile-form'
import React from 'react'

const page = async() => {
  const acc = await getAccount()
  console.log(acc.data.subscription.stripecustomerId)
  return (
    <ChildrenWrapper>
      <div className='flex flex-col gap-2'>
        <ProfileForm  customerid={ acc.data.subscription.stripecustomerId ?? ''} /></div>
    </ChildrenWrapper>
  )
}

export default page