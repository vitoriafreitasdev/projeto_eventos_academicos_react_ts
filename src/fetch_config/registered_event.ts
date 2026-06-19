import { type registerEventData } from "../interfaces/interface"
const base_url = "https://localhost:7120/api/"
async function  registered_event(url:string, content: registerEventData) {
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

export default registered_event