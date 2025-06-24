import React, { useState } from 'react';
import Toast from '../components/Toast';
import styles from './Contact.module.css';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send via mailto
    const mailtoLink = `mailto:your-email@domain.com?subject=Customer Inquiry from ${form.name}&body=Name: ${form.name}%0D%0AEmail: ${form.email}%0D%0AMessage: ${form.message}`;
    window.location.href = mailtoLink;

    // Trigger consistent toast
    setToast(null);
    setTimeout(() => {
      setToast({
        message: 'Inquiry email triggered successfully!',
        type: 'success',
      });
    }, 100);

    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <div className={styles.contactPage}>
        <h1>Contact Us</h1>
        <p>Please send us your questions using the form below:</p>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="5"
              required
              value={form.message}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Send Inquiry</button>
        </form>
      </div>

      {toast && (
        <div id="toast-root">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      <footer className={styles.footer}>
        © 2025 Daihatsu by DriveNow. All rights reserved.
      </footer>
    </>
  );
};

export default Contact;
