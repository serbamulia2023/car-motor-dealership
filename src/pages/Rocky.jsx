// src/pages/Rocky.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const carColors = [
  { name: 'Icy White', color: '#f6f6f6', image: '/cars/rocky-icywhite.jpg' },
  { name: 'Glittering Silver', color: '#c0c0c0', image: '/cars/rocky-silver.jpg' },
  { name: 'Rock Gray Metallic', color: '#555555', image: '/cars/rocky-gray.jpg' },
  { name: 'Ultra Black Solid', color: '#000000', image: '/cars/rocky-black.jpg' },
  { name: 'White Pearl', color: '#ffffff', image: '/cars/rocky-whitepearl.jpg' },
  { name: 'Yellow Metallic', color: '#f9d71c', image: '/cars/rocky-yellow.jpg' },
  { name: 'Compagno Red', color: '#d7263d', image: '/cars/rocky-red.jpg' },
  { name: 'Icy White Two Tone', color: '#f6f6f6', image: '/cars/rocky-icywhite-2tone.jpg' },
  { name: 'Compagno Red 2-Tone', color: '#d7263d', image: '/cars/rocky-red-2tone.jpg' },
];

const variantData = [
  {
    name: '1.2 M*',
    image: '/cars/rocky-12m.jpg',
    features: [
      'Halogen Headlamp',
      '16” Steel Wheel & Wheel Cap',
      'Black Manual Outer Mirror',
      '7” Touchscreen Head Unit',
      'Dual SRS Airbag',
      '1.2L Engine (WA-VE)',
    ],
  },
  {
    name: '1.2 X',
    image: '/cars/rocky-12x.jpg',
    features: [
      'Kelengkapan tipe M ditambah:',
      'LED Headlamp',
      'Fog Lamp',
      '16” Black Alloy Wheel',
      'Auto Retractable Mirror',
      'Key Free Entry',
      'Start Stop Engine Button',
      'Rear Wiper',
      'Full Digital Meter Cluster',
      'Tersedia Varian Aksesoris (ADS)*',
    ],
  },
  {
    name: '1.0 R Turbo',
    image: '/cars/rocky-10r.jpg',
    features: [
      'Kelengkapan tipe X ditambah:',
      '17” Polished Alloy Wheel',
      '9” Touchscreen Audio with Android Auto & Apple Car Play',
      '1.0L R Turbo Engine (KR-VET)',
      'Tersedia Varian Aksesoris (ADS)*',
    ],
  },
];

const Rocky = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(carColors[0]);

  return (
    <div className="min-h-screen flex flex-col pt-24 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-10 py-8 md:py-10 gap-8 max-w-7xl mx-auto w-full">
        <div className="flex-1 min-w-[300px] space-y-6">
          <h1 className="text-4xl font-bold">Daihatsu Rocky</h1>
          <p className="text-gray-700">
            SUV Compact dengan desain sporty, mesin turbo, dan fitur modern berbasis platform DNGA.
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
            {selectedColor && (
              <div className="w-full flex justify-center mt-4">
                <div className="text-base font-bold text-gray-800 text-center">{selectedColor.name}</div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={() => navigate('/daihatsu/test-drive?model=Rocky')}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 shadow"
            >
              Test Drive
            </button>
            <button
              onClick={() => navigate('/contact', { state: { from: 'daihatsu' } })}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 shadow"
            >
              Dapatkan Penawaran
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-start mt-5 md:mt-0">
          <img
            src={selectedColor.image}
            alt={selectedColor.name}
            className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] rounded shadow object-cover"
          />
        </div>
      </div>

      {/* Detail Sections */}
      <div className="max-w-6xl mx-auto w-full px-8 py-10 space-y-16">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/rocky-exterior.jpg" alt="Eksterior" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Eksterior</h2>
            <p className="text-gray-700 mb-4">
              SUV dengan platform DNGA (Daihatsu New Global Architecture), memberikan tampilan agresif & sporty serta kenyamanan yang lebih baik untuk sahabat keluarga muda Indonesia
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/rocky-interior.jpg" alt="Interior" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Interior</h2>
            <p className="text-gray-700 mb-4">
              Desain modern dan dinamis dengan fitur canggih, kabin lega dan kenyamanan maksimal di setiap perjalanan.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Performa</h2>
          <p className="text-gray-700 mb-4">
            Platform DNGA dengan pilihan mesin 1.2L irit dan 1.0L Turbo powerful namun efisien.
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li><strong>1.0L Engine (KR-VET Turbo)</strong>: 998 cc / 97.9 PS / 14.3 kg•m @ 2,400–4,000 rpm</li>
            <li><strong>1.2L Engine (WA-VE)</strong>: 1198 cc / 88.4 PS / 11.5 kg•m @ 4,500 rpm</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Transmisi & Platform</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li><strong>D-CVT</strong>: Responsif, halus, dan konsumsi bahan bakar lebih irit</li>
            <li><strong>DNGA</strong>: Sensasi berkendara lebih nyaman, efisien, dan stabil</li>
          </ul>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/rocky-safety.jpg" alt="Keamanan" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Keamanan</h2>
            <p className="text-gray-700 mb-4">
              Fitur keselamatan lengkap untuk perlindungan maksimal selama berkendara.
            </p>
          </div>
        </div>
      </div>

      {/* Varian */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Tipe Varian Standar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <footer className="w-full bg-black text-white text-center py-6 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Daihatsu by DriveNow. All rights reserved.
      </footer>
    </div>
  );
};

export default Rocky;