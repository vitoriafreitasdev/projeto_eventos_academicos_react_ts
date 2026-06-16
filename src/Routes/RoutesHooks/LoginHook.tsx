import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../../redux/store"
import {useNavigate} from "react-router-dom"
import {LoginUser} from "../../redux/slice/eventSlice"
const LoginHook = () => {
    
    const dispatch = useDispatch<AppDispatch>()
    const userLogged = useSelector((state: RootState) => state.event.loginReturn)
    const error = useSelector((state: RootState) => state.event.errorLogin)

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate()

    const user = {
        email: email,
        password: password
    }

    const logUser = async () => {
       await dispatch(LoginUser(user))
    }

    if(userLogged) {
        navigate(`/user/${userLogged.id}`)
    }
    
    return {
        email,
        setEmail,
        password,
        setPassword,
        logUser,
        userLogged,
        error
    }
}

export default LoginHook;