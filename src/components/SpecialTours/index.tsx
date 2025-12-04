import React from 'react';
import './SpecialTours.css';
import viTexts from '../../locales/vi.json';
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

  return (
    <section className="special-tours">
      <div className="container">
        <h2 className="section-title">{viTexts.specialTours.title}</h2>
        <div className="tours-grid">
          {viTexts.specialTours.tours.map((tour, index) => (
            <div key={index} className="tour-card">
              <div className="tour-icon">
                <div className={`icon icon-${['winter', 'tet', 'new-year', 'overseas'][index]}`}>
                  {getIcon(index)}
                </div>
              </div>
              <h3 className="tour-title">{tour}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialTours;