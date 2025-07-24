import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const carColors = [
  { name: 'Scarlet Red Metallic', color: '#8B0000', image: '/cars/terios-red.jpg' },
  { name: 'Icy White', color: '#ffffff', image: '/cars/terios-white.jpg' },
  { name: 'Black Metallic', color: '#000000', image: '/cars/terios-black.jpg' },
  { name: 'Green Gun Metallic', color: '#3b4b3b', image: '/cars/terios-green.jpg' },
  { name: 'Glittering Silver Metallic', color: '#c0c0c0', image: '/cars/terios-silver.jpg' },
  { name: 'Bronze Metallic', color: '#cd7f32', image: '/cars/terios-bronze.jpg' },
];

const variantData = [
  {
    name: 'X',
    image: '/cars/terios-white.jpg',
    features: [
      'LED Headlamp',
      '16” Silver Alloy Wheel',
      '2DIN 7” Touchscreen Audio',
      'Keyless',
      'Digital AC',
      'Double Blower AC',
      'Fabric Material Seat',
      'Tersedia Varian Aksesoris (ADS)*'
    ],
  },
  {
    name: 'R',
    image: '/cars/terios-bronze.jpg',
    features: [
      'Kelengkapan tipe X ditambah :',
      'LED Smoked Headlamp',
      '17” Gun Metal Alloy Wheel',
      'LED Illumination Lamp',
      'Fog Lamp',
      'Retractable Outer Mirror',
      'Roof Rail',
      '2DIN 7” Touchscreen + Android Auto & Apple Car Play',
      'Key Free',
      'Push Start / Stop Engine',
      'Digital Auto AC',
      'Tersedia Varian Aksesoris (ADS)*'
    ],
  },
  {
    name: 'R CUSTOM',
    image: '/cars/terios-green.jpg',
    features: [
      'Kelengkapan tipe R ditambah :',
      '17” Polished 2 tone Alloy Wheel',
      'Front & Rear Body Kit',
      'Side Stone Guard',
      'New Leather Combination Seat',
      'New Instrument Panel Soft Pad',
      '6 SRS Airbag',
    ],
  },
];

const Terios = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(carColors[0]);

  return (
    <div className="min-h-screen flex flex-col pt-24 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-10 py-8 md:py-10 gap-8 max-w-7xl mx-auto w-full">
        <div className="flex-1 min-w-[300px] space-y-6">
          <h1 className="text-4xl font-bold">Terios</h1>
          <p className="text-gray-700">
            Terios adalah SUV tangguh untuk keluarga aktif dan petualang. Dilengkapi dengan kapasitas 7 penumpang,
            desain modern, serta fitur kenyamanan dan keselamatan yang lengkap.
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
              onClick={() => navigate('/daihatsu/test-drive?model=Terios')}
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
            <img src="/cars/terios-exterior.jpg" alt="Eksterior" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Eksterior</h2>
            <p className="text-gray-700 mb-4">SUV dengan Desain Sporty & Adventure membuat setiap moment bersamanya merupakan cerita petualangan yang membahagiakan</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/terios-interior.jpg" alt="Interior" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Interior</h2>
            <p className="text-gray-700 mb-4">Desain Modern, Kabin luas, fitur lengkap & canggih memberi kenyamanan maksimal di setiap petualangan</p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Performa</h2>
          <p className="text-gray-700 mb-4">Mesin 1,500 cc yang powerful & irit BBM, dengan Ground Clearance tinggi mampu menemani setiap petualangan</p>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li><strong>2 NR–VE</strong> DOHC Dual VVT–i</li>
            <li>Capacity: 1,496 cc</li>
            <li>Max Power: 104 PS / 6,000 rpm</li>
            <li>Max Torque: 136.3 Nm / 4,200 rpm</li>
          </ul>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/terios-safety.jpg" alt="Keamanan" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Keamanan</h2>
            <p className="text-gray-700 mb-4">Bersama New Terios, setiap momen di atas roda adalah cerita petualangan yang penuh kegembiraan</p>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>6 SRS Airbag</li>
              <li>Vehicle Stability Control (VSC)</li>
              <li>Hill Start Assist (HSA)</li>
              <li>ABS & EBD</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Varian */}
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

export default Terios;
