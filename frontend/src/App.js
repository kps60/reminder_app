import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Reminders from './pages/Reminders';
import CreateReminder from './pages/CreateReminder';
import Modal from './components/Modal';
import './App.css'; // Import the CSS file for animations

const App = () => {
    const [modalMessage, setModalMessage] = useState('');

    const handleCloseModal = () => {
        setModalMessage('');
    };

    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Modal message={modalMessage} onClose={handleCloseModal} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login setModalMessage={setModalMessage} />} />
                    <Route path="/register" element={<Register setModalMessage={setModalMessage} />} />
                    <Route path="/reminders/:userId" element={<Reminders setModalMessage={setModalMessage} />} />
                    <Route path="/create-reminder/:userId" element={<CreateReminder setModalMessage={setModalMessage} />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
