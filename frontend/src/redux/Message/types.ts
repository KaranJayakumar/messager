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
    chatId: string
    userId: string
    token: number
}
export interface GetMessagesRequest {
    token: number
    chatId: number
}
