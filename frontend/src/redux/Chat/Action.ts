import { BASE_API_URL } from "@/config/api"
import { AppDispatch } from "../store"
import {
    createGroupChatAction,
    createSingleChatAction,
    getUserChatsAction,
} from "./Reducer"
interface ChatData {
    userId: number | null
    token: string
}
interface GroupChatData {
    userIds: number[]
    chatName: string
    chatImage: string
    token: string
}
export const createChat =
    (chatData: ChatData) => async (dispatch: AppDispatch) => {
        try {
            const res = await fetch(`${BASE_API_URL}/api/chats/createChat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${chatData.token}`,
                },
                body: JSON.stringify(chatData),
            })
            const responseJson = await res.json()
            dispatch(createSingleChatAction(responseJson))
        } catch (e) {
            console.log("Error creating chat", e)
        }
    }
export const createGroupChat =
    (groupChatData: GroupChatData) => async (dispatch: AppDispatch) => {
        try {
            const res = await fetch(`${BASE_API_URL}/api/chats/createGroup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${groupChatData.token}`,
                },
                body: JSON.stringify(groupChatData),
            })
            const responseJson = await res.json()
            dispatch(createGroupChatAction(responseJson))
        } catch (e) {
            console.log("Error creating chat", e)
        }
    }
export const getChatsForUser =
    (userChatData: Omit<ChatData, "userId">) =>
    async (dispatch: AppDispatch) => {
        try {
            const res = await fetch(`${BASE_API_URL}/api/chats/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userChatData.token}`,
                },
            })
            const responseJson = await res.json()
            console.log(responseJson)
            dispatch(getUserChatsAction(responseJson))
        } catch (e) {
            console.log("Error creating chat", e)
        }
    }
