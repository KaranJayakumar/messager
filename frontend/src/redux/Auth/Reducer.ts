import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LoginResponse, SearchUser, UpdateUser } from "./types"
import { User } from "@/types"
export interface AuthState {
    registerUser: LoginResponse | null
    loginUser: LoginResponse | null
    reqUser: User | null
    searchUser: SearchUser | null
    updateUser: UpdateUser | null
}

const initialState: AuthState = {
    registerUser: null,
    loginUser: null,
    searchUser: null,
    updateUser: null,
    reqUser: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        registerUserAction(state, action: PayloadAction<LoginResponse>) {
            state.registerUser = action.payload
        },
        loginUserAction(state, action: PayloadAction<LoginResponse>) {
            state.loginUser = action.payload
        },
        searchUserAction(state, action: PayloadAction<SearchUser>) {
            state.searchUser = action.payload
        },
        reqUserAction(state, action: PayloadAction<User>) {
            state.reqUser = action.payload
        },
        updateUserAction(state, action: PayloadAction<UpdateUser>) {
            state.updateUser = action.payload
        },
        handleLogoutAction(state) {
            state.reqUser = null
        },
        // Define other reducers here
    },
})
export const {
    registerUserAction,
    loginUserAction,
    searchUserAction,
    reqUserAction,
    updateUserAction,
    handleLogoutAction,
} = authSlice.actions
