import React from 'react';

const PromoBanners: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Banner chính - Tết deal giảm sâu */}
        <div className="mb-8">
          <img 
            src="/banner_1.png" 
            alt="Tết deal giảm sâu" 
            className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>

        {/* Tiêu đề section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-700 uppercase">
            CHỈ MỘT CHẠM - ĐỦ DỊCH VỤ !
          </h2>
          <button 
            className="mt-4 px-8 py-2.5 border-2 border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Xem tất cả
          </button>
        </div>

        {/* Grid layout cho 3 banner dịch vụ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Banner lớn bên trái */}
          <div className="lg:col-span-2">
            <img 
              src="/banner_2.png" 
              alt="Hàn Quốc - Bán giảo hướng mùa đông" 
              className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            />
          </div>

          {/* 2 banner nhỏ bên phải */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="flex-1">
              <img 
                src="/banner_3.png" 
                alt="Back home go beyond" 
                className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <img 
                src="/banner_3.png" 
                alt="Sunworld - Mua online nhanh chóng tiện lợi" 
                className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
