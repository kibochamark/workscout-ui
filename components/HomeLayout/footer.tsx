import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 px-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Workscout</p>
        <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}

