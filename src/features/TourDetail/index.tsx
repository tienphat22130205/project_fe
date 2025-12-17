import React, { useState } from 'react';
import ImageGallery from './components/ImageGallery';
import TabNavigation from './components/TabNavigation';
import TabContent from './components/TabContent.tsx';
import Sidebar from './components/Sidebar.tsx';
import RelatedTours from './components/RelatedTours';

const TourDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - sẽ thay bằng API sau
  const tourData = {
    id: '1',
    title: 'NHA TRANG XƯA – LÀNG YẾN MAI SINH – ĐỐC LẾT - I RESORT',
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      'https://images.unsplash.com/photo-1583417019030-80e65726c58b?w=400',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400',
    ],
    price: 3990000,
    location: 'TP Hồ Chí Minh',
    startDate: '20/12/2025',
    endDate: '23/12/2025',
    duration: '4 ngày 3 đêm',
    highlights: [
      'Trải nghiệm "xuyên không" thú vị tại Nha Trang Xưa',
      'Tham quan Làng Yến Mai Sinh, Vega City Nha Trang, viếng chùa Long Sơn.',
      'Tham quan trung tâm suối khoáng nóng I resort Nha Trang, khám phá và thưởng thức ẩm thực địa phương.',
    ],
    promotions: [
      'Nhóm từ 5 khách trở lên, giảm 50% giá tour cho khách hàng thứ 5.',
      'Không áp dụng đồng thời nhiều chương trình khuyến mãi.',
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-4">
          <span>Trang chủ</span>
          <span className="mx-2">/</span>
          <span>Chùm tour theo thể loại</span>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{tourData.title}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 uppercase">
          {tourData.title}
        </h1>

        {/* Image Gallery */}
        <ImageGallery images={tourData.images} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Tab Content */}
            <TabContent activeTab={activeTab} tourData={tourData} />
          </div>

          {/* Sidebar */}
          <Sidebar price={tourData.price} />
        </div>

        {/* Related Tours */}
        <RelatedTours />
      </div>
    </div>
  );
};

export default TourDetail;
