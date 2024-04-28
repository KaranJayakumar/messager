export interface LoginResponse {
    jwt: string
    isAuth: boolean
}
export type SearchUser = User[]
export interface UpdateUser {
    message: string
    status: boolean
}
