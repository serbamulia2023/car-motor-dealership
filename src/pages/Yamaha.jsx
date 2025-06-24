import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Yamaha.module.css';

const Yamaha = () => {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ['/car2.jpg', '/car.jpg'];

  useEffect(() => {
    if (location.hash === '#yamaha-contact') {
      setTimeout(() => {
        const section = document.querySelector(location.hash);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.carousel}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className={`${styles.image} ${index === currentIndex ? styles.active : styles.inactive}`}
            />
          ))}
        </div>
        <div className={styles.tagline}>
          <h1 className={styles.title}>Yamaha</h1>
          <p className={styles.subtitle}>Revs Your Heart. Performance Meets Passion.</p>
        </div>
      </section>

      {/* Our Vehicles */}
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Our Vehicles</h2>
        <div className={styles.grid}>
            {[
            { name: 'NMAX', type: 'Scooter', price: 'Rp30.000.000 - Rp40.000.000', route: 'nmax' },
            { name: 'Aerox', type: 'Scooter', price: 'Rp25.000.000 - Rp35.000.000', route: 'aerox' },
            { name: 'R15', type: 'Sport Bike', price: 'Rp40.000.000 - Rp50.000.000', route: 'r15' }
            ].map((vehicle, index) => (
            <div className={styles.vehicleCard} key={index}>
                <img src="/car2.jpg" alt={vehicle.name} className={styles.vehicleImage} />
                <div className={styles.vehicleInfo}>
                <h3 className={styles.vehicleName}>{vehicle.name}</h3>
                <p><strong>Type:</strong> {vehicle.type}</p>
                <p><strong>OTR:</strong> {vehicle.price}</p>
                <Link to={`/yamaha/models/${vehicle.route}`} className={styles.knowMoreBtn}>
                    Know More
                </Link>
                </div>
            </div>
            ))}
        </div>
      </section>


      {/* Dealers */}
      <section className={styles.dealersSection}>
        <h2 className={styles.sectionTitle}>Our Dealers</h2>
        <div className={styles.dealerGrid}>
          <div className={styles.dealerCard}>
            <a href="https://maps.google.com?q=Jl. Panglima Sudirman No.55, Surabaya" target="_blank" rel="noreferrer">
              <img src="/car.jpg" alt="Yamaha Surabaya" className={styles.dealerImage} />
              <h3 className={styles.dealerHeading}>Surabaya</h3>
              <p className={styles.dealerAddress}>Jl. Panglima Sudirman No.55, Surabaya</p>
            </a>
          </div>
          <div className={styles.dealerCard}>
            <a href="https://maps.google.com?q=Jl. Asia Afrika No.8, Bandung" target="_blank" rel="noreferrer">
              <img src="/car.jpg" alt="Yamaha Bandung" className={styles.dealerImage} />
              <h3 className={styles.dealerHeading}>Bandung</h3>
              <p className={styles.dealerAddress}>Jl. Asia Afrika No.8, Bandung</p>
            </a>
          </div>
          <div className={styles.dealerCard}>
            <a href="https://maps.google.com?q=Jl. Gajah Mada No.100, Jakarta" target="_blank" rel="noreferrer">
              <img src="/car.jpg" alt="Yamaha Jakarta" className={styles.dealerImage} />
              <h3 className={styles.dealerHeading}>Jakarta</h3>
              <p className={styles.dealerAddress}>Jl. Gajah Mada No.100, Jakarta</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Yamaha Dealership. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Yamaha;
