import Comments from '../components/Comments'
import classes from './Home.module.css'
import Events from "./RoutesHooks/Events"



const Home = () => {
    
  const {events, messageToUser, registerInEvent, error, registerEventMsg, showComment, idEvent, showCommentComponent} = Events()
  
  if(!events) return <div className={classes.home}><p>Carregando...</p></div>

  return (
    <div className={classes.home}>
      <h1>Eventos registrados na nossa comunidade:</h1>
      {registerEventMsg && <p>{registerEventMsg}</p>}
      {error && <p>{error}</p>}
      {messageToUser && <p>{messageToUser}</p>}
       <div className={classes.events_container}>
         {events && events.map((event) => (
            <div className={classes.event} role="div-event" key={event.id}>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p>{new Date(event.date).toLocaleDateString('pt-BR')}</p>
                <button className={classes.btn_inscrever} onClick={() => registerInEvent(event.id)}>Se inscrever</button>
                <button className={classes.btn_comentarios} onClick={() => showCommentComponent(!showComment, event.id)}>Abrir comentários</button>
            </div>
        ))}
       </div>
      {showComment && <Comments eventId={idEvent}/>}

    </div>
  )
}

export default Home