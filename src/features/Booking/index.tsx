import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import BookingForm from './components/BookingForm';
import AdditionalServices from './components/AdditionalServices';
import PaymentSection from './components/PaymentSection';
import BookingSidebar from './components/BookingSidebar';

const BookingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Nam',
    birthDate: '',
    email: '',
    phone: '',
    singleRoomSupplement: false,
  });

  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Lựa chọn 2 Vé cáp treo, tham quan [Cáp treo Bà Nà Hills & tự túc ăn trưa] - chiều cao từ 1m4 trở lên',
      description: '- LỰA CHỌN 2 (Cáp treo Bà Nà Hills & tự túc ăn trưa) cho 1 người lớn (chiều cao từ 1m4 trở lên)',
      price: 940000,
      quantity: 0,
    },
    {
      id: 2,
      name: 'Lựa chọn 2 Vé cáp treo, tham quan [Cáp treo Bà Nà Hills & tự túc ăn trưa] - chiều cao từ 1m – dưới 1m4',
      description: '- LỰA CHỌN 2 (Cáp treo Bà Nà Hills & tự túc ăn trưa) cho 1 trẻ em (chiều cao từ 1m - dưới 1m4) và khách cao tuổi ( trên 70 tuổi)',
      price: 740000,
      quantity: 0,
    },
    {
      id: 3,
      name: 'Lựa chọn 3 Vé cáp treo, tham quan [Vé cáp treo + buffet trưa tại Bà Nà Hills] - chiều cao từ 1m4 trở lên',
      description: '- LỰA CHỌN 3 (Combo cáp treo + buffet trưa tại Bà Nà Hills) cho 1 người lớn chiều cao từ 1m4 trở lên',
      price: 1240000,
      quantity: 0,
    },
    {
      id: 4,
      name: 'Lựa chọn 3 Vé cáp treo, tham quan [Vé cáp treo + buffet trưa tại Bà Nà Hills] - chiều cao từ 1m – dưới 1m4',
      description: '- Lựa chọn 3 Vé cáp treo, tham quan [Vé cáp treo + buffet trưa tại Bà Nà Hills] - cho 1 trẻ em chiều cao từ 1m – dưới 1m4 và khách Cao tuổi ( trên 70 tuổi)',
      price: 940000,
      quantity: 0,
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentRate, setPaymentRate] = useState('100');
  const [promoCode, setPromoCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const tourInfo = {
    title: 'Tết Bính Ngọ 2026 - ĐỒNG PHONG NHA- ĐỒNG THIÊN ĐƯỜNG - HUẾ - ĐÀ NẴNG - HỘI AN - KDL BÀ NÀ HILLS',
    code: 'STN084-2026-01018',
    startDate: '17/02/2026',
    endDate: '21/02/2026',
    duration: '5 ngày 4 đêm',
    adultPrice: 12839000,
    childPrice: 8960000,
    infantPrice: 5070000,
    adultCount: 1,
    childCount: 0,
    infantCount: 0,
  };

  const calculateTotal = () => {
    const tourTotal = 
      tourInfo.adultPrice * tourInfo.adultCount +
      tourInfo.childPrice * tourInfo.childCount +
      tourInfo.infantPrice * tourInfo.infantCount;
    
    const servicesTotal = services.reduce((sum, service) => sum + (service.price * service.quantity), 0);
    
    return tourTotal + servicesTotal;
  };

  const handleServiceQuantityChange = (id: number, delta: number) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, quantity: Math.max(0, s.quantity + delta) } : s
    ));
  };

  const handleSubmit = () => {
    if (!agreedToTerms) {
      alert('Vui lòng đồng ý điều khoản');
      return;
    }
    if (!paymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán');
      return;
    }
    console.log('Submit booking', { formData, services, paymentMethod, paymentRate });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white mb-2">
                <FaCheckCircle size={20} />
              </div>
              <span className="text-sm font-medium">Chọn tour</span>
            </div>
            
            <div className="flex-1 h-1 bg-green-500 mx-2" />
            
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white mb-2">
                <span className="font-bold">2</span>
              </div>
              <span className="text-sm font-medium text-red-500">Điền thông tin</span>
            </div>
            
            <div className="flex-1 h-1 bg-gray-300 mx-2" />
            
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 mb-2">
                <span className="font-bold">3</span>
              </div>
              <span className="text-sm font-medium text-gray-500">Thanh toán</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Điền thông tin */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-orange-500 mb-6">Điền thông tin</h2>
              <BookingForm formData={formData} setFormData={setFormData} />
            </div>

            {/* Dịch vụ cộng thêm */}
            <AdditionalServices 
              services={services}
              onQuantityChange={handleServiceQuantityChange}
            />

            {/* Payment Section */}
            <PaymentSection
              paymentRate={paymentRate}
              setPaymentRate={setPaymentRate}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              agreedToTerms={agreedToTerms}
              setAgreedToTerms={setAgreedToTerms}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Sidebar */}
          <BookingSidebar 
            tourInfo={tourInfo}
            services={services}
            total={calculateTotal()}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
