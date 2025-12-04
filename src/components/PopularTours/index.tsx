import React, { useState } from 'react';
import './PopularTours.css';
import viTexts from '../../locales/vi.json';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaBus, FaPlane, FaGlobe } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

interface Tour {
  title: string;
  location: string;
  date: string;
  duration: string;
  transport: string;
  price: string;
  badge?: string;
  specialPrice?: string;
  originalPrice?: string;
  airline?: string;
  viewDetails: string;
}

const PopularTours: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'domestic' | 'international'>('domestic');

  const renderTourCard = (tour: Tour, index: number) => (
    <div key={index} className="tour-card-popular">
      <div className="tour-image">
        <img 
          src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=400&h=250&fit=crop`}
          alt={tour.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x250/1e88e5/ffffff?text=Tour+${index + 1}`;
          }}
        />
        {tour.badge && <div className="tour-badge">{tour.badge}</div>}
        {tour.specialPrice && <div className="special-price-badge">{tour.specialPrice}</div>}
      </div>
      <div className="tour-info">
        <h3 className="tour-title-card">{tour.title}</h3>
        <div className="tour-details">
          <p><FaMapMarkerAlt className="icon-location" /> {tour.location}</p>
          <p><FaCalendarAlt className="icon-date" /> {tour.date}</p>
          <p><FaClock className="icon-duration" /> {tour.duration}</p>
          <p><FaBus className="icon-transport" /> {tour.transport}</p>
          {tour.airline && <p><FaPlane className="icon-airline" /> {tour.airline}</p>}
        </div>
        <div className="tour-pricing">
          <div className="price-section">
            {tour.originalPrice && <span className="original-price">{tour.originalPrice}</span>}
            <span className="current-price">{tour.price}</span>
          </div>
          <button className="view-details-btn">{tour.viewDetails}</button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="popular-tours">
      <div className="container">
        <h2 className="section-title">{viTexts.popularTours.title}</h2>
        
        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'domestic' ? 'active' : ''}`}
            onClick={() => setActiveTab('domestic')}
          >
            <MdLocationOn /> {viTexts.popularTours.domestic}
          </button>
          <button 
            className={`tab ${activeTab === 'international' ? 'active' : ''}`}
            onClick={() => setActiveTab('international')}
          >
            <FaGlobe /> {viTexts.popularTours.international}
          </button>
        </div>

        {/* Tours Grid */}
        <div className="tours-grid-popular">
          {activeTab === 'domestic' 
            ? viTexts.popularTours.tours.domestic.map((tour, index) => renderTourCard(tour, index))
            : viTexts.popularTours.tours.international.map((tour, index) => renderTourCard(tour, index))
          }
        </div>
      </div>
    </section>
  );
};

export default PopularTours;