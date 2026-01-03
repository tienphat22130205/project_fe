import React from 'react';
import SearchPage from '../../../../../features/Search';

const DomesticAreaPage: React.FC = () => {
  return (
    <SearchPage
      forcedIsInternational={false}
      bannerTitle="Trong nước"
      defaultHeading="Tours trong nước"
    />
  );
};

export default DomesticAreaPage;
