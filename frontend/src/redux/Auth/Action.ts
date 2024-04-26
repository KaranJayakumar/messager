import { BASE_API_URL } from "@/config/api"
import {
    REGISTER,
    LOGIN,
    REQ_USER,
    SEARCH_USER,
    UPDATE_USER,
} from "./ActionType"
import { AppDispatch } from "../store"

export const register = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const res = await fetch(`${BASE_API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const user = await res.json()
        console.log("register ", user)
        if (user.jwt) localStorage.setItem("token", user.jwt)
        dispatch({ type: REGISTER, payload: user })
    } catch (e) {
        console.log("Error in SignUp")
        console.log(e)
    }
}
export const login = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const res = await fetch(`${BASE_API_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const user = res.json()
        console.log("login" + user)
        dispatch({ type: LOGIN, payload: user })
    } catch (e) {
        console.log("Error in Login")
        console.log(e)
    }
}
export const currentUser = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const res = await fetch(`${BASE_API_URL}/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })
        const user = res.json()
        console.log("login" + user)
        dispatch({ type: REQ_USER, payload: user })
    } catch (e) {
        console.log("Error in finding Current User")
        console.log(e)
    }
}
export const searchUser = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const res = await fetch(
            `${BASE_API_URL}/users/search?name={data.searchQuery}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `BEARER ${data.token}`,
                },
            }
        )
        const user = res.json()
        console.log("login" + user)
        dispatch({ type: SEARCH_USER, payload: user })
    } catch (e) {
        console.log("Error in searching User")
        console.log(e)
    }
}
export const updateUser = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const res = await fetch(`${BASE_API_URL}/users/update/${data.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `BEARER ${data.token}`,
            },
        })
        const user = res.json()
        console.log("login" + user)
        dispatch({ type: UPDATE_USER, payload: user })
    } catch (e) {
        console.log("Error in updating User")
        console.log(e)
    }
}
