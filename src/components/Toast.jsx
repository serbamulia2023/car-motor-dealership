import React, { useEffect } from 'react';
import styles from './Toast.module.css'; // ✅ Make sure this path is correct

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
