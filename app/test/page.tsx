import ChatComponent from '@/components/testchat'
import React from 'react'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


const page = async() => {


  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(user)

  return (
    <div className='mt-40 flex items-center justify-center'>
      <ChatComponent />
    </div>
  )
}

export default page