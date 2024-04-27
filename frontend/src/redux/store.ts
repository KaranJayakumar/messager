import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./Auth/Reducer"
import { chatSlice } from "./Chat/Reducer"
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        chat: chatSlice.reducer,
    },
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
