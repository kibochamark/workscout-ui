import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/HomeLayout/Navbar";
import { Footer } from "@/components/HomeLayout/footer";
import KindeProvider from "./KindeProvider";
import ReduxProvider from "./ReduxProvider";


const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
          className={`${inter.className} h-screen antialiased`}
        >
          <div className="w-full fixed top-0 z-40">
            <Navbar />
          </div>

          <main className="">
            <ReduxProvider>
              {children}
            </ReduxProvider>

    
          </main>

          {/* <Footer /> */}

        </body>
      </html>
    </KindeProvider >
  );
}
