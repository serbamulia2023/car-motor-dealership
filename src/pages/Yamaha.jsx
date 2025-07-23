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

  const vehicles = [
    {
      name: 'NMAX Series',
      type: 'MAXI',
      colors: ['#231F20', '#C0C0C0', '#FF0000', '#FFFFFF', '#AFC8E0', '#000000'],
      route: 'nmax',
    },
    {
      name: 'Aerox Series',
      type: 'MAXI',
      colors: ['#3A3A3A', '#1E1E9D', '#FFD700', '#C0C0C0', '#C8102E', '#000000'],
      route: 'aerox',
    },
    {
      name: 'R15 Series',
      type: 'Sport',
      colors: ['#DAD9D5', '#00205B', '#0F0F0F'],
      route: 'r15',
    },
  ];

  const dealers = [
    {
      city: 'Yamaha Surabaya',
      address: 'Jl. Panglima Sudirman No.55, Surabaya',
      link: 'https://maps.google.com?q=Jl. Panglima Sudirman No.55, Surabaya',
    },
    {
      city: 'Yamaha Bandung',
      address: 'Jl. Asia Afrika No.8, Bandung',
      link: 'https://maps.google.com?q=Jl. Asia Afrika No.8, Bandung',
    },
    {
      city: 'Yamaha Jakarta',
      address: 'Jl. Gajah Mada No.100, Jakarta',
      link: 'https://maps.google.com?q=Jl. Gajah Mada No.100, Jakarta',
    },
  ];

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
          <img src="/brands/yamaha-landing.png" alt="Yamaha Logo" className={styles.brandLogo} />
          <p className={styles.subtitle}>Revs Your Heart. Performance Meets Passion.</p>
        </div>
      </section>

      {/* Our Vehicles */}
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Our Vehicles</h2>
        <div className={styles.grid}>
          {vehicles.map((vehicle, index) => (
            <Link to={`/yamaha/models/${vehicle.route}`} className={styles.vehicleCard} key={index}>
              <img src="/car2.jpg" alt={vehicle.name} className={styles.vehicleImage} />
              <div className={styles.vehicleInfo}>
                <h3 className={styles.vehicleName}>{vehicle.name}</h3>
                <ul className={styles.specList}>
                  <li className={styles.specRow}>
                    <span className={styles.specLabel}>Type</span>
                    <span>{vehicle.type}</span>
                  </li>
                  <li className={styles.colorRow}>
                    <span className={styles.colorLabel}>Colors</span>
                    <span className={styles.colorDots}>
                      {vehicle.colors.map((color, i) => (
                        <span
                          key={i}
                          className={styles.colorDot}
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                    </span>
                  </li>
                </ul>
                <div className={styles.vehiclePrice}>{vehicle.price}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.viewAllBtn}>
          <Link to="/yamaha/models">View All Models</Link>
        </div>
      </section>

      {/* Dealers */}
      <section className={styles.dealersSection}>
        <h2 className={styles.sectionTitle}>Our Dealers</h2>
        <div className={styles.dealerGrid}>
          {dealers.map((dealer, index) => (
            <div key={index} className={styles.dealerCard}>
              <a href={dealer.link} target="_blank" rel="noopener noreferrer">
                <img src="/car.jpg" alt={`${dealer.city} Dealer`} className={styles.dealerImage} />
              </a>
              <h3 className={styles.dealerHeading}>{dealer.city}</h3>
              <a className={styles.dealerLink} href={dealer.link} target="_blank" rel="noopener noreferrer">
                {dealer.address}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; {new Date().getFullYear()} Yamaha by DriveNow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Yamaha;
