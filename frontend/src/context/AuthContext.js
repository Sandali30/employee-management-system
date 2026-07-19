import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {

            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setToken(null);
            }

        }

        setLoading(false);

    }, []);

    const login = (token, userData) => {

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(token);
        setUser(userData);

    };

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setToken(null);
        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                loading
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);
