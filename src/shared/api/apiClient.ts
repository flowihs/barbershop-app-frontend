import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL ?? 'https://barbershop-app-backend-java.onrender.com/';

const api = axios.create({
    baseURL,
    timeout: 5000,
    withCredentials: true,
});

export { api };
