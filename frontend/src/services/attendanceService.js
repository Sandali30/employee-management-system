import api from "./api";

export const getAllAttendance = (page = 1) =>
    api.get("/attendance", {
        params: { page }
    });

export const getMyAttendance = (page = 1) =>
    api.get("/attendance/my-attendance", {
        params: { page }
    });

export const getTodayAttendance = () =>
    api.get("/attendance/today");

export const checkIn = () =>
    api.post("/attendance/check-in");

export const checkOut = () =>
    api.post("/attendance/check-out");

export const getAttendanceStats = () =>
    api.get("/attendance/stats");
