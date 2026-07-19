import "./LoginPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const LoginPage = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const res = await loginAPI(formData);

            login(res.data.token, res.data.user);

            navigate("/dashboard");

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Login Failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <img
                    src={logo}
                    alt="EMS Logo"
                    className="login-logo"
                />

                <h2>Employee Management System</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {error &&

                        <p className="error">

                            {error}

                        </p>

                    }

                    <button disabled={loading}>

                        {

                            loading ?

                                "Logging in..."

                                :

                                "Login"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

};

export default LoginPage;