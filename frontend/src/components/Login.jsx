import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsAuthenticated }) => {
  const [user, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username: user,
        password: pass,
      });

      if (response.status == 200) {
        setErrorMessage("");
        localStorage.setItem("authToken", response.data.token);
        setIsAuthenticated(true);
        navigate("/home");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="user">Username</label>
        <input
          value={user}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="username"
          id="user"
          name="user"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="*********"
          id="password"
          name="password"
          required
        />
        <span>{errorMessage}</span>
        <button type="submit">Login</button>
      </form>
      <button className="link-btn" onClick={() => navigate("/register")}>
        Don't have an account? Register here
      </button>
    </div>
  );
};

export default Login;
