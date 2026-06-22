import classes from "./Comments.module.css"
import CommentHook from "./Hooks/CommentHook"

const Comments = (props: {eventId: number | null}) => {
  const {commentary, loading, changeShowComment, error, setComment, sendComment, msg} = CommentHook(props.eventId)
  return (
       <div className={classes.commentaryContainer}>
        <span onClick={changeShowComment}>x</span>
          {loading && <p>Carregando...</p>}
          {error && <p>{error}</p>}
          <div className={classes.secondContainer}>
            <div className={classes.commentarysDiv}>
              {commentary ? commentary.map((comment) => (
                <div key={comment.id}>
                  <p className={classes.userName}>{comment.userName}</p>
                  <p className={classes.text}>{comment.commentary}</p>
                </div>
              
              )) : <div><p className={classes.text}>Sem comentarios</p></div>}
            </div>

            <div className={classes.addComment}>
              {msg && <p>{msg}</p>}
              <h2>Adicionar comentário</h2>
              <label>Comentário: </label>
              <input type="text" onChange={(e) => setComment(e.target.value)}/>
              <button onClick={sendComment}>Adicionar</button>
            </div>

          </div>
      </div>
  )
}

export default Comments