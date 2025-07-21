import React, { useEffect, useState } from 'react';
import styles from './Toast.module.css';

const ICONS = {
  success: '✓',
  error: '✕',
  info: 'ℹ️',
  warning: '!',
};

const Toast = ({ message, type = 'success', onClose = () => {} }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className={styles.toastContainer}>
      <div className={`${styles.toast} ${styles[type]}`}>
        <span style={{ fontSize: '1.25rem', marginRight: '0.75rem' }}>
          {ICONS[type] || 'ℹ️'}
        </span>
        <span style={{ flex: 1 }}>{message}</span>
        <button
          className={styles.closeButton}
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
