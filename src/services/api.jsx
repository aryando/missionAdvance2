import axios from "axios";

const API_BASE_URL = "https://68665d7889803950dbb2660a.mockapi.io/";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getData = async (courses) => {
    try {
        const response = await api.get(courses);
        return response.data;
    } catch (error) {
        console.error("Gagal mengambil data:", error);
        throw error;
    }
}


export const addData = async (endpoint, payload) => {
    try {
        const response = await api.post(endpoint, payload);
        return response.data;
    } catch (error) {
        console.error("Gagal menambahkan data:", error);
        throw error;
    }
};

export const updateData = async (endpoint, id, payload) => {
    try {
        const response = await api.put(`${endpoint}/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error("Gagal memperbarui data:", error);
        throw error;
    }
};

export const deleteData = async (endpoint) => {
    try {
        const response = await api.delete(`${endpoint}`);
        return response.data;
    } catch (error) {
        console.error("Gagal menghapus data:", error);
        throw error;
    }
};

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
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => promise.reject(error)
);
    
export default api;
