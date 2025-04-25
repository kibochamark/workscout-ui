import { Button } from "@/components/ui/button"
import { FileQuestion, Home, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
            <div className="mx-auto max-w-md space-y-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                    <FileQuestion className="h-10 w-10 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
                <p className="text-muted-foreground">Sorry, we couldnt find the page you re looking for.</p>
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <Link href="/">
                        <Button className="flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            Go to homepage
                        </Button>
                    </Link>
                    <Link href="/search">
                        <Button variant="outline" className="flex items-center gap-2">
                            <Search className="h-4 w-4" />
                            Search
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
