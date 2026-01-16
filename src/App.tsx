import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/ScrollToTop';
import RootLayout from './app/(main)/[lang]/layout';
import HomePage from './app/(main)/[lang]/page';
import TravelPage from './app/(main)/[lang]/du-lich/page';
import ServicesPage from './app/(main)/[lang]/dich-vu/page';
import CarRentalPage from './app/(main)/[lang]/thue-xe/page';
import StudyAbroadPage from './app/(main)/[lang]/du-hoc/page';
import WorkAbroadPage from './app/(main)/[lang]/viec-lam-ngoai-nuoc/page';
import CustomTourPage from './app/(main)/[lang]/tour-theo-yeu-cau/page';
import ProvinceDetailPage from './app/(main)/[lang]/du-lich/[provinceSlug]/page';
import ComboPage from './features/DichVu/Combo';
import FlightTicketPage from './features/DichVu/VeMaybay';
import AttractionTicketPage from './features/DichVu/VeThamQuan';
import TourDetailPage from './app/(main)/[lang]/tours/[id]/page';
import BookingPage from './app/(main)/[lang]/booking/page';
import SearchPage from './app/(main)/[lang]/search/page';
import AccountPage from './app/(main)/[lang]/account/page';
import BookingSuccess from './features/BookingSuccess';
import BookingReminder from './components/BookingReminder';
import PaymentInfo from './features/PaymentInfo';
import DomesticAreaPage from './app/(main)/[lang]/khu-vuc/trong-nuoc/page.tsx';
import InternationalAreaPage from './app/(main)/[lang]/khu-vuc/ngoai-nuoc/page.tsx';
import MuaHoaAnhDaoPage from './app/(main)/[lang]/tours/mua-hoa-anh-dao/page';

function App() {
  const location = useLocation();

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
      <ScrollToTop />
      <Routes location={location}>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/:lang" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:lang/search" element={<SearchPage />} />
          <Route path="/khu-vuc/trong-nuoc" element={<DomesticAreaPage />} />
          <Route path="/:lang/khu-vuc/trong-nuoc" element={<DomesticAreaPage />} />
          <Route path="/khu-vuc/ngoai-nuoc" element={<InternationalAreaPage />} />
          <Route path="/:lang/khu-vuc/ngoai-nuoc" element={<InternationalAreaPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/:lang/account" element={<AccountPage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/:lang/travel" element={<TravelPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/:lang/services" element={<ServicesPage />} />
          <Route path="/thue-xe" element={<CarRentalPage />} />
          <Route path="/:lang/thue-xe" element={<CarRentalPage />} />
          <Route path="/study-abroad" element={<StudyAbroadPage />} />
          <Route path="/:lang/study-abroad" element={<StudyAbroadPage />} />
          <Route path="/work-abroad" element={<WorkAbroadPage />} />
          <Route path="/:lang/work-abroad" element={<WorkAbroadPage />} />
          <Route path="/custom-tour" element={<CustomTourPage />} />
          <Route path="/:lang/custom-tour" element={<CustomTourPage />} />
          <Route path="/du-lich/:provinceSlug" element={<ProvinceDetailPage />} />
          <Route path="/:lang/du-lich/:provinceSlug" element={<ProvinceDetailPage />} />
          <Route path="/tours/mua-hoa-anh-dao" element={<MuaHoaAnhDaoPage />} />
          <Route path="/:lang/tours/mua-hoa-anh-dao" element={<MuaHoaAnhDaoPage />} />
          <Route path="/tours/:id" element={<TourDetailPage />} />
          <Route path="/:lang/tours/:id" element={<TourDetailPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/:lang/booking" element={<BookingPage />} />
          <Route path="/payment-info" element={<PaymentInfo />} />
          <Route path="/:lang/payment-info" element={<PaymentInfo />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/:lang/booking-success" element={<BookingSuccess />} />
          <Route path="/dich-vu/combo" element={<ComboPage />} />
          <Route path="/:lang/dich-vu/combo" element={<ComboPage />} />
          <Route path="/dich-vu/ve-may-bay" element={<FlightTicketPage />} />
          <Route path="/:lang/dich-vu/ve-may-bay" element={<FlightTicketPage />} />
          <Route path="/dich-vu/ve-tham-quan" element={<AttractionTicketPage />} />
          <Route path="/:lang/dich-vu/ve-tham-quan" element={<AttractionTicketPage />} />
        </Route>
      </Routes>
      <BookingReminder />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" aria-label={undefined}      />
    </GoogleOAuthProvider>
  );
}

export default App;