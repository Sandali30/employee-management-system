import api from "./api";

export const login = (data) => {
    return api.post("/auth/login", data);
};

export const getProfile = () => {
    return api.get("/auth/profile");
};