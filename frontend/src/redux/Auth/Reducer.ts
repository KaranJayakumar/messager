import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LoginResponse, SearchUser, User, UpdateUser } from "./types"
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
        registerUser(state, action: PayloadAction<LoginResponse>) {
            state.registerUser = action.payload
        },
        loginUser(state, action: PayloadAction<LoginResponse>) {
            state.loginUser = action.payload
        },
        searchUser(state, action: PayloadAction<SearchUser>) {
            state.searchUser = action.payload
        },
        reqUser(state, action: PayloadAction<User>) {
            state.reqUser = action.payload
        },
        updateUser(state, action: PayloadAction<UpdateUser>) {
            state.updateUser = action.payload
        },
        handleLogout(state) {
            state.reqUser = null
        },
        // Define other reducers here
    },
})
export const {
    registerUser,
    loginUser,
    searchUser,
    reqUser,
    updateUser,
    handleLogout,
} = authSlice.actions
