import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mioM3 = {
  name: 'Mio M3 125',
  price: 'Rp 18.305.000',
  colors: [
    {
      name: 'Metallic Cyan',
      color: '#00B2A9',
      image: '/miom3/cyan.jpg',
    },
    {
      name: 'Metallic White',
      color: '#ffffff',
      image: '/miom3/white.jpg',
    },
    {
      name: 'Metallic Red',
      color: '#FF0000',
      image: '/miom3/red.jpg',
    },
    {
      name: 'Metallic Black',
      color: '#000000',
      image: '/miom3/black.jpg',
    },
  ],
};

const MioM3 = () => {
  const navigate = useNavigate();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = mioM3.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{mioM3.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          Pilihan cerdas untuk mobilitas harian. Mio M3 125 hadir dengan mesin Blue Core yang efisien, desain sporty, dan fitur fungsional yang mendukung gaya hidup aktif.
        </p>

        {/* Color Switcher */}
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-xl mb-4">Pilih Warna:</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            {mioM3.colors.map((color, idx) => (
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
          <p className="text-xl font-bold text-red-600 mb-4">{mioM3.price}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/yamaha/test-drive?model=Mio M3 125')}
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
          title="Blue Core 125cc"
          text="Mesin Blue Core 125cc yang Efisien, Bertenaga & Handal untuk penggunaan harian."
        />
        <Highlight
          title="Tangki 4.2 Liter"
          text="Kapasitas tangki bahan bakar yang besar untuk perjalanan lebih jauh tanpa sering isi ulang."
        />
        <Highlight
          title="Multifunction Key"
          text="Satu kunci untuk menyalakan motor, mengunci stang, dan membuka bagasi."
        />
        <Highlight
          title="Eco Indicator"
          text="Indikator berkendara irit untuk gaya hidup yang lebih hemat dan ramah lingkungan."
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

export default MioM3;
