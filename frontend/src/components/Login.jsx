import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor="user">Username</label>
                <input value={user} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="username" id="user" name="user"/>
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password"/>
                <button onClick={() => navigate('/pg1')}>Login</button>
            </form>
            <button className='link-btn' onClick={() => navigate('/register')}>Don't have an account? Register here</button>
        </div>
    );
};

export default Login;