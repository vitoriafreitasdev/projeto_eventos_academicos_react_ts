
import {useParams} from "react-router";
import {useSelector, useDispatch} from "react-redux";
import { type RootState, type AppDispatch} from "../../redux/store";
import {userData} from "../../redux/slice/eventSlice";
import { useEffect } from "react";

const UserPageHook = () => {

    let message: string | null = null

    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.event.loginReturn)
    const user = useSelector((state: RootState) => state.event.user)

    const params = useParams()

    const callUserData = async () => {
        if(data?.token && params.id) {
            await dispatch(userData({id: params.id, token: data.token}))
        }
    }

    useEffect(() => {
        callUserData()
    }, [data?.token, params.id])

    
    if(!data?.token) {
            message = "Você foi desconectado. Por favor, faça login."
    }
    
    
    return {user, message}

}

export default UserPageHook;