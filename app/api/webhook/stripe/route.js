import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { baseUrl } from '@/app/utils/constants';

import axios from 'axios';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;



const plans = [
    {
        name: "Free Plan",
        priceId: "",
        annualPriceId: "",
    },
    {
        name: "Basic Plan",
        priceId: "price_1RDPZICNuHYjRQzHxQssOkdG", // monthly
        annualPriceId: "price_1RE9LKCNuHYjRQzHv9yrfXi1",

    },
    {
        name: "Standard Plan",
        priceId: "price_1RE9IRCNuHYjRQzH5bqGdT1W",
        annualPriceId: "price_1RE9KyCNuHYjRQzH6mwQaYIV",

    },
    {
        name: "Premium Plan",
        priceId: "price_1RE9JMCNuHYjRQzHocRSMssk",
        annualPriceId: "price_1RE9KJCNuHYjRQzHp7K3IEnT",
    },
    {
        name: "Pro Plan",
        priceId: "price_1RE9HmCNuHYjRQzHmJMR6KJD",
        annualPriceId: "price_1RE9LZCNuHYjRQzHs7s9nVZp",
    },
];

export async function POST(req) {
    // await connectMongo();

    const body = await req.text();

    const reqHeaders = await headers();
    const signature = reqHeaders.get('stripe-signature');



    let data;
    let eventType;
    let event;

    // verify Stripe event is legit
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed. ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    data = event.data;
    eventType = event.type;

    try {
        switch (eventType) {
            case 'checkout.session.completed': {
                // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
                // ✅ Grant access to the product

                const session = await stripe.checkout.sessions.retrieve(
                    data.object.id,
                    {
                        expand: ['line_items']
                    }
                );
                console.log(session, "session")
                const customerId = session?.customer;
                const customer = await stripe.customers.retrieve(customerId);
                const priceId = session?.line_items?.data[0]?.price.id;

                const plan = plans.filter((p) => p.annualPriceId == priceId || p.priceId == priceId)

                if (!plan) {
                    throw new Error("plan does not exist")
                }

                if (customer.email) {
                    const res = await axios.get(`${baseUrl}account/${customer.email}`)



                    if (res.status !== 200) {
                        throw new Error("user not found")
                    }

                    // console.log(plan[0].name.split(" ")[0].toUpperCase())

                    // update user subscription status
                    const updateusersubscription = await axios.post(`${baseUrl}subscription`, {
                        email: res.data.data.email,
                        plan: plan[0].name.split(" ")[0].toUpperCase(),
                        stripecustomerId: customerId
                    })

                    // console.log(updateusersubscription, "res")


                    // console.log(updateusersubscription, "sub from stripe")

                    if (updateusersubscription.status !== 201) {
                        throw new Error("subscription failed")
                    }

                }



                break;
            }

            case 'customer.subscription.deleted': {
                // ❌ Revoke access to the product
                // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
                const subscription = await stripe.subscriptions.retrieve(
                    data.object.id
                );


                console.log(subscription, "event deleted")

                const res = await axios.get(`${baseUrl}customer/${subscription.customer}`)

                if (res.status !== 200) {
                    throw new Error("user not found")
                }


                // update user subscription status
                // update user subscription status
                const deleteusersubscription = await axios.delete(`${baseUrl}subscription/${res.data.data.email}`)


                // console.log(deleteusersubscription, "sub from stripe")

                if (deleteusersubscription.status !== 200) {
                    throw new Error("subscription failed")
                }


                break;
            }
            case 'customer.subscription.updated': {
                // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
                const subscription = await stripe.subscriptions.retrieve(
                    data.object.id
                );

                // console.log(subscription, "event updated")

                const plan = plans.filter((p) => p.annualPriceId == subscription.plan.id || p.priceId == subscription.plan.id)



                // check if client has a subcription and update
                const res = await axios.get(`${baseUrl}customer/${subscription.customer}`)

                if (res.status !== 200) {
                    throw new Error("user not found")
                }

                 // update user subscription status
                // update user subscription status
                const updateusersubscription = await axios.put(`${baseUrl}subscription`, {
                    email: res.data.data.email,
                    plan: plan[0].name.split(" ")[0].toUpperCase(),
                    stripecustomerId: subscription.customer,
                    active: true
                })

                // console.log(updateusersubscription, 'sub')


                if (updateusersubscription.status !== 200) {
                    throw new Error("subscription failed")
                }


                break;
            
            }

            default:
            // Unhandled event type
        }
    } catch (e) {
        console.error(
            'stripe error: ' + e.message + ' | EVENT TYPE: ' + eventType
        );
    }

    return NextResponse.json({});
}
