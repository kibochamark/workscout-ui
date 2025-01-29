import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function Main() {
    return (
        <div className="grid lg:grid-cols-3 gap-12 px-4 lg:px-0 max-w-7xl mx-auto">
            <div className="space-y-6 my-20 col-span-1">
                <div className="space-y-8 lg:space-y-0">
                    <h1 className="text-displaySmall text-balance font-bold mb-6">
                        Welcome to WorkScout UK, Your Trusted Job Search Partner
                    </h1>
                    <p className="text-muted-foreground leading-6 mb-4 tracking-wide xt-balance">

                        Workscout Uk simplifies job hunting by handling searches, applications and updates for you.
                        We save you time and reduce stress so that you can focus on your goals while we turn opportunities into success.
                    </p>

                    <div className="my-4 w-full md:w-1/2 lg:w-full">
                        <Link href="/contact-us"><Button className="w-full mt-6 text-balance text-center">Contact Us</Button></Link>
                    </div>
                </div>

            </div>

            <div className="col-span-2 relative mt-8 overflow-hidden  h-full">

                <Image
                    alt="main-image"
                    fill={true}
                    src={"/main.jpg"}
                    className="w-full rounded-md absolute hidden lg:block -z-10 inset-y-0 object-cover h-full"

                />


            </div>
        </div>
    )
}

