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
      name: 'Sigra',
      type: 'LCGC',
      seats: 7,
      colors: ['#d35400', '#c0392b', '#cd7f32', '#bdc3c7', '#000000', '#ffffff', '#7f8c8d'],
      price: 'Rp136.000.000 - Rp180.000.000',
      route: 'sigra',
    },
    {
      name: 'Gran Max',
      type: 'Minivan',
      seats: '2–9',
      colors: ['#000000', '#555555', '#888888', '#c0c0c0', '#ffffff'],
      price: 'Rp155.000.000 - Rp235.000.000',
      route: 'granmax-van',
    },
    {
      name: 'Terios',
      type: 'SUV',
      colors: ['#8B0000', '#ffffff', '#000000', '#3b4b3b', '#c0c0c0', '#cd7f32'],
      seats: 7,
      price: 'Rp250.000.000 - Rp310.000.000',
      route: 'terios',
    },
  ];

    const dealers = [
    {
      city: 'Daihatsu Samarinda',
      address: 'Jl. PM. Noor Kel No.8, Sempaja Sel., Kec. Samarinda Utara, Kota Samarinda, Kalimantan Timur',
      phone: '(0541) 221117',
      link: 'https://www.google.com/maps?q=Jl.+PM.+Noor+Kel+No.8,+Samarinda+Utara,+Kota+Samarinda,+Kalimantan+Timur',
    },
    {
      city: 'Daihatsu Balikpapan',
      address: 'Jl. Mayjend Sutoyo No.9, Klandasan Ilir, Balikpapan Kota, Kota Balikpapan, Kalimantan Timur',
      phone: '(0542) 417543',
      link: 'https://www.google.com/maps?q=Jl.+Mayjend+Sutoyo+No.9,+Balikpapan+Kota,+Kalimantan+Timur',
    },
    {
      city: 'Daihatsu Jayapura',
      address: 'Jl. Raya Abepura, Entrop, Jayapura Sel., Kota Jayapura, Papua',
      phone: '(0967) 531326',
      link: 'https://www.google.com/maps?q=Jl.+Raya+Abepura,+Entrop,+Jayapura+Sel.,+Kota+Jayapura,+Papua',
    },
    {
      city: 'Daihatsu Sorong',
      address: 'Jl. Basuki Rahmat km 9,5, Melati Raya, Sorong, Papua Barat',
      phone: '0823-5089-2897',
      link: 'https://www.google.com/maps?q=Jl.+Basuki+Rahmat+km+9.5,+Melati+Raya,+Sorong,+Papua+Barat',
    },
    {
      city: 'Daihatsu Serba Mulia Auto Paser Grogot',
      address: 'Jl. Rm. Noto Sunardi, RT.006/RW.005, Tanah Grogot, Kec. Tanah Grogot, Kabupaten Paser, Kalimantan Timur 76251',
      phone: '0821-3602-3700',
      link: 'https://www.google.com/maps/place/Daihatsu+Serba+Mulia+Auto+Paser+Grogot',
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
          <img src="/brands/daihatsu-landing.png" alt="Daihatsu Logo" className={styles.brandLogo} />
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
