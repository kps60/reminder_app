import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const userId = useSelector(state => state.user.userId)
    // Define the routes dynamically
    const dispatch = useDispatch()
    var routes = [];
    if (userId) {
        const handlelogout = () => {
            dispatch({ type: "LOGOUT" })
            localStorage.removeItem("userInfo")
        }
        routes = [
            { path: '/', name: 'Home' },
            { path: '/', name: 'Logout', onClick: handlelogout },
            { path: `/reminders/${userId || null}`, name: 'Reminders' },
            { path: `/create-reminder/${userId || null}`, name: 'Create Reminder' }
        ];
    } else {
        routes = [
            { path: '/', name: 'Home' },
            { path: '/login', name: 'Login' },
            { path: '/register', name: 'Register' },
        ];
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">Reminder App</Link>
                <button className="navbar-toggle" onClick={toggleMenu}>
                    ☰
                </button>
                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    {routes.map((route, index) => (
                        <li key={index}>
                            <Link to={route.path} onClick={route.onClick}>{route.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar; 