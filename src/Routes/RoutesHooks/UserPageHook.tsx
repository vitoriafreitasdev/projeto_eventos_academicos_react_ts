
import {useNavigate} from "react-router-dom"
import {useParams} from "react-router";

import { useEffect, useState } from "react";

import {useSelector, useDispatch} from "react-redux";

import {type EventToAdd, type deleteEvent} from "../../interfaces/interface";
import { type RootState, type AppDispatch} from "../../redux/store";

import {userData, addEvent, delEvent, addEventIdDeleted, resetErrorState, showRegisterUsers} from "../../redux/slice/eventSlice";

const UserPageHook = () => {
    const params = useParams()
    const navigate = useNavigate()

    let message: string | null = null

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [user_Id] = useState<string | undefined>(params.id)
    const [key, setKey] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const [callEffect, setCallEffect] = useState<EventToAdd | null>(null)

    const dispatch = useDispatch<AppDispatch>();

    const data = useSelector((state: RootState) => state.event.loginReturn)
    const user = useSelector((state: RootState) => state.event.user)
    const loading = useSelector((state: RootState) => state.event.loading)
    const error = useSelector((state: RootState) => state.event.error) 
    const usersRegistersInEvents = useSelector((state: RootState) => state.event.usersRegistersInEvents) 

    useEffect(() => {
        const callUserData = async () => {
            if(data?.token && params.id) {
                await dispatch(userData({id: params.id, token: data.token}))
            }
        }
        dispatch(resetErrorState())

        callUserData()
    }, [callEffect])

    const addEventNew = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const newEvent: EventToAdd = {
            title: title,
            description: description,
            date: date,
            user_Id: user_Id,
            key: key
        }
        await dispatch(addEvent(newEvent))
        
        setTimeout(() => {
            dispatch(resetErrorState())
            setCallEffect(newEvent)
        }, 1250)
    }

    const deleteUserEvent = async (idEvent: number) => {
        if(user_Id != undefined){
            const delItem: deleteEvent = {
                eventId: idEvent,
                userId: parseInt(user_Id)
            }
            dispatch(addEventIdDeleted(idEvent))
            await dispatch(delEvent(delItem))
        }
    }

    const goToEdit = async (idEvent: number) => {
        navigate(`/user/${params.id}/${idEvent}`)
    }
    
    
    if(!data?.token) {
        message = "Você foi desconectado. Por favor, faça login."
    }

    const callRegisterUsers = async (eventId: number) => {
        await dispatch(showRegisterUsers(eventId))
        setShow(true)
    } 
    
    return {
        user, 
        message, 
        setTitle, 
        setDescription, 
        setDate, 
        setKey, 
        addEventNew, 
        loading, 
        error,
        deleteUserEvent,
        goToEdit,
        callRegisterUsers,
        usersRegistersInEvents,
        show,
        setShow
    }

}

export default UserPageHook;