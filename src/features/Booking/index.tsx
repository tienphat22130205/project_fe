import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import BookingForm from './components/BookingForm';
import AdditionalServices from './components/AdditionalServices';
import PaymentSection from './components/PaymentSection';
import BookingSidebar from './components/BookingSidebar';
import { fetchTourDetail, createBooking, initiatePayment } from './server';
import type { TourAPI, Passenger, AdditionalService, PaymentRequest } from './server/types';

const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tourId = searchParams.get('tourId');

  const [tourData, setTourData] = useState<TourAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'male',
    birthDate: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [services, setServices] = useState<Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
  }>>([]);

  const [selectedDeparture, setSelectedDeparture] = useState<string>('');
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [numberOfInfants, setNumberOfInfants] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentRate, setPaymentRate] = useState('100');
  const [promoCode, setPromoCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Fetch tour data on mount
  useEffect(() => {
    const loadTourData = async () => {
      if (!tourId) {
        setError('Không tìm thấy thông tin tour');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetchTourDetail(tourId);
        console.log('Full response:', response);
        
        // Check if response has the correct structure
        const tour = response.data?.tour || response.tour || response;
        
        if (!tour || !tour._id) {
          throw new Error('Invalid tour data structure');
        }

        console.log('Tour loaded:', tour);
        console.log('Tour departures:', tour.departures);
        
        setTourData(tour);
        
        // Set first departure as default
        if (tour.departures && tour.departures.length > 0) {
          setSelectedDeparture(tour.departures[0]._id);
          console.log('Default departure set:', tour.departures[0]);
        } else {
          console.warn('No departures available for this tour');
          setError('Tour này hiện chưa có lịch khởi hành');
        }
        
        setError(null);
      } catch (err) {
        console.error('Error loading tour:', err);
        setError('Không thể tải thông tin tour. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    loadTourData();
  }, [tourId]);

  const getCurrentDeparture = () => {
    return tourData?.departures.find(d => d._id === selectedDeparture);
  };

  const calculateTotal = () => {
    if (!tourData) return 0;
    
    const departure = getCurrentDeparture();
    if (!departure) return 0;

    const tourTotal = 
      departure.pricing.adult * numberOfAdults +
      departure.pricing.child * numberOfChildren +
      departure.pricing.infant * numberOfInfants;
    
    const servicesTotal = services.reduce((sum, service) => sum + (service.price * service.quantity), 0);
    
    return tourTotal + servicesTotal;
  };

  const handleServiceQuantityChange = (id: number, delta: number) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, quantity: Math.max(0, s.quantity + delta) } : s
    ));
  };

  const handleSubmit = async () => {
    if (!agreedToTerms) {
      alert('Vui lòng đồng ý điều khoản');
      return;
    }
    if (!paymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán');
      return;
    }
    if (!selectedDeparture || !tourData) {
      alert('Vui lòng chọn ngày khởi hành');
      return;
    }
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    // Check authentication
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Vui lòng đăng nhập để đặt tour');
      window.location.href = '/login';
      return;
    }

    try {
      setSubmitting(true);

      // Prepare passengers data
      const passengers: Passenger[] = [];
      
      // Add adults
      for (let i = 0; i < numberOfAdults; i++) {
        passengers.push({
          fullName: i === 0 ? formData.fullName : `Người lớn ${i + 1}`,
          gender: formData.gender,
          dateOfBirth: formData.birthDate || '1990-01-01',
          email: formData.email,
          phone: formData.phone,
        });
      }
      
      // Add children
      for (let i = 0; i < numberOfChildren; i++) {
        passengers.push({
          fullName: `Trẻ em ${i + 1}`,
          gender: 'male',
          dateOfBirth: '2015-01-01',
          email: formData.email,
          phone: formData.phone,
        });
      }
      
      // Add infants
      for (let i = 0; i < numberOfInfants; i++) {
        passengers.push({
          fullName: `Em bé ${i + 1}`,
          gender: 'male',
          dateOfBirth: '2022-01-01',
          email: formData.email,
          phone: formData.phone,
        });
      }

      // Prepare additional services
      const additionalServices: AdditionalService[] = services
        .filter(s => s.quantity > 0)
        .map(s => ({
          service: s.id.toString(),
          quantity: s.quantity,
          price: s.price,
          subtotal: s.price * s.quantity,
        }));

      const departure = getCurrentDeparture();
      if (!departure) {
        alert('Không tìm thấy thông tin khởi hành');
        return;
      }

      console.log('Tour departures:', tourData.departures);
      console.log('Selected departure full object:', departure);
      console.log('Start date being sent:', departure.startDate);
      console.log('All tour startDates:', tourData.startDates);

      // Validate that selected departure exists in tour
      const isValidDeparture = tourData.departures.some(d => d._id === selectedDeparture);
      if (!isValidDeparture) {
        alert('Lịch khởi hành không hợp lệ. Vui lòng chọn lại.');
        return;
      }

      // Find matching startDate from tour.startDates
      // Backend validates against tour.startDates, not departure.startDate
      const departureDate = new Date(departure.startDate);
      const matchingStartDate = tourData.startDates.find(date => {
        const tourDate = new Date(date);
        return tourDate.toISOString().split('T')[0] === departureDate.toISOString().split('T')[0];
      });

      const finalStartDate = matchingStartDate || departure.startDate;
      console.log('Final startDate to send:', finalStartDate);

      // Create booking
      const bookingData = {
        tourId: tourData._id,
        startDate: finalStartDate,
        numberOfPeople: numberOfAdults + numberOfChildren + numberOfInfants,
        passengers,
        additionalServices,
        customerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          notes: formData.notes,
        },
        paymentType: paymentRate === '100' ? '100%' : '30%',
      };

      console.log('Booking data being sent:', JSON.stringify(bookingData, null, 2));

      const bookingResponse = await createBooking(bookingData);
      
      console.log('Booking response:', bookingResponse);
      
      if (!bookingResponse.success && !bookingResponse.status) {
        throw new Error(bookingResponse.message || 'Tạo booking thất bại');
      }

      const bookingId = bookingResponse.data?.booking?._id || bookingResponse.data?._id;
      
      if (!bookingId) {
        console.error('No booking ID in response:', bookingResponse);
        throw new Error('Không tìm thấy booking ID');
      }

      console.log('Booking created successfully, ID:', bookingId);

      // Initiate payment
      const paymentData: PaymentRequest = {
        bookingId,
        method: paymentMethod as 'momo' | 'atm' | 'credit_card' | 'bank_transfer' | 'cash',
      };

      // Only add returnUrl/cancelUrl for online payment methods
      if (paymentMethod === 'momo' || paymentMethod === 'atm' || paymentMethod === 'credit_card') {
        const baseUrl = window.location.origin;
        paymentData.returnUrl = `${baseUrl}/payment-result`;
        paymentData.cancelUrl = `${baseUrl}/booking-cancelled`;
        
        console.log('Adding URLs:', {
          returnUrl: paymentData.returnUrl,
          cancelUrl: paymentData.cancelUrl,
          baseUrl
        });
      }

      console.log('Payment data:', paymentData);

      const paymentResponse = await initiatePayment(paymentData);

      console.log('Payment response:', paymentResponse);

      if (!paymentResponse.success && !paymentResponse.status) {
        throw new Error('Khởi tạo thanh toán thất bại');
      }

      // Handle payment response
      if (paymentMethod === 'momo' || paymentMethod === 'atm' || paymentMethod === 'credit_card') {
        // Redirect to payment gateway
        const paymentUrl = paymentResponse.data?.paymentUrl;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          throw new Error('Không nhận được URL thanh toán');
        }
      } else if (paymentMethod === 'bank_transfer') {
        // Show bank transfer info
        const bankInfo = paymentResponse.data?.bankInfo;
        const paymentId = paymentResponse.data?._id;
        
        if (bankInfo) {
          // Navigate to payment info page with bank details
          const params = new URLSearchParams({
            bookingId,
            paymentId: paymentId || '',
            bankName: bankInfo.bankName || '',
            accountNumber: bankInfo.accountNumber || '',
            accountName: bankInfo.accountName || '',
            amount: String(bankInfo.amount || 0),
            transferContent: bankInfo.transferContent || '',
          });
          window.location.href = `/payment-info?${params.toString()}`;
        } else {
          alert(`Đặt tour thành công!\n\nMã booking: ${bookingId}\n\nVui lòng liên hệ với chúng tôi để được hướng dẫn thanh toán.`);
          window.location.href = '/account?tab=orders';
        }
      } else if (paymentMethod === 'cash') {
        // Cash payment at office
        alert(`Đặt tour thành công!\n\nMã booking: ${bookingId}\n\nVui lòng đến văn phòng Lữ hành Saigontourist để thanh toán và nhận vé.`);
        window.location.href = '/account?tab=orders';
      }

    } catch (err) {
      console.error('Booking error:', err);
      alert(err instanceof Error ? err.message : 'Có lỗi xảy ra khi đặt tour. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin tour...</p>
        </div>
      </div>
    );
  }

  if (error || !tourData) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Không tìm thấy tour'}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const departure = getCurrentDeparture();
  const tourInfo = {
    title: tourData.title,
    code: tourData.tourCode,
    startDate: departure ? new Date(departure.startDate).toLocaleDateString('vi-VN') : '',
    endDate: departure ? new Date(departure.endDate).toLocaleDateString('vi-VN') : '',
    duration: `${tourData.duration} ngày ${tourData.duration - 1} đêm`,
    adultPrice: departure?.pricing.adult || 0,
    childPrice: departure?.pricing.child || 0,
    infantPrice: departure?.pricing.infant || 0,
    adultCount: numberOfAdults,
    childCount: numberOfChildren,
    infantCount: numberOfInfants,
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
            {/* Tour Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Chọn ngày khởi hành</h2>
              {tourData.departures && tourData.departures.length > 0 ? (
                <select
                  value={selectedDeparture}
                  onChange={(e) => {
                    console.log('Departure changed to:', e.target.value);
                    setSelectedDeparture(e.target.value);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {tourData.departures.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {new Date(dep.startDate).toLocaleDateString('vi-VN')} - {new Date(dep.endDate).toLocaleDateString('vi-VN')} 
                      (Còn {dep.availableSeats} chỗ - Người lớn: {dep.pricing.adult.toLocaleString('vi-VN')}đ)
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-red-500">Tour này hiện chưa có lịch khởi hành</p>
              )}

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Số người lớn</label>
                  <input
                    type="number"
                    min="1"
                    value={numberOfAdults}
                    onChange={(e) => setNumberOfAdults(parseInt(e.target.value) || 1)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Số trẻ em</label>
                  <input
                    type="number"
                    min="0"
                    value={numberOfChildren}
                    onChange={(e) => setNumberOfChildren(parseInt(e.target.value) || 0)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Số em bé</label>
                  <input
                    type="number"
                    min="0"
                    value={numberOfInfants}
                    onChange={(e) => setNumberOfInfants(parseInt(e.target.value) || 0)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Điền thông tin */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-orange-500 mb-6">Điền thông tin</h2>
              <BookingForm 
                formData={formData} 
                setFormData={setFormData}
                tourData={tourData}
              />
            </div>

            {/* Dịch vụ cộng thêm */}
            {services.length > 0 && (
              <AdditionalServices 
                services={services}
                onQuantityChange={handleServiceQuantityChange}
              />
            )}

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
              submitting={submitting}
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
