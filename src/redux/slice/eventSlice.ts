
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import get_fetch from "../../fetch_config/get_fetch";
import post_fetch from "../../fetch_config/post_fetch";
import get_user from "../../fetch_config/get_user";
import post_event from "../../fetch_config/post_event";
import put_event from "../../fetch_config/put_event";

import { type Event, type EventToAdd, type UserLogin, type loginRes, type user, type deleteEvent, type EventEdit,  type certificadoData, type certificado, type registerEventData, type commentary, type commentPost, type commentPostRes} from "../../interfaces/interface";
import delete_event from "../../fetch_config/delete_event";
import certificado_data from "../../fetch_config/certificado_data";
import registered_event from "../../fetch_config/registered_event";
import get_comments from "../../fetch_config/get_comments";
import post_comment from "../../fetch_config/post_comment";

//import {events, user} from "../../mocked_data/data.ts"

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
//editar evento
export const editEvent = createAsyncThunk("editEvent", async (data: EventEdit) => {
    try {
        const res = await put_event("Events/EditEvent", data.content, data.token)
        return res
    } catch (error) {
        throw new Error(" " + error)
    }
})
//dados para o certificado
export const certifcadoEmissao = createAsyncThunk("certificadoEmissao", async (data: certificadoData) => {
    try {
        const res = await certificado_data("Events/GetCertificateData", data)
        return res
    } catch (error) {
        throw new Error(" " + error)
    }
})
//se inscrever no evento
export const registerToEvent = createAsyncThunk("registerToEvent", async (data: registerEventData) => {
    try {
        const res = await registered_event("Site/registerToEvent", data)
        return res
    } catch (error) {
        throw new Error(" " + error)
    }
})
//Comentários
export const showComments = createAsyncThunk("showComments", async (eventId: number) => {
    try {
        const res = await get_comments(`Site/comments/${eventId}`)
        return res
    } catch (error) {
        throw new Error(" " + error)
    }
})

//Adicionar comentário
export const addComments = createAsyncThunk("addComments", async (comment: commentPost) => {
    try {
        const res = await post_comment(`Site/addComment`, comment)
        return res
    } catch (error) {
        throw new Error(" " + error)
    }
})

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
    registerEventMsg: string | null;
    certificado: certificado | null;
    commentary: Array<commentary> | null;
    showComment: boolean;
    lastCommentAdd: commentPostRes | null;
    errorComment: string | undefined | null;

}
// add o state dos comentarios aqui
export const initialState: InicialState = {
    loading: false,
    events: null,
    loginReturn: null,
    user: null,
    error: null,
    errorEdit: null,
    eventToAdd: null,
    eventDeleteId: null,
    editMessage: null,
    registerEventMsg: null,
    certificado: null,
    commentary: null,
    showComment: false,
    lastCommentAdd: null,
    errorComment: null
}

const eventSlice = createSlice({
    name: "eventSlice",
    initialState: initialState,
    reducers: {
        addEventIdDeleted: (state, action) => {
            state.eventDeleteId = action.payload
        },
        resetErrorState: (state) => {
            state.error = null
            state.registerEventMsg = null

        },
        resetErrorEditState: (state) => {
            state.errorEdit = null
        },
        changeShowCommentState: (state, action) => {
            state.showComment = action.payload
        }
    },
    extraReducers: (builder) => {
        //Dados dos eventos
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
        //Login do usuário
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
        //Dados do usuário
        builder.addCase(userData.pending, (state) => {
            state.loading = true 
        })
        builder.addCase(userData.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
        })
        //Adicionar eventos
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
        //Deletar eventos
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
        //Editar eventos       
        builder.addCase(editEvent.fulfilled, (state) => {
            state.editMessage = "Editado com sucesso."
            state.errorEdit = null
        })
        builder.addCase(editEvent.rejected, (state, action) => {
            const error = action.error.message
            const answerError = error?.split(/[""]/)
            if(answerError != undefined) state.errorEdit = answerError[1]
        })
        //Certificado
        builder.addCase(certifcadoEmissao.pending, (state) => {
            state.loading = true
        })
        builder.addCase(certifcadoEmissao.fulfilled, (state, action) => {
            state.certificado = action.payload
            state.loading = false
        })
        builder.addCase(certifcadoEmissao.rejected, (state, action) => {
            const error = action.error.message
            const answerError = error?.split(/[""]/)
            if(answerError != undefined) state.error = answerError[1]
            state.loading = false    
        })
        //Inscrição no evento
         builder.addCase(registerToEvent.pending, (state) => {
            state.registerEventMsg = null;
        })
        builder.addCase(registerToEvent.fulfilled, (state, action) => {
            if(action.payload == true){
                state.registerEventMsg = "Registrado ao evento com sucesso."
            }
        })
        builder.addCase(registerToEvent.rejected, (state, action) => {
            const error = action.error.message
            const answerError = error?.split(/[""]/)
            if(answerError != undefined) state.error = answerError[1]
        })
        //Comentários
        builder.addCase(showComments.pending, (state) => {
            state.loading = true 
        })
        builder.addCase(showComments.fulfilled, (state, action) => {
            if(action.payload.length > 0){
                state.commentary = action.payload
            } else{
                state.commentary = null
            }
            state.loading = false
        })
        builder.addCase(showComments.rejected, (state) => {
            state.loading = false
            state.commentary = null

        })
        //Adicionar comentário
        builder.addCase(addComments.pending, (state) => {
            state.loading = true 
        })
        
        builder.addCase(addComments.fulfilled, (state, action) => {
            if(action.payload != null){
                state.lastCommentAdd = action.payload
            }
            state.loading = false
        })
        builder.addCase(addComments.rejected, (state, action) => {
            state.loading = false
            state.commentary = null
            const error = action.error.message
            const answerError = error?.split(/[""]/)
            if(answerError != undefined) state.errorComment = answerError[1]
        })
    }

})
export const {addEventIdDeleted, resetErrorState, resetErrorEditState, changeShowCommentState} = eventSlice.actions
export default eventSlice.reducer