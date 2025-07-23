import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const vegaForceVariant = {
  name: 'Vega Force',
  price: 'Rp 18.850.000',
  colors: [
    {
      name: 'Black Yellow',
      color: '#EAD882',
      image: '/vegaforce/blackyellow.jpg',
    },
    {
      name: 'Black Red',
      color: '#9E0000',
      image: '/vegaforce/blackred.jpg',
    },
  ],
  highlights: [
    {
      title: 'Speedometer Modern',
      text: 'Desain speedometer baru dengan indikator perpindahan gigi dan mesin.',
    },
    {
      title: 'Fuel Injection',
      text: 'Mesin legenda Yamaha dengan teknologi FI dan Euro 3. Kapasitas 114cc, irit, bertenaga dan bandel dengan Forged Piston.',
    },
    {
      title: 'Kunci Pengaman',
      text: 'Dilengkapi starter lock system dengan tombol pengaman untuk keamanan ekstra.',
    },
    {
      title: 'Bagasi Serbaguna 9.2 L',
      text: 'Kapasitas bagasi 9,2L terbesar di kelasnya, cukup untuk menyimpan barang bawaan harian.',
    },
  ],
};

const VegaForce = () => {
  const navigate = useNavigate();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = vegaForceVariant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{vegaForceVariant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          Vega Force tampil modern dan tangguh dengan mesin 114cc Fuel Injection serta fitur praktis seperti bagasi luas dan sistem pengaman canggih.
        </p>

        {/* Color Switcher */}
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-xl mb-4">Pilih Warna:</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            {vegaForceVariant.colors.map((color, idx) => (
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
          <p className="text-xl font-bold text-red-600 mb-4">{vegaForceVariant.price}</p>
          <p className="text-sm text-gray-500 mb-4">Harga Rekomendasi OTR Jakarta</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/yamaha/test-drive?model=Vega Force')}
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
        {vegaForceVariant.highlights.map((item, idx) => (
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

export default VegaForce;
