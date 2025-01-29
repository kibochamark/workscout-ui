import { ContactForm } from '@/components/HomeComponents/Contact'
import Wrapcomponent from '@/components/wrapcomponent'
import React from 'react'

const page = () => {
  return (
    <Wrapcomponent>
      <div className='mt-14'>
        <ContactForm />
      </div>
    </Wrapcomponent>
  )
}

export default page