import React from 'react';
import viTexts from '../../../assets/locales/vi.json';
import { FaSearch } from 'react-icons/fa';

const HeroBanner: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat py-20 md:py-32"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50"></div>
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center mb-8 drop-shadow-lg">
            Khám phá vẻ đẹp Việt Nam
          </h1>
          
          <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                placeholder={viTexts.hero.searchPlaceholder}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap">
                <FaSearch /> {viTexts.hero.searchButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;