import React from 'react';
import { ReactComponent as ErrorIcon } from '../icons/error-icon.svg'; // Import an error icon
import { ReactComponent as EmptyIcon } from '../icons/empty-state.svg'; // Import the empty state icon
import './Loader.css';

const EmptyState = ({ message, errorMessage }) => {
  return (
    <div className="empty-state">
      {errorMessage ? (
        <>
          <ErrorIcon className="error-icon" />
          <p className="error-message">{errorMessage}</p>
        </>
      ) : (
        <>
          <EmptyIcon className="empty-icon" />
          <p className="empty-message">{message}</p>
        </>
      )}
    </div>
  );
};

export default EmptyState;
