"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Wrapcomponent from "../wrapcomponent"

export function Footer() {
  const pathname = usePathname()
  if (pathname.includes("/workscout")) {
    return null
  }
  return (
    <Wrapcomponent>
      <footer className="border-t py-6 backdrop-blur mt-4 w-full  px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Workscout</p>
          <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:underline">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </Wrapcomponent>
  )
}

