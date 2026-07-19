import api from "./api";

export const getOrganizationTree = () =>
    api.get("/organization/tree");

export const getReportees = (id) =>
    api.get(`/employees/${id}/reportees`);

export const assignManager = (id, manager) =>
    api.patch(`/employees/${id}/manager`, {
        manager
    });
