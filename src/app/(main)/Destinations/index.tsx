import React, { useState } from 'react';
import viTexts from '../../../assets/locales/vi.json';

const Destinations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'domestic' | 'international'>('domestic');
  const [activeRegion, setActiveRegion] = useState(0);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">{viTexts.destinations.title}</h2>
        <p className="text-center text-gray-600 mb-8">{viTexts.destinations.description}</p>
        
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <button 
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              activeTab === 'domestic' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('domestic')}
          >
            {viTexts.destinations.tabs.domestic}
          </button>
          <button 
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              activeTab === 'international' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('international')}
          >
            {viTexts.destinations.tabs.international}
          </button>
        </div>

        {activeTab === 'domestic' && (
          <>
            {/* Region filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {viTexts.destinations.regions.map((region, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeRegion === index 
                      ? 'bg-orange-500 text-white shadow-md' 
                      : 'bg-white text-gray-700 hover:bg-orange-50'
                  }`}
                  onClick={() => setActiveRegion(index)}
                >
                  {region}
                </button>
              ))}
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {viTexts.destinations.places.map((place, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <img 
                      src={`https://images.unsplash.com/photo-${1500000000000 + index * 1000}?w=300&h=200&fit=crop`}
                      alt={place.name}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x200/1e88e5/ffffff?text=${encodeURIComponent(place.name)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <h3 className="text-white font-bold text-lg p-3 w-full">{place.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'international' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Thái Lan', 'Singapore', 'Malaysia', 'Hàn Quốc', 'Nhật Bản', 'Trung Quốc', 'Dubai', 'Châu Âu'].map((place, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <img 
                    src={`https://images.unsplash.com/photo-${1600000000000 + index * 1000}?w=300&h=200&fit=crop`}
                    alt={place}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x200/1e88e5/ffffff?text=${encodeURIComponent(place)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white font-bold text-lg p-3 w-full">{place}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Destinations;