import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './CreateReminder.css'; // Import the CSS file for styling
import axiosInstance from '../api/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
const CreateReminder = ({ setModalMessage }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [recurrence, setRecurrence] = useState('one-time');
    const [priority, setPriority] = useState('medium');
    const dispatch = useDispatch();
    const userId = useSelector(states => states.user.userId);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReminder = { userId, title, description, date, recurrence, priority };
        try {
            const response = await axiosInstance.post('/reminders', newReminder);
            dispatch({ type: 'ADD_REMINDER', payload: response.data });
            navigate(`/reminders/${userId}`)
            setModalMessage("successfully added")
        } catch (error) {
            setModalMessage(error.response?.data?.message || 'An error occurred.');
            console.error(error);
        }
        // Optionally reset the form or redirect
    };

    return (
        <div className="create-reminder-container">
            <motion.form
                className="create-reminder-form"
                onSubmit={handleSubmit}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2>Create Reminder</h2>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
                <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
                <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
                    <option value="one-time">One-time</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button type="submit">Create Reminder</button>
            </motion.form>
        </div>
    );
};

export default CreateReminder; 