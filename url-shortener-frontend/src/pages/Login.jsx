import { useState } from "react";
import { login } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import "./Login.css";

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { loginUser } = useAuth();

    const handleLogin = async(e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await login (email, password);
            loginUser(data.user, data.token);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="email" placeholder="Email"
                        className="input-field"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                     <input
                        type="password" placeholder="Password"
                        className="input-field"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                     <button className="login-button">Login</button>
                </form>
                <p className="signup-text">
                    Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;