// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import ChildrenWrapper from "@/components/WorkScoutLayout/ChildrenWrapper"
// import { Check } from "lucide-react"

// const plans = [
//   {
//     name: "Basic",
//     price: "$9.99",
//     period: "month",
//     description: "Perfect for starters",
//     features: ["Basic features", "Up to 10 projects", "2GB storage", "Email support"],
//     current: false,
//   },
//   {
//     name: "Pro",
//     price: "$19.99",
//     period: "month",
//     description: "Best for professionals",
//     features: ["All Basic features", "Unlimited projects", "10GB storage", "Priority support", "Advanced analytics"],
//     current: true,
//   },
//   {
//     name: "Enterprise",
//     price: "$49.99",
//     period: "month",
//     description: "For large teams",
//     features: [
//       "All Pro features",
//       "Unlimited storage",
//       "24/7 support",
//       "Custom integrations",
//       "Team collaboration",
//       "Advanced security",
//     ],
//     current: false,
//   },
// ]

// export default function SubscriptionsPage() {
//   return (
//     <ChildrenWrapper>
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
//           <p className="text-muted-foreground">Select the perfect plan for your needs</p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {plans.map((plan) => (
//             <Card key={plan.name} className={`p-6 ${plan.current ? "border-[#14012C] border-2" : ""}`}>
//               <div className="mb-6">
//                 <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
//                 <p className="text-muted-foreground text-sm">{plan.description}</p>
//               </div>

//               <div className="mb-6">
//                 <span className="text-3xl font-bold">{plan.price}</span>
//                 <span className="text-muted-foreground">/{plan.period}</span>
//               </div>

//               <ul className="space-y-3 mb-6">
//                 {plan.features.map((feature) => (
//                   <li key={feature} className="flex items-center gap-2">
//                     <Check className="h-4 w-4 text-[#14012C]" />
//                     <span className="text-sm">{feature}</span>
//                   </li>
//                 ))}
//               </ul>

//               <Button
//                 className={`w-full ${
//                   plan.current ? "bg-gray-100 hover:bg-gray-200 text-gray-600" : "bg-[#14012C] hover:bg-[#14012C]/90"
//                 }`}
//                 disabled={plan.current}
//               >
//                 {plan.current ? "Current Plan" : "Choose Plan"}
//               </Button>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </ChildrenWrapper>
//   )
// }


import SubscriptionPage from '@/components/subscription/SubscriptionCards'
import ChildrenWrapper from '@/components/WorkScoutLayout/ChildrenWrapper'

import React from 'react'

const page = () => {
  return (
    <ChildrenWrapper>
      <div className='flex flex-col gap-2'>
        < SubscriptionPage/></div>
    </ChildrenWrapper>
  )
}

export default page