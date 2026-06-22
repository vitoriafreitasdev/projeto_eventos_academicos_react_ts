
import { useDispatch, useSelector } from "react-redux"
import { type RootState, type AppDispatch } from "../../redux/store"
import { CallEvents, changeShowCommentState, registerToEvent, resetErrorState } from "../../redux/slice/eventSlice"
import { useEffect, useState } from "react"
const Events = () => {
    const dispatch = useDispatch<AppDispatch>()
    const events = useSelector((state: RootState) => state.event.events)
    const loginReturn = useSelector((state: RootState) => state.event.loginReturn)
    const error = useSelector((state: RootState) => state.event.error)
    const registerEventMsg = useSelector((state: RootState) => state.event.registerEventMsg)
    const showComment = useSelector((state: RootState) => state.event.showComment)

    
    const [messageToUser, setMessageToUser] = useState<string | null>(null)
    //const [showComment, setShowComment] = useState<boolean>(false)
    const [idEvent, setIdEvent] = useState<number | null>(null)


    useEffect( () => {
         const callThunk = async () => {
            await dispatch(CallEvents())
         }

         callThunk()
    }, [])


    const registerInEvent = async (eventId: number) => {
        if(!loginReturn?.token){
            setMessageToUser("Para se inscrever no evento precisa estar logado.")
        }
        else{
            if(loginReturn?.id){
                const item = {
                    eventId: eventId,
                    userId: loginReturn.id
                }
                await dispatch(registerToEvent(item))
            }
            
        }

        setTimeout(() => {
            setMessageToUser(null)
            dispatch(resetErrorState())
        }, 1500)

    }

    const showCommentComponent = (state: boolean, id: number) => {
        //caso seja o mesmo evento, vai colocar o estado acontrario do que ta salva, caso seja diferente, segui como true
        if(id == idEvent || idEvent == null){
            dispatch(changeShowCommentState(state))
        }else{
            changeShowCommentState(true)
        }
        setIdEvent(id)
    }

    return {events, messageToUser, registerInEvent, error, registerEventMsg, showComment, idEvent, showCommentComponent}
            
}

export default Events