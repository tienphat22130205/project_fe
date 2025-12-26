import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import BookingForm from './components/BookingForm';
import AdditionalServices from './components/AdditionalServices';
import PaymentSection from './components/PaymentSection';
import BookingSidebar from './components/BookingSidebar';
import { fetchTourDetail, createBooking, initiatePayment, fetchAdditionalServices } from './server';
import type { TourAPI, Passenger, AdditionalService, PaymentRequest, BookingRequest } from './server/types';
import { useToast } from '../../hooks/useToast';
import Toast from '../../components/Toast';

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
    _id: string;
    name: string;
    description: string;
    price: number;
    unit: string;
    category: string;
    quantity: number;
    maxQuantity?: number;
  }>>([]);

  const [selectedDeparture, setSelectedDeparture] = useState<string>('');
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [numberOfInfants, setNumberOfInfants] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentRate, setPaymentRate] = useState('100');
  const [promoCode, setPromoCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Countdown timer (10 minutes)
  const [timeLeft, setTimeLeft] = useState(600); // 600 seconds = 10 minutes
  const [timerExpired, setTimerExpired] = useState(false);

  // Toast notifications
  const { toasts, success, error: showError, warning } = useToast();

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

        // Fetch additional services for this tour
        // TODO: Enable this when backend additional services are properly configured
        try {
          const servicesResponse = await fetchAdditionalServices(tour._id);
          if (servicesResponse.success && servicesResponse.data && Array.isArray(servicesResponse.data)) {
            // Only load services if they have valid IDs
            const validServices = servicesResponse.data.filter((s: any) => s._id && s._id !== 'undefined');
            
            if (validServices.length > 0) {
              const servicesWithQuantity = validServices.map((service: {
                _id: string;
                name: string;
                description: string;
                price: number;
                unit: string;
                category: string;
                maxQuantity?: number;
              }) => ({
                ...service,
                quantity: 0
              }));
              setServices(servicesWithQuantity);
              console.log('Additional services loaded:', servicesWithQuantity);
            } else {
              console.warn('No valid services found for this tour');
              setServices([]);
            }
          } else {
            setServices([]);
          }
        } catch (err) {
          console.warn('Could not load additional services:', err);
          setServices([]);
          // Don't fail the whole page if services can't be loaded
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

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setTimerExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

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

  const handleServiceQuantityChange = (id: string, delta: number) => {
    setServices(services.map(s => {
      if (s._id === id) {
        const newQuantity = Math.max(0, s.quantity + delta);
        // Check max quantity if specified
        if (s.maxQuantity && newQuantity > s.maxQuantity) {
          alert(`Số lượng tối đa cho dịch vụ này là ${s.maxQuantity}`);
          return s;
        }
        return { ...s, quantity: newQuantity };
      }
      return s;
    }));
  };

  const handleSubmit = async () => {
    console.log('=== SUBMIT BOOKING ===');
    console.log('Services state:', services);
    console.log('Selected departure:', selectedDeparture);
    console.log('Tour data:', tourData);
    
    if (!agreedToTerms) {
      warning('Vui lòng đồng ý điều khoản');
      return;
    }
    if (!paymentMethod) {
      warning('Vui lòng chọn phương thức thanh toán');
      return;
    }
    if (!selectedDeparture || !tourData) {
      warning('Vui lòng chọn ngày khởi hành');
      return;
    }
    if (!formData.fullName || !formData.email || !formData.phone) {
      warning('Vui lòng điền đầy đủ thông tin');
      return;
    }

    // Check authentication
    const token = localStorage.getItem('accessToken');
    if (!token) {
      showError('Vui lòng đăng nhập để đặt tour');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
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
      console.log('Services before filtering:', services);
      const additionalServices: AdditionalService[] = services
        .filter(s => {
          const isValid = s.quantity > 0 && s._id && s._id !== 'undefined';
          if (!isValid && s.quantity > 0) {
            console.warn('Invalid service filtered out:', s);
          }
          return isValid;
        })
        .map(s => ({
          service: s._id,
          quantity: s.quantity,
          price: s.price,
          subtotal: s.price * s.quantity,
        }));

      console.log('Additional services to send:', additionalServices);
      console.log('Number of services:', additionalServices.length);

      // If user selected services but all are invalid, warn them
      const hasSelectedServices = services.some(s => s.quantity > 0);
      if (hasSelectedServices && additionalServices.length === 0) {
        showError('Dịch vụ bổ sung không hợp lệ. Đang đặt tour không có dịch vụ bổ sung.');
      }

      // If no services selected, that's ok - just skip
      if (additionalServices.length === 0 && !hasSelectedServices) {
        console.log('No additional services selected, proceeding without services');
      }

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
      const bookingData: Partial<BookingRequest> = {
        tourId: tourData._id,
        startDate: finalStartDate,
        numberOfPeople: numberOfAdults + numberOfChildren + numberOfInfants,
        passengers,
        customerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          notes: formData.notes,
        },
        paymentType: paymentRate === '100' ? '100%' : '30%',
      };

      // Only add additionalServices if there are any
      if (additionalServices.length > 0) {
        bookingData.additionalServices = additionalServices;
      }

      console.log('Booking data being sent:', JSON.stringify(bookingData, null, 2));

      const bookingResponse = await createBooking(bookingData as BookingRequest);
      
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
        method: paymentMethod as 'bank_transfer' | 'cash',
      };

      console.log('Payment data:', paymentData);

      const paymentResponse = await initiatePayment(paymentData);

      console.log('Payment response:', paymentResponse);

      if (!paymentResponse.success && !paymentResponse.status) {
        throw new Error('Khởi tạo thanh toán thất bại');
      }

      // Handle payment response
      if (paymentMethod === 'bank_transfer') {
        // Show bank transfer info
        const bankInfo = paymentResponse.data?.bankInfo;
        const paymentId = paymentResponse.data?._id;
        
        if (bankInfo) {
          success('Đặt tour thành công! Đang chuyển đến trang thanh toán...');
          // Navigate to payment info page with bank details
          setTimeout(() => {
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
          }, 1500);
        } else {
          success('Đặt tour thành công!');
          setTimeout(() => {
            const params = new URLSearchParams({
              bookingId,
              tourName: tourData.title,
              paymentMethod: 'bank_transfer',
              amount: String(calculateTotal()),
            });
            window.location.href = `/booking-success?${params.toString()}`;
          }, 2000);
        }
      } else if (paymentMethod === 'cash') {
        // Cash payment at office
        success('Đặt tour thành công! Vui lòng đến văn phòng để thanh toán.');
        setTimeout(() => {
          const params = new URLSearchParams({
            bookingId,
            tourName: tourData.title,
            paymentMethod: 'cash',
            amount: String(calculateTotal()),
          });
          window.location.href = `/booking-success?${params.toString()}`;
        }, 2000);
      }

    } catch (err) {
      console.error('Booking error:', err);
      showError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi đặt tour. Vui lòng thử lại.');
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

  if (timerExpired) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-600 text-6xl mb-4">⏰</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hết thời gian giữ chỗ</h2>
          <p className="text-gray-600 mb-6">
            Thời gian giữ chỗ đã hết. Vui lòng đặt tour lại.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Đặt lại
          </button>
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
      <div className="container mx-auto px-4 py-6">        {/* Countdown Timer */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Thời gian giữ chỗ còn lại:</p>
          <p className={`text-3xl font-bold ${timeLeft < 120 ? 'text-red-600' : 'text-orange-500'}`}>
            {formatTime(timeLeft)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Vui lòng hoàn tất đặt tour trước khi hết thời gian
          </p>
        </div>
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

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast 
            key={toast.id} 
            message={toast.message}
            type={toast.type}
            onClose={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
