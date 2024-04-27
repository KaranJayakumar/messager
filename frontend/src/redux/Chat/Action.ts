import { BASE_API_URL } from "@/config/api"
import { AppDispatch } from "../store"

export const createChat = (chatData) => async (dispatch: AppDispatch) => {
    try {
        const res = await fetch(`${BASE_API_URL}/api/chats/single`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${chatData.token}`,
            },
            body: JSON.stringify(chatData),
        })
        const responseJson = await res.json()
        dispatch(createSingleChat(responseJson))
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
            dispatch(createGroupChat(responseJson))
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
            dispatch(getUserChats(responseJson))
        } catch (e) {
            console.log("Error creating chat", e)
        }
    }
