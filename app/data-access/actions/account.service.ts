"use server"

import { baseUrl } from "@/app/utils/constants";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getAccount() {
    const { isAuthenticated, getAccessTokenRaw , getUser} = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    const accessToken = await getAccessTokenRaw();
    const user = await getUser()



    try {
        if (!isUserAuthenticated) {
            throw new Error("user is not authenticated")
        }
  

        const response= await fetch(`${baseUrl}account/${user.email}`,{
            method:"GET",
            headers:{
                Authorization: "Bearer " + accessToken
            },
            next:{tags:["getaccount"]}
        })
        

        const data= await response.json()

        if (response.status !== 200) {
            throw new Error(JSON.stringify(data))
        }


        return {
            status: response.status,
            data: data.data,
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