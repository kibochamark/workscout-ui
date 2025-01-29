import { Loader } from 'lucide-react'
import React from 'react'

const page = () => {

    return (
        <div className='mt-18  w-full flex justify-center relative'>

            <div className='flex flex-col items-center gap-2'>
                <Loader className='text-primary900 w-10 h-10 animate animate-spin text-center' />
                <h3 className='text-displayMedium font-bold'>Redirecting....</h3>
                <p>Please wait....

                    click on the dashboard icon to proceed
                </p>
            </div>
        </div>
    )
}

export default page