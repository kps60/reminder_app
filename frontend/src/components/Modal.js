import React from 'react';
import './Modal.css'; // Add styles for the modal

const Modal = ({ message, onClose }) => {
    if (!message) return null; // Don't render if there's no message

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Modal;