import { Main } from '@/components/HomeComponents/Main'
import Wrapcomponent from '@/components/wrapcomponent'
import React from 'react'

const page = () => {
  return (
    <Wrapcomponent>
      <div className='my-12'>
        <Main />
      </div>
    </Wrapcomponent>
  )
}

export default page