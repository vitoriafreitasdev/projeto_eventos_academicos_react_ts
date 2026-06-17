import { type deleteEvent } from "../interfaces/interface"
const base_url = "https://localhost:7120/api/"
async function  delete_event(url:string, content: deleteEvent) {
    try {
        const res = await fetch(base_url + url, {
            method: 'DELETE',
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

export default delete_event