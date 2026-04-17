
import { useDispatch, useSelector } from "react-redux"
import { type RootState, type AppDispatch } from "../redux/store"
import { CallEvents } from "../redux/slice/eventSlice"
import { useEffect } from "react"
const Events = () => {
    const dispatch = useDispatch<AppDispatch>()
    const Events = useSelector((state: RootState) => state.event.events)

    useEffect( () => {
         const callThunk = async () => {
            await dispatch(CallEvents())
         }

         callThunk()
    }, [])


    if(Events) {
        
        return Events
    }

    return false
            
}

export default Events