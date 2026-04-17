
import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "../redux/slice/eventSlice"

const store = configureStore({
    reducer: {
        event: eventSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store