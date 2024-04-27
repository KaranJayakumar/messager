import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ChatServer } from "./types"
interface ChatState {
    chats: ChatServer[]
    createdGroup: ChatServer | null
    createdChat: ChatServer | null
}
const InitialChatState: ChatState = {
    chats: [],
    createdChat: null,
    createdGroup: null,
}
export const chatSlice = createSlice({
    name: "chat",
    initialState: InitialChatState,
    reducers: {
        createSingleChat(state, action: PayloadAction<ChatServer>) {
            state.createdChat = action.payload
        },
        createGroupChat(state, action: PayloadAction<ChatServer>) {
            state.createdGroup = action.payload
        },
        getUserChats(state, action: PayloadAction<ChatServer[]>) {
            state.chats = action.payload
        },
    },
})
export const { createGroupChat, createSingleChat, getUserChats } =
    chatSlice.actions
