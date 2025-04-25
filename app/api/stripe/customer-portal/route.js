import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export async function POST(request) {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();



  try {

    if (!isUserAuthenticated) throw new Error("Not authorized to perform this action")

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('redirect'); // e.g. `/api/search?redirect=`
    // Parse the request body
    const body = await request.json();
    
    const { customerid } = body

    console.log(customerid)



    const configuration = await stripe.billingPortal.configurations.create({
      features: {
        subscription_update: {
          enabled: true,
          proration_behavior: 'create_prorations',
           // Or 'none', depending on your needs
           default_allowed_updates:['price'],
          products: [
            {
              product: 'prod_S8Q9Y68GhTNMXv', // <-- Replace with your real Stripe product ID
              prices: ['price_1RE9JMCNuHYjRQzHocRSMssk', 'price_1RE9KJCNuHYjRQzHp7K3IEnT'], // <-- Replace with allowed price IDs
            },
            {
              product: 'prod_S8Q8uDIaRSHfQo', // <-- Replace with your real Stripe product ID
              prices: ['price_1RE9IRCNuHYjRQzH5bqGdT1W', 'price_1RE9KyCNuHYjRQzH6mwQaYIV'], // <-- Replace with allowed price IDs
            },
            {
              product: 'prod_S8Q8VO8PSAY8iN', // <-- Replace with your real Stripe product ID
              prices: ['price_1RE9I9CNuHYjRQzHUr9l0ESX', 'price_1RE9LKCNuHYjRQzHv9yrfXi1'], // <-- Replace with allowed price IDs
            },
            {
              product: 'prod_S8Q8PVnxXmwLBN', // <-- Replace with your real Stripe product ID
              prices: ['price_1RE9HmCNuHYjRQzHmJMR6KJD', 'price_1RE9LZCNuHYjRQzHs7s9nVZp'], // <-- Replace with allowed price IDs
            },
          ],
        },
        invoice_history: {
          enabled: true,
        },
        payment_method_update:{
          enabled:true
        }
        // Optional: other features like payment method update, cancel, etc.
      },
    });
    


    const session = await stripe.billingPortal.sessions.create({
      customer: customerid,
      return_url: query || 'https://workscout-ui.vercel.app/workscout/profile',
      configuration: configuration.id  //'{{CONFIGURATION_ID}}'
    });


    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Stripe error:", e);
    return NextResponse.json(
      { error: "Failed to create Stripe session" },
      { status: 500 }
    );
  }
}



