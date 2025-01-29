import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom"
const Home = () => {
    const userId = useSelector(state => state.user.userId);
    const [user, setUser] = useState(null); // Added state for user
    const dispatch = useDispatch();
    const fetchUser = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/auth", {
                userId: userId // Correct way to send query params
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
    };
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage?.getItem('userInfo');

            if (!userId && token) {
                // Initial login from token
                const decodedToken = jwtDecode(token);
                dispatch({ type: "LOGIN", payload: decodedToken?.id });
            } else if (userId) {
                // Only fetch user data if we have userId
                const fetchedUser = await fetchUser();
                setUser(fetchedUser);
            }
        };

        fetchUserData();
    }, [userId, dispatch]); // Only run when userId changes
    const handleVerifyButtonClick = async () => {
        console.log("User ID:", userId); // Debugging line to check userId
        const botUrl = `https://web.telegram.org/#@remindersetbot`;
        // window.open(botUrl, '_blank'); // Open the URL in a new window/tab
        window.open(botUrl, '_blank') // Check if the bot is reachable
        try {
            const response = await axios.post("http://localhost:5000/api/auth/verify", { userId: userId });
            console.log(response)
        } catch (error) {
            console.error("Error opening the bot:", error.message); // Log any other errors
            alert(error.message);
        }
    };
    return (
        <div>
            <h1>Welcome to the Reminder App</h1>
            <p>Your personal reminder assistant.</p>
            {userId && <button onClick={handleVerifyButtonClick} disabled={user?.verified}>{user?.verified ? "Verified" : "Verify"}{console.log(user)}</button>}
        </div>
    );
};

export default Home; 