
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import get_fetch from "../../fetch_config/get_fetch";

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    user_Id: number;
}


export interface InicialState {
    loading: boolean;
    events: Array<Event> | null;
    number: number;
}

export const initialState: InicialState = {
    loading: false,
    events: null,
    number: 0
}

// asyncs thunks 

export const CallEvents = createAsyncThunk("CallEvents", async () => {
    try {
        const res = await get_fetch("Events/getEvents")
        return res
    } catch (error) {
        throw new Error("Erro no thunk CallEvents: " + error)
        
    }
})

const eventSlice = createSlice({
    name: "eventSlice",
    initialState: initialState,
    reducers: {
        addNumber: (state, action) => {
            state.number += action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CallEvents.pending, (state) => {
            state.loading = true
        })
        builder.addCase(CallEvents.fulfilled, (state, action) => {
            state.loading = false
            state.events = action.payload
        })

        builder.addCase(CallEvents.rejected, (state, action) => {
            state.loading = false
            state.events = null 
            console.log("Error no builder: ", action.error)
        })
    }

})
export const {addNumber} = eventSlice.actions
export default eventSlice.reducer