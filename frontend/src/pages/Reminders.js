import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../api/axiosInstance';
import Reminder from '../components/Reminder';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { ReactComponent as HighPriorityIcon } from '../icons/high-priority.svg';
import { ReactComponent as MediumPriorityIcon } from '../icons/medium-priority.svg';
import { ReactComponent as LowPriorityIcon } from '../icons/low-priority.svg';
import './Reminder.css';

const Reminders = ({ setModalMessage }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const reminders = useSelector((state) => state.reminders.reminders);
    const userId = useSelector((state) => state.user.userId);

    useEffect(() => {
        const fetchReminders = async () => {
            if (!userId) return;
            
            try {
                setIsLoading(true);
                const response = await axiosInstance.get(`/api/reminders/${userId}`);
                dispatch({ type: 'SET_REMINDERS', payload: response.data });
                setModalMessage("Reminders updated successfully");
            } catch (error) {
                setModalMessage(error.response?.data?.message || 'Failed to fetch reminders');
            } finally {
                setIsLoading(false);
            }
        };
        fetchReminders();
    }, [userId, dispatch, setModalMessage]);

    const renderPrioritySection = (priority, Icon) => {
        const filteredReminders = reminders?.filter(reminder => reminder.priority === priority);
        const priorityColors = {
            high: 'error',
            medium: 'warning',
            low: 'success'
        };

        return (
            <div className={`priority-card ${priorityColors[priority]}`}>
                <div className="priority-header">
                    <Icon className="priority-icon" />
                    <h2>{priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</h2>
                    <span className="badge">{filteredReminders?.length || 0}</span>
                </div>
                {isLoading ? (
                    <div className="loader-container">
                        <Loader size="small" />
                    </div>
                ) : (
                    <ul className="reminders-list">
                        {filteredReminders?.length > 0 ? (
                            filteredReminders.map(reminder => (
                                <Reminder 
                                    key={reminder.id}
                                    setModalMessage={setModalMessage}
                                    reminder={reminder}
                                />
                            ))
                        ) : (
                            <EmptyState message="No reminders in this category" />
                        )}
                    </ul>
                )}
            </div>
        );
    };

    return (
        <div className="reminders-container">
            <header className="reminders-header">
                <h1>Your Reminders</h1>
                <p className="subtitle">Manage your tasks efficiently</p>
            </header>
            
            {isLoading ? (
                <div className="full-page-loader">
                    <Loader />
                    <p>Loading your reminders...</p>
                </div>
            ) : (
                <div className="priority-grid">
                    {renderPrioritySection('high', HighPriorityIcon)}
                    {renderPrioritySection('medium', MediumPriorityIcon)}
                    {renderPrioritySection('low', LowPriorityIcon)}
                </div>
            )}
        </div>
    );
};

export default Reminders;