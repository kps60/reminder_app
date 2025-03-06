import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const Reminder = ({ reminder, setModalMessage }) => {
    const updateReminder = async (id, updatedData) => {
        try {
            await axiosInstance.put(`/api/reminders/${id}`, updatedData);

        } catch (error) {
            setModalMessage(error.response?.data?.message || 'An error occurred.');
            console.error(error);
        }
    };

    const deleteReminder = async (id) => {
        await axiosInstance.delete(`/api/reminders/${id}`);
    };

    return (
        <li key={reminder._id} className={`reminder-item ${reminder.priority}`}>
            <h2>{reminder.title}</h2>
            <p>{reminder.description}</p>
            <p>{reminder.date}</p>
            <p>{reminder.recurrence}</p>
            <p>{reminder.priority}</p>
            <button onClick={() => updateReminder(reminder._id, { /* updated data */ })}>Update</button>
            <button onClick={() => deleteReminder(reminder._id)}>Delete</button>
        </li>
    );
};

export default Reminder;
