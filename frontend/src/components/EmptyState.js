import React from 'react';
import { ReactComponent as EmptyIcon } from '../icons/empty-state.svg';
import './Loader.css';

const EmptyState = ({ message }) => {
  return (
    <div className="empty-state">
      <EmptyIcon className="empty-icon" />
      <p className="empty-message">{message}</p>
    </div>
  );
};

export default EmptyState;