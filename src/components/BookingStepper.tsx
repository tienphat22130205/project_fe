import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface BookingStepperProps {
  currentStep: 1 | 2 | 3;
}

const BookingStepper: React.FC<BookingStepperProps> = ({ currentStep }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Step 1 - Chọn tour */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 ${
              currentStep >= 1 ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            {currentStep > 1 ? (
              <FaCheckCircle size={20} />
            ) : (
              <span className="font-bold">1</span>
            )}
          </div>
          <span
            className={`text-sm font-medium ${
              currentStep >= 1 ? 'text-gray-900' : 'text-gray-500'
            }`}
          >
            Chọn tour
          </span>
        </div>

        {/* Line 1 */}
        <div
          className={`flex-1 h-1 mx-2 ${
            currentStep >= 2 ? 'bg-green-500' : 'bg-gray-300'
          }`}
        />

        {/* Step 2 - Điền thông tin */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 ${
              currentStep === 2
                ? 'bg-red-500'
                : currentStep > 2
                ? 'bg-green-500'
                : 'bg-gray-300'
            }`}
          >
            {currentStep > 2 ? (
              <FaCheckCircle size={20} />
            ) : (
              <span className="font-bold">2</span>
            )}
          </div>
          <span
            className={`text-sm font-medium ${
              currentStep === 2
                ? 'text-red-500'
                : currentStep > 2
                ? 'text-gray-900'
                : 'text-gray-500'
            }`}
          >
            Điền thông tin
          </span>
        </div>

        {/* Line 2 */}
        <div
          className={`flex-1 h-1 mx-2 ${
            currentStep >= 3 ? 'bg-green-500' : 'bg-gray-300'
          }`}
        />

        {/* Step 3 - Thanh toán */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 ${
              currentStep === 3 ? 'bg-red-500' : 'bg-gray-300'
            }`}
          >
            <span className="font-bold">3</span>
          </div>
          <span
            className={`text-sm font-medium ${
              currentStep === 3 ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            Thanh toán
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingStepper;
