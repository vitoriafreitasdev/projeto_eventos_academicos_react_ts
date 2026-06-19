
import classes from "./EmitirCerticado.module.css"
import CertificadoHook from "./RoutesHooks/CertificadoHook"
import Certificado from "../components/Certificado"
const EmitirCertificado = () => {
    const {setEmail, setKey, emitir, certificado, loading, error, btnPressed} = CertificadoHook()
    console.log(certificado, btnPressed)
    //fazer o componente do certificado para baixar
  return (
    <div className={classes.containerPrincipal}>
        <div >
            {error && <p>{error}</p>}
            {loading && <p>Carregando dados...</p>}
            <h2>Emita o seu certificado de ida ao evento abaixo: </h2>
            <form>
                <label>Insira seu e-mail:</label>
                <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                <label>Insira a chave emissão:</label>
                <input type="text" onChange={(e) => setKey(e.target.value)}/>
            </form>
            <button onClick={emitir}>Emitir</button>
            {!loading && !error && btnPressed && certificado &&
            <Certificado  
            eventTitle={certificado?.eventTitle} 
            userName={certificado?.userName} 
            date={certificado?.date} 
            description={certificado?.description}/>
            }
        </div>
    </div>
  )
}
export default EmitirCertificado

//chave para testes: gsGEDG#@3GDG