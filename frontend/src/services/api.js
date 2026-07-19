import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Automatically attach JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Logout if token expires
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const errors = error.response?.data?.errors;

        if (Array.isArray(errors) && errors.length > 0) {
            error.response.data.message = errors
                .map((item) => item.msg)
                .join("\n");
        }

        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default api;
