const base_url = "https://localhost:7120/api/"
async function  get_user(url:string, token: string) {
    try {
        const res = await fetch(base_url + url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        return data 
    } catch (error) {
        throw new Error(" " + error)
    }
    
}

export default get_user