/* eslint-disable @typescript-eslint/no-unused-vars */
import {useParams} from "react-router";
import {useSelector, useDispatch} from "react-redux";
import { type RootState, type AppDispatch} from "../../redux/store";
import {useNavigate} from "react-router-dom"
import {type Event, type EventEdit} from "../../interfaces/interface";

import { editEvent } from "../../redux/slice/eventSlice";

import { useState } from "react";
const EditHook = () => {
    const params = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>() 

    let message: string | null = null

    const data = useSelector((state: RootState) => state.event.loginReturn)
    const error = useSelector((state: RootState) => state.event.errorEdit)
    const editMsg = useSelector((state: RootState) => state.event.editMessage)


    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")
    const [chave, setChave] = useState("")


    if(!data?.token){
        message = "Você não está logado, re-faça o seu login."
    }

    const returnToLogin = () => {
        navigate("/login")
    }

   const edit = async () => {

        if(params.eventid && params.userid && data?.token){

            const edit: Event = {
                id: parseInt(params.eventid),
                title: title,
                description: desc,
                date: date,
                key: chave,
                user_Id: parseInt(params.userid)
            }

            const item: EventEdit = {
                content: edit,
                token: data?.token
            }

            await dispatch(editEvent(item))

        }
   }

   const backToUserPage = () => {
        navigate(`/user/${params.userid}`)
   }
    return {message, returnToLogin, edit, setTitle, setDesc, setDate, setChave, error, editMsg, backToUserPage};
}

export default EditHook