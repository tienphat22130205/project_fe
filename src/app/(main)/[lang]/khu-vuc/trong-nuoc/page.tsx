import React from 'react';
import SearchPage from '../../../../../features/Search';

const DomesticAreaPage: React.FC = () => {
  return (
    <SearchPage
      forcedIsInternational={false}
      bannerTitle="Tour trong nước"
      defaultHeading="Tour trong nước"
    />
  );
};

export default DomesticAreaPage;
