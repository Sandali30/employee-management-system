import "./QuickActions.css";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {

    const navigate = useNavigate();

    return (

        <div className="quick-card">

            <h2>Quick Actions</h2>

            <button onClick={() => navigate("/employees")}>
                Add Employee
            </button>

            <button onClick={() => navigate("/attendance")}>
                Mark Attendance
            </button>

            <button onClick={() => navigate("/leave")}>
                Apply Leave
            </button>

            <button onClick={() => navigate("/payroll")}>
                Generate Payroll
            </button>

        </div>

    );

};

export default QuickActions;
