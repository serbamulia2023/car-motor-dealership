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
      city: 'Yamaha Melak',
      address: 'Jl. Pattimura, Melak Ulu, Kec. Melak, Kabupaten Kutai Barat, Kalimantan Timur 75775',
      phone: '0853-1904-0312',
      hours: 'Closes 4.00 pm',
      link: 'https://maps.google.com?q=Jl.+Pattimura,+Melak+Ulu,+Melak,+Kutai+Barat',
    },
    {
      city: 'Yamaha Barong Tongkok',
      address: 'Jl. Sendawar Raya Kel No.RT.001, Ngenyan Asa, Kec. Barong Tongkok, Kabupaten Kutai Barat, Kalimantan Timur 75776',
      phone: '0821-1675-1153',
      hours: 'Closes 4.00 pm',
      link: 'https://maps.google.com?q=Jl.+Sendawar+Raya+Kel+No.RT.001,+Barong+Tongkok,+Kutai+Barat',
    },
    {
      city: 'Yamaha Bontang',
      address: 'Jl. Ir. H. Juanda No.60-64, Tj. Laut Indah, Kec. Bontang Sel., Kota Bontang, Kalimantan Timur 75325',
      phone: '0822-1166-1351',
      hours: 'Closes 5.00 pm',
      link: 'https://maps.google.com?q=Jl.+Ir.+H.+Juanda+No.60-64,+Bontang,+Kalimantan+Timur',
    },
    {
      city: 'Yamaha Petung',
      address: 'Giri Mukti, Penajam, Penajam North Paser Regency, East Kalimantan 76143',
      phone: '(0542) 7028647',
      hours: 'Closes 4.30 pm',
      link: 'https://maps.google.com?q=Giri+Mukti,+Penajam,+Kalimantan+Timur',
    },
    {
      city: 'Yamaha Sangatta',
      address: 'Jl. A Wahab Syahranie, Sangatta Utara, Kec. Sangatta Utara, Kabupaten Kutai Timur, Kalimantan Timur 75683',
      phone: '0852-4711-0069',
      hours: 'Closes 5.00 pm',
      link: 'https://maps.google.com?q=Jl.+A+Wahab+Syahranie,+Sangatta+Utara,+Kutai+Timur',
    },
    {
      city: 'Yamaha Tanah Grogot',
      address: 'JL. Jend Sudirman Jalur 11, Tanah Grogot, Kec. Tanah Grogot, Kabupaten Paser, Kalimantan Timur 76251',
      phone: '0877-7754-2391',
      hours: 'Closes 4.00 pm',
      link: 'https://maps.google.com?q=JL.+Jend+Sudirman+Jalur+11,+Tanah+Grogot,+Kalimantan+Timur',
    },
    {
      city: 'Yamaha Lambung Mangkurat',
      address: 'Jl. Lambung Mangkurat No.39, Sungai Pinang Dalam, Kec. Sungai Pinang, Kota Samarinda, Kalimantan Timur 75242',
      phone: '0823-2787-6777',
      hours: 'Closes 6.00 pm',
      link: 'https://maps.google.com?q=Jl.+Lambung+Mangkurat+No.39,+Samarinda,+Kalimantan+Timur',
    },
    {
      city: 'Yamaha Loa Janan Ilir',
      address: 'Jl. Cipto Mangunkusumo, Simpang Tiga, Kec. Loa Janan Ilir, Kota Samarinda, Kalimantan Timur 75391',
      phone: '0821-5011-3331',
      hours: 'Closes 4.00 pm',
      link: 'https://maps.google.com?q=Jl.+Cipto+Mangunkusumo,+Loa+Janan+Ilir,+Samarinda',
    },
    {
      city: 'Yamaha Karang Jati',
      address: 'Jl. Ahmad Yani No.9, Mekarsari, Kec. Balikpapan Tengah, Kota Balikpapan, Kalimantan Timur 76121',
      phone: '(0542) 736359',
      hours: 'Closes 4.30 pm',
      link: 'https://maps.google.com?q=Jl.+Ahmad+Yani+No.9,+Balikpapan,+Kalimantan+Timur',
    },
    {
      city: 'Yamaha Klandasan',
      address: 'Jl. APT Pranoto SK. I/ 77 A, Klandasan Ilir, Balikpapan Kota, Balikpapan City, East Kalimantan',
      phone: '(0542) 734786',
      hours: 'Closes 4.30 pm',
      link: 'https://maps.google.com?q=Jl.+APT+Pranoto+SK.+I/77+A,+Balikpapan,+Kalimantan+Timur',
    },
    {
      city: 'Yamaha Tenggarong',
      address: 'Jl. Pesut No.99A, Timbau, Kec. Tenggarong, Kabupaten Kutai Kartanegara, Kalimantan Timur 75513',
      phone: '(0541) 663422',
      hours: 'Closes 5.00 pm',
      link: 'https://maps.google.com?q=Jl.+Pesut+No.99A,+Timbau,+Tenggarong,+Kutai+Kartanegara',
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
              <p className={styles.dealerInfo}>Phone: {dealer.phone}</p>
              <p className={styles.dealerInfo}>{dealer.hours}</p>
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
