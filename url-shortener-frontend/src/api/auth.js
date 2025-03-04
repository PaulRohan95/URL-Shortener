import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"; //using .env for backend URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, //Ensures cookies (JWT) are sent and received
});

//Login API
export const login = async (email, password) => {
    try {
        const response = await axiosInstance.post(`/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response ?.data?.message || "Login failed";
    }
};


//Signup API
export const signup = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password });
        return response.data;
    } catch (error) {
        throw error.response ?. data ?. message || "Signup failed";
    }
};

// Logout API
export const logout = async () => {
    try {
        await axiosInstance.post("/auth/logout");
    } catch (error) {
        throw error.response?.data?.message || "Logout failed";
    }
};