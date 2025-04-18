"use server"

import { baseUrl } from "@/app/utils/constants";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";



// Simulated DB call for onboarding status
export async function getUserSubscriptionStatus() {
    const { isAuthenticated, getUser, getAccessTokenRaw } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    const accessToken = await getAccessTokenRaw();


    const user = await getUser();

    try {
        if (!isUserAuthenticated) {
            throw new Error("user is not authenticated")
        }

   


        const res = await axios.post(`${baseUrl}status`,  {kindeId: user.id},{
            headers: {
                Authorization: "Bearer " + accessToken
            }
        })

        if (res.status !== 200) {
            throw new Error(JSON.stringify(res.data))
        }


        return {
            status: res.status,
            data: res.data,
            error: ""
        }

    } catch (error) {
        return {
            status: 500,
            error: error,
            data: ""
        }
    }

}



// Simulated DB call for onboarding status
export async function createFreeSubscription() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    

    const user = await getUser();

    try {
        if (!isUserAuthenticated) {
            throw new Error("user is not authenticated")
        }

   
console.log(user.email)

        const res = await axios.post(`${baseUrl}subscription`,  {
            email:user.email,
            plan:"FREE",
            
        },{
          
        })

        if (res.status !== 201) {
            throw new Error(JSON.stringify(res.data))
        }


        return {
            status: res.status,
            data: res.data,
            error: ""
        }

    } catch (error) {
        return {
            status: 500,
            error: error,
            data: ""
        }
    }

}