import { useNavigate } from 'react-router-dom';
import './BrandLogos.css';

const brands = [
  { name: 'Castrol', image: '/brands/castrol.png', route: '/brands/castrol' },
  { name: 'Daihatsu', image: '/brands/daihatsu.png', route: '/daihatsu' },
  { name: 'Yamaha', image: '/brands/yamaha.png', route: '/brands/yamaha' }
];

export default function BrandLogos() {
  const navigate = useNavigate();

  const handleClick = (route) => {
    // Ensure we scroll to top manually after navigating
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="brand-logos">
      <h2 className="brand-section-title">Featured Brands</h2>
      <div className="brand-logo-grid">
        {brands.map((brand) => (
          <div
            className={`brand-logo-item logo-${brand.name.toLowerCase()}`}
            key={brand.name}
            onClick={() => handleClick(brand.route)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={brand.image}
              alt={brand.name}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
