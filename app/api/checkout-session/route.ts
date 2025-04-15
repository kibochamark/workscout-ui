import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {



    const { getUser } = getKindeServerSession();
    const user = await getUser();


    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();

    try {
        if(!isUserAuthenticated ) throw new Error("Not authorized to perform this action")

        const { priceId } = await req.json();


        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: `${priceId}`,
                    quantity: 1,
                },
            ],
            customer_email:user.email as string,  
            success_url: `${process.env.AUTH_URL!}/workscout/redirected-route?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.AUTH_URL!}/workscout/onboarding`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
        return NextResponse.json(
            { error: "Failed to create Stripe session" },
            { status: 500 }
        );
    }
}
