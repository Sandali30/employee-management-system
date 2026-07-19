import "./EmployeeTable.css";

import { FaEdit, FaTrash } from "react-icons/fa";

const EmployeeTable = ({
    employees,
    onEdit,
    onDelete,
    canManage = false
}) => {

    return (

        <table className="employee-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Name</th>

                    <th>Department</th>

                    <th>Role</th>

                    <th>Status</th>

                    {canManage && <th>Actions</th>}

                </tr>

            </thead>

            <tbody>

                {

                    employees.map((employee) => (

                        <tr key={employee._id}>

                            <td>{employee.employeeId}</td>

                            <td>{employee.name}</td>

                            <td>{employee.department}</td>

                            <td>{employee.role}</td>

                            <td>

                                <span
                                    className={
                                        employee.status === "Active"
                                            ? "status active"
                                            : "status inactive"
                                    }
                                >
                                    {employee.status}
                                </span>

                            </td>

                            {canManage && (

                            <td>

                                <button
                                    type="button"
                                    className="edit-btn"
                                    onClick={() => onEdit(employee)}
                                    aria-label={`Edit ${employee.name}`}
                                >
                                    <FaEdit />
                                </button>

                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() => onDelete(employee)}
                                    aria-label={`Delete ${employee.name}`}
                                >
                                    <FaTrash />
                                </button>

                            </td>

                            )}

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

};

export default EmployeeTable;
