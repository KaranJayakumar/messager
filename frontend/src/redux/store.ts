import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { authSlice } from "./Auth/Reducer"

const rootReducer = combineReducers({
    auth: authSlice.reducer,
})
export const store = configureStore({
    reducer: {
        rootReducer: rootReducer,
    },
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
