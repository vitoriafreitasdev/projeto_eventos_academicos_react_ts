import { useState } from "react"
import { LoginUser, regUser } from "../../redux/slice/eventSlice"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/store"
import { useNavigate } from "react-router-dom"


const CadastroHook = () => {
    const dispatch = useDispatch<AppDispatch>()
    const registerReturn = useSelector((state: RootState) => state.event.registerReturn)
    const userLogged = useSelector((state: RootState) => state.event.loginReturn)
    const error = useSelector((state: RootState) => state.event.error)
    const loading = useSelector((state: RootState) => state.event.loading)

    const [nome, setNome] = useState<string>("")
    const [idade, setIdade] = useState<number>(0)
    const [email, setEmail] = useState<string>("")
    const [pass, setPass] = useState<string>("")

    const navigate = useNavigate()

    const register = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if(nome.length > 0 && email.length > 0 && pass.length > 0 && idade > 18){

            const newUser = {
                name: nome, 
                age: idade, 
                email: email,
                password: pass
            }

            await dispatch(regUser(newUser))

        }
        
    }

    if(registerReturn){ 
        const user = {
            email: registerReturn.email,
            password: pass
        }

        const logUser = async () => {
            await dispatch(LoginUser(user))
        }
        
        logUser()
    }

    if(userLogged && registerReturn && userLogged.id == registerReturn?.id) {
        navigate(`/user/${registerReturn.id}`)
    }

    return {setNome, setIdade, setEmail, setPass, register, error, loading}

}

export default CadastroHook