import api from "./api";

export const applyLeave = (data) =>
    api.post("/leaves/apply", data);

export const getMyLeaves = () =>
    api.get("/leaves/my-leaves");

export const getAllLeaves = () =>
    api.get("/leaves");

export const approveLeave = (id, remarks = "") =>
    api.put(`/leaves/${id}/approve`, { remarks });

export const rejectLeave = (id, remarks = "") =>
    api.put(`/leaves/${id}/reject`, { remarks });
