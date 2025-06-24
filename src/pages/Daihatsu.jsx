import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Daihatsu.module.css';

const Daihatsu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ['/car.jpg', '/car2.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const vehicles = [
    {
      name: 'Ayla',
      type: 'LCGC',
      colors: ['#000', '#ccc', '#f00'],
      seats: 5,
      price: 'Rp200.000.000 - Rp300.000.000',
      route: 'ayla',
    },
    {
      name: 'Xenia',
      type: 'MPV',
      colors: ['#0055ff', '#999999'],
      seats: 7,
      price: 'Rp200.000.000 - Rp300.000.000',
      route: 'xenia',
    },
    {
      name: 'Terios',
      type: 'SUV',
      colors: ['#000000', '#dddddd', '#008000'],
      seats: 7,
      price: 'Rp200.000.000 - Rp300.000.000',
      route: 'terios',
    },
  ];

  const dealers = [
    {
      city: 'Jakarta',
      address: 'Jl. Merdeka No. 10, Central Jakarta',
      phone: '+62 812-1010-1010',
      link: 'https://www.google.com/maps?q=Jl.+Merdeka+No.+10,+Central+Jakarta',
    },
    {
      city: 'Surabaya',
      address: 'Jl. Raya Darmo No. 88, Surabaya',
      phone: '+62 812-2020-2020',
      link: 'https://www.google.com/maps?q=Jl.+Raya+Darmo+No.+88,+Surabaya',
    },
    {
      city: 'Bandung',
      address: 'Jl. Setiabudi No. 50, Bandung',
      phone: '+62 812-3030-3030',
      link: 'https://www.google.com/maps?q=Jl.+Setiabudi+No.+50,+Bandung',
    },
    {
      city: 'Yogyakarta',
      address: 'Jl. Malioboro No. 123, Yogyakarta',
      phone: '+62 812-4040-4040',
      link: 'https://www.google.com/maps?q=Jl.+Malioboro+No.+123,+Yogyakarta',
    },
    {
      city: 'Medan',
      address: 'Jl. Gatot Subroto No. 88, Medan',
      phone: '+62 812-5050-5050',
      link: 'https://www.google.com/maps?q=Jl.+Gatot+Subroto+No.+88,+Medan',
    },
  ];

  return (
    <div className={styles.page}>
      {/* Hero Section */}
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
          <img src="/brands/daihatsu.png" alt="Daihatsu Logo" className={styles.brandLogo} />
          <p className={styles.subtitle}>Innovating Mobility, Empowering Lives</p>
        </div>
      </section>

      {/* Our Vehicles */}
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Our Vehicles</h2>
        <div className={styles.grid}>
          {vehicles.map((vehicle, index) => (
            <Link
              to={`/daihatsu/models/${vehicle.route}`}
              className={styles.vehicleCard}
              key={index}
            >
              <img src="/car2.jpg" alt={vehicle.name} className={styles.vehicleImage} />
              <div className={styles.vehicleInfo}>
                <h3 className={styles.vehicleName}>{vehicle.name}</h3>
                <ul className={styles.specList}>
                  <li className={styles.specRow}>
                    <span className={styles.specLabel}>Body type</span>
                    <span>{vehicle.type}</span>
                  </li>
                  <li className={styles.specRow}>
                    <span className={styles.specLabel}>Seats</span>
                    <span>{vehicle.seats}</span>
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
          <Link to="/daihatsu/models">View All Models</Link>
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
              <p>Phone: {dealer.phone}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; {new Date().getFullYear()} Daihatsu by DriveNow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Daihatsu;
