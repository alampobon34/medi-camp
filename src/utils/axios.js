import axios from "axios";

export const api = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: 'https://ph-b9-assignment-12-server.vercel.app',
})