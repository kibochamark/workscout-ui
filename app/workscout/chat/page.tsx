import { getAccount } from '@/app/data-access/actions/account.service'
import ChildrenWrapper from '@/components/WorkScoutLayout/ChildrenWrapper'
import React from 'react'
import ChatClient from './ChatClient'
import { getAllMessages } from '@/app/data-access/actions/messages.service'

const page = async() => {
  const user = await getAccount()
  const allconversations = await getAllMessages(user?.data.id) 
  // console.log(allconversations, "allconversations")
  console.log(allconversations?.data, "allconversations")
  // console.log(user, "user")
  return (
    <ChildrenWrapper>
      
      <ChatClient user={user.data ?? {}}  mock_conversations={allconversations?.data ?? []}/>
    </ChildrenWrapper>
  )
}

export default page