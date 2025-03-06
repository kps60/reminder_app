import React, { useState } from 'react';
import './Auth.css'; // Import the CSS file for styling
import axiosInstance from '../api/axiosInstance';
import { jwtDecode } from "jwt-decode"
import { useDispatch } from 'react-redux';
import eyeopen from "../eyeopen.svg"
import eyeclosed from "../eyeclosed.svg"
import { useNavigate } from 'react-router-dom';
const Register = ({ setModalMessage }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showpass, setShowpass] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post('/api/auth/register', { username, email, password });
            const { token } = data;
            const decodedToken = jwtDecode(token);
            dispatch({ type: "LOGIN", payload: decodedToken.id })
            localStorage.setItem('userInfo', JSON.stringify(token)); // Store user info in local storage
            setModalMessage('Registration successful!');
            // Redirect or show success message
            navigate("/")
        } catch (error) {
            setModalMessage(error.message || 'An error occurred.');
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
                <h2>Register</h2>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <div style={{ margin: "0px", padding: "0px" }}>
                    <input type={`${showpass ? "text" : "password"}`} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <button onClick={handleshowpass} style={{ background: 'none', border: 'none' }}>
                        {showpass ? <img src={eyeopen} alt="Show password" /> : <img src={eyeclosed} alt="Hide password" />}
                    </button>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register; 