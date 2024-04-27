export interface LoginResponse {
    jwt: string
    isAuth: boolean
}
export interface User {
    Id: number
    fullName: string
    email: string
    profile_picture: string
    password: string
}
export interface SearchUser {
    users: User[]
}
export interface UpdateUser {
    message: string
    status: boolean
}
