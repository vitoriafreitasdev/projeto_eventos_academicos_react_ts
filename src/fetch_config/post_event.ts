const base_url = "https://localhost:7120/api/"
import {type EventToAdd} from "../interfaces/interface";

async function  post_event(url: string, content: EventToAdd) {
    try {
        const res = await fetch(base_url + url, {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        })
        const data = await res.json()
        return data 
    } catch (error) {
        throw new Error(" " + error)
    }

}

export default post_event