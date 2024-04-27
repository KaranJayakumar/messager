import { User } from "../Auth/types"
export interface ChatServer {
    id: number
    chatName: string
    chatImage: string | null
    isGroup: boolean
    createdBy: User
    admins: User[]
    users: User[]
}
