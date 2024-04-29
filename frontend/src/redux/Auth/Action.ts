import { BASE_API_URL } from "@/config/api"
import { AppDispatch } from "../store"
import {
    handleLogoutAction,
    loginUserAction,
    registerUserAction,
    reqUserAction,
    searchUserAction,
    updateUserAction,
} from "./Reducer"
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
            dispatch(registerUserAction(res))
        } catch (e) {
            console.log("Error in SignUp")
            console.log(e)
        }
    }
export const login = (data: LoginUser) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(`${BASE_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const res = await response.json()
        if (res.jwt) localStorage.setItem("token", res.jwt)
        console.log("login" + res)
        dispatch(loginUserAction(res))
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
        dispatch(reqUserAction(res))
    } catch (e) {
        console.log("Error in finding Current User")
        console.log(e)
    }
}
export const searchUser =
    (data: SearchUser) => async (dispatch: AppDispatch) => {
        try {
            const response = await fetch(
                `${BASE_API_URL}/api/users/${data.query}`,
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
            dispatch(searchUserAction(res))
        } catch (e) {
            console.log("Error in searching User")
            console.log(e)
        }
    }
export const updateUser =
    (data: UpdateUser) => async (dispatch: AppDispatch) => {
        try {
            const response = await fetch(`${BASE_API_URL}/api/users/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `BEARER ${data.token}`,
                },
                body: JSON.stringify(data),
            })
            const res = await response.json()
            console.log("login" + res)
            dispatch(updateUserAction(res))
        } catch (e) {
            console.log("Error in updating User")
            console.log(e)
        }
    }
export const logout = () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("token")
    dispatch(handleLogoutAction())
}
