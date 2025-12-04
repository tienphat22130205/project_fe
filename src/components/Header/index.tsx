import React, { useState } from 'react';
import './Header.css';
import { FaSearch, FaChevronDown, FaMapMarkerAlt, FaPlane, FaHeart, FaPhone, FaEnvelope } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Data cho menu dropdown
  const provinces = {
    "MIỀN BẮC": ["Hà Nội", "Hạ Long", "Sa Pa", "Cao Bằng", "Ninh Bình", "Hà Giang", "Hải Phòng", "Lào Cai", "Móng Cái", "Mộc Châu"],
    "MIỀN TRUNG": ["Đà Nẵng", "Nha Trang", "Quy Nhon", "Mũi Né", "Ninh Thuận", "Hội An", "Huế", "Quảng Bình", "Phan Thiết", "Quảng Trị"],
    "TÂY NGUYÊN": ["Đà Lạt", "Buôn Ma Thuột", "Pleiku", "Kon Tum", "Măng Đen", "Bảo Lộc", "Tà Đùng", "Đắk Nông"],
    "MIỀN ĐÔNG NAM BỘ": ["TP Hồ Chí Minh", "Bình Châu", "Côn Đảo", "Vũng Tàu", "Long Hải", "Hồ Tràm", "Tây Ninh", "Cần Giờ"],
    "MIỀN TÂY NAM BỘ": ["Cần Thơ", "Phú Quốc", "Châu Đốc", "Cà Mau", "Tiền Giang", "Bến Tre", "Hà Tiên", "Rạch Giá", "Long An", "Mỹ Tho"]
  };

  const services = {
    "Du lịch trong nước": ["Du lịch nước ngoài", "Thể loại"],
    "Dịch vụ": ["Combo Free & Easy", "Vé Máy Bay Online", "Vé Tham Quan Sun World"]
  };

  const handleDropdownToggle = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-left">
              <span className="departure"><MdLocationOn /> Chọn điểm khởi hành</span>
              <span className="contact-link">Liên hệ</span>
            </div>
            <div className="top-right">
              <span className="email"><FaEnvelope /> info@saigontourist.net</span>
              <span className="phone"><FaPhone /> (028) 3827 2727</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo">
              <img src="https://via.placeholder.com/200x50/1e88e5/ffffff?text=SAIGONTOURIST" alt="Saigontourist" className="logo-img" />
            </div>
            
            {/* Search Bar */}
            <div className="search-section">
              <div className="search-bar">
                <FaSearch className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Tìm tour"
                  className="search-input"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="navigation">
              <ul className="nav-menu">
                {/* Du lịch dropdown */}
                <li className="dropdown" onMouseLeave={() => setActiveDropdown(null)}>
                  <a 
                    href="#travel" 
                    className="dropdown-trigger"
                    onMouseEnter={() => handleDropdownToggle('travel')}
                  >
                    Du lịch <FaChevronDown />
                  </a>
                  {activeDropdown === 'travel' && (
                    <div className="dropdown-menu mega-menu">
                      <div className="dropdown-content">
                        <div className="dropdown-section">
                          <div className="section-header">
                            <FaMapMarkerAlt className="section-icon" />
                            <span>Du lịch trong nước</span>
                          </div>
                        </div>
                        <div className="dropdown-section">
                          <div className="section-header">
                            <FaPlane className="section-icon" />
                            <span>Du lịch nước ngoài</span>
                          </div>
                        </div>
                        <div className="dropdown-section">
                          <div className="section-header">
                            <span>Thể loại</span>
                          </div>
                        </div>
                      </div>
                      <div className="provinces-grid">
                        {Object.entries(provinces).map(([region, cities]) => (
                          <div key={region} className="province-column">
                            <h4 className="region-title">{region}</h4>
                            <ul className="cities-list">
                              {cities.map((city) => (
                                <li key={city}>
                                  <a href={`#${city.toLowerCase()}`}>{city}</a>
                                </li>
                              ))}
                            </ul>
                            <a href="#" className="view-more">Xem thêm</a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>

                {/* Dịch vụ dropdown */}
                <li className="dropdown" onMouseLeave={() => setActiveDropdown(null)}>
                  <a 
                    href="#services" 
                    className="dropdown-trigger"
                    onMouseEnter={() => handleDropdownToggle('services')}
                  >
                    Dịch vụ <FaChevronDown />
                  </a>
                  {activeDropdown === 'services' && (
                    <div className="dropdown-menu services-menu">
                      <div className="services-content">
                        {Object.entries(services).map(([category, items]) => (
                          <div key={category} className="service-category">
                            <h4>{category}</h4>
                            <ul>
                              {items.map((item) => (
                                <li key={item}>
                                  <a href={`#${item.toLowerCase()}`}>{item}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>

                <li><a href="#rent">Thuê xe</a></li>
                <li><a href="#study">Du học</a></li>
                <li><a href="#work">Việc làm ngoài nước</a></li>
                <li>
                  <a href="#favorite" className="favorite-link">
                    <FaHeart /> Tour theo yêu cầu
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;