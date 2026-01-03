import { useState } from 'react';
import { FaPlane, FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaUsers, FaSearch, FaClock, FaCheckCircle, FaDollarSign, FaLock, FaComments, FaExchangeAlt } from 'react-icons/fa';

const FlightTicketPage = () => {
    const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departDate, setDepartDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passengers, setPassengers] = useState(1);

    const flights = [
        {
            id: 1,
            airline: 'Vietnam Airlines',
            flightNo: 'VN 201',
            from: 'TP.HCM (SGN)',
            to: 'Hà Nội (HAN)',
            departTime: '06:00',
            arriveTime: '08:15',
            duration: '2h15m',
            price: 2350000,
            seats: 'Còn 8 chỗ',
            aircraft: 'Airbus A321'
        },
        {
            id: 2,
            airline: 'VietJet Air',
            flightNo: 'VJ 301',
            from: 'TP.HCM (SGN)',
            to: 'Hà Nội (HAN)',
            departTime: '08:30',
            arriveTime: '10:45',
            duration: '2h15m',
            price: 1890000,
            seats: 'Còn 12 chỗ',
            aircraft: 'Airbus A320'
        },
        {
            id: 3,
            airline: 'Bamboo Airways',
            flightNo: 'QH 101',
            from: 'TP.HCM (SGN)',
            to: 'Hà Nội (HAN)',
            departTime: '10:00',
            arriveTime: '12:15',
            duration: '2h15m',
            price: 2150000,
            seats: 'Còn 5 chỗ',
            aircraft: 'Airbus A321'
        },
        {
            id: 4,
            airline: 'Vietnam Airlines',
            flightNo: 'VN 203',
            from: 'TP.HCM (SGN)',
            to: 'Hà Nội (HAN)',
            departTime: '14:00',
            arriveTime: '16:15',
            duration: '2h15m',
            price: 2450000,
            seats: 'Còn 15 chỗ',
            aircraft: 'Boeing 787'
        },
        {
            id: 5,
            airline: 'VietJet Air',
            flightNo: 'VJ 303',
            from: 'TP.HCM (SGN)',
            to: 'Hà Nội (HAN)',
            departTime: '18:00',
            arriveTime: '20:15',
            duration: '2h15m',
            price: 1990000,
            seats: 'Còn 20 chỗ',
            aircraft: 'Airbus A320'
        },
    ];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Vé Máy Bay Online
                        </h1>
                        <p className="text-xl text-blue-100">
                            Đặt Online - Bay Giá Tốt - Dịch Vụ Chuẩn
                        </p>
                    </div>

                    {/* Trip Type Toggle */}
                    <div className="flex justify-center gap-4 mb-6">
                        <button
                            onClick={() => setTripType('one-way')}
                            className={`px-6 py-2 rounded-lg font-semibold transition border-2 ${
                                tripType === 'one-way'
                                    ? 'bg-white text-blue-600 border-white'
                                    : 'bg-white/20 text-white hover:bg-white/30 border-white/30'
                            }`}
                        >
                            Một chiều
                        </button>
                        <button
                            onClick={() => setTripType('round-trip')}
                            className={`px-6 py-2 rounded-lg font-semibold transition border-2 ${
                                tripType === 'round-trip'
                                    ? 'bg-white text-blue-600 border-white'
                                    : 'bg-white/20 text-white hover:bg-white/30 border-white/30'
                            }`}
                        >
                            Khứ hồi
                        </button>
                    </div>

                    {/* Search Form */}
                    <div className="bg-white rounded-xl shadow-2xl p-6 -mb-12 relative z-10 border-2 border-gray-400">
                        <div className="grid md:grid-cols-5 gap-4 mb-4">
                            <div className="relative">
                                <FaPlaneDeparture className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Điểm đi"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                                />
                            </div>
                            <div className="relative">
                                <FaPlaneArrival className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Điểm đến"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                                />
                            </div>
                            <div className="relative">
                                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="date"
                                    value={departDate}
                                    onChange={(e) => setDepartDate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                                />
                            </div>
                            {tripType === 'round-trip' && (
                                <div className="relative">
                                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="date"
                                        value={returnDate}
                                        onChange={(e) => setReturnDate(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                                    />
                                </div>
                            )}
                            <div className="relative">
                                <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    value={passengers}
                                    onChange={(e) => setPassengers(Number(e.target.value))}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none appearance-none text-gray-900"
                                >
                                    {[1, 2, 3, 4, 5, 6].map(num => (
                                        <option key={num} value={num}>{num} người</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-lg">
                            <FaSearch />
                            Tìm chuyến bay
                        </button>
                    </div>
                </div>
            </section>

            {/* Flight Results */}
            <section className="max-w-7xl mx-auto px-6 py-20 mt-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Kết quả tìm kiếm</h2>
                    <p className="text-gray-600">Tìm thấy {flights.length} chuyến bay phù hợp</p>
                </div>

                <div className="space-y-4">
                    {flights.map((flight) => (
                        <div
                            key={flight.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
                        >
                            <div className="grid md:grid-cols-12 gap-4 items-center">
                                {/* Airline Info */}
                                <div className="md:col-span-3">
                                    <div className="font-bold text-gray-900 mb-1">{flight.airline}</div>
                                    <div className="text-sm text-gray-600">{flight.flightNo}</div>
                                    <div className="text-xs text-gray-500 mt-1">{flight.aircraft}</div>
                                </div>

                                {/* Flight Route */}
                                <div className="md:col-span-5">
                                    <div className="flex items-center justify-between">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{flight.departTime}</div>
                                            <div className="text-sm text-gray-600 mt-1">{flight.from}</div>
                                        </div>
                                        <div className="flex-1 mx-4">
                                            <div className="flex items-center">
                                                <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                                                <FaPlane className="mx-2 text-blue-600" />
                                                <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                                            </div>
                                            <div className="text-xs text-center text-gray-500 mt-1">
                                                <FaClock className="inline mr-1" />
                                                {flight.duration}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{flight.arriveTime}</div>
                                            <div className="text-sm text-gray-600 mt-1">{flight.to}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Price & Action */}
                                <div className="md:col-span-4 text-right">
                                    <div className="mb-2">
                                        <span className="text-xs text-gray-500">Từ</span>
                                        <div className="text-2xl font-bold text-red-600">
                                            {formatPrice(flight.price)}đ
                                        </div>
                                    </div>
                                    <div className="text-sm text-blue-600 mb-3 flex items-center justify-end gap-1">
                                        <FaCheckCircle />
                                        {flight.seats}
                                    </div>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                                        Chọn chuyến bay
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Ưu điểm khi đặt vé qua chúng tôi
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { title: 'Giá tốt nhất', desc: 'So sánh giá từ nhiều hãng hàng không', icon: FaDollarSign },
                            { title: 'Thanh toán an toàn', desc: 'Bảo mật thông tin thanh toán', icon: FaLock },
                            { title: 'Hỗ trợ 24/7', desc: 'Tư vấn và hỗ trợ mọi lúc mọi nơi', icon: FaComments },
                            { title: 'Đổi trả linh hoạt', desc: 'Chính sách đổi trả vé linh hoạt', icon: FaExchangeAlt },
                        ].map((item, i) => {
                            const IconComponent = item.icon;
                            return (
                                <div key={i} className="text-center p-6 rounded-xl bg-white">
                                    <div className="flex justify-center mb-4">
                                        <IconComponent className="text-4xl text-blue-600" />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default FlightTicketPage;
