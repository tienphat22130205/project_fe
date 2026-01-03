import React from 'react';
import SearchPage from '../../../../../features/Search';

const InternationalAreaPage: React.FC = () => {
  return (
    <SearchPage
      forcedIsInternational={true}
      bannerTitle="Ngoài nước"
      defaultHeading="Tours ngoài nước"
    />
  );
};

export default InternationalAreaPage;
