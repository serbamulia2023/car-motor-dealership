import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Toast from '../components/Toast';
import Select from 'react-select';

const Contact = () => {
  const location = useLocation();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [navbarSource, setNavbarSource] = useState('general');
  const [inquiryType, setInquiryType] = useState('General');
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    inquiry: '',
    location: '',
    customLocation: '',
    message: '',
  });

  useEffect(() => {
    if (loggedInUser) return;

    const origin = location.state?.from;
    const validOrigins = ['daihatsu', 'yamaha'];

    if (origin && validOrigins.includes(origin)) {
      localStorage.setItem('navbarSource', origin);
      setNavbarSource(origin);

      const capitalized = origin.charAt(0).toUpperCase() + origin.slice(1);
      setInquiryType(capitalized);
      setForm((prev) => ({ ...prev, inquiry: capitalized }));
    } else {
      const saved = localStorage.getItem('navbarSource');
      if (saved && validOrigins.includes(saved)) {
        setNavbarSource(saved);
        const capitalized = saved.charAt(0).toUpperCase() + saved.slice(1);
        setInquiryType(capitalized);
        setForm((prev) => ({ ...prev, inquiry: capitalized }));
      }
    }
  }, [location.state, loggedInUser]);

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
    setSubmitting(true);

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
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact-inquiry`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow px-4 py-12 max-w-md mx-auto w-full">
        <h1 className="text-3xl font-semibold text-center mb-2">Contact Us</h1>
        <p className="text-center text-sm text-gray-600 mb-8">
          Please send us your questions using the form below:
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Kind of Inquiry</label>
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
          </div>

          <div>
            <label className="block text-sm mb-1">Closest Location</label>
            <Select
              name="location"
              options={locationOptions}
              value={
                locationOptions.find((opt) => opt.value === form.location) || null
              }
              onChange={handleSelectChange}
              placeholder="Select location"
              isClearable
            />
          </div>

          {form.location === 'Other' && (
            <div>
              <label className="block text-sm mb-1">
                Please specify your location
              </label>
              <input
                type="text"
                name="customLocation"
                required
                placeholder="Enter your city or region"
                value={form.customLocation}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              value={form.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            {submitting ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>
      </main>

      {toast && (
        <div id="toast-root">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      <footer className="bg-black text-white text-center text-sm py-6 mt-auto">
        © 2025 Serba Mulia Auto. All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
