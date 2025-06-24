import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './DaihatsuTestDrive.module.css';
import Toast from '../components/Toast';

const DaihatsuTestDrive = () => {
  const [searchParams] = useSearchParams();
  const modelFromQuery = searchParams.get('model');

  const [selectedModel, setSelectedModel] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    date: '',
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (modelFromQuery) {
      setSelectedModel(modelFromQuery);
    }
  }, [modelFromQuery]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You could add real form submission logic here
    console.log({ ...formData, model: selectedModel });

    setToast({
      message: 'Test drive request submitted successfully!',
      type: 'success',
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      date: '',
    });
    setSelectedModel('');
  };

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <h1>Book a Daihatsu Test Drive</h1>
        <p>
          Ready to experience Daihatsu? Fill out the form below and we’ll get in touch with you to confirm your test drive.
        </p>
      </section>

      <section className={styles.formSection}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="model">Preferred Model</label>
            <select
              id="model"
              required
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="">Select a model</option>
              <option value="Ayla">Ayla</option>
              <option value="Rocky">Rocky</option>
              <option value="Terios">Terios</option>
              <option value="Sigra">Sigra</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location">Preferred Location</label>
            <input
              type="text"
              id="location"
              placeholder="e.g. Jakarta, Surabaya"
              required
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Preferred Date</label>
            <input
              type="date"
              id="date"
              required
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit Request
          </button>
        </form>
      </section>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <footer className={styles.footer}>
        © 2025 Daihatsu by DriveNow. All rights reserved.
      </footer>
    </div>
  );
};

export default DaihatsuTestDrive;
