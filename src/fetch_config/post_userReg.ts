import type { registerUser } from "../interfaces/interface"
const base_url = "https://localhost:7120/api/"
async function  post_userReg(url:string, user: registerUser) {
    try {
        const res = await fetch(base_url + url, {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        return data 
    } catch (error) {
        throw new Error(" " + error)
    }

}

export default post_userReg