import { Routes, Route } from 'react-router-dom';
import RootLayout from './app/(main)/[lang]/layout';
import HomePage from './app/(main)/[lang]/page';
import TravelPage from './app/(main)/[lang]/du-lich/page';
import ServicesPage from './app/(main)/[lang]/dich-vu/page';
import CarRentalPage from './app/(main)/[lang]/thue-xe/page';
import StudyAbroadPage from './app/(main)/[lang]/du-hoc/page';
import WorkAbroadPage from './app/(main)/[lang]/viec-lam-ngoai-nuoc/page';
import CustomTourPage from './app/(main)/[lang]/tour-theo-yeu-cau/page';
import ComboPage from "./features/DichVu/combo.tsx";
import FlightTicketPage from "./features/DichVu/vemaybay.tsx";
import AttractionTicketPage from "./features/DichVu/vethamquan.tsx";

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/travel" element={<TravelPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/car-rental" element={<CarRentalPage />} />
        <Route path="/study-abroad" element={<StudyAbroadPage />} />
        <Route path="/work-abroad" element={<WorkAbroadPage />} />
        <Route path="/custom-tour" element={<CustomTourPage />} />
        <Route path="/dich-vu/combo" element={<ComboPage />} />
        <Route path="/dich-vu/ve-may-bay" element={<FlightTicketPage />} />
        <Route path="/dich-vu/ve-tham-quan" element={<AttractionTicketPage />} />
      </Routes>
    </RootLayout>
  );
}

export default App;
