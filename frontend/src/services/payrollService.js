import api from "./api";

export const getPayrolls = (
    search = "",
    page = 1
) =>
    api.get("/payroll", {
        params: {
            search,
            page
        }
    });

export const generatePayroll = (data) =>
    api.post("/payroll/generate", data);

export const getPayrollById = (id) =>
    api.get(`/payroll/${id}`);
