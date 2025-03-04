import { useState } from "react";
import { signup } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { loginUser } = useAuth();

    const handleSignup = async(e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await signup (name, email, password);
            loginUser(data.user, data.token);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">Sign Up</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSignup} className="signup-form">
                    <input
                        type="name" placeholder="Name"
                        className="input-field"
                        value={name} onChange={(e) => setName(e.target.value)}
                        required
                     />
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
                     <button className="signup-button">Sign Up</button>
                </form>
                <p className="login-text ">
                    Already have an account? <Link to="/login" className="login-link">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;