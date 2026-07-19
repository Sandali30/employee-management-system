import "./EmployeeToolbar.css";

const EmployeeToolbar = ({
    totalEmployees,
    search,
    setSearch,
    department,
    setDepartment,
    role,
    setRole,
    status,
    setStatus,
    onAddEmployee,
    canAdd
}) => {

    return (

        <div className="employee-toolbar">

            <div className="toolbar-left">

                <h2>Employees</h2>

                <span className="employee-count">
                    {totalEmployees} Employees
                </span>

            </div>

            <div className="toolbar-right">

                <input
                    type="text"
                    placeholder="Search employee..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    <option value="">Department</option>
                    <option>IT</option>
                    <option>HR</option>
                    <option>Finance</option>
                    <option>Administration</option>
                    <option>Sales</option>
                </select>

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="">Role</option>
                    <option>Employee</option>
                    <option>HR Manager</option>
                    <option>Super Admin</option>
                </select>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>

                {canAdd && (

                    <button onClick={onAddEmployee}>
                        + Add Employee
                    </button>

                )}

            </div>

        </div>

    );

};

export default EmployeeToolbar;