import UserPageHook from "./RoutesHooks/UserPageHook";
import classes from "./UserPage.module.css"
import {Link} from "react-router-dom";

const UserPage = () => {
  const {user, message} = UserPageHook()

  if(message){
    return (
      <div className={classes.userMainContainer}>
        <div className={classes.userMessageContainer}>
          <p>{message}</p>
          <Link to="/login">
            <button>Voltar para tela de login</button>
          </Link>
        </div>
      </div>
    )
  }

  /* colocar a parte de adicionar eventos e estilizar o texto da mensagem que não há eventos registrados */
  return (
    <div className={classes.userMainContainer}>
      <div>
        <h2>Seja bem vindo, {user?.name}. Seus eventos registrados:</h2>
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
                  <button className={classes.edit}>Editar</button>
                  <button className={classes.delete}>Excluir</button>
                </div>
            )
          }
          )
        :
        <div className={classes.userEventsContainer}><p>Não há eventos registrados</p></div>}
        </div>
      </div>
    </div>
  )
}

export default UserPage