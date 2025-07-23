import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const carColors = [
  { name: 'Greenish Gun Metal', color: '#434f4d', image: '/cars/xenia-green.jpg' },
  { name: 'Purplish Silver', color: '#c8c6d7', image: '/cars/xenia-purple-silver.jpg' },
  { name: 'Dark Grey Metallic', color: '#555555', image: '/cars/xenia-darkgrey.jpg' },
  { name: 'Silver Metallic', color: '#c0c0c0', image: '/cars/xenia-silver.jpg' },
  { name: 'White Solid', color: '#ffffff', image: '/cars/xenia-white.jpg' },
  { name: 'Black Metallic', color: '#000000', image: '/cars/xenia-black.jpg' },
];

const variantData = [
  {
    name: '1.3 M*',
    image: '/cars/xenia-13m.jpg',
    features: [
      'LED Headlamp',
      'Electric outer mirror',
      '15” steel wheel & wheel cap',
      'Pole Antenna',
      'Rear Wiper',
      '7” Touchscreen audio Head Unit',
      'Double blower AC',
      'Dual SRS Air Bag',
      '1.3L Engine (1 NR-VE)',
    ],
  },
  {
    name: '1.3 X',
    image: '/cars/xenia-13x.jpg',
    features: [
      'Kelengkapan tipe M ditambah:',
      '15” Alloy Wheel Gun Metal',
      'Shark Fin Antenna',
      'VSC, HSA (CVT Only)',
      'Rear Parking Sensor',
    ],
  },
  {
    name: '1.3 R',
    image: '/cars/xenia-13r.jpg',
    features: [
      'Kelengkapan tipe X ditambah:',
      'Foglamp',
      'Auto Retractable Mirror',
      'High Mount Stop lamp',
      '9” Floating Head Unit',
      'Start/Stop Engine Button',
      'Audio Steering Switch',
      '4.2” TFT MID',
      'Tersedia Varian Aksesoris (ADS)*',
    ],
  },
  {
    name: '1.5 R',
    image: '/cars/xenia-15r.jpg',
    features: [
      'Kelengkapan tipe R ditambah:',
      'Front Grille with Red Accent',
      '16” Polished Alloy Wheel',
      '1.5L Engine (2 NR-VE)',
      'Key free Entry',
      'Seat Height Adjuster',
      'Around View Monitor',
      'VSC, HSA (MT, CVT)',
      'Tersedia Varian Aksesoris (ADS)*',
    ],
  },
];

const Xenia = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(carColors[0]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-10 py-8 md:py-10 gap-8 max-w-7xl mx-auto w-full">
        <div className="flex-1 min-w-[300px] space-y-6">
          <h1 className="text-4xl font-bold">All New Xenia</h1>
          <p className="text-gray-700">
            MPV Sahabat andalan keluarga Indonesia dengan design modern, fitur lengkap, dan pilihan mesin efisien maupun bertenaga.
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
              onClick={() => navigate('/daihatsu/test-drive?model=Xenia')}
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
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/xenia-exterior.jpg" alt="Eksterior" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Eksterior</h2>
            <p className="text-gray-700 mb-4">MPV Sahabat andalan keluarga Indonesia dengan design yang modern & sporty</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/xenia-interior.jpg" alt="Interior" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Interior</h2>
            <p className="text-gray-700 mb-4">
              Design sporty & high class dengan ruang kabin yang lega, konfigurasi kursi multifungsi serta bagasi dan tempat penyimpanan yang besar dan lengkap memberikan kenyamanan bagi keluarga Indonesia
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Performa</h2>
          <p className="text-gray-700 mb-4">
            Entry MPV 7 penumpang yang memiliki 2 pilihan mesin 1,300 cc yang irit dan 1,500 cc yang bertenaga namun tetap ekonomis
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li><strong>1.3L Engine (1 NR-VE)</strong>: 1329 cc / 98 PS / 138 Nm</li>
            <li><strong>1.5L Engine (2 NR-VE)</strong>: 1496 cc / 106 PS / 122 Nm</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Transmisi & Platform</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li><strong>D-CVT</strong>: Responsif, halus & irit bahan bakar (CVT Only)</li>
            <li><strong>DNGA</strong>: Sensasi berkendara lebih halus, nyaman & efisien</li>
          </ul>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/xenia-safety.jpg" alt="Keamanan" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Keamanan</h2>
            <p className="text-gray-700 mb-4">Berkendara aman dan nyaman dengan fitur keselamatan yang lengkap</p>
          </div>
        </div>
      </div>

      {/* Varian */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Tipe Varian Standar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

export default Xenia;
