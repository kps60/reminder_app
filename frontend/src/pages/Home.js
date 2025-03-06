// import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from "../api/axiosInstance";
import Loader from '../components/Loader'; // Import Loader component
import Modal from '../components/Modal'; // Import Modal component
import './Home.css'; // Import a CSS file for styling

const Home = () => {
    const userId = useSelector(state => state.user.userId);
    const [user, setUser] = useState(null); // Added state for user
    const [loading, setLoading] = useState(true); // Added loading state
    const [error, setError] = useState(null); // Added error state
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const dispatch = useDispatch();

    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get("/api/auth", {
                userId: userId // Correct way to send query params
            });
            return response.data;
        } catch (error) {
            // console.error("Error fetching user:", error);
            setError("Failed to fetch user data."); // Set error message
            setIsModalOpen(true); // Open modal on error
            return null;
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true); // Set loading to true before fetching
            const token = localStorage?.getItem('userInfo');

            if (!userId && token) {
                // Initial login from token
                const decodedToken = jwtDecode(token);
                dispatch({ type: "LOGIN", payload: decodedToken?.id });
                const fetchedUser = await fetchUser();
                setUser(fetchedUser);
            } else if (userId) {
                // Only fetch user data if we have userId
                const fetchedUser = await fetchUser();
                setUser(fetchedUser);
            }
            setLoading(false); // Set loading to false after fetching
        };

        fetchUserData();
    }, [userId, dispatch]); // Only run when userId changes

    const handleVerifyButtonClick = async () => {
        // console.log("User ID:", userId); // Debugging line to check userId
        const botUrl = `https://web.telegram.org/#@remind06Bot`;
        window.open(botUrl, '_blank'); // Check if the bot is reachable
        try {
            const response = await axiosInstance.post("/auth/verify", { userId: userId });
            setUser(response.data.user);
            dispatch({ type: 'VERIFY', payload: response.data.user.verified });
        } catch (error) {
            console.error("Error opening the bot:", error.message); // Log any other errors
            setError(error.message); // Set error message
            setIsModalOpen(true); // Open modal on error
        }
    };

    return (
        <div className="home-container">
            <h1>Welcome to the Reminder App</h1>
            <p>Your personal reminder assistant.</p>
            {loading && <Loader size="medium" />} {/* Loading indicator */}
            <Modal setError={setError} message={error} onClose={() => {
                setIsModalOpen(false);
                setError("")
                }} isError={true} open={isModalOpen} /> {/* Error modal */}
            {user && userId && <button onClick={handleVerifyButtonClick} disabled={user?.verified} className="verify-button">{user?.verified ? "Verified" : "Verify"}</button>}
        </div>
    );
};

export default Home;
