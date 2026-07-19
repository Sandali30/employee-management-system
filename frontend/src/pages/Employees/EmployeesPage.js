import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../../services/employeeService";

import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeModal from "../../components/employees/EmployeeModal";
import EmployeeToolbar from "../../components/employees/EmployeeToolbar";
import DeleteConfirmModal from "../../components/employees/DeleteConfirmModal";

const EmployeesPage = () => {

    const { user } = useAuth();

    const [employees, setEmployees] = useState([]);
    const [totalEmployees, setTotalEmployees] = useState(0);

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");

    const [page] = useState(1);

    const [openModal, setOpenModal] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Delete Modal States
    const [deleteModal, setDeleteModal] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const canManageEmployees =
        user?.role === "Super Admin" ||
        user?.role === "HR Manager";

    // Load Employees
    const loadEmployees = useCallback(async () => {

        try {

            const res = await getEmployees(
                search,
                page,
                department,
                role,
                status
            );

            setEmployees(res.data.employees);
            setTotalEmployees(res.data.totalEmployees);

        } catch (err) {

            console.log(err);
            alert(
                err.response?.data?.message ||
                "Unable to load employees"
            );

        }

    }, [search, page, department, role, status]);

    useEffect(() => {

        loadEmployees();

    }, [loadEmployees]);

    // Add or Update Employee
    const handleSave = async (data) => {

        try {

            const payload = {
                ...data,
                salary: Number(data.salary)
            };

            if (!payload.manager) {
                delete payload.manager;
            }

            if (selectedEmployee && !payload.password) {
                delete payload.password;
            }

            if (selectedEmployee) {

                await updateEmployee(selectedEmployee._id, payload);

            } else {

                await createEmployee(payload);

            }

            setOpenModal(false);
            setSelectedEmployee(null);

            loadEmployees();

        } catch (err) {

            console.log(err);
            alert(
                err.response?.data?.message ||
                "Unable to save employee"
            );

        }

    };

    // Edit Employee
    const handleEdit = (employee) => {

        setSelectedEmployee(employee);
        setOpenModal(true);

    };

    // Open Delete Confirmation
    const handleDelete = (employee) => {

        setEmployeeToDelete(employee);
        setDeleteModal(true);

    };

    // Confirm Delete
    const confirmDelete = async () => {

        try {

            await deleteEmployee(employeeToDelete._id);

            setDeleteModal(false);
            setEmployeeToDelete(null);

            loadEmployees();

        } catch (err) {

            console.log(err);
            alert(
                err.response?.data?.message ||
                "Unable to delete employee"
            );

        }

    };

    // Add Employee
    const handleAddEmployee = () => {

        setSelectedEmployee(null);
        setOpenModal(true);

    };

    return (

        <>

            <EmployeeToolbar
                totalEmployees={totalEmployees}

                search={search}
                setSearch={setSearch}

                department={department}
                setDepartment={setDepartment}

                role={role}
                setRole={setRole}

                status={status}
                setStatus={setStatus}

                onAddEmployee={handleAddEmployee}

                canAdd={canManageEmployees}
            />

            <EmployeeTable
                employees={employees}
                onEdit={handleEdit}
                onDelete={handleDelete}
                canManage={canManageEmployees}
            />

            <EmployeeModal
                open={openModal}
                employee={selectedEmployee}
                onClose={() => {

                    setOpenModal(false);
                    setSelectedEmployee(null);

                }}
                onSave={handleSave}
            />

            <DeleteConfirmModal
                open={deleteModal}
                employee={employeeToDelete}
                onClose={() => {

                    setDeleteModal(false);
                    setEmployeeToDelete(null);

                }}
                onConfirm={confirmDelete}
            />

        </>

    );

};

export default EmployeesPage;
