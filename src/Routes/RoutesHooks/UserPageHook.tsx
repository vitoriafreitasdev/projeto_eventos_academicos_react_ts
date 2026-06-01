
import {useParams} from "react-router";



const UserPageHook = () => {
    const params = useParams();

    return params.id
}

export default UserPageHook;