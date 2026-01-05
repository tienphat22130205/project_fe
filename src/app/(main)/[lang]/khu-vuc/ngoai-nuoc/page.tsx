import React from 'react';
import SearchPage from '../../../../../features/Search';

const InternationalAreaPage: React.FC = () => {
  return (
    <SearchPage
      forcedIsInternational={true}
      bannerTitle="Tour nước ngoài"
      defaultHeading="Tour nước ngoài"
    />
  );
};

export default InternationalAreaPage;
