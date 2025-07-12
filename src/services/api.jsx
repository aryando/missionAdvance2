import axios from "axios";

const API_BASE_URL = "https://68665d7889803950dbb2660a.mockapi.io/";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchUsers = async () => {
    try {
        const response = await api.get("/");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("tojen");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => promise.reject(error)
);
    
export default api;
