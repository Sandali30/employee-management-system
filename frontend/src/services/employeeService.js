import api from "./api";

export const getEmployees = (
    search = "",
    page = 1,
    department = "",
    role = "",
    status = ""
) =>
    api.get("/employees", {
        params: {
            search,
            page,
            department,
            role,
            status
        }
    });

export const createEmployee = (data) =>
    api.post("/employees", data);

export const updateEmployee = (id, data) =>
    api.put(`/employees/${id}`, data);

export const deleteEmployee = (id) =>
    api.delete(`/employees/${id}`);

export const getEmployeeById = (id) =>
    api.get(`/employees/${id}`);
