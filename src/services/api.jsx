import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getCourses = async () => {
  const res = await api.get("/courses");
  return res.data;
};

export const addCourse = async (course) => {
  const res = await api.post("/courses", course);
  return res.data;
};

export const updateCourse = async (id, course) => {
  const res = await api.put(`/courses/${id}`, course);
  return res.data;
};

export const deleteCourse = async (id) => {
  const res = await api.delete(`/courses/${id}`);
  return res.data;
};

export const getUsers = async () => {
  const res = await api.get('/users');
  return res.data;
};

export const createUser = async (user) => {
  const res = await api.post('/users', user);
  return res.data;
};

export const loginUser = async (user) => {
  const res = await api.get('/users/login', { email: user.email, password: user.password });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  };
}

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
