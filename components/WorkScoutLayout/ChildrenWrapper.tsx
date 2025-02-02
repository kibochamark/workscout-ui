"use client"
import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

const ChildrenWrapper = ({ children }: { children: ReactNode }) => {
 
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className='mt-24 w-full lg:w-[calc(100vw-64px)] lg:ml-72 z-10 mx-2 md:mx-6 lg:mx-0  lg:mr-6 lg:right-0 rounded-lg  overflow-y-auto'>{children}</motion.div>
    )
}

export default ChildrenWrapper