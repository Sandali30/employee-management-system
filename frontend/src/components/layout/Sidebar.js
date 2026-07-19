import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
    FaTachometerAlt,
    FaUsers,
    FaCalendarCheck,
    FaPlaneDeparture,
    FaMoneyCheckAlt,
    FaUserCircle,
    FaSignOutAlt
} from "react-icons/fa";

const Sidebar = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <div className="sidebar">

            <div className="logo-section">

                <img
                    src={logo}
                    alt="EMS Logo"
                    className="logo"
                />

                <h2>EMS</h2>

            </div>

            <ul>

                <li>

                    <NavLink to="/dashboard">

                        <FaTachometerAlt />

                        <span>Dashboard</span>

                    </NavLink>

                </li>

                <li>

                    <NavLink to="/employees">

                        <FaUsers />

                        <span>Employees</span>

                    </NavLink>

                </li>

                <li>

                    <NavLink to="/attendance">

                        <FaCalendarCheck />

                        <span>Attendance</span>

                    </NavLink>

                </li>

                <li>

                    <NavLink to="/leave">

                        <FaPlaneDeparture />

                        <span>Leave</span>

                    </NavLink>

                </li>

                <li>

                    <NavLink to="/payroll">

                        <FaMoneyCheckAlt />

                        <span>Payroll</span>

                    </NavLink>

                </li>

                <li>

                    <NavLink to="/profile">

                        <FaUserCircle />

                        <span>Profile</span>

                    </NavLink>

                </li>
                
                {(user?.role === "Super Admin" ||
                    user?.role === "HR Manager") && (

                    <li>

                        <NavLink to="/organization">

                            <FaUsers />

                            <span>Organization</span>

                        </NavLink>

                    </li>

                )}

            </ul>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >

                <FaSignOutAlt />

                <span>Logout</span>

            </button>

        </div>

    );

};

export default Sidebar;
