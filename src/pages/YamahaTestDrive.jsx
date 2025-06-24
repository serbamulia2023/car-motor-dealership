import React from 'react';
import styles from './YamahaTestDrive.module.css';

const YamahaTestDrive = () => {
  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <h1>Book a Yamaha Test Ride</h1>
        <p>
          Experience the thrill and performance of Yamaha bikes firsthand. Fill out the form below and our team will contact you to schedule a test ride.
        </p>
      </section>

      <section className={styles.formSection}>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your full name" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="Enter your phone number" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="model">Preferred Model</label>
            <select id="model" required>
              <option value="">Select a model</option>
              <option value="YZF-R15">YZF-R15</option>
              <option value="NMAX 155">NMAX 155</option>
              <option value="Aerox 155">Aerox 155</option>
              <option value="XSR 155">XSR 155</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location">Preferred Location</label>
            <input type="text" id="location" placeholder="e.g. Jakarta, Surabaya" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Preferred Date</label>
            <input type="date" id="date" required />
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit Request
          </button>
        </form>
      </section>
    </div>
  );
};

export default YamahaTestDrive;
