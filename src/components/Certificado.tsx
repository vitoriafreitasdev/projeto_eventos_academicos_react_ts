import "./Certificado.css"
import DownloadHook from "./Hooks/DownloadHook"

const Certificado = (props: {eventTitle: string, userName: string, description: string, date: string}) => {

  const {dateFormat, download} = DownloadHook(props.date, '.containerToDownload')
  
  return (
    <div className='certificadoCont'>
        <div className='containerToDownload'>
          <h3>Certificado de ida</h3>
          <h1>{props.eventTitle}</h1>
          <p>{props.description}</p>
          <h2>{props.userName}</h2>
          <p>Data: {dateFormat}</p>
        </div>
        <button onClick={download}>Baixar</button>
    </div>
  )
}

export default Certificado