"use server"

import { baseUrl } from "@/app/utils/constants";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import { revalidateTag } from "next/cache";





export async function getJobs() {
    const { isAuthenticated, getAccessTokenRaw } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    const accessToken = await getAccessTokenRaw();



    try {
        if (!isUserAuthenticated) {
            throw new Error("user is not authenticated")
        }
  

        const response= await fetch(`${baseUrl}jobs`,{
            method:"GET",
            headers:{
                Authorization: "Bearer " + accessToken
            },
            next:{tags:["getjobs"]}
        })
        

        const data= await response.json()
        console.log(data, "data")

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



export async function bookmarkJob(bookmark:boolean, jobId:string) {
    const { isAuthenticated, getAccessTokenRaw } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    const accessToken = await getAccessTokenRaw();


    console.log(bookmark, jobId)

    try {
        if (!isUserAuthenticated) {
            throw new Error("user is not authenticated")
        }
  

        const response= await axios.put(`${baseUrl}job`,{
            bookmarked:bookmark,
            jobId:jobId
        },{
           
            headers:{
                Authorization: "Bearer " + accessToken
            },
          
        })
        


       

        if (response.status !== 200) {
            throw new Error(JSON.stringify(response.data))
        }

        revalidateTag("getjobs")


        return {
            status: response.status,
            data: response.data.data,
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