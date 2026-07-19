import { useEffect, useState } from "react";
import DashboardCards from "../../components/dashboard/DashboardCards";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";
import { useAuth } from "../../context/AuthContext";
import { getDashboard } from "../../services/dashboardService";

import "./DashboardPage.css";

const DashboardPage = () => {

    const { user } = useAuth();
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        const canViewStats =
            user?.role === "Super Admin" ||
            user?.role === "HR Manager";

        if (!canViewStats) {
            return;
        }

        const loadDashboard = async () => {

            try {

                const res = await getDashboard();

                setDashboard(res.data);

            } catch (err) {

                console.log(err);

            }

        };

        loadDashboard();

    }, [user?.role]);

    return (

        <>

            <h1>Dashboard</h1>

            <p>Welcome to Employee Management System</p>

            <DashboardCards statistics={dashboard?.statistics} />

            <div className="dashboard-bottom">

                <RecentActivity recentEmployees={dashboard?.recentEmployees} />

                <QuickActions />

            </div>

        </>

    );

};

export default DashboardPage;
