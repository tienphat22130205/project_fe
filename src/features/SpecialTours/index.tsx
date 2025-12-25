import React from 'react';
import viTexts from '../../assets/locales/vi.json';
import { FaSnowflake, FaGift, FaPlane, FaStar } from 'react-icons/fa';
import { GiMountains } from 'react-icons/gi';

const SpecialTours: React.FC = () => {
  const getIcon = (index: number) => {
    switch(index) {
      case 0: return <GiMountains />;
      case 1: return <FaGift />;
      case 2: return <FaStar />;
      case 3: return <FaPlane />;
      default: return <FaSnowflake />;
    }
  };

  const iconColors = ['text-blue-600', 'text-blue-600', 'text-blue-600', 'text-blue-600'];
  const bgColors = ['bg-blue-50', 'bg-blue-50', 'bg-blue-50', 'bg-blue-50'];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold text-black mb-6">{viTexts.specialTours.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {viTexts.specialTours.tours.map((tour: string, index: number) => (
            <div key={index} className="bg-white border border-gray-300 rounded p-4 text-center cursor-pointer hover:border-blue-600 transition-colors">
              <div className="flex justify-center mb-2">
                <div className="bg-blue-600 text-white text-2xl p-2 rounded">
                  {getIcon(index)}
                </div>
              </div>
              <h3 className="text-sm text-black">{tour}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialTours;