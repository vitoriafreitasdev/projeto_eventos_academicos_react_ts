import UserPageHook from "./RoutesHooks/UserPageHook";
import classes from "./UserPage.module.css"
import {Link} from "react-router-dom";

const UserPage = () => {
  const {user, message, setTitle, setDescription, setDate, setKey, addEventNew, loading, error, deleteUserEvent, goToEdit} = UserPageHook()

  if(message){
    return (
      <div className={classes.userMessage} >
        <div className={classes.userMessageContainer}>
          <p>{message}</p>
          <Link to="/login">
            <button>Voltar para tela de login</button>
          </Link>
        </div>
      </div>
    )
  }

  
  return (
    <div className={classes.userMainContainer}>
      <div>
        <h2>Seja bem vindo, {user?.name}. Seus eventos registrados:</h2>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        <div className={classes.userEventsContainer}>
          {user?.events ? 
          user?.events.map((event) => 
          {
            const date = new Date(event.date).toLocaleDateString()
            return(
                <div>
                  <h3>{event.title.toLocaleUpperCase()}</h3>
                  <p>Descrição: {event.description.toLocaleLowerCase()}</p>
                  <p>Data: {date}</p>
                  <p>Chave: {event.key}</p>
                  <button className={classes.edit} onClick={() => goToEdit(event.id)}>Editar</button>
                  <button className={classes.delete} onClick={() => deleteUserEvent(event.id)}>Excluir</button>
                </div>
            )
          }
          )
        :
        <div className={classes.userEventsContainer}><h3>Não há eventos registrados</h3></div>}
        </div>

        <div>
          <h2>Adicione eventos abaixo: </h2>
          <form className={classes.formAddEvent}>
              <label>Titulo: </label>
              <input type="text" onChange={(e) => setTitle(e.target.value)}/>

              <label>Descrição: </label>
              <input type="text" onChange={(e) => setDescription(e.target.value)}/>

              <label>Data: </label>
              <input type="date" onChange={(e) => setDate(e.target.value)}/>

              <label>Chave para emissão de certificado: </label>
              <input type="text" onChange={(e) => setKey(e.target.value)}/>
              <button onClick={addEventNew}>Adicionar</button>
          </form>
          
        </div>
      </div>
    </div>
  )
}

export default UserPage