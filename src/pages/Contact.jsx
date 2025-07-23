import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Toast from '../components/Toast';
import Select from 'react-select';
import styles from './Contact.module.css';

const Contact = () => {
  const location = useLocation();

  const [inquiryType, setInquiryType] = useState('General');

  useEffect(() => {
    const from = location.state?.from;
    if (from === 'careers') setInquiryType('Careers');
    else if (from === 'daihatsu') setInquiryType('Daihatsu');
    else if (from === 'yamaha') setInquiryType('Yamaha');
    else setInquiryType('General');
  }, [location]);

  const inquiryOptions = [
    { value: 'Daihatsu', label: 'Daihatsu' },
    { value: 'Yamaha', label: 'Yamaha' },
    { value: 'Castrol', label: 'Castrol' },
    { value: 'General', label: 'General' },
    { value: 'Careers', label: 'Careers' },
  ];

  const locationOptions = [
    { value: 'Samarinda', label: 'Samarinda' },
    { value: 'Balikpapan', label: 'Balikpapan' },
    { value: 'Paser', label: 'Paser' },
    { value: 'Sorong', label: 'Sorong' },
    { value: 'Jayapura', label: 'Jayapura' },
    { value: 'Other', label: 'Other' },
  ];

  const [form, setForm] = useState({
    name: '',
    email: '',
    inquiry: '',
    location: '',
    customLocation: '',
    message: '',
  });

  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setForm((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : '',
      ...(name === 'location' && selectedOption?.value !== 'Other' && {
        customLocation: '',
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalLocation =
      form.location === 'Other' ? form.customLocation : form.location;

    const payload = {
      name: form.name,
      email: form.email,
      inquiry: form.inquiry || inquiryType,
      location: finalLocation,
      message: form.message,
    };

    try {
      const res = await fetch('/api/contact-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to send');

      setToast({ message: 'Inquiry sent successfully!', type: 'success' });

      setForm({
        name: '',
        email: '',
        inquiry: '',
        location: '',
        customLocation: '',
        message: '',
      });
    } catch (err) {
      console.error(err);
      setToast({
        message: 'Failed to send inquiry. Please try again later.',
        type: 'error',
      });
    }
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
            Kind of Inquiry
            <Select
              name="inquiry"
              options={inquiryOptions}
              value={
                inquiryOptions.find((opt) => opt.value === form.inquiry) ||
                inquiryOptions.find((opt) => opt.value === inquiryType)
              }
              onChange={handleSelectChange}
              placeholder="Select inquiry"
              isClearable
            />
          </label>

          <label>
            Closest Location
            <Select
              name="location"
              options={locationOptions}
              value={
                locationOptions.find((opt) => opt.value === form.location) ||
                null
              }
              onChange={handleSelectChange}
              placeholder="Select location"
              isClearable
            />
          </label>

          {form.location === 'Other' && (
            <label>
              Please specify your location
              <input
                type="text"
                name="customLocation"
                required
                placeholder="Enter your city or region"
                value={form.customLocation}
                onChange={handleChange}
              />
            </label>
          )}

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
