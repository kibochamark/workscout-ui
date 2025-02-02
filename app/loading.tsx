import { Loader } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen overflow-hidden flex mx-auto items-center justify-center top-[50%]'>
        <Loader className='h-6 w-6 text-primary900 animate-spin'/>
    </div>
  )
}

export default page