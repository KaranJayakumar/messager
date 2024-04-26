import { authReducer } from "@/components/Auth/reducer"
import { combineReducers, configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})

export default store
export type AppDispatch = typeof store.dispatch
