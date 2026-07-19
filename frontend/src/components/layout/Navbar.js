import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

    const { user } = useAuth();

    return (

        <div className="navbar">

            <div className="navbar-left">

                <h2>Employee Management System</h2>

            </div>

            <div className="navbar-right">

                <div className="user-info">

                    <span className="welcome">
                        Welcome,
                    </span>

                    <span className="username">
                        {user?.name}
                    </span>

                    <span className="role">
                        ({user?.role})
                    </span>

                </div>

            </div>

        </div>

    );

};

export default Navbar;