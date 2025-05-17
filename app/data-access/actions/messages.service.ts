"use server"

import { baseUrl } from "@/app/utils/constants"
import axios from "axios"
import { revalidateTag } from "next/cache"

export const getMessages = async (roomId:string) => {
    try {
        const response = await fetch(baseUrl + `messages/${roomId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next:{tags:["messages"]}
        })
        if (!response.ok) {
            throw new Error("Failed to fetch messages")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching messages:", error)
    } 
}


export const getAllMessages = async (userId:string) => {

    try {
        const response = await fetch(baseUrl + `allmessages/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next:{tags:["allmessages"]}
        })
        if (!response.ok) {
            throw new Error("Failed to fetch messages")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching messages:", error)
    } 
}




export const createRoom = async () => {
    try {
        const response = await axios.post( baseUrl + `room`, {})
        if (response.status !== 201) {
            throw new Error("Failed to create room")
        }
     
        return response.data
    } catch (error) {
        console.error("Error fetching messages:", error)
    } 
}



export const createMessage = async (mesage:{
    roomId:string,
    content:string,
    senderId:string,
    receiverId:string
}) => {
    try {
        const response = await axios.post(baseUrl + `message`, {
            roomId: mesage.roomId,
            content: mesage.content,
            senderId: mesage.senderId,
            receiverId: mesage.receiverId,
        })
        if (response.status !== 201) {
            throw new Error("Failed to create message")
        }
        revalidateTag("messages")
        revalidateTag("allmessages")
        return response.data
    } catch (error) {
        console.error("Error fetching messages:", error)
    } 
}