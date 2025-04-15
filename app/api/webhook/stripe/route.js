import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { baseUrl } from '@/app/utils/constants';

import axios from 'axios';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;



export const plans = [
    {
        name: "Free Plan",

    },
    {
        name: "Basic Plan",

    },
    {
        name: "Standard Plan",

    },
    {
        name: "Pro Plan",

    },
    {
        name: "Premium Plan",

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

                    console.log(res, "res")

                    if (res.status !== 200) {
                        throw new Error("user not found")
                    }


                    // update user subscription status
                    const updateusersubscription = await axios.put(`${baseUrl}subscription/`, {
                        email: customer.email,
                        plan: plan[0].name.split(" ")[0].toUpperCase(),
                        stripeCustomerId: customer.customer
                    })


                    console.log(updateusersubscription, "sub from stripe")

                    if (updateusersubscription.status !== 200) {
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

                console.log(subscription)

                const res = await axios.get(`${baseUrl}customer/${customer.customer}`)

                if (res.status !== 200) {
                    throw new Error("user not found")
                }


                // update user subscription status
                const updateusersubscription = await axios.put(`${baseUrl}subscription/`, {
                    email: res.data.data.email,
                    active: false
                })


                console.log(updateusersubscription, "sub from stripe")

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