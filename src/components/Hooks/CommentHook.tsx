import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/store"
import { useEffect, useState } from "react"
import { addComments, changeShowCommentState, showComments } from "../../redux/slice/eventSlice"

const CommentHook = (eventId: number | null) => {

    const dispatch = useDispatch<AppDispatch>()
    const commentary = useSelector((state: RootState) => state.event.commentary)
    const loading = useSelector((state: RootState) => state.event.loading)
    const error = useSelector((state: RootState) => state.event.errorComment)
    const loginReturn = useSelector((state: RootState) => state.event.loginReturn)
    const lastCommentAdd = useSelector((state: RootState) => state.event.lastCommentAdd)

    const [comment, setComment] = useState<string>("")
    const [msg, setMsg] = useState<string | null>(null)
    useEffect(() => {
        const callComments = async () => {
            if(eventId){
                await dispatch(showComments(eventId))
            }
        }

        callComments()

    }, [eventId, lastCommentAdd])

    const changeShowComment = () => {
        dispatch(changeShowCommentState(false))
    }

    const sendComment = async () => {
        if(loginReturn?.id != null && eventId != null && comment.length > 0){
            const item = {
                eventId: eventId,
                userId: loginReturn?.id,
                comment: comment
            }
            await dispatch(addComments(item))

        }

        if(loginReturn?.id == null) {
            setMsg("Precisa estar logado para enviar comentários")
            setTimeout(() => {
                setMsg(null)
            }, 2500)
        }

    }

    return {commentary, loading, changeShowComment, error, setComment, sendComment, msg}

}

export default CommentHook