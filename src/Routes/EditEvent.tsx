
import classes from "./EditEvent.module.css"
import EditHook from "./RoutesHooks/EditHook"
const EditEvent = () => {
  const {message, returnToLogin, edit, setTitle, setDesc, setDate, setChave, error, editMsg, backToUserPage} = EditHook()

  if(message) return <div className={classes.formEditCont}>
    <p>{message}</p>
    <button onClick={returnToLogin}>Tela de Login</button>
  </div>
  return (
    <div className={classes.formEditCont}>
      {editMsg && <p>{editMsg}</p>}
      {error && <p>{error}</p>}
      <form className={classes.formEdit} >
        <label>Novo título:</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)}/>
        <label>Nova descrição:</label>
        <input type="text" onChange={(e) => setDesc(e.target.value)}/>
        <label>Nova data:</label>
        <input type="date" onChange={(e) => setDate(e.target.value)}/>
        <label>Nova chave:</label>
        <input type="text" onChange={(e) => setChave(e.target.value)}/>
      </form>
      <button className={classes.editBtn} onClick={edit}>Editar</button>
      <button className={classes.backBtn} onClick={backToUserPage}>Voltar</button>

    </div>
  )
}

export default EditEvent