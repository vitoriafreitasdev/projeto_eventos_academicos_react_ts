/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

//import get_fetch from "../../fetch_config/get_fetch";
//import post_fetch from "../../fetch_config/post_fetch";
import type { SerializedError } from "@reduxjs/toolkit";
import {events, user} from "../../mocked_data/data.ts"

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    user_Id: number;
}

export interface UserLogin {
    email: string,
    password: string
}

interface userType{
    id: number,
    name: string,
    age: number,
    email: string,
    token: string
}

export interface InicialState {
    loading: boolean;
    events: Array<Event> | null;
    user: userType | null
    errorLogin: SerializedError | null
    number: number;
}

export const initialState: InicialState = {
    loading: false,
    events: null,
    user: null,
    errorLogin: null,
    number: 0
}

// asyncs thunks 

export const CallEvents = createAsyncThunk("CallEvents", async () => {
    try {
        // const res = await get_fetch("Events/getEvents")
        const res = events
        return res
    } catch (error) {
        throw new Error("Erro no thunk CallEvents: " + error)
        
    }
})

export const LoginUser = createAsyncThunk("LoginUser", async (userLogin: UserLogin) => {
    try{
        // const res = await post_fetch("Users/Login", userLogin)
        const res = user
        return res
    }catch (error)
    {
        throw new Error("Erro: " + error)
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
        builder.addCase(LoginUser.pending, (state) => {
            state.loading = true 
        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.errorLogin = action.error
        })
    }

})
export const {addNumber} = eventSlice.actions
export default eventSlice.reducer