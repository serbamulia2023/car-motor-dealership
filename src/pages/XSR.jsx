import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const xsrVariants = [
  {
    name: 'XSR 155',
    price: 'Rp 39.015.000',
    colors: [
      {
        name: 'Metallic Brown Authentic',
        color: '#3C2B26',
        image: '/xsr/brown.jpg',
      },
      {
        name: 'Metallic Black Elegance',
        color: '#111111',
        image: '/xsr/black.jpg',
      },
      {
        name: 'Matte Silver Premium',
        color: '#C8C8C8',
        image: '/xsr/silver.jpg',
      },
    ],
  },
];

const XSR = () => {
  const navigate = useNavigate();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const variant = xsrVariants[0];
  const selectedColor = variant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{variant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          XSR 155 hadir untuk kamu yang ingin tampil beda dan berkarakter, memadukan desain klasik dengan teknologi modern untuk pengalaman berkendara penuh gaya dan performa.
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
              onClick={() => navigate('/yamaha/test-drive?model=XSR 155')}
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
        <Highlight
          title="155cc LC4V With VVA Engine"
          text="Engine 155cc, liquid cooled, SOHC, 4-valves, Fuel Injection with VVA. Mesin bertenaga untuk sensasi berkendara yang luar biasa."
        />
        <Highlight
          title="Full LCD Digital Speedometer"
          text="Design bergaya klasik dengan layar full LCD yang dilengkapi dengan indikator transmisi."
        />
        <Highlight
          title="Timeless Quality Impression"
          text="Tanki dengan model drip shaped memberikan kesan klasik yang tak lekang oleh waktu."
        />
        <Highlight
          title="Single Seat Heritage"
          text="Desain jok begaya klasik mempertegas karakter “Sport Heritage” XSR 155."
        />
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

export default XSR;
