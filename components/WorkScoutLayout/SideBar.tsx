"use client"
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import { motion } from 'framer-motion'
import React from 'react'
import { Menus } from "../data-access/menu"
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const SideBar = () => {
    const pathname = usePathname()
    if (pathname === "/workscout/onboarding" || pathname === "/workscout/redirected-route") {
        return null
    }
    return (
        <div className='pt-20'>
            <motion.div
                initial={{ opacity: 0, x: -64 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -64 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className='w-64 hidden lg:flex h-[87vh] mb-10 pl-10  shadow-lg justify-between bg-[#fff] fixed m-2   flex-col items-start rounded-r-lg'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 1.0 }}
                    className='mt-[40px]'>
                    <ul className='space-y-10'>
                        {Menus?.map((menu, idx: number) => (
                            <Link href={menu.link}
                                key={idx}
                                className={`flex ${pathname == menu.link && "text-primary900 font-bold"} hover:bg-gray-100 py-2 pr-6 hover:rounded-md transition-all duration-300 hover:cursor-pointer justify-start items-start gap-2`}
                            >
                                <motion.li
                                    key={idx}
                                    className='flex justify-start gap-2 items-center'
                                >

                                    {menu.svg}

                                    <p className='text-labelLarge mt-1'>{menu?.label || ""}</p>
                                </motion.li>
                            </Link>
                        ))}



                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 1.0 }}
                    className='py-4 pb-8 flex justify-start items-center gap-2'>
                    <div>
                        <svg className='fill-primary900' width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" stroke='#12015E'>
                            <path d="M17.905 14.8066H16.3036C16.1943 14.8066 16.0918 14.8544 16.0234 14.9387C15.864 15.1323 15.6931 15.3191 15.5132 15.4968C14.7772 16.2335 13.9054 16.8207 12.946 17.2257C11.952 17.6455 10.8837 17.8609 9.8047 17.859C8.71357 17.859 7.65662 17.6448 6.66344 17.2257C5.70403 16.8207 4.83222 16.2335 4.09622 15.4968C3.3589 14.7625 2.77097 13.8922 2.36499 12.9341C1.94358 11.9409 1.73173 10.8862 1.73173 9.79512C1.73173 8.70399 1.94586 7.64931 2.36499 6.65613C2.77046 5.69713 3.35361 4.83379 4.09622 4.09347C4.83882 3.35314 5.70216 2.76999 6.66344 2.36452C7.65662 1.94538 8.71357 1.73126 9.8047 1.73126C10.8958 1.73126 11.9528 1.94311 12.946 2.36452C13.9072 2.76999 14.7706 3.35314 15.5132 4.09347C15.6931 4.27342 15.8617 4.46021 16.0234 4.65156C16.0918 4.73584 16.1966 4.78368 16.3036 4.78368H17.905C18.0485 4.78368 18.1374 4.62422 18.0576 4.50349C16.3105 1.78821 13.2535 -0.00907722 9.77964 3.44848e-05C4.32173 0.013702 -0.0541635 4.44427 0.000506735 9.89534C0.055177 15.2599 4.42424 19.5902 9.8047 19.5902C13.2694 19.5902 16.3127 17.7952 18.0576 15.0867C18.1351 14.966 18.0485 14.8066 17.905 14.8066ZM19.9301 9.65161L16.6977 7.10033C16.577 7.00466 16.4016 7.09122 16.4016 7.24384V8.97506H9.24889C9.14866 8.97506 9.06665 9.05707 9.06665 9.1573V10.4329C9.06665 10.5332 9.14866 10.6152 9.24889 10.6152H16.4016V12.3464C16.4016 12.499 16.5793 12.5856 16.6977 12.4899L19.9301 9.93862C19.9519 9.92158 19.9695 9.8998 19.9816 9.87493C19.9937 9.85007 20 9.82277 20 9.79512C20 9.76746 19.9937 9.74016 19.9816 9.7153C19.9695 9.69043 19.9519 9.66865 19.9301 9.65161Z" fill="#05051E" />
                        </svg>

                    </div>
                    <LogoutLink>
                        <p className='text-labelLarge text-balance'>Logout</p>
                    </LogoutLink>
                </motion.div>
            </motion.div>
        </div>

    )
}

export default SideBar