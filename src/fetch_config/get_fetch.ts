
const base_url = "https://localhost:7120/api/"
async function  get_fetch(url:string) {
    try {
        const res = await fetch(base_url + url)
        const data = await res.json()
        return data 
    } catch (error) {
        throw new Error("Erro no get_fetch: " + error)
    }

}

export default get_fetch