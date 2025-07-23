import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mt25Colors = [
  { name: 'Metallic Light Grey', color: '#dfe0e5', image: '/mt25/light-grey.jpg' },
  { name: 'Matte Black', color: '#1a1a1a', image: '/mt25/matte-black.jpg' },
];

const Mt25 = () => {
  const navigate = useNavigate();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = mt25Colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">MT-25</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          Motor sport berperforma tinggi dengan gaya agresif, cocok untuk kamu yang ingin tampil bertenaga dan modern.
        </p>

        {/* Color Switcher */}
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-xl mb-4">Pilih Warna:</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            {mt25Colors.map((color, idx) => (
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
          <p className="text-xl font-bold text-red-600 mb-4">Rp 63.500.000</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/yamaha/test-drive?model=MT-25')}
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
        <Highlight title="Powerfull 250cc Engine" text="Mesin 250cc, 6 Speed, 2 Silinder, DOHC, 8 Katup, dengan radiator yang bertenaga dan responsif. Power: 26.5 kW / 12,000 rpm. Torsi: 23.6 Nm / 10,000 rpm." />
        <Highlight title="Yamaha Motorcycle Connect" text="Terhubung dengan aplikasi Y-Connect berbasis bluetooth untuk pemantauan motor secara real-time." />
        <Highlight title="Electric Power Outlet" text="Isi daya gadget selama perjalanan dengan soket listrik yang praktis." />
        <Highlight title="Big Bike Switch" text="Tombol starter 3-in-1 ala big bike: cut off/on dan starter engine dalam satu tombol." />
        <Highlight title="Anti-Lock Braking System" text="Kontrol pengereman optimal dengan sistem ABS." />
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

export default Mt25;