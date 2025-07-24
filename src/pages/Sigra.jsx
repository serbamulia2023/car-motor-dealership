import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const carColors = [
  { name: 'Orange Metallic', color: '#d35400', image: '/cars/sigra-orange.png' },
  { name: 'Scarlet Red Metallic', color: '#c0392b', image: '/cars/sigra-red.png' },
  { name: 'Bronze', color: '#cd7f32', image: '/cars/sigra-bronze.png' },
  { name: 'Glittering Silver', color: '#bdc3c7', image: '/cars/sigra-silver.png' },
  { name: 'Ultra Black Solid', color: '#000000', image: '/cars/sigra-black.png' },
  { name: 'Icy White', color: '#ffffff', image: '/cars/sigra-white.png' },
  { name: 'Rock Grey Metallic', color: '#7f8c8d', image: '/cars/sigra-grey.png' },
];

const variantData = [
  {
    name: '1.0 D',
    image: '/cars/sigra-10d.png',
    features: [
      'Halogen Headlamp',
      '13” Steel Wheel',
      'Pole Antenna',
      'Electric Power Steering',
      'Air Conditioner',
      '1.0L Engine',
      '1DIN Audio Head Unit',
    ],
  },
  {
    name: '1.0 M',
    image: '/cars/sigra-10m.png',
    features: [
      'Kelengkapan tipe D ditambah:',
      'Smoked LED Headlamp',
      '14” Steel Wheel & Wheel Cap',
      'Rear Wiper',
      'Shark Fin Antenna',
      'Rear Air Circulator',
    ],
  },
  {
    name: '1.2 X',
    image: '/cars/sigra-12x.png',
    features: [
      'Kelengkapan tipe M ditambah:',
      'Rear Spoiler',
      '2DIN Audio',
      '1.2L Engine (3 NR-VE)',
      'Dual SRS Airbag',
      'ABS, EBD (AT Only)',
    ],
  },
  {
    name: '1.2 R',
    image: '/cars/sigra-12r.png',
    features: [
      'Kelengkapan tipe X ditambah:',
      'Dark Grille with Chrome Ornament',
      'Foglamp',
      '14” Polished Alloy Wheel',
      '7” Touchscreen Head Unit',
      'Rear Parking Camera',
    ],
  },
];

const Sigra = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(carColors[0]);

  return (
    <div className="min-h-screen flex flex-col pt-24 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-10 py-8 md:py-10 gap-8 max-w-7xl mx-auto w-full">
        <div className="flex-1 min-w-[300px] space-y-6">
          <h1 className="text-4xl font-bold">Daihatsu Sigra</h1>
          <p className="text-gray-700">
            Daihatsu Sigra hadir dengan pilihan varian lengkap, desain stylish, dan fitur-fitur fungsional untuk kenyamanan keluarga.
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
              <div className="w-full flex justify-center mt-6">
                <div className="text-base font-bold text-gray-800 text-center">{selectedColor.name}</div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={() => navigate('/daihatsu/test-drive?model=Sigra')}
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

      <div className="max-w-7xl mx-auto w-full px-8 py-10 space-y-16">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/sigra-exterior.png" alt="Eksterior" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Eksterior</h2>
            <p className="text-gray-700 mb-4">
              Desain modern dan stylish dengan aksen krom, membuat Sigra tampil lebih elegan dan berkelas untuk keluarga Indonesia.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/sigra-interior.png" alt="Interior" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Interior</h2>
            <p className="text-gray-700 mb-4">
              Kabin luas dan nyaman dengan konfigurasi 7 penumpang, dilengkapi fitur hiburan dan pendingin udara ganda.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Performa</h2>
          <p className="text-gray-700 mb-6">
            Sigra hadir dalam pilihan mesin 1.0L dan 1.2L yang irit dan responsif untuk kebutuhan harian keluarga.
          </p>
          <ul className="ml-4 space-y-4 text-gray-700">
            <li>
              <strong className="text-lg">1.2L Engine (3NR–VE)</strong>
              <ul className="list-disc ml-5 space-y-1">
                <li>Kapasitas: 1,197 cc</li>
                <li>Tenaga Maksimum: 88 PS @ 6,000 rpm</li>
                <li>Torsi Maksimum: 108 Nm @ 4,200 rpm</li>
              </ul>
            </li>
            <li>
              <strong className="text-lg">1.0L Engine (1KR–VE)</strong>
              <ul className="list-disc ml-5 space-y-1">
                <li>Kapasitas: 998 cc</li>
                <li>Tenaga Maksimum: 67 PS @ 6,000 rpm</li>
                <li>Torsi Maksimum: 89 Nm @ 4,400 rpm</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/sigra-safety.png" alt="Keamanan" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Keamanan</h2>
            <p className="text-gray-700 mb-4">
              Dilengkapi dengan Dual SRS Airbag, ABS, dan Rear Parking Camera (tipe R), Sigra siap memberikan rasa aman maksimal.
            </p>
          </div>
        </div>
      </div>

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

      <footer className="w-full bg-black text-white text-center py-6 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Daihatsu by DriveNow. All rights reserved.
      </footer>
    </div>
  );
};

export default Sigra;
