import axios from "axios";

const productionBaseURL = import.meta.env.VITE_BASE_URL ?? 'https://opportunely-main-sidewinder.cloudpub.ru/';
const baseURL = import.meta.env.DEV
    ? (import.meta.env.VITE_DEV_API_URL ?? productionBaseURL)
    : productionBaseURL;

const apiConfig = {
    baseURL,
    timeout: 5000,
    withCredentials: true,
    headers: import.meta.env.DEV && baseURL.includes('.ngrok-free.dev')
        ? { 'ngrok-skip-browser-warning': 'true' }
        : undefined,
};

const authApi = axios.create(apiConfig);
const api = axios.create(apiConfig);

export { api, authApi };
