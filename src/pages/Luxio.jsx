import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const carColors = [
  { name: 'Rock Grey Metallic', color: '#4a4a4a', image: '/cars/luxio-grey.jpg' },
  { name: 'Icy White', color: '#ffffff', image: '/cars/luxio-white.jpg' },
  { name: 'Black Metallic', color: '#000000', image: '/cars/luxio-black.jpg' },
  { name: 'Classic Silver', color: '#c0c0c0', image: '/cars/luxio-silver.jpg' },
];

const variantData = [
  {
    name: 'D',
    image: '/cars/luxio-d.jpg',
    features: [
      'Dual Multi Reflector Headlamp',
      'Manual Outer Mirror',
      '15” Steel Wheel',
      '1 DIN Audio Head Unit',
      'Single Blower AC',
      '1.5L Engine (3SZ-VE)',
    ],
  },
  {
    name: 'X',
    image: '/cars/luxio-x.jpg',
    features: [
      'Kelengkapan tipe D ditambah:',
      'Front Grille with Chrome',
      'Foglamp',
      '15” Alloy Wheel',
      'Two Tone Dashboard',
      'Double Blower AC',
      '2DIN Touchscreen Audio Head Unit',
    ],
  },
];

const Luxio = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(carColors[0]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-10 py-8 md:py-10 gap-8 max-w-7xl mx-auto w-full">
        <div className="flex-1 min-w-[300px] space-y-6">
          <h1 className="text-4xl font-bold">Luxio</h1>
          <p className="text-gray-700">
            MPV yang mewah, elegan dan nyaman untuk keluarga maupun usaha harian.
          </p>

          <div className="w-full flex flex-col items-center justify-center text-center">
            <h2 className="font-semibold mb-4 text-xl">Pilih Warna:</h2>
            <div className="flex flex-wrap gap-5 items-center justify-center">
              {carColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-4 transition-all duration-200 flex items-center justify-center ${
                    selectedColor.name === color.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  title={color.name}
                >
                  <span
                    className="block w-5 h-5 rounded-full"
                    style={{ backgroundColor: color.color }}
                  ></span>
                </button>
              ))}
            </div>
            <div className="w-full flex justify-center mt-4">
              <div className="text-base font-bold text-gray-800 text-center">{selectedColor.name}</div>
            </div>
          </div>

          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={() => navigate('/daihatsu/test-drive?model=Luxio')}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 shadow"
            >
              Test Drive
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 shadow"
            >
              Dapatkan Penawaran
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-start">
          <img
            src={selectedColor.image}
            alt={selectedColor.name}
            className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] rounded shadow object-cover"
          />
        </div>
      </div>

      {/* Detail Sections */}
      <div className="max-w-6xl mx-auto w-full px-8 py-10 space-y-16">
        {/* Eksterior */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/luxio-exterior.jpg" alt="Eksterior" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Eksterior</h2>
            <p className="text-gray-700 mb-4">Desain yang mewah dan elegan cocok menemani setiap perjalanan Sahabat</p>
          </div>
        </div>

        {/* Interior */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/luxio-interior.jpg" alt="Interior" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Interior</h2>
            <p className="text-gray-700 mb-4">
              Desain mewah dan elegan, kabin luas dan lega menambah kenyamanan perjalanan Sahabat
            </p>
          </div>
        </div>

        {/* Performa */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Performa</h2>
          <p className="text-gray-700 mb-4">
            Makin kuat, makin aman dan bisnis makin maju
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li><strong>1.5L Engine (3SZ-VE)</strong>: 1,495 cc / 97 PS / 13.7 Nm</li>
          </ul>
        </div>

        {/* Platform */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Transmisi & Platform</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Manual Transmission untuk pengendalian yang tangguh dan efisien</li>
          </ul>
        </div>

        {/* Keamanan */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/luxio-safety.jpg" alt="Keamanan" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Keamanan</h2>
            <p className="text-gray-700 mb-4">Fitur keselamatan standar membuat perjalanan lebih tenang dan aman</p>
          </div>
        </div>
      </div>

      {/* Varian */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Tipe Varian Standar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {variantData.map((variant) => (
            <div
              key={variant.name}
              className="rounded-2xl shadow-xl overflow-hidden transition-all duration-300 flex flex-col justify-between bg-white hover:bg-[#d3202f] hover:text-white group"
            >
              <img src={variant.image} alt={variant.name} className="w-full object-cover" />
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-white">{variant.name}</h3>
                  <ul className="list-disc ml-5 space-y-1 text-sm group-hover:text-white">
                    {variant.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-5 py-2 rounded-lg font-semibold shadow bg-[#d3202f] text-white group-hover:bg-white group-hover:text-[#d3202f]"
                  >
                    Dapatkan Penawaran
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-black text-white text-center py-6 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Daihatsu by DriveNow. All rights reserved.
      </footer>
    </div>
  );
};

export default Luxio;
