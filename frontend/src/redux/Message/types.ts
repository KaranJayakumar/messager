import { User } from "@/types"
import { ChatServer } from "../Chat/types"

export interface Message {
    Id: number
    content: string
    timestamp: Date
    user: User
    chatServer: ChatServer
}
export interface SendMessageRequest {
    content: string
    chatId: number
    userId: number
    token: string
}
export interface GetMessagesRequest {
    token: string
    chatId: number
}
