import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL ?? 'https://barbershop-app-backend-java.onrender.com/';

const apiConfig = {
    baseURL,
    timeout: 5000,
    withCredentials: true,
};

const authApi = axios.create(apiConfig);
const api = axios.create(apiConfig);

export { api, authApi };
