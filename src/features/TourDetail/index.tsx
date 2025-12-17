import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from './components/ImageGallery.tsx';
import TabNavigation from './components/TabNavigation.tsx';
import TabContent from './components/TabContent.tsx';
import Sidebar from './components/Sidebar.tsx';
import RelatedTours from './components/RelatedTours.tsx';
import { fetchTourDetail } from './server/api';
import type { TourAPI } from './server/types';

const TourDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [tourData, setTourData] = useState<TourAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTourDetail = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await fetchTourDetail(id);
        setTourData(response.data.tour);
        setError(null);
      } catch (err) {
        setError('Không thể tải thông tin tour. Vui lòng thử lại sau.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTourDetail();
  }, [id]);

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
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

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
          <Sidebar 
            price={tourData.departures[0]?.pricing.adult || tourData.price}
            tourCode={tourData.tourCode}
            rating={tourData.rating}
            ratingsQuantity={tourData.ratingsQuantity}
          />
        </div>

        {/* Related Tours */}
        <RelatedTours />
      </div>
    </div>
  );
};

export default TourDetail;
