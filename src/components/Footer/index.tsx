import React from 'react';
import './Footer.css';
import viTexts from '../../locales/vi.json';
import { FaTrophy, FaEnvelope, FaCreditCard, FaFacebook, FaLock } from 'react-icons/fa';
import { SiVisa, SiMastercard } from 'react-icons/si';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Awards and Recognition */}
      <div className="awards-section">
        <div className="container">
          <div className="awards-content">
            <div className="awards-list">
              {viTexts.footer.awards.map((award, index) => (
                <div key={index} className="award-item">
                  <FaTrophy className="award-icon" />
                  <span>{award}</span>
                </div>
              ))}
            </div>
            <div className="email-contact">
              <FaEnvelope /> <span>{viTexts.footer.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="main-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3 className="footer-title">{viTexts.footer.services.title}</h3>
              <ul className="footer-list">
                {viTexts.footer.services.items.map((item, index) => (
                  <li key={index}><a href="#" className="footer-link">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">{viTexts.footer.customerCare.title}</h3>
              <ul className="footer-list">
                {viTexts.footer.customerCare.items.map((item, index) => (
                  <li key={index}><a href="#" className="footer-link">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">{viTexts.footer.aboutUs.title}</h3>
              <ul className="footer-list">
                {viTexts.footer.aboutUs.items.map((item, index) => (
                  <li key={index}><a href="#" className="footer-link">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">{viTexts.footer.policies.title}</h3>
              <ul className="footer-list">
                {viTexts.footer.policies.items.map((item, index) => (
                  <li key={index}><a href="#" className="footer-link">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="payment-section">
        <div className="container">
          <div className="payment-methods">
            <div className="payment-item"><FaCreditCard /> Vietcombank</div>
            <div className="payment-item"><FaCreditCard /> OnePay</div>
            <div className="payment-item"><SiVisa /> VISA</div>
            <div className="payment-item"><SiMastercard /> MasterCard</div>
            <div className="payment-item"><FaCreditCard /> AMEX</div>
            <div className="payment-item"><FaCreditCard /> JCB</div>
            <div className="payment-item"><SiVisa /> Verified by VISA</div>
            <div className="payment-item"><SiMastercard /> MasterCard SecureCode</div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bottom-footer">
        <div className="container">
          <div className="company-info">
            <p>{viTexts.footer.company.name}</p>
            <p>{viTexts.footer.company.address}</p>
            <p>{viTexts.footer.company.phone}</p>
            <p>{viTexts.footer.company.businessLicense}</p>
            <p>{viTexts.footer.company.tourLicense}</p>
            <p>{viTexts.footer.company.representative}</p>
            <p className="copyright">{viTexts.footer.company.copyright}</p>
            <div className="hotline">
              <strong>{viTexts.footer.company.hotline}</strong>
            </div>
            <p>{viTexts.footer.company.website}</p>
            <div className="verification-badge">
              <FaLock /> <span>ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG</span>
            </div>
            <div className="social-media">
              <p>Kết nối với Lữ hành Saigontourist</p>
              <div className="social-icon"><FaFacebook /> Facebook</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;