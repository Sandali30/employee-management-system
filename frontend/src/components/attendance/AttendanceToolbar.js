import "./AttendanceToolbar.css";

import {
    checkIn,
    checkOut
} from "../../services/attendanceService";

const AttendanceToolbar = ({ onRefresh }) => {

    const handleCheckIn = async () => {

        try {

            const res = await checkIn();

            alert(res.data.message);

            onRefresh?.();

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Check In Failed"
            );

        }

    };

    const handleCheckOut = async () => {

        try {

            const res = await checkOut();

            alert(res.data.message);

            onRefresh?.();

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Check Out Failed"
            );

        }

    };

    return (

        <div className="attendance-toolbar">

            <h1>Attendance</h1>

            <div className="attendance-buttons">

                <button
                    className="checkin-btn"
                    onClick={handleCheckIn}
                >
                    Check In
                </button>

                <button
                    className="checkout-btn"
                    onClick={handleCheckOut}
                >
                    Check Out
                </button>

            </div>

        </div>

    );

};

export default AttendanceToolbar;
