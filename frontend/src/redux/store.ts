import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./Auth/Reducer"
import { chatSlice } from "./Chat/Reducer"
import { messageSlice } from "./Message/Reducer"
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        chat: chatSlice.reducer,
        message: messageSlice.reducer,
    },
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
