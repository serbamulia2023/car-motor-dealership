import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../axios';
import styles from './DaihatsuTestDrive.module.css';
import Toast from '../components/Toast';
import Select from 'react-select';

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
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (modelFromQuery) {
      setSelectedModel(modelFromQuery);
    }
  }, [modelFromQuery]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post('/book-test-drive/daihatsu', {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        model: selectedModel,
        location: formData.location,
        date: formData.date,
      });

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
    } catch (err) {
      console.error('❌ Submission failed:', err);
      setToast({
        message: 'Something went wrong. Please try again.',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const locationOptions = [
    { value: 'Samarinda', label: 'Samarinda' },
    { value: 'Balikpapan', label: 'Balikpapan' },
    { value: 'Paser', label: 'Paser' },
    { value: 'Sorong', label: 'Sorong' },
    { value: 'Jayapura', label: 'Jayapura' },
    { value: 'Other', label: 'Other' },
  ];

  const modelOptions = [
    { value: 'Ayla', label: 'Ayla' },
    { value: 'Rocky', label: 'Rocky' },
    { value: 'Terios', label: 'Terios' },
    { value: 'Sigra', label: 'Sigra' },
    { value: 'Granmax Pick Up', label: 'Granmax Pick Up' },
    { value: 'Granmax Van', label: 'Granmax Van' },
    { value: 'Xenia', label: 'Xenia' },
    { value: 'Luxio', label: 'Luxio' },
  ];

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
            <Select
              name="model"
              options={modelOptions}
              value={modelOptions.find((opt) => opt.value === selectedModel) || null}
              onChange={(option) => setSelectedModel(option?.value || '')}
              placeholder="Select a model"
              isClearable
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location">Preferred Location</label>
            <Select
              name="location"
              options={locationOptions}
              value={locationOptions.find((opt) => opt.value === formData.location) || null}
              onChange={handleSelectChange}
              placeholder="Select location"
              isClearable
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

          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Request'}
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
