import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Message } from "./types"
interface MessageState {
    messages: Message[]
    newMessage: Message | null
}
const InitialMessageState: MessageState = {
    messages: [],
    newMessage: null,
}
export const messageSlice = createSlice({
    name: "message",
    initialState: InitialMessageState,
    reducers: {
        createMessageAction(state, action: PayloadAction<Message>) {
            state.newMessage = action.payload
        },
        getChatMessagesAction(state, action: PayloadAction<Message[]>) {
            state.messages = action.payload
        },
    },
})
export const { createMessageAction, getChatMessagesAction } =
    messageSlice.actions
