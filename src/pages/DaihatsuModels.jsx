import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DaihatsuModels.module.css';

const DaihatsuModels = () => {
  const vehicles = [
    {
      name: 'All New Ayla',
      type: 'LCGC',
      seats: 5,
      colors: ['#0a0a0a', '#555555', '#ff7b00', '#a00000', '#ffffff', '#c0c0c0', '#ffdc00', '#c21807'],
      price: 'Rp135.000.000 - Rp190.000.000',
      route: 'ayla',
      image: '/daihatsu/ayla.jpg',
    },
    {
      name: 'Xenia',
      type: 'MPV',
      seats: 7,
      colors: ['#434f4d', '#c8c6d7', '#555555', '#c0c0c0', '#ffffff', '#000000'],
      price: 'Rp220.000.000 - Rp280.000.000',
      route: 'xenia',
      image: '/daihatsu/xenia.jpg',
    },
    {
      name: 'Terios',
      type: 'SUV',
      seats: 7,
      colors: ['#8B0000', '#ffffff', '#000000', '#3b4b3b', '#c0c0c0', '#cd7f32'],
      price: 'Rp250.000.000 - Rp310.000.000',
      route: 'terios',
      image: '/daihatsu/terios.jpg',
    },
    {
      name: 'Rocky',
      type: 'SUV',
      seats: 5,
      colors: ['#f6f6f6', '#c0c0c0', '#555555', '#000000', '#ffffff', '#f9d71c', '#d7263d'],
      price: 'Rp250.000.000 - Rp330.000.000',
      route: 'rocky',
      image: '/daihatsu/rocky.jpg',
    },
    {
      name: 'Sigra',
      type: 'MPV',
      seats: 7,
      colors: ['#d35400', '#c0392b', '#cd7f32', '#bdc3c7', '#000000', '#ffffff', '#7f8c8d'],
      price: 'Rp136.000.000 - Rp180.000.000',
      route: 'sigra',
      image: '/daihatsu/sigra.jpg',
    },
    {
      name: 'Gran Max Pickup',
      type: 'Pickup',
      seats: 3,
      colors: ['#000000', '#555555', '#c0c0c0', '#ffffff'],
      price: 'Rp155.000.000 - Rp190.000.000',
      route: 'granmax-pickup',
      image: '/daihatsu/granmax-pickup.jpg',
    },
    {
      name: 'Gran Max Van',
      type: 'Van',
      seats: '2–8',
      colors: ['#000000', '#888888', '#c0c0c0', '#ffffff'],
      price: 'Rp180.000.000 - Rp230.000.000',
      route: 'granmax-van',
      image: '/daihatsu/granmax-van.jpg',
    },
    {
      name: 'New Sirion',
      type: 'Hatchback',
      seats: 5,
      colors: ['#b31b1b', '#4e4e4e', '#ffffff', '#c0c0c0', '#0047ab'],
      price: 'Rp230.000.000 - Rp250.000.000',
      route: 'sirion',
      image: '/daihatsu/sirion.jpg',
    },
    {
      name: 'Luxio',
      type: 'Van',
      seats: 8,
      colors: ['#4a4a4a', '#ffffff', '#000000', '#c0c0c0'],
      price: 'Rp230.000.000 - Rp270.000.000',
      route: 'luxio',
      image: '/daihatsu/luxio.jpg',
    },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.mainContent}>
        <h2 className={styles.sectionTitle}>Daihatsu Models</h2>
        <p className={styles.subtitle}>
          Explore our full range of Daihatsu vehicles — built for every journey, every lifestyle.
        </p>

        <div className={styles.grid}>
          {vehicles.map((vehicle, index) => (
            <Link
              to={`/daihatsu/models/${vehicle.route}`}
              className={styles.vehicleCard}
              key={index}
            >
              <img src={vehicle.image} alt={vehicle.name} className={styles.vehicleImage} />
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
                      {vehicle.colors.map((color, idx) => (
                        <span
                          key={idx}
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
      </main>

      <footer className={styles.footer}>
        © 2025 Daihatsu by DriveNow. All rights reserved.
      </footer>
    </div>
  );
};

export default DaihatsuModels;
