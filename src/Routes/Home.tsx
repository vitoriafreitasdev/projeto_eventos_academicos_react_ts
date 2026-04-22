import classes from './Home.module.css'
import Events from "../hooks/Events"


const Home = () => {
    
  const events = Events()

  if(!events) return <div className={classes.home}><p>Carregando...</p></div>

  return (
    <div className={classes.home}>
      <h1>Eventos registrados na nossa comunidade:</h1>
       <div className={classes.events_container}>
         {events && events.map((event) => (
            <div className={classes.event} role="div-event" key={event.id}>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p>{new Date(event.date).toLocaleDateString('pt-BR')}</p>
                <button className={classes.btn_inscrever}>Se inscrever</button>
                <button className={classes.btn_comentarios}>Abrir comentários</button>
            </div>
        ))}
       </div>
    </div>
  )
}

export default Home