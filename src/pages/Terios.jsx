import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Required for routing
import styles from './Terios.module.css';

const Terios = () => {
  const carImages = {
    default: '/car.jpg',      // located in public/
    alternate: '/car2.jpg',   // located in public/
  };

  const [currentImage, setCurrentImage] = useState(carImages.default);

  const handleColorClick = (color) => {
    if (color === '#008000') setCurrentImage(carImages.alternate); // green changes image
    else setCurrentImage(carImages.default);
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <h1 className={styles.modelName}>Terios</h1>
          <p className={styles.description}>
            Terios is a powerful and versatile SUV built for urban roads and off-road adventures.
            With its spacious 7-seat capacity and modern styling, it's perfect for families and thrill-seekers alike.
          </p>

          <div className={styles.colorsLabel}>Available Colors:</div>
          <div className={styles.colorOptions}>
            <span
              className={styles.colorDot}
              style={{ backgroundColor: '#000' }}
              onClick={() => handleColorClick('#000')}
            ></span>
            <span
              className={styles.colorDot}
              style={{ backgroundColor: '#008000' }}
              onClick={() => handleColorClick('#008000')}
            ></span>
          </div>

          <div className={styles.buttonGroup}>
            <Link
              to={{
                pathname: '/daihatsu/test-drive',
                search: '?model=Terios',
              }}
              className={`${styles.button} ${styles.testDrive}`}
            >
              Test Drive
            </Link>
            <button className={`${styles.button} ${styles.purchase}`}>Purchase</button>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <img src={currentImage} alt="Terios" className={styles.carImage} />
        </div>
      </div>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Daihatsu by DriveNow. All rights reserved.
      </footer>
    </div>
  );
};

export default Terios;
