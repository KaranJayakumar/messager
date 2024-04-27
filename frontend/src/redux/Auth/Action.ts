import { BASE_API_URL } from "@/config/api"
import { AppDispatch } from "../store"
import { handleLogout, loginUser, registerUser, reqUser } from "./Reducer"
interface RegisterUser {
    fullName: string
    email: string
    password: string
}

interface LoginUser {
    email: string
    password: string
}
interface LoginUser {
    email: string
    password: string
}
interface ReqUser {
    token: string | null
}
interface SearchUser {
    query: string
    token: string
}
interface UpdateUser {
    id: number
    token: string
    full_name: string
    profile_picture: string
}
export const register =
    (data: RegisterUser) => async (dispatch: AppDispatch) => {
        try {
            const response = await fetch(`${BASE_API_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const res = await response.json()
            console.log("register ", res)
            if (res.jwt) localStorage.setItem("token", res.jwt)
            dispatch(registerUser(res))
        } catch (e) {
            console.log("Error in SignUp")
            console.log(e)
        }
    }
export const login = (data: LoginUser) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(`${BASE_API_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const res = await response.json()
        console.log("login" + res)
        dispatch(loginUser(res))
    } catch (e) {
        console.log("Error in Login")
        console.log(e)
    }
}
export const currentUser = (data: ReqUser) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `BEARER ${data.token}`,
            },
        })
        const res = await response.json()
        console.log("reqUser" + res)
        dispatch(reqUser(res))
    } catch (e) {
        console.log("Error in finding Current User")
        console.log(e)
    }
}
export const searchUser =
    (data: SearchUser) => async (dispatch: AppDispatch) => {
        try {
            const response = await fetch(
                `${BASE_API_URL}/api/users/search?name={data.searchQuery}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `BEARER ${data.token}`,
                    },
                }
            )
            const res = await response.json()
            console.log("login" + res)
            dispatch(searchUser(res))
        } catch (e) {
            console.log("Error in searching User")
            console.log(e)
        }
    }
export const updateUser =
    (data: UpdateUser) => async (dispatch: AppDispatch) => {
        try {
            const response = await fetch(
                `${BASE_API_URL}/api/users/update/${data.id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `BEARER ${data.token}`,
                    },
                }
            )
            const res = await response.json()
            console.log("login" + res)
            dispatch(updateUser(res))
        } catch (e) {
            console.log("Error in updating User")
            console.log(e)
        }
    }
export const logout = () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("token")
    dispatch(handleLogout())
}
