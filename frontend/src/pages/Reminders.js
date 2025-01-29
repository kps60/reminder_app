import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../api/axiosInstance';
import Reminder from '../components/Reminder';

const Reminders = ({ setModalMessage }) => {
    const dispatch = useDispatch();
    const reminders = useSelector((state) => state.reminders.reminders);
    const userId = useSelector((state) => state.user.userId);


    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await axiosInstance.get(`/reminders/${userId}`);
                dispatch({ type: 'SET_REMINDERS', payload: response.data });
                setModalMessage("fetched all reminders")
            } catch (error) {
                setModalMessage(error.response?.data?.message || 'An error occurred.');
                // console.error(error);
            }
        };
        fetchReminders();
    }, [userId, dispatch]);
    const renderRemindersByPriority = (priority) => {
        return reminders
            ?.filter(reminder => reminder.priority === priority)
            ?.map(reminder => (
                <Reminder setModalMessage={setModalMessage} reminder={reminder} />
            ));
    };
    return (
        <div>
            <h1>Reminders</h1>
            <div className="reminder-section">
                <h2>High Priority</h2>
                <ul>{renderRemindersByPriority('high')}</ul>
            </div>
            <div className="reminder-section">
                <h2>Medium Priority</h2>
                <ul>{renderRemindersByPriority('medium')}</ul>
            </div>
            <div className="reminder-section">
                <h2>Low Priority</h2>
                <ul>{renderRemindersByPriority('low')}</ul>
            </div>
        </div>
    );
};

export default Reminders; 