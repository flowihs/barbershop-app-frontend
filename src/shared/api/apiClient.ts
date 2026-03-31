import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000, 
    headers: {
        Authorization: `${import.meta.env.VITE_AUTH_TOKEN}`,
    }
});

export { api };