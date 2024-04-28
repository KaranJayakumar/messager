import { BASE_API_URL } from "@/config/api"
import { AppDispatch } from "../store"
import { GetMessagesRequest, SendMessageRequest } from "./types"
import { createMessageAction, getChatMessagesAction } from "./Reducer"
export const createMessage =
    (data: SendMessageRequest) => async (dispatch: AppDispatch) => {
        try {
            const res = await fetch(`${BASE_API_URL}/api/messages/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `BEARER ${data.token}`,
                },
                body: JSON.stringify(data),
            })
            const resJson = await res.json()
            console.log(JSON.stringify(resJson))
            dispatch(createMessageAction(resJson))
        } catch (e) {
            console.log(e)
        }
    }
export const getAllMessages =
    (data: GetMessagesRequest) => async (dispatch: AppDispatch) => {
        try {
            const res = await fetch(
                `${BASE_API_URL}/api/messages/chat/${data.chatId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `BEARER ${data.token}`,
                    },
                }
            )
            const resJson = await res.json()
            dispatch(getChatMessagesAction(resJson))
        } catch (e) {
            console.log(e)
        }
    }
