import React from 'react';
import styles from './Yamaha.module.css';

const YamahaModels = () => {
  return (
    <div className={styles.page}>
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Explore Yamaha Models</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.heading}>Sport Bikes</h3>
            <p>
              Designed for speed and performance, Yamaha sport bikes offer cutting-edge technology and aerodynamic design.
              Perfect for adrenaline seekers.
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.heading}>Scooters</h3>
            <p>
              Yamaha scooters combine practicality with urban elegance. Ideal for quick, smooth, and stylish daily commutes.
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.heading}>Off-Road</h3>
            <p>
              Built to conquer challenging terrain, Yamaha's off-road bikes are tough, reliable, and made for adventure lovers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YamahaModels;
