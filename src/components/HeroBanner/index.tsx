import React from 'react';
import './HeroBanner.css';
import viTexts from '../../locales/vi.json';
import { FaSearch } from 'react-icons/fa';

const HeroBanner: React.FC = () => {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <div className="container">
          <div className="hero-search">
            <div className="search-form">
              <input 
                type="text" 
                placeholder={viTexts.hero.searchPlaceholder}
                className="hero-search-input"
              />
              <button className="hero-search-button">
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