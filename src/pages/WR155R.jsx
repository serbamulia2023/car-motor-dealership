import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const wrColors = [
  { name: 'Blue', color: '#0000aa', image: '/wr155r/blue.jpg' },
  { name: 'Black', color: '#000000', image: '/wr155r/black.jpg' },
];

const WR155R = () => {
  const navigate = useNavigate();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = wrColors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">WR155R</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          Motor trail tangguh untuk petualangan maksimal dengan mesin 155cc bertenaga dan fitur modern.
        </p>

        {/* Color Switcher */}
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-xl mb-4">Pilih Warna:</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            {wrColors.map((color, idx) => (
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
          <p className="text-xl font-bold text-red-600 mb-4">Rp 39.705.000</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/yamaha/test-drive?model=WR155R')}
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
        <Highlight title="Powerfull 155cc Engine with VVA" text="Mesin 155cc, Liquid cooled, 4 langkah dengan VVA yang memberikan pengalaman adventure yang luar biasa." />
        <Highlight title="Big Diameter & Long Suspension" text="Suspensi depan dengan diameter 41mm dan panjang 899.1mm yang kokoh sehingga memberikan pengendalian yang lebih maksimal disetiap aktifitas adventure." />
        <Highlight title="Linked-Type Monocross With Gas, Oil & Adjustable Pre Load" text="Suspensi belakang dengan tingkat kekerasan yang dapat diatur sesuai kebutuhan pengendara." />
        <Highlight title="LCD Multifunction Speedometer" text="LCD Speedometer yang memberikan berbagai macam informasi seperti Odometer, Trip meter, Konsumsi BBM, Indikator Transmisi, Jam, dan lainnya." />
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

export default WR155R;
