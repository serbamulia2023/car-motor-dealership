import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mxKingVariant = {
  name: 'MX King 150',
  price: 'Rp 27.325.000',
  colors: [
    {
      name: 'Red',
      color: '#D50000',
      image: '/mxking/red.jpg',
    },
    {
      name: 'CyberCity',
      color: '#001D74',
      image: '/mxking/cybercity.jpg',
    },
    {
      name: 'Silver',
      color: '#A9A9A9',
      image: '/mxking/silver.jpg',
    },
  ],
  highlights: [
    {
      title: 'New Graphic Design',
      text: 'Desain grafis simetris dan sporty terinspirasi konsep downforce dengan garis bold dan aksen cerah memberi kesan speedy yang khas.',
    },
    {
      title: 'Full Digital Speedometer',
      text: 'Dilengkapi speedometer full LCD modern yang informatif bagi pengendara.',
    },
    {
      title: '150cc FI, Engine Liquid Cooled System',
      text: 'Mesin balap 150cc Fuel Injection dengan Forged Piston, DiAsil Cylinder dan sistem pendingin cair untuk performa maksimal.',
    },
    {
      title: 'Light Frame Design',
      text: 'Lebih lincah dengan frame ringan, posisi berkendara sporty, suspensi monoshock belakang, dan pijakan kaki lipat untuk manuver nyaman.',
    },
  ],
};

const Mxking = () => {
  const navigate = useNavigate();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = mxKingVariant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{mxKingVariant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          MX King 150 hadir dengan desain grafis baru yang agresif dan mesin balap 150cc Fuel Injection berpendingin cair untuk performa dan kelincahan optimal.
        </p>

        {/* Color Switcher */}
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-xl mb-4">Pilih Warna:</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            {mxKingVariant.colors.map((color, idx) => (
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
          <p className="text-xl font-bold text-red-600 mb-4">{mxKingVariant.price}</p>
          <p className="text-sm text-gray-500 mb-4">Harga Rekomendasi OTR Jakarta</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/yamaha/test-drive?model=MX King 150')}
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
        {mxKingVariant.highlights.map((item, idx) => (
          <Highlight key={idx} title={item.title} text={item.text} />
        ))}
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

export default Mxking;
