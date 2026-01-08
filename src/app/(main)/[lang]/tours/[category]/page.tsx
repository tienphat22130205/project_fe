import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TourCategoryListing from '../../../../../features/TourCategoryListing';

const TourCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <TourCategoryListing category={category || ''} />;
};

export default TourCategoryPage;
