import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const r15Variants = [
  {
    name: 'R15M Connected/ABS',
    price: 'Rp 45.700.000',
    colors: [
      {
        name: 'Icon Performance',
        color: '#DAD9D5',
        image: '/r15/r15m-icon.jpg',
      },
    ],
  },
  {
    name: 'R15 Connected',
    price: 'Rp 40.950.000',
    colors: [
      {
        name: 'Blue',
        color: '#00205B',
        image: '/r15/r15-blue.jpg',
      },
      {
        name: 'Black',
        color: '#0F0F0F',
        image: '/r15/r15-black.jpg',
      },
    ],
  },
];

const R15 = () => {
  const navigate = useNavigate();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const variant = r15Variants[selectedVariantIndex];
  const selectedColor = variant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{variant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl text-lg">
          {variant.name === 'R15M Connected/ABS'
            ? 'Sensasi berkendara maksimal dengan fitur premium R15M Connected/ABS — sempurna untuk pecinta kecepatan sejati.'
            : 'R15 Connected hadir dengan performa tinggi dan fitur canggih, cocok untuk pengendara yang penuh gaya dan agresif.'}
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
          {r15Variants.map((v, i) => (
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
              onClick={() => navigate('/yamaha/test-drive?model=R15')}
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Test Ride
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
            >
              Dapatkan Penawaran
            </button>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-gray-50 py-16 px-6 space-y-16">
        <Highlight title="Powerful 155cc Engine With VVA" text="155 cc engine, Liquid Cooled, SOHC, 4-Valves, Fuel Injection with VVA — mesin bertenaga yang memberikan sensasi berkendara yang luar biasa." />
        <Highlight title="Dual Channel Anti-Lock Braking System (ABS)" text="Sistem ABS dual channel membuat kontrol pengereman semakin optimal." />
        <Highlight title="Traction Control System" text="Mengurangi risiko ban belakang selip saat akselerasi di berbagai permukaan jalan." />
        <Highlight title="Assist & Slipper Clutch" text="Kopling lebih ringan dan perpindahan gigi lebih halus untuk akselerasi cepat." />
        <Highlight title="Quick Shifter" text="Perpindahan gigi ke atas tanpa menarik tuas kopling — lebih cepat dan maksimal." />
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

export default R15;