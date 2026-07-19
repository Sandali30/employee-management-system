import "./AttendanceTable.css";

const AttendanceTable = ({ attendance }) => {

    return (

        <table className="attendance-table">

            <thead>

                <tr>

                    <th>Employee</th>

                    <th>Date</th>

                    <th>Check In</th>

                    <th>Check Out</th>

                    <th>Working Hours</th>

                    <th>Status</th>

                </tr>

            </thead>

            <tbody>

                {

                    attendance.length > 0 ? (

                        attendance.map((record) => (

                            <tr key={record._id}>

                                <td>
                                    {
                                        record.employee?.name ||
                                        "You"
                                    }
                                </td>

                                <td>
                                    {
                                        new Date(record.date)
                                            .toLocaleDateString()
                                    }
                                </td>

                                <td>

                                    {
                                        record.checkIn
                                            ?

                                            new Date(record.checkIn)
                                                .toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })

                                            :

                                            "-"
                                    }

                                </td>

                                <td>

                                    {
                                        record.checkOut
                                            ?

                                            new Date(record.checkOut)
                                                .toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })

                                            :

                                            "-"
                                    }

                                </td>

                                <td>

                                    {record.workingHours} hrs

                                </td>

                                <td>

                                    <span
                                        className={`status ${record.status.toLowerCase().replace(" ", "-")}`}
                                    >

                                        {record.status}

                                    </span>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="6">

                                No Attendance Found

                            </td>

                        </tr>

                    )

                }

            </tbody>

        </table>

    );

};

export default AttendanceTable;