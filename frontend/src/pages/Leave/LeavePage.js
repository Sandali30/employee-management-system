import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import {
    getMyLeaves,
    getAllLeaves,
    applyLeave,
    approveLeave,
    rejectLeave
} from "../../services/leaveService";

import LeaveTable from "../../components/leave/LeaveTable";
import LeaveModal from "../../components/leave/LeaveModal";

const LeavePage = () => {

    const { user } = useAuth();

    const [leaves, setLeaves] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const loadLeaves = useCallback(async () => {

        // Wait until user is loaded
        if (!user) return;

        try {

            const res =
                user.role === "Employee"
                    ? await getMyLeaves()
                    : await getAllLeaves();

            setLeaves(res.data.leaves);

        } catch (err) {

            console.log(err);
            alert(
                err.response?.data?.message ||
                "Unable to load leaves"
            );

        }

    }, [user]);

    useEffect(() => {

        if (user) {
            loadLeaves();
        }

    }, [user, loadLeaves]);

    const handleApply = async (data) => {

        try {

            await applyLeave(data);

            setOpenModal(false);

            loadLeaves();

            return true;

        } catch (err) {

            console.log(err);
            alert(
                err.response?.data?.message ||
                "Unable to apply leave"
            );

            return false;

        }

    };

    const handleApprove = async (id) => {

        try {

            await approveLeave(id);

            loadLeaves();

        } catch (err) {

            console.log(err);
            alert(
                err.response?.data?.message ||
                "Unable to approve leave"
            );

        }

    };

    const handleReject = async (id) => {

        try {

            await rejectLeave(id);

            loadLeaves();

        } catch (err) {

            console.log(err);
            alert(
                err.response?.data?.message ||
                "Unable to reject leave"
            );

        }

    };

    return (

        <>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px"
                }}
            >

                <h1>Leave Management</h1>

                <button
                    type="button"
                    onClick={() => setOpenModal(true)}
                >
                    Apply Leave
                </button>

            </div>

            <LeaveTable
                leaves={leaves}
                canApprove={
                    user?.role === "Super Admin" ||
                    user?.role === "HR Manager"
                }
                onApprove={handleApprove}
                onReject={handleReject}
            />

            <LeaveModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSave={handleApply}
            />

        </>

    );

};

export default LeavePage;
