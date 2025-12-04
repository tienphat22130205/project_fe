import React, { useState } from 'react';
import './Destinations.css';
import viTexts from '../../locales/vi.json';

const Destinations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'domestic' | 'international'>('domestic');
  const [activeRegion, setActiveRegion] = useState(0);

  return (
    <section className="destinations">
      <div className="container">
        <h2 className="section-title">{viTexts.destinations.title}</h2>
        <p className="section-description">{viTexts.destinations.description}</p>
        
        {/* Tabs */}
        <div className="destination-tabs">
          <button 
            className={`destination-tab ${activeTab === 'domestic' ? 'active' : ''}`}
            onClick={() => setActiveTab('domestic')}
          >
            {viTexts.destinations.tabs.domestic}
          </button>
          <button 
            className={`destination-tab ${activeTab === 'international' ? 'active' : ''}`}
            onClick={() => setActiveTab('international')}
          >
            {viTexts.destinations.tabs.international}
          </button>
        </div>

        {activeTab === 'domestic' && (
          <>
            {/* Region filters */}
            <div className="region-filters">
              {viTexts.destinations.regions.map((region, index) => (
                <button
                  key={index}
                  className={`region-filter ${activeRegion === index ? 'active' : ''}`}
                  onClick={() => setActiveRegion(index)}
                >
                  {region}
                </button>
              ))}
            </div>

            {/* Destinations Grid */}
            <div className="destinations-grid">
              {viTexts.destinations.places.map((place, index) => (
                <div key={index} className="destination-card">
                  <div className="destination-image">
                    <img 
                      src={`https://images.unsplash.com/photo-${1500000000000 + index * 1000}?w=300&h=200&fit=crop`}
                      alt={place.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x200/1e88e5/ffffff?text=${encodeURIComponent(place.name)}`;
                      }}
                    />
                    <div className="destination-overlay">
                      <h3 className="destination-name">{place.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'international' && (
          <div className="international-destinations">
            <div className="destinations-grid">
              {['Thái Lan', 'Singapore', 'Malaysia', 'Hàn Quốc', 'Nhật Bản', 'Trung Quốc', 'Dubai', 'Châu Âu'].map((place, index) => (
                <div key={index} className="destination-card">
                  <div className="destination-image">
                    <img 
                      src={`https://images.unsplash.com/photo-${1600000000000 + index * 1000}?w=300&h=200&fit=crop`}
                      alt={place}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x200/1e88e5/ffffff?text=${encodeURIComponent(place)}`;
                      }}
                    />
                    <div className="destination-overlay">
                      <h3 className="destination-name">{place}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Destinations;