import "./PayrollTable.css";

const PayrollTable = ({ payrolls }) => {

    return (

        <table className="payroll-table">

            <thead>

                <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Month</th>
                    <th>Basic Salary</th>
                    <th>Net Salary</th>
                    <th>Payment Status</th>
                </tr>

            </thead>

            <tbody>

                {payrolls.length > 0 ? (

                    payrolls.map((payroll) => (

                        <tr key={payroll._id}>

                            <td>{payroll.employee?.employeeId || "-"}</td>

                            <td>{payroll.employee?.name || "-"}</td>

                            <td>{payroll.month}/{payroll.year}</td>

                            <td>Rs. {payroll.basicSalary}</td>

                            <td>Rs. {payroll.netSalary}</td>

                            <td>{payroll.paymentStatus}</td>

                        </tr>

                    ))

                ) : (

                    <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                            No Payroll Records Found
                        </td>
                    </tr>

                )}

            </tbody>

        </table>

    );

};

export default PayrollTable;
