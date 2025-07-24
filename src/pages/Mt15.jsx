import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mt15 = {
  name: 'MT-15',
  price: 'Rp 39.665.000',
  colors: [
    {
      name: 'Metallic Light Grey',
      color: '#c7cbd7',
      image: '/mt15/mt15-grey.jpg',
    },
    {
      name: 'Matte Black',
      color: '#000000',
      image: '/mt15/mt15-black.jpg',
    },
  ],
};

const Mt15 = () => {
  const navigate = useNavigate();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = mt15.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{mt15.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          MT-15 hadir dengan desain agresif, fitur canggih dan teknologi mesin unggulan untuk pengendara yang mengutamakan performa dan gaya.
        </p>

        {/* Color Switcher */}
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-xl mb-4">Pilih Warna:</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            {mt15.colors.map((color, idx) => (
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
          <p className="text-xl font-bold text-red-600 mb-4">{mt15.price}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/yamaha/test-drive?model=MT-15')}
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
          title="Engine 155cc LC4V With VVA"
          text="Mesin 155 cc, 4 katup, 6-percepatan, dilengkapi VVA & liquid cooled. Power 14,2 kW / 10.000 rpm, Torsi 14,7 Nm / 8.500 rpm."
        />
        <Highlight
          title="Full Digital Speedometer With Shift Timing Light"
          text="Informasi digital lengkap dan fitur shift timing untuk perpindahan gigi optimal."
        />
        <Highlight
          title="Upside Down Suspension"
          text="Handling lebih maksimal dan semakin gagah berkendara."
        />
        <Highlight
          title="Aluminium Rear Arm"
          text="Lengan ayun aluminium ringan dan kuat untuk pengendalian maksimal."
        />
        <Highlight
          title="Assist & Slipper Clutch"
          text="Perpindahan gigi lebih halus dan ringan dengan fitur Assist & Slipper Clutch."
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

export default Mt15;
