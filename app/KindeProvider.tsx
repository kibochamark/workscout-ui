"use client"
import React, { ReactNode } from 'react'
import { KindeProvider as KindeclientProvider } from "@kinde-oss/kinde-auth-nextjs";

const KindeProvider = ({children}:{children:ReactNode}) => {
  return (
    <KindeclientProvider>{children}</KindeclientProvider>
  )
}

export default KindeProvider