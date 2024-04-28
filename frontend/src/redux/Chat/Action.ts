import { BASE_API_URL } from "@/config/api"
import { AppDispatch } from "../store"
import {
    createGroupChatAction,
    createSingleChatAction,
    getUserChatsAction,
} from "./Reducer"
interface SingleChatData {
    token: string
}
export const createChat = (chatData) => async (dispatch: AppDispatch) => {
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
    (groupChatData) => async (dispatch: AppDispatch) => {
        try {
            const res = await fetch(`${BASE_API_URL}/api/chats/group`, {
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
    (userChatData) => async (dispatch: AppDispatch) => {
        try {
            const res = await fetch(`${BASE_API_URL}/api/chats/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userChatData.token}`,
                },
                body: JSON.stringify(userChatData),
            })
            const responseJson = await res.json()
            dispatch(getUserChatsAction(responseJson))
        } catch (e) {
            console.log("Error creating chat", e)
        }
    }
