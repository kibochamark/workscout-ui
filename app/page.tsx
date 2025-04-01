// import { Main } from '@/components/HomeComponents/Main'
// import React from 'react'

// const page = () => {
//   return (

//       <div className='h-full'>
//         <Main />

//       </div>
    
//   )
// }

// export default page

import Image from "next/image"
import Link from "next/link"

const page =() => {
  return (
    <main className="h-screen w-screen overflow-hidden bg-white flex flex-col">
      {/* Header */}
      {/* <header className="flex justify-between items-center py-6 px-8 border-b">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-[#1a237e]">
            Work<span className="text-[#1a237e]">Scout</span>
            <sup className="text-xs">UK</sup>
          </h1>
          <p className="text-[#ff5252] text-xs ml-1">job hunt made easy</p>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="px-6 py-2 border border-gray-300 rounded-md text-gray-800 font-medium">
            Login
          </Link>
          <Link href="/signup" className="px-6 py-2 bg-black text-white rounded-md font-medium">
            SignUp
          </Link>
        </div>
      </header> */}

      {/* Main Content - takes remaining height */}
      <div className="flex flex-1 flex-col-reverse md:flex-row">
        {/* Left side - narrower width */}
        <div className="w-full md:w-2/5 p-8 flex flex-col justify-center">
          <div className="max-w-xl space-y-6">
            <h2 className="text-3xl  md:text-4xl font-bold text-gray-900 leading-tight">
              Welcome to WorkScout UK, Your Trusted Job Search Partner
            </h2>
            <p className="text-gray-700 text-md leading-6">
              Workscout Uk simplifies job hunting by handling searches, applications and updates for you. We save you
              time and reduce stress so that you can focus on your goals while we turn opportunities into success.
            </p>
            <Link href="/contact-us" className="inline-block px-8 py-4 bg-primary900 text-white rounded-md font-medium">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right side - wider width with image that spans full height */}
        <div className="w-full md:w-3/5 h-full relative">
          <Image
            src="/main.jpg"
            alt="Professional in a city with umbrella"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </main>
  )
}



export default page