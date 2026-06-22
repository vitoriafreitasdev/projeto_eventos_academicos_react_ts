import type { commentPost } from "../interfaces/interface"

const base_url = "https://localhost:7120/api/"
async function  post_comment(url:string, comment: commentPost) {
    try {
        const res = await fetch(base_url + url, {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        const data = await res.json()
        return data 
    } catch (error) {
        throw new Error(" " + error)
    }

}

export default post_comment