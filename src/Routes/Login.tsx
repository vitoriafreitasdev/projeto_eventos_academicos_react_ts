import classes from './Login.module.css'
import LoginHook from './RoutesHooks/LoginHook'
const Login = () => {

  const {setEmail, setPassword, logUser, error} = LoginHook()
 // colocar mensagem de espera ou erro
  return (
    <div className={classes.login_container}>
        <h2>Faça o seu login abaixo!</h2>
         {error && <p>{error}</p>} 
        <form>
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="password" >Senha:</label>
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={logUser}>Entrar</button>
        </form>
    </div>
  )
}

export default Login