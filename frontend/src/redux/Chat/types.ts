import { User } from "@/types"
export interface ChatServer {
    id: number
    chatName: string
    chatImage: string | null
    group: boolean
    createdBy: User
    admins: User[]
    users: User[]
}
