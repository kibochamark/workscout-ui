import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/HomeLayout/Navbar";
import KindeProvider from "./KindeProvider";
import ReduxProvider from "./ReduxProvider";
import TanstackProvider from "./TanstackProvider";
import { Toaster } from "@/components/ui/sonner";




const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "WorkScout Uk",
  description: "Job Hunt Made Easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <KindeProvider>
      <html lang="en">
        <body
          className={`${inter.className} h-screen bg-gray-100 overflow-y-scroll antialiased`}
        >
          <div className="w-full fixed top-0 z-40">
            <Navbar />
          </div>

          <main className="">
            <TanstackProvider>
              <ReduxProvider>
                {children}
              </ReduxProvider>
            </TanstackProvider>
            <Toaster position="top-right" />
          </main>

          {/* <Footer />   */}

        </body>
      </html>
    </KindeProvider >
  );
}
