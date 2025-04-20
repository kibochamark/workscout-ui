"use client"
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

const WorkscoutLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname()

    return (
        <>
            {!pathname.includes("/workscout/onboarding") ? (
                <section className="flex justify-start relative">
                    {children}
                </section>
            ) : children}

        </>
    )
}

export default WorkscoutLayout