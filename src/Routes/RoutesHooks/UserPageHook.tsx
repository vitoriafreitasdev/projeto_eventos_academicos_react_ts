
import {useParams} from "react-router";
import {useSelector, useDispatch} from "react-redux";
import { type RootState, type AppDispatch} from "../../redux/store";
import {userData} from "../../redux/slice/eventSlice";
import { useEffect } from "react";

const UserPageHook = () => {
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.event.loginReturn)
    const user = useSelector((state: RootState) => state.event.user)

    const params = useParams();

    const callUserData = async () => {
        if(data?.token && params.id) {
            await dispatch(userData({id: params.id, token: data.token}))
        }
    }

    useEffect(() => {
        callUserData()
    }, [data?.token, params.id])

    return user

}

export default UserPageHook;