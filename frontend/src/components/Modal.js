import React from 'react';
import './Modal.css'; // Add styles for the modal
import ErrorIcon from '../icons/error-icon.svg'; // Import an error icon

const Modal = ({ message, onClose, isError = false }) => {
    if (!message) return null; // Don't render if there's no message

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                {isError && <img src={ErrorIcon} alt="Error" className="error-icon" />} {/* Error icon */}
                <p className={isError ? "error-message" : ""}>{message}</p> {/* Apply error styling if isError */}
            </div>
        </div>
    );
};

export default Modal;
