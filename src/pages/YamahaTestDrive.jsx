// src/pages/YamahaTestDrive.jsx
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import styles from './YamahaTestDrive.module.css';
import Toast from '../components/Toast';
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom';

const yamahaSeries = [
  // MAXI Series
  { label: 'XMAX Series', value: 'XMAX' },
  { label: 'NMAX Series', value: 'NMAX' },
  { label: 'Aerox Series', value: 'Aerox' },
  { label: 'Lexi Series', value: 'Lexi' },
  { label: 'Freego Series', value: 'Freego' },
  { label: 'Gear Series', value: 'Gear' },
  { label: 'Fazzio Series', value: 'Fazzio' },
  { label: 'Filano Series', value: 'Filano' },

  // Matic Adventure
  { label: 'X-Ride Series', value: 'XRide' },

  // Matic Classic / Trendy
  { label: 'Mio Series', value: 'Mio' },
  { label: 'Fino Series', value: 'Fino' },

  // Sport Heritage
  { label: 'XSR Series', value: 'XSR' },

  // Sport Racing
  { label: 'R15 Series', value: 'R15' },
  { label: 'R25 Series', value: 'R25' },

  // Naked Sport
  { label: 'MT-25 Series', value: 'MT25' },
  { label: 'MT-15 Series', value: 'MT15' },
  { label: 'Vixion Series', value: 'Vixion' },

  // Off-Road
  { label: 'WR155R Series', value: 'WR155R' },
  { label: 'YZ125X Series', value: 'YZ125X' },
  { label: 'YZ250 Series', value: 'YZ250' },

  // Bebek / Underbone
  { label: 'MX King Series', value: 'MXKing' },
  { label: 'Jupiter Z1 Series', value: 'JupiterZ1' },
  { label: 'Vega Force Series', value: 'VegaForce' },
];

const YamahaTestDrive = () => {
  const [searchParams] = useSearchParams();
  const modelFromQuery = searchParams.get('model');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    model: modelFromQuery || '',
    location: '',
    date: '',
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (modelFromQuery) {
      setFormData((prev) => ({ ...prev, model: modelFromQuery }));
    }
  }, [modelFromQuery]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/book-test-drive/yamaha', {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        model: formData.model,
        location: formData.location,
        date: formData.date,
      });

      setToast({
        message: 'Test ride request submitted successfully!',
        type: 'success',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        model: '',
        location: '',
        date: '',
      });
    } catch (err) {
      console.error('❌ Submission failed:', err);
      setToast({
        message: 'Something went wrong. Please try again.',
        type: 'error',
      });
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <h1>Book a Yamaha Test Ride</h1>
        <p>
          Experience the thrill and performance of Yamaha bikes firsthand. Fill out the form below and our team will contact you to schedule a test ride.
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
            <label htmlFor="model">Preferred Series</label>
            <Select
              inputId="model"
              options={yamahaSeries}
              placeholder="Select a series"
              value={yamahaSeries.find((opt) => opt.value === formData.model)}
              onChange={(selectedOption) =>
                setFormData({ ...formData, model: selectedOption?.value || '' })
              }
              isClearable
            />
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
    </div>
  );
};

export default YamahaTestDrive;