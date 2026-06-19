import { useState } from "react";

import {useSelector, useDispatch} from "react-redux";
import { type RootState, type AppDispatch} from "../../redux/store";
import { certifcadoEmissao, resetErrorState } from "../../redux/slice/eventSlice";

import type { certificadoData } from "../../interfaces/interface";

const CertificadoHook = () => {
    const dispatch = useDispatch<AppDispatch>() 

    const certificado = useSelector((state: RootState) => state.event.certificado)
    const loading = useSelector((state: RootState) => state.event.loading)
    const error = useSelector((state: RootState) => state.event.error)

    const [email, setEmail] = useState<string>("")
    const [key, setKey] = useState<string>("")
    const [btnPressed, setBtnPressed] = useState<boolean>(false)

    const emitir = async () => {
        setBtnPressed(false)
        const obj: certificadoData = {
            email: email,
            key: key
        }
        
        await dispatch(certifcadoEmissao(obj))
        setBtnPressed(true)
        setTimeout(() => {
            dispatch(resetErrorState())
        }, 1500)
    }

    return {setEmail, setKey, emitir, certificado, loading, error, btnPressed}
}

export default CertificadoHook;