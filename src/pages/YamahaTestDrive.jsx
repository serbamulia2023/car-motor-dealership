import React, { useState, useEffect } from 'react';
import axios from '../axios';
import styles from './YamahaTestDrive.module.css';
import Toast from '../components/Toast';
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom';

const yamahaSeries = [
  { label: 'XMAX Series', value: 'XMAX' },
  { label: 'NMAX Series', value: 'NMAX' },
  { label: 'Aerox Series', value: 'Aerox' },
  { label: 'Lexi Series', value: 'Lexi' },
  { label: 'Freego Series', value: 'Freego' },
  { label: 'Gear Series', value: 'Gear' },
  { label: 'Fazzio Series', value: 'Fazzio' },
  { label: 'Filano Series', value: 'Filano' },
  { label: 'X-Ride Series', value: 'XRide' },
  { label: 'Mio Series', value: 'Mio' },
  { label: 'Fino Series', value: 'Fino' },
  { label: 'XSR Series', value: 'XSR' },
  { label: 'R15 Series', value: 'R15' },
  { label: 'R25 Series', value: 'R25' },
  { label: 'MT-25 Series', value: 'MT25' },
  { label: 'MT-15 Series', value: 'MT15' },
  { label: 'Vixion Series', value: 'Vixion' },
  { label: 'WR155R Series', value: 'WR155R' },
  { label: 'YZ125X Series', value: 'YZ125X' },
  { label: 'YZ250 Series', value: 'YZ250' },
  { label: 'MX King Series', value: 'MXKing' },
  { label: 'Jupiter Z1 Series', value: 'JupiterZ1' },
  { label: 'Vega Force Series', value: 'VegaForce' },
];

const dealerOptions = [
  { value: 'Yamaha Melak', label: 'Yamaha Melak' },
  { value: 'Yamaha Barong Tongkok', label: 'Yamaha Barong Tongkok' },
  { value: 'Yamaha Bontang', label: 'Yamaha Bontang' },
  { value: 'Yamaha Petung', label: 'Yamaha Petung' },
  { value: 'Yamaha Sangatta', label: 'Yamaha Sangatta' },
  { value: 'Yamaha Tanah Grogot', label: 'Yamaha Tanah Grogot' },
  { value: 'Yamaha Lambung Mangkurat', label: 'Yamaha Lambung Mangkurat' },
  { value: 'Yamaha Loa Janan Ilir', label: 'Yamaha Loa Janan Ilir' },
  { value: 'Yamaha Karang Jati', label: 'Yamaha Karang Jati' },
  { value: 'Yamaha Klandasan', label: 'Yamaha Klandasan' },
  { value: 'Yamaha Tenggarong', label: 'Yamaha Tenggarong' },
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
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (modelFromQuery) {
      setFormData((prev) => ({ ...prev, model: modelFromQuery }));
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

      setFormData({ name: '', email: '', phone: '', model: '', location: '', date: '' });
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
              name="model"
              inputId="model"
              options={yamahaSeries}
              placeholder="Select a series"
              value={yamahaSeries.find((opt) => opt.value === formData.model) || null}
              onChange={handleSelectChange}
              isClearable
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location">Preferred Location</label>
            <Select
              name="location"
              inputId="location"
              options={dealerOptions}
              placeholder="Select location"
              value={dealerOptions.find((opt) => opt.value === formData.location) || null}
              onChange={handleSelectChange}
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
    </div>
  );
};

export default YamahaTestDrive;