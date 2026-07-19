import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import {
    getAllAttendance,
    getMyAttendance
} from "../../services/attendanceService";

import AttendanceToolbar from "../../components/attendance/AttendanceToolbar";
import AttendanceTable from "../../components/attendance/AttendanceTable";

const AttendancePage = () => {

    const { user } = useAuth();

    const [attendance, setAttendance] = useState([]);
    const [page] = useState(1);

    const loadAttendance = useCallback(async () => {

        try {

            let res;

            if (
                user?.role === "Super Admin" ||
                user?.role === "HR Manager"
            ) {

                res = await getAllAttendance(page);

            } else {

                res = await getMyAttendance(page);

            }

            setAttendance(res.data.attendance);

        } catch (err) {

            console.log(err);

        }

    }, [page, user?.role]);

    useEffect(() => {

        loadAttendance();

    }, [loadAttendance]);

    return (

        <>

            <AttendanceToolbar onRefresh={loadAttendance} />

            <AttendanceTable
                attendance={attendance}
            />

        </>

    );

};

export default AttendancePage;
