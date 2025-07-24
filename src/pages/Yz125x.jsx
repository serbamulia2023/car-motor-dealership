import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const yz125xVariant = {
  name: 'YZ125X',
  price: 'Rp 97.000.000',
  colors: [
    {
      name: 'Blue',
      color: '#0047AB',
      image: '/yz125x/blue.jpg',
    },
  ],
};

const Yz125x = () => {
  const navigate = useNavigate();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = yz125xVariant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{yz125xVariant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          Dirancang untuk medan off-road dengan mesin 125cc 2-tak bertenaga, sasis ringan, dan suspensi terbaik di kelasnya. YZ125X siap menghadapi kompetisi maupun jalur ekstrem.
        </p>

        {/* Color Switcher */}
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-xl mb-4">Pilih Warna:</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            {yz125xVariant.colors.map((color, idx) => (
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
          <p className="text-xl font-bold text-red-600 mb-4">{yz125xVariant.price}</p>
          <p className="text-sm text-gray-500 mb-4">Harga Rekomendasi Off The Road</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/yamaha/test-drive?model=YZ125X')}
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
          title="Two-Stroke Agility: Tuned for Cross Country"
          text="Bermesin 125cc 2 langkah yang sangat bertenaga dan dipadukan dengan transmisi 6 speed percepatan."
        />
        <Highlight
          title="Lightweight Aluminum Frame"
          text="Frame yang sangat ringan, dibuat secara presisi dan dikerjakan secara profesional untuk keseimbangan kekuatan dan kelincahan."
        />
        <Highlight
          title="Industry-Leading Suspension"
          text="Suspensi KYB® dengan travel optimal, bisa di-adjust sesuai kebutuhan pengendara untuk performa maksimal."
        />
        <Highlight
          title="Racing Style and Ergonomics"
          text="Gaya agresif khas YZ dengan protector, alumunium handlebar, footstep YZ-F, dan posisi duduk ergonomis siap kompetisi."
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

export default Yz125x;
