import React from 'react';
import viTexts from '../../assets/locales/vi.json';
import { FaTrophy, FaEnvelope, FaCreditCard, FaFacebook, FaLock } from 'react-icons/fa';
import { SiVisa, SiMastercard } from 'react-icons/si';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Awards and Recognition */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-6">
              {viTexts.footer.awards.map((award: string, index: number) => (
                <div key={index} className="flex items-center gap-2 text-white text-sm">
                  <FaTrophy className="text-yellow-400" />
                  <span>{award}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-white">
              <FaEnvelope /> <span>{viTexts.footer.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">{viTexts.footer.services.title}</h3>
              <ul className="space-y-2">
                {viTexts.footer.services.items.map((item: string, index: number) => (
                  <li key={index}>
                    <a href="#" className="hover:text-blue-500 transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">{viTexts.footer.customerCare.title}</h3>
              <ul className="space-y-2">
                {viTexts.footer.customerCare.items.map((item: string, index: number) => (
                  <li key={index}>
                    <a href="#" className="hover:text-blue-500 transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">{viTexts.footer.aboutUs.title}</h3>
              <ul className="space-y-2">
                {viTexts.footer.aboutUs.items.map((item: string, index: number) => (
                  <li key={index}>
                    <a href="#" className="hover:text-blue-500 transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">{viTexts.footer.policies.title}</h3>
              <ul className="space-y-2">
                {viTexts.footer.policies.items.map((item: string, index: number) => (
                  <li key={index}>
                    <a href="#" className="hover:text-blue-500 transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-sm"><FaCreditCard className="text-blue-400" /> Vietcombank</div>
            <div className="flex items-center gap-2 text-sm"><FaCreditCard className="text-green-400" /> OnePay</div>
            <div className="flex items-center gap-2 text-sm"><SiVisa className="text-blue-600" /> VISA</div>
            <div className="flex items-center gap-2 text-sm"><SiMastercard className="text-red-600" /> MasterCard</div>
            <div className="flex items-center gap-2 text-sm"><FaCreditCard className="text-blue-500" /> AMEX</div>
            <div className="flex items-center gap-2 text-sm"><FaCreditCard className="text-purple-500" /> JCB</div>
            <div className="flex items-center gap-2 text-sm"><SiVisa className="text-blue-700" /> Verified by VISA</div>
            <div className="flex items-center gap-2 text-sm"><SiMastercard className="text-orange-600" /> MasterCard SecureCode</div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-2 text-sm">
            <p className="font-semibold text-white">{viTexts.footer.company.name}</p>
            <p>{viTexts.footer.company.address}</p>
            <p>{viTexts.footer.company.phone}</p>
            <p>{viTexts.footer.company.businessLicense}</p>
            <p>{viTexts.footer.company.tourLicense}</p>
            <p>{viTexts.footer.company.representative}</p>
            <p className="text-gray-400 text-xs mt-4">{viTexts.footer.company.copyright}</p>
            <div className="mt-4">
              <strong className="text-orange-500 text-lg">{viTexts.footer.company.hotline}</strong>
            </div>
            <p>{viTexts.footer.company.website}</p>
            <div className="flex justify-center items-center gap-2 mt-4 text-green-400">
              <FaLock /> <span className="font-semibold">ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG</span>
            </div>
            <div className="mt-6">
              <p className="mb-2">Kết nối với Lữ hành Saigontourist</p>
              <div className="flex justify-center items-center gap-2 text-blue-500 hover:text-blue-400 cursor-pointer">
                <FaFacebook className="text-2xl" /> Facebook
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;