"use client"
import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

const ChildrenWrapper = ({children}:{children:ReactNode}) => {
  return (
    <motion.div 
    initial={{ opacity: 0, y: -40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className='lg:pl-72 my-2 h-[80vh] overflow-y-auto w-full'>{children}</motion.div>
  )
}

export default ChildrenWrapper