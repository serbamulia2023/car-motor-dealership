import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const carColors = [
  { name: 'Mica Red', color: '#b31b1b', image: '/cars/sirion-red.jpg' },
  { name: 'Granite Gray', color: '#4e4e4e', image: '/cars/sirion-gray.jpg' },
  { name: 'Icy White', color: '#ffffff', image: '/cars/sirion-white.jpg' },
  { name: 'Glittering Silver', color: '#c0c0c0', image: '/cars/sirion-silver.jpg' },
  { name: 'Electric Blue', color: '#0047ab', image: '/cars/sirion-blue.jpg' },
];

const variantData = [
  {
    name: '1.3 X',
    image: '/cars/sirion-13x.jpg',
    features: [
      'LED Head lamp',
      '15” Polished Alloy Wheel',
      'Electric outer mirror',
      '7” Touchscreen Audio with Android Auto & Apple Car Play',
      'Dual SRS Airbag',
      'Side Air Bag',
      'Keyfree Entry',
      'VSC, HSA',
      '1.3L Engine (1 NR-VE)',
      'Push Start Stop Engine',
    ],
  },
  {
    name: '1.3 R',
    image: '/cars/sirion-13r.jpg',
    features: [
      'Kelengkapan tipe X ditambah:',
      'Front Aerokit',
      'Side Aerokit',
      'Front Corner Sensor',
      'Auto Retractable Mirror',
      'Black Cover Spoiler',
      'Rear Parking Camera',
      '4.2” TFT MID',
      'Ion Air Purifier',
    ],
  },
];

const Sirion = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(carColors[0]);

  return (
    <div className="min-h-screen flex flex-col pt-24 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-10 py-8 md:py-10 gap-8 max-w-7xl mx-auto w-full">
        <div className="flex-1 min-w-[300px] space-y-6">
          <h1 className="text-4xl font-bold">New Sirion</h1>
          <p className="text-gray-700">
            City Car dengan desain sporty, fitur canggih dan performa lincah yang cocok untuk aktivitas harian di kota.
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
              onClick={() => navigate('/daihatsu/test-drive?model=Sirion')}
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
            <img src="/cars/sirion-exterior.jpg" alt="Eksterior" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Eksterior</h2>
            <p className="text-gray-700 mb-4">City Car dengan desain sporty siap menemani perjalananmu</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/sirion-interior.jpg" alt="Interior" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Interior</h2>
            <p className="text-gray-700 mb-4">
              Interior desain berkelas dengan fitur canggih, kabin lega dan tempat penyimpanan lengkap membuat pengalaman berkendara Anda semakin nyaman
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Performa</h2>
          <p className="text-gray-700 mb-4">
            Mesin 1 NR-VE Sirion sudah terbukti powerful dan lincah serta tetap irit bahan bakar di jalanan perkotaan
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li><strong>1.3L Engine (1 NR-VE)</strong>: 1329 cc / 95 PS / 12.2 Nm</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Transmisi & Platform</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li><strong>D-CVT</strong>: Responsif, halus dan irit bahan bakar</li>
          </ul>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img src="/cars/sirion-safety.jpg" alt="Keamanan" className="rounded shadow" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Keamanan</h2>
            <p className="text-gray-700 mb-4">Berkendara dengan aman dan nyaman</p>
          </div>
        </div>
      </div>

      {/* Varian */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Tipe Varian Standar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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

export default Sirion;
