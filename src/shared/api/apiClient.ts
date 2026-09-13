import axios from "axios";

const productionBaseURL = import.meta.env.VITE_BASE_URL ?? 'https://barbershop-app-backend-java-54t9.onrender.com/';
const baseURL = import.meta.env.DEV
    ? (import.meta.env.VITE_DEV_API_URL ?? productionBaseURL)
    : productionBaseURL;

const apiConfig = {
    baseURL,
    timeout: 5000,
    withCredentials: true,
};

const authApi = axios.create(apiConfig);
const api = axios.create(apiConfig);

export { api, authApi };
