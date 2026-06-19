
import { useDispatch, useSelector } from "react-redux"
import { type RootState, type AppDispatch } from "../../redux/store"
import { CallEvents, registerToEvent } from "../../redux/slice/eventSlice"
import { useEffect, useState } from "react"
const Events = () => {
    const dispatch = useDispatch<AppDispatch>()
    const events = useSelector((state: RootState) => state.event.events)
    const loginReturn = useSelector((state: RootState) => state.event.loginReturn)
    const [messageToUser, setMessageToUser] = useState<string | null>(null)

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
        }, 1500)

    }

    return {events, messageToUser, registerInEvent}
            
}

export default Events