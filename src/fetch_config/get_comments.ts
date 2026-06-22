const base_url = "https://localhost:7120/api/"
async function  get_comments(url:string) {
    try {
        const res = await fetch(base_url + url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        return data 
    } catch (error) {
        throw new Error("get user: " + error)
    }
    
}

export default get_comments