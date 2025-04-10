import Plans from '@/components/Plan'
import React from 'react'

const page = () => {
    const plans= [
        {
            link:"https://buy.stripe.com/test_14k9Bwfur7595Xy145",
            price:19.00,
            duration:"/month",
            priceId:"price_1RCJEOCNuHYjRQzHCqxOGnHI"
        },
        {
            link:"https://buy.stripe.com/test_3csaFA4PNdtx0De4gg",
            price:99.00,
            duration:"/Year",
            priceId:"price_1RCJEqCNuHYjRQzHlKEeg89V"
        }
    ]
  return (
    <div className='mt-40 flex items-center justify-center'>
    <Plans plans={plans}/>
    </div>
  )
}

export default page