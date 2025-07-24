// src/pages/Ayla.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const carColors = [
  { name: 'Ultra Black Solid', color: '#0a0a0a', image: '/car.jpg' },
  { name: 'Rock Grey Metallic', color: '#555555', image: '/cars/ayla-grey.jpg' },
  { name: 'Metallic Orange', color: '#ff7b00', image: '/cars/ayla-orange.jpg' },
  { name: 'Ruby Red Metallic', color: '#a00000', image: '/cars/ayla-red.jpg' },
  { name: 'Icy White', color: '#ffffff', image: '/cars/ayla-white.jpg' },
  { name: 'Glittering Silver', color: '#c0c0c0', image: '/cars/ayla-silver.jpg' },
  { name: 'Yellow Metallic', color: '#ffdc00', image: '/cars/ayla-yellow.jpg' },
  { name: 'Compagno Red', color: '#c21807', image: '/cars/ayla-compagno.jpg' },
];

const variantData = [
  {
    name: '1.0 M',
    image: '/cars/ayla-white.jpg',
    features: [
      'Halogen Headlamp',
      'Body Color Manual Outer Mirror',
      '13” Steel Wheel & Wheel Cap',
      '1 DIN Audio Head Unit',
      'Dual SRS Airbag',
      '1.0L Engine (KR-VE)',
    ],
  },
  {
    name: '1.0 X',
    image: '/cars/ayla-orange.jpg',
    features: [
      'Kelengkapan tipe M ditambah:',
      'Body Color Electric Outer Mirror',
      '14” Gun Metal Alloy Wheel',
      'Auto Rear Wiper',
      '2 DIN Audio Head Unit',
      'ABS/EBD (CVT Only)',
      'VSC, HSA (CVT Only)',
    ],
  },
  {
    name: '1.2 R',
    image: '/cars/ayla-red.jpg',
    features: [
      'Kelengkapan Tipe X ditambah:',
      'LED Headlamp',
      'LED High Mount Stop Lamp',
      'Rear Spoiler',
      'Key Free Entry',
      'Push Start/Stop Engine',
      '7” Touchscreen Headunit with Android Auto and Apple Car Play',
      'Digital AC',
      '1.2L Engine (WA-VE)',
      'Rear Camera',
    ],
  },
];

const Ayla = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(carColors[0]);

  return (
    <div className="min-h-screen flex flex-col pt-24 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-10 py-8 md:py-10 gap-8 max-w-7xl mx-auto w-full">
        <div className="flex-1 min-w-[300px] space-y-6">
          <h1 className="text-4xl font-bold">All New Ayla</h1>
          <p className="text-gray-700">
            Ayla tampil lebih sporty dan agresif, siap jadi teman harian kamu yang penuh gaya dan efisiensi.
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
              onClick={() => navigate('/daihatsu/test-drive?model=Ayla')}
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
            <img src="/cars/ayla-exterior.jpg" alt="Eksterior" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Eksterior</h2>
            <p className="text-gray-700 mb-4">Desain eksterior yang stylish dan sporty, cocok untuk gaya hidup modern.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/ayla-interior.jpg" alt="Interior" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Interior</h2>
            <p className="text-gray-700 mb-4">Interior luas dan nyaman, dilengkapi teknologi terkini untuk kenyamanan berkendara.</p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Performa</h2>
          <p className="text-gray-700 mb-6">
            Ayla hadir dengan dua pilihan mesin irit dan responsif, mendukung mobilitas harian kamu.
          </p>
          <ul className="ml-4 space-y-4 text-gray-700">
            <li>
              <strong className="text-lg">1.2L Engine (WA–VE)</strong>
              <ul className="list-disc ml-5 space-y-1">
                <li>Kapasitas: 1,200 cc</li>
                <li>Tenaga Maksimum: 88 PS @ 6,000 rpm</li>
                <li>Torsi Maksimum: 113 Nm @ 4,500 rpm</li>
              </ul>
            </li>
            <li>
              <strong className="text-lg">1.0L Engine (KR–VE)</strong>
              <ul className="list-disc ml-5 space-y-1">
                <li>Kapasitas: 998 cc</li>
                <li>Tenaga Maksimum: 67 PS @ 6,000 rpm</li>
                <li>Torsi Maksimum: 91 Nm @ 4,400 rpm</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/ayla-safety.jpg" alt="Keamanan" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Keamanan</h2>
            <p className="text-gray-700 mb-4">Fitur keselamatan modern seperti Dual SRS Airbag, ABS, VSC, dan HSA (CVT) untuk perlindungan maksimal.</p>
          </div>
        </div>
      </div>

      {/* Varian Section */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Tipe Varian Standar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

export default Ayla;
