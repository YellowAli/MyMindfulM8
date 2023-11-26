import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username: userName,
        password: password,
        phone_number: phoneNumber,
      });

      console.log(response);
      if (response.status === 201) {
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="userName">Username</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="User Name"
          id="userName"
          name="userName"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="*****"
          id="password"
          name="password"
          required
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="tel"
          placeholder="+_ ( _ _ _) ..."
          id="phoneNumber"
          name="phoneNumber"
          required
        />
        <button type="submit">Register</button>
      </form>
      <button className="register-link" onClick={() => navigate("/login")}>
        Already have an Account? Login Here.
      </button>
    </div>
  );
};

export default Register;
