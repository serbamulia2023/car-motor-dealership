import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DaihatsuModels.module.css';

const DaihatsuModels = () => {
  const vehicles = [
    {
      name: 'Ayla',
      type: 'LCGC',
      seats: 5,
      colors: ['#000', '#ccc', '#f00'],
      price: 'Rp200.000.000 - Rp300.000.000',
      route: 'ayla',
    },
    {
      name: 'Xenia',
      type: 'MPV',
      seats: 7,
      colors: ['#0055ff', '#999999'],
      price: 'Rp200.000.000 - Rp300.000.000',
      route: 'xenia',
    },
    {
      name: 'Terios',
      type: 'SUV',
      seats: 7,
      colors: ['#000000', '#dddddd', '#008000'],
      price: 'Rp200.000.000 - Rp300.000.000',
      route: 'terios',
    },
    {
      name: 'Rocky',
      type: 'SUV',
      seats: 5,
      colors: ['#000000', '#cccccc', '#ff0000'],
      price: 'Rp250.000.000 - Rp330.000.000',
      route: 'rocky',
    },
    {
      name: 'Sigra',
      type: 'MPV',
      seats: 7,
      colors: ['#0000ff', '#888888', '#008000'],
      price: 'Rp180.000.000 - Rp260.000.000',
      route: 'sigra',
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
              <img src="/car.jpg" alt={vehicle.name} className={styles.vehicleImage} />
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
