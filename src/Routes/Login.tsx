import classes from './Login.module.css'
const Login = () => {
  return (
    <div className={classes.login_container}>
        <h2>Faça o seu login abaixo!</h2>
        <form>
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" required />
            <button>Entrar</button>
        </form>
    </div>
  )
}

export default Login