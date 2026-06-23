import classes from './Cadastro.module.css'
import CadastroHook from './RoutesHooks/CadastroHook'
const Cadastro = () => {
  const {setNome, setIdade, setEmail, setPass, register, error, loading} = CadastroHook()
  return (
    <div className={classes.cadastro_container}>
      <h2>Se registre abaixo!</h2>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <form>
        <label>Nome: </label>
        <input type="text" onChange={(e) => setNome(e.target.value)}/>
        <label>Idade:</label>
        <input type="number" onChange={(e) => setIdade(parseInt(e.target.value))}/>
        <label>E-mail:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)}/>
        <label>Senha:</label>
        <input type="password" onChange={(e) => setPass(e.target.value)}/>
        <button onClick={register}>Cadastrar</button>
      </form>
    </div>
  )
}

export default Cadastro