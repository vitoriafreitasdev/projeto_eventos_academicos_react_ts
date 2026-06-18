const base_url = "https://localhost:7120/api/"
import {type Event} from "../interfaces/interface"
async function  put_event(url:string, content: Event, token: string) {
    try {
        const res = await fetch(base_url + url, {
            method: 'PUT',
            headers: 
            {
                "Authorization": `Bearer ${token}`,
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

export default put_event