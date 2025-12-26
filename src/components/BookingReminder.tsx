import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaClock, FaArrowRight } from 'react-icons/fa';

const BookingReminder: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if there's an active booking session
        const bookingStartTime = localStorage.getItem('bookingStartTime');
        const bookingTourId = localStorage.getItem('bookingTourId');

        // Don't show on booking page itself
        if (location.pathname === '/booking') {
            setIsVisible(false);
            return;
        }

        if (bookingStartTime && bookingTourId) {
            const startTime = parseInt(bookingStartTime);
            const now = Date.now();
            const elapsed = Math.floor((now - startTime) / 1000);
            const remaining = 600 - elapsed; // 10 minutes = 600 seconds

            if (remaining > 0) {
                setTimeLeft(remaining);
                setIsVisible(true);
            } else {
                // Booking expired, clear storage
                localStorage.removeItem('bookingStartTime');
                localStorage.removeItem('bookingTourId');
                setIsVisible(false);
            }
        } else {
            setIsVisible(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === null || prev <= 1) {
                    // Booking expired
                    localStorage.removeItem('bookingStartTime');
                    localStorage.removeItem('bookingTourId');
                    setIsVisible(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleReturnToBooking = () => {
        const tourId = localStorage.getItem('bookingTourId');
        if (tourId) {
            navigate(`/booking?tourId=${tourId}`);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible || timeLeft === null) return null;

    const progressPercentage = (timeLeft / 600) * 100;

    return (
        <div className="fixed top-20 right-6 bg-white rounded-lg shadow-2xl z-50 animate-slide-in-right border border-gray-200 w-96">
            {/* Progress bar */}
            <div className="h-1 bg-gray-200 rounded-t-lg overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ${timeLeft < 120 ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>

            <div className="p-4">
                <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${timeLeft < 120 ? 'bg-red-100' : 'bg-green-100'}`}>
                        <FaClock className={timeLeft < 120 ? 'text-red-600' : 'text-green-600'} size={20} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">Đơn đặt tour đang chờ</h3>
                                <p className="text-sm text-gray-600 mt-0.5">Thời gian giữ chỗ còn lại</p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                                aria-label="Đóng"
                            >
                                ×
                            </button>
                        </div>

                        {/* Countdown */}
                        <div className={`text-3xl font-bold mt-2 ${timeLeft < 120 ? 'text-red-600 animate-pulse' : 'text-green-600'}`}>
                            {formatTime(timeLeft)}
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={handleReturnToBooking}
                            className="mt-3 w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                            Quay lại đặt chỗ
                            <FaArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingReminder;
