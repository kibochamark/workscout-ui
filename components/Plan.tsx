import React from 'react'

type Plan = {
    link: string;
    priceId: string;
    price: number;
    duration: string;
}

const Plans = ({ plans }: { plans: Plan[] }) => {
    return (
        <div className='flex justify-evenly gap-2'>
            <a href="https://billing.stripe.com/p/login/test_fZe7vBeq6bTg6fm4gg" target='_blank'>My Billing</a>
            {plans.map((plan, idx: number) => (
                <div className='bg-primary900/70 flex flex-col gap-4 h-44 w-40 p-4 text-white rounded-md' key={idx}>

                    <div>
Subscription {idx+1}
                    </div>

<div>
    {plan.duration}
</div>

<div>
    {plan.price}
</div>


<div>
    <a href={
        plan.link + "?prefilled_email=kibochamark@gmail.com"
    } target="_blank" rel="noopener noreferrer">
    <button type="button" className='bg-[#FFF] text-black'>
        Subscribe
    </button>
    </a>
</div>

                </div>
            ))}

        </div>
    )
}

export default Plans