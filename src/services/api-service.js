import axios from 'axios';

// default API will be your root
const API_ROOT = process.env.PUBLIC_URL || 'http://localhost:3000';
const TIMEOUT = 20000;
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept' : 'application/json'
};

class ApiService {

    constructor({baseURL = API_ROOT, timeout = TIMEOUT, headers = HEADERS}) {
        const client = axios.create({
            baseURL,
            timeout,
            headers
        });
    }
}

export default ApiService;