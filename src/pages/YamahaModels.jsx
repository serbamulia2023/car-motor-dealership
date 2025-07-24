import React from 'react';
import { Link } from 'react-router-dom';

const yamahaModels = [
  {
    name: 'XMAX Series',
    category: 'MAXI',
    colors: ['#231F20', '#C0C0C0', '#000000', '#C8102E'],
    route: 'xmax',
    image: '/yamaha/xmax.jpg',
  },
  {
    name: 'NMAX Series',
    category: 'MAXI',
    colors: ['#231F20', '#C0C0C0', '#FF0000', '#FFFFFF', '#AFC8E0', '#000000'],
    route: 'nmax',
    image: '/yamaha/nmax.jpg',
  },
  {
    name: 'Aerox Series',
    category: 'MAXI',
    colors: ['#3A3A3A', '#1E1E9D', '#FFD700', '#C0C0C0', '#C8102E', '#000000'],
    route: 'aerox',
    image: '/yamaha/aerox.jpg',
  },
  {
    name: 'Lexi Series',
    category: 'MAXI',
    colors: ['#231F20', '#C0C0C0', '#A10E1A', '#D90000', '#000000', '#A9A9A9'],
    route: 'lexi',
    image: '/yamaha/lexi.jpg',
  },
  {
    name: 'Freego Series',
    category: 'MAXI',
    colors: ['#2C1C1A', '#DADADA', '#FFFFFF', '#D3262A', '#CFC3B1', '#000000'],
    route: 'freego',
    image: '/yamaha/freego.jpg',
  },
  {
    name: 'Gear Series',
    category: 'MAXI',
    colors: ['#B4DAEE', '#D3262A', '#00A8A8', '#6B6E4E', '#000000', '#DDD3B7', '#666666', '#DADADA'],
    route: 'gear',
    image: '/yamaha/gear.jpg',
  },
  {
    name: 'Fazzio Series',
    category: 'Hybrid',
    colors: ['#958B79', '#F4F4F4', '#D6A8A1', '#B7CBA4', '#B4DAEE', '#FFF500', '#FFFFFF', '#D6B1B0', '#231F20', '#D3262A', '#000000'],
    route: 'fazzio',
    image: '/yamaha/fazzio.jpg',
  },
  {
    name: 'Filano Series',
    category: 'Hybrid',
    colors: ['#2D1E1E', '#B6B6B6', '#B7CBA4', '#D6A8A1', '#B4DAEE', '#F8F8F8'],
    route: 'filano',
    image: '/yamaha/filano.jpg',
  },
  {
    name: 'X-Ride Series',
    category: 'Adventure',
    colors: ['#0047AB', '#1A1A1A', '#C5BBA4'],
    route: 'xride',
    image: '/yamaha/xride.jpg',
  },
  {
    name: 'Mio Series',
    category: 'Classic',
    colors: ['#00B2A9', '#FFFFFF', '#FF0000', '#000000'],
    route: 'mio',
    image: '/yamaha/mio.jpg',
  },
  {
    name: 'Fino Series',
    category: 'Classic',
    colors: ['#c60000', '#1f3c63', '#000000', '#f5f5f5', '#a4a4a4', '#7fe1bc', '#3c3c3c'],
    route: 'fino',
    image: '/yamaha/fino.jpg',
  },
  {
    name: 'XSR Series',
    category: 'Sport Heritage',
    colors: ['#3C2B26', '#111111', '#C8C8C8'],
    route: 'xsrs',
    image: '/yamaha/xsr.jpg',
  },
  {
    name: 'R15 Series',
    category: 'Sport',
    colors: ['#DAD9D5', '#00205B', '#0F0F0F'],
    route: 'r15',
    image: '/yamaha/r15.jpg',
  },
  {
    name: 'R25 Series',
    category: 'Sport',
    colors: ['#00287A', '#1a1a1a'],
    route: 'r25',
    image: '/yamaha/r25.jpg',
  },
  {
    name: 'MT-25 Series',
    category: 'Naked Sport',
    colors: ['#dfe0e5', '#1a1a1a'],
    route: 'mt25',
    image: '/yamaha/mt25.jpg',
  },
  {
    name: 'MT-15 Series',
    category: 'Naked Sport',
    colors: ['#c7cbd7', '#000000'],
    route: 'mt15',
    image: '/yamaha/mt15.jpg',
  },
  {
    name: 'Vixion Series',
    category: 'Naked Sport',
    colors: ['#1f1f1f', '#8b0000', '#1e3f66', '#c60000'],
    route: 'vixion',
    image: '/yamaha/vixion.jpg',
  },
  {
    name: 'WR155R Series',
    category: 'Off-Road',
    colors: ['#0000aa', '#000000'],
    route: 'wr155r',
    image: '/yamaha/wr155r.jpg',
  },
  {
    name: 'YZ125X Series',
    category: 'Off-Road',
    colors: ['#0047AB'],
    route: 'yz125x',
    image: '/yamaha/yz125x.jpg',
  },
  {
    name: 'YZ250 Series',
    category: 'Off-Road',
    colors: ['#0047AB'],
    route: 'yz250',
    image: '/yamaha/yz250.jpg',
  },
  {
    name: 'MX King Series',
    category: 'Underbone',
    colors: ['#D50000', '#001D74', '#A9A9A9'],
    route: 'mxking',
    image: '/yamaha/mxking.jpg',
  },
  {
    name: 'Jupiter Z1 Series',
    category: 'Underbone',
    colors: ['#00B7B0', '#D50000', '#000000'],
    route: 'jupiterz1',
    image: '/yamaha/jupiterz1.jpg',
  },
  {
    name: 'Vega Force Series',
    category: 'Underbone',
    colors: ['#EAD882', '#9E0000'],
    route: 'vegaforce',
    image: '/yamaha/vegaforce.jpg',
  },
];

const YamahaModels = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-center mb-2">Yamaha Models</h2>
        <p className="text-center text-gray-600 mb-10">
          Explore our complete Yamaha lineup, built for every kind of ride.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {yamahaModels.map((model, index) => (
            <Link
              to={`/yamaha/models/${model.route}`}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              key={index}
            >
              <img src={model.image} alt={model.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
                <ul className="text-sm text-gray-700 mb-2">
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-500">Category</span>
                    <span>{model.category}</span>
                  </li>
                </ul>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-500">Colors</span>
                  <div className="flex gap-1">
                    {model.colors.map((color, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color }}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="w-full bg-black text-white text-center py-6 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Yamaha by DriveNow. All rights reserved.
      </footer>
    </div>
  );
};

export default YamahaModels;
