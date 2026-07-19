import "./LeaveTable.css";

const LeaveTable = ({
    leaves,
    canApprove,
    onApprove,
    onReject
}) => {

    return (

        <table className="leave-table">

            <thead>

                <tr>

                    <th>Employee</th>

                    <th>Leave Type</th>

                    <th>From</th>

                    <th>To</th>

                    <th>Days</th>

                    <th>Status</th>

                    {

                        canApprove &&

                        <th>Action</th>

                    }

                </tr>

            </thead>

            <tbody>

                {

                    leaves.length > 0 ?

                    (

                        leaves.map((leave) => (

                            <tr key={leave._id}>

                                <td>

                                    {
                                        leave.employee?.name ||
                                        "You"
                                    }

                                </td>

                                <td>

                                    {leave.leaveType}

                                </td>

                                <td>

                                    {
                                        new Date(leave.startDate)
                                            .toLocaleDateString()
                                    }

                                </td>

                                <td>

                                    {
                                        new Date(leave.endDate)
                                            .toLocaleDateString()
                                    }

                                </td>

                                <td>

                                    {leave.totalDays}

                                </td>

                                <td>

                                    <span
                                        className={`leave-status ${leave.status.toLowerCase()}`}
                                    >

                                        {leave.status}

                                    </span>

                                </td>

                                {

                                    canApprove &&

                                    <td>

                                        {

                                            leave.status === "Pending"

                                            ?

                                            <>

                                                <button
                                                    className="approve-btn"
                                                    onClick={() =>
                                                        onApprove(leave._id)
                                                    }
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    className="reject-btn"
                                                    onClick={() =>
                                                        onReject(leave._id)
                                                    }
                                                >
                                                    Reject
                                                </button>

                                            </>

                                            :

                                            "-"

                                        }

                                    </td>

                                }

                            </tr>

                        ))

                    )

                    :

                    (

                        <tr>

                            <td
                                colSpan={
                                    canApprove ? 7 : 6
                                }
                            >

                                No Leave Records Found

                            </td>

                        </tr>

                    )

                }

            </tbody>

        </table>

    );

};

export default LeaveTable;