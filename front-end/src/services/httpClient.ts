export default class HttpClient {

    async get(url: string) {
        if (url) {
            const response = await fetch(url)
            return response.json()
        }
    }

}