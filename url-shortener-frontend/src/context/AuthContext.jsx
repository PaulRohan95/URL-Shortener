import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) setUser(storedUser);
    }, []);

    const loginUser = (userData, token) => {
        localStorage.setItem("user", JSON. stringify(userData));
        localStorage.setItem("token", token);
        setUser(userData);
        navigate("/dashboard");
    };

    const logoutUser = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");   
    };
    
    return (
        <AuthContext.Provider value = {{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};