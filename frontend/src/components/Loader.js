import React from 'react';
import './Loader.css';

const Loader = ({ size = 'medium' }) => {
  return <div className={`loader ${size}`} aria-label="Loading"></div>;
};

export default Loader;