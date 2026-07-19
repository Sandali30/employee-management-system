import { useEffect, useState } from "react";

import {
    assignManager
} from "../../services/organizationService";

import {
    getEmployees
} from "../../services/employeeService";

const AssignManager = ({ refresh }) => {

    const [employees, setEmployees] = useState([]);

    const [employeeId, setEmployeeId] = useState("");

    const [managerId, setManagerId] = useState("");

    useEffect(() => {

        loadEmployees();

    }, []);

    const loadEmployees = async () => {

        try {

            const res = await getEmployees();

            setEmployees(res.data.employees);

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleAssign = async () => {

        if (!employeeId || !managerId) {

            alert("Select Employee and Manager");

            return;

        }

        try {

            await assignManager(
                employeeId,
                managerId
            );

            alert("Manager Assigned Successfully");

            setEmployeeId("");

            setManagerId("");

            refresh();

        }

        catch (err) {

            console.log(err);

            alert("Unable to assign manager");

        }

    };

    return (

        <div
            style={{
                display: "flex",
                gap: "15px",
                marginBottom: "25px"
            }}
        >

            <select
                value={employeeId}
                onChange={(e) =>
                    setEmployeeId(e.target.value)
                }
            >

                <option value="">
                    Select Employee
                </option>

                {

                    employees.map(emp => (

                        <option
                            key={emp._id}
                            value={emp._id}
                        >

                            {emp.name}

                        </option>

                    ))

                }

            </select>

            <select
                value={managerId}
                onChange={(e) =>
                    setManagerId(e.target.value)
                }
            >

                <option value="">
                    Select Manager
                </option>

                {

                    employees.map(emp => (

                        <option
                            key={emp._id}
                            value={emp._id}
                        >

                            {emp.name}

                        </option>

                    ))

                }

            </select>

            <button
                onClick={handleAssign}
            >

                Assign

            </button>

        </div>

    );

};

export default AssignManager;