export class BaseApi {
    constructor(request) {
        this.request = request;
        // Uses BASE_URL from env if set, otherwise the default API (CI has no .env file)
        this.baseURL = process.env.BASE_URL || 'https://api-testing-postman.vercel.app';
    }

    async getHeaders() {
        return {
            "Content-Type": "application/json"
        };
    }
}
