import classes from './Cadastro.module.css'
const Cadastro = () => {
  return (
    <div className={classes.cadastro_container}>
      <h2>Se registre abaixo!</h2>
      <form>
        <label>Nome: </label>
        <input type="text" />
        <label>Idade:</label>
        <input type="number"/>
        <label>E-mail:</label>
        <input type="email"/>
        <label>Senha:</label>
        <input type="password"/>
        <button>Cadastrar</button>
      </form>
    </div>
  )
}

export default Cadastro