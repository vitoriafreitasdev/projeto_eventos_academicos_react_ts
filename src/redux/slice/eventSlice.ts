
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import get_fetch from "../../fetch_config/get_fetch";
import post_fetch from "../../fetch_config/post_fetch";
import get_user from "../../fetch_config/get_user";
import post_event from "../../fetch_config/post_event";
import put_event from "../../fetch_config/put_event";

import { type Event, type EventToAdd, type UserLogin, type loginRes, type user, type deleteEvent, type EventEdit} from "../../interfaces/interface";
import delete_event from "../../fetch_config/delete_event";

//import {events, user} from "../../mocked_data/data.ts"


interface InicialState {
    loading: boolean;
    events: Array<Event> | null;
    loginReturn: loginRes | null;
    user: user | null
    error: string | undefined | null;
    errorEdit: string | undefined | null;
    eventToAdd: EventToAdd | null;
    eventDeleteId: number | null;
    editMessage: string | null;
}

export const initialState: InicialState = {
    loading: false,
    events: null,
    loginReturn: null,
    user: null,
    error: null,
    errorEdit: null,
    eventToAdd: null,
    eventDeleteId: null,
    editMessage: null
}

// asyncs thunks 
//carregar os eventos
export const CallEvents = createAsyncThunk("CallEvents", async () => {
    try {
        const res = await get_fetch("Events/getEvents")
        return res
    } catch (error) {
        throw new Error("Erro no thunk CallEvents: " + error)
        
    }
})
//logar o usuário
export const LoginUser = createAsyncThunk("LoginUser", async (userLogin: UserLogin) => {
    try{
        const res = await post_fetch("Users/Login", userLogin)
        return res
    }catch (error)
    {
        throw new Error(" " + error)
    }
})
//carregar os dados do usuário
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
//adicionar evento
export const addEvent = createAsyncThunk("addEvent", async (event: EventToAdd) => {
    try {
        const res = await post_event("Events/AddEvent", event)
        return res
    } catch (error) {
        throw new Error("" + error)
    }
})

//deletar evento
export const delEvent = createAsyncThunk("delEvent", async (delItem: deleteEvent) => {
    try {
        const res = await delete_event("Events/DeleteEvent", delItem)
        return res
    } catch (error) {
        throw new Error(" " + error)
    }
})

export const editEvent = createAsyncThunk("editEvent", async (data: EventEdit) => {
    try {
        const res = await put_event("Events/EditEvent", data.content, data.token)
        return res
    } catch (error) {
        throw new Error(" " + error)
    }
})

const eventSlice = createSlice({
    name: "eventSlice",
    initialState: initialState,
    reducers: {
        addEventIdDeleted: (state, action) => {
            state.eventDeleteId = action.payload
        },
        resetErrorState: (state) => {
            state.error = null
        },
        resetErrorEditState: (state) => {
            state.errorEdit = null
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
            state.loginReturn = action.payload
            state.loading = false
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            const error = action.error.message
            const answerError = error?.split(/[""]/)
            if(answerError != undefined) state.error = answerError[1]
            state.loading = false
        })

        builder.addCase(userData.pending, (state) => {
            state.loading = true 
        })
        builder.addCase(userData.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
        })

        builder.addCase(addEvent.pending, (state) => {
            state.loading = true 
        })
        builder.addCase(addEvent.fulfilled, (state, action) => {
            state.loading = false
            state.user?.events?.push(action.payload)
        })
        builder.addCase(addEvent.rejected, (state, action) => {
            const error = action.error.message
            const answerError = error?.split(/[""]/)
            if(answerError != undefined) state.error = answerError[1]
            state.loading = false
        })

        builder.addCase(delEvent.pending, (state) => {
            state.loading = true 
        })
        builder.addCase(delEvent.fulfilled, (state, action) => {
            if(action.payload == true && state.user){
                const filter = state.user?.events?.filter((eventUser) => eventUser.id != state.eventDeleteId)
                state.user.events = filter
                state.loading = false    
            }
        })
        builder.addCase(delEvent.rejected, (state, action) => {
            const error = action.error.message
            const answerError = error?.split(/[""]/)
            if(answerError != undefined) state.error = answerError[1]
            state.loading = false    
        })
      
        
        builder.addCase(editEvent.fulfilled, (state) => {
            state.editMessage = "Editado com sucesso."
            state.errorEdit = null
        })
        builder.addCase(editEvent.rejected, (state, action) => {
            const error = action.error.message
            const answerError = error?.split(/[""]/)
            if(answerError != undefined) state.errorEdit = answerError[1]
        })
    }

})
export const {addEventIdDeleted, resetErrorState, resetErrorEditState} = eventSlice.actions
export default eventSlice.reducer