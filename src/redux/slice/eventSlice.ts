
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import get_fetch from "../../fetch_config/get_fetch";
import post_fetch from "../../fetch_config/post_fetch";
import get_user from "../../fetch_config/get_user";

import type { SerializedError } from "@reduxjs/toolkit";

//import {events, user} from "../../mocked_data/data.ts"

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
// mudar na api a resposta do login e do user
interface loginRes{
    id: number,
    token: string
}

interface user{
    id: number,
    name: string,
    age: number,
    email: string,
    token: string
}
export interface InicialState {
    loading: boolean;
    events: Array<Event> | null;
    loginReturn: loginRes | null;
    user: user | null
    errorLogin: SerializedError | null
    number: number;
}

export const initialState: InicialState = {
    loading: false,
    events: null,
    loginReturn: null,
    user: null,
    errorLogin: null,
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

export const LoginUser = createAsyncThunk("LoginUser", async (userLogin: UserLogin) => {
    try{
        const res = await post_fetch("Users/Login", userLogin)
        return res
    }catch (error)
    {
        throw new Error("Erro: " + error)
    }
})

export const userData = createAsyncThunk("userData", async (data: { id: string, token: string }) => {
    try{
        if(data.id && data.token) {
            const res = await get_user(`Users/${data.id}`, data.token)
            return res
        }

        return null
} catch (error) {
    throw new Error("Erro no userData thunk: " + error)
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
            state.loginReturn = action.payload
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.errorLogin = action.error
        })

        builder.addCase(userData.pending, (state) => {
            state.loading = true 
        })
        builder.addCase(userData.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
        })
        builder.addCase(userData.rejected, (state, action) => {
            state.errorLogin = action.error
        })
    }

})
export const {addNumber} = eventSlice.actions
export default eventSlice.reducer