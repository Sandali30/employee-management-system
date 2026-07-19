import "./EmployeeModal.css";
import { useEffect, useState } from "react";

const initialState = {
    employeeId: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
    role: "Employee",
    manager: ""
};

const EmployeeModal = ({
    open,
    onClose,
    onSave,
    employee = null
}) => {

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {

        if (employee) {

            setFormData({
                employeeId: employee.employeeId || "",
                name: employee.name || "",
                email: employee.email || "",
                password: "",
                phone: employee.phone || "",
                department: employee.department || "",
                designation: employee.designation || "",
                salary: employee.salary || "",
                joiningDate: employee.joiningDate
                    ? employee.joiningDate.substring(0, 10)
                    : "",
                role: employee.role || "Employee",
                manager: employee.manager?._id || ""
            });

        } else {

            setFormData(initialState);

        }

    }, [employee, open]);

    if (!open) return null;

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(formData);

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>
                    {employee ? "Edit Employee" : "Add Employee"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        placeholder="Employee ID"
                        required
                    />

                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />

                    {!employee && (

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />

                    )}

                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        required
                    />

                    <input
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Department"
                        required
                    />

                    <input
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="Designation"
                        required
                    />

                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="Salary"
                        required
                    />

                    <input
                        type="date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="Employee">Employee</option>
                        <option value="HR Manager">HR Manager</option>
                        <option value="Super Admin">Super Admin</option>
                    </select>

                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button type="submit">
                            {employee ? "Update" : "Save"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default EmployeeModal;
