import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const vixionVariants = [
  {
    name: 'VIXION R 155',
    price: 'Rp 34.020.000',
    colors: [
      { name: 'Matte Black', color: '#1f1f1f', image: '/vixion/r155-black.jpg' },
      { name: 'Matte Red', color: '#8b0000', image: '/vixion/r155-red.jpg' },
    ],
  },
  {
    name: 'VIXION 150',
    price: 'Rp 30.250.000',
    colors: [
      { name: 'Matte Blue', color: '#1e3f66', image: '/vixion/150-blue.jpg' },
      { name: 'Matte Black', color: '#000000', image: '/vixion/150-black.jpg' },
      { name: 'Metallic Red', color: '#c60000', image: '/vixion/150-red.jpg' },
    ],
  },
];

const Vixion = () => {
  const navigate = useNavigate();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const variant = vixionVariants[selectedVariantIndex];
  const selectedColor = variant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{variant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl text-center">
          {variant.name === 'VIXION R 155'
            ? 'Vixion R hadir dengan mesin 155cc VVA, 6 percepatan dan fitur canggih untuk performa berkendara maksimal.'
            : 'Vixion 150 tampil sporty dan tangguh untuk mendukung mobilitas harian Anda.'}
        </p>

        {/* Color Switcher */}
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-xl mb-4">Pilih Warna:</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            {variant.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-10 h-10 rounded-full border-4 flex items-center justify-center ${
                  selectedColorIndex === idx ? 'border-blue-600' : 'border-gray-300'
                }`}
                title={color.name}
              >
                <span
                  className="block w-5 h-5 rounded-full"
                  style={{ backgroundColor: color.color }}
                />
              </button>
            ))}
          </div>
          <div className="mt-4 text-lg font-semibold text-gray-800">{selectedColor.name}</div>
        </div>

        {/* Variant Toggle */}
        <div className="flex justify-center mt-8 gap-4 flex-wrap">
          {vixionVariants.map((v, i) => (
            <button
              key={v.name}
              onClick={() => {
                setSelectedVariantIndex(i);
                setSelectedColorIndex(0);
              }}
              className={`px-5 py-2 rounded border text-sm font-semibold ${
                selectedVariantIndex === i ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>

        {/* Image */}
        <div className="flex justify-center mt-10">
          <img
            src={selectedColor.image}
            alt={selectedColor.name}
            className="w-full max-w-lg rounded shadow"
          />
        </div>

        {/* Price & CTA */}
        <div className="text-center mt-6">
          <p className="text-xl font-bold text-red-600 mb-4">{variant.price}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/yamaha/test-drive?model=Vixion')}
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Test Ride
            </button>
            <button
              onClick={() => navigate('/contact', { state: { from: 'yamaha' } })}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
            >
              Dapatkan Penawaran
            </button>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-gray-50 py-16 px-6 space-y-16">
        <Highlight title="Engine 155cc LC4V With VVA" text="Mesin 155 cc, 6 percepatan, 4 Katup, dan dilengkapi Variable Valve Actuation (VVA) akan menjadikan torsi merata di setiap putaran mesin. Dilengkapi juga dengan Liquid Cooled yang akan membuat suhu mesin stabil." />
        <Highlight title="Assist & Slipper Clutch" text="Fitur Assist membuat kopling lebih ringan, dan fitur Slipper Clutch membuat perpindahan gigi lebih halus dan akselerasi lebih cepat." />
        <Highlight title="Monocross Suspension" text="Motor lebih nyaman saat berkendara." />
        <Highlight title="Full Digital Speedometer + Shift Timing Light" text="Speedometer digital multifungsi yang informatif dan mudah terlihat, dilengkapi shift timing light untuk performa optimal." />
      </div>

      {/* Footer */}
      <footer className="w-full bg-black text-white text-center py-6 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Yamaha by DriveNow. All rights reserved.
      </footer>
    </div>
  );
};

const Highlight = ({ title, text }) => (
  <div className="text-center">
    <h2 className="text-3xl font-bold mb-4">{title}</h2>
    <p className="text-gray-600 max-w-3xl mx-auto">{text}</p>
  </div>
);

export default Vixion;