"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, Home } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <div className="mx-auto max-w-md space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Application Error</h1>
            <p className="text-muted-foreground">
              We re sorry, but a critical error has occurred in the application.
              {error.digest && (
                <span className="block mt-2 text-sm">
                  Error ID: <code className="rounded bg-muted px-1 py-0.5">{error.digest}</code>
                </span>
              )}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button onClick={() => reset()} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try again
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => (window.location.href = "/")}
              >
                <Home className="h-4 w-4" />
                Go to homepage
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
