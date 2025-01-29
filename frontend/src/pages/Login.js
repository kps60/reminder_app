import React, { useState } from 'react';
import './Auth.css';
import axiosInstance from '../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import eyeopen from "../eyeopen.svg"
import eyeclosed from "../eyeclosed.svg"
import { Link, useNavigate } from 'react-router-dom';
const Login = ({ setModalMessage }) => {
    const [email, setEmail] = useState('');
    const [showpass, setShowpass] = useState(false);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post('/auth/login', { email, password });
            const { token } = data;
            const decodedToken = jwtDecode(token);
            dispatch({ type: "LOGIN", payload: decodedToken.id })
            // use localstorage to store the userinfo
            localStorage.setItem('userInfo', JSON.stringify(token)); // Store user info in local storage
            setModalMessage('Login successful!');
            navigate("/")
            // Redirect or show success message
        } catch (error) {
            setModalMessage(error.response?.data?.message || 'An error occurred.');
            console.error(error);
        }
    };
    const handleshowpass = (e) => {
        e.preventDefault()
        setShowpass(!showpass)
    }
    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <div style={{ margin: "0px", padding: "0px" }}>
                    <input type={`${showpass ? "text" : "password"}`} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    {showpass ?
                        <Link onClick={handleshowpass}>
                            <img src={eyeopen} />
                        </Link>
                        : <Link onClick={handleshowpass}>
                            <img src={eyeclosed} />
                        </Link>
                    }
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login; 