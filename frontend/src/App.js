import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import EmployeesPage from "./pages/Employees/EmployeesPage";
import AttendancePage from "./pages/Attendance/AttendancePage";
import LeavePage from "./pages/Leave/LeavePage";
import PayrollPage from "./pages/Payroll/PayrollPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import OrganizationPage from "./pages/organization/OrganizationPage";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <DashboardPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employees"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <EmployeesPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/attendance"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <AttendancePage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/leave"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <LeavePage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/payroll"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <PayrollPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <ProfilePage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/organization"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <OrganizationPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;
