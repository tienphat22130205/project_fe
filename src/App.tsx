import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import TourDetailPage from './app/(main)/[lang]/tours/[id]/page';
import BookingPage from './app/(main)/[lang]/booking/page';
import SearchPage from './app/(main)/[lang]/search/page';
import AccountPage from './app/(main)/[lang]/account/page';
import BookingSuccess from './features/BookingSuccess';
import BookingReminder from './components/BookingReminder';
import PaymentInfo from './features/PaymentInfo';

function App() {
  const location = useLocation();

  return (
    <>
      <Routes location={location}>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/car-rental" element={<CarRentalPage />} />
          <Route path="/study-abroad" element={<StudyAbroadPage />} />
          <Route path="/work-abroad" element={<WorkAbroadPage />} />
          <Route path="/custom-tour" element={<CustomTourPage />} />
          <Route path="/tours/:id" element={<TourDetailPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/payment-info" element={<PaymentInfo />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/dich-vu/combo" element={<ComboPage />} />
          <Route path="/dich-vu/ve-may-bay" element={<FlightTicketPage />} />
          <Route path="/dich-vu/ve-tham-quan" element={<AttractionTicketPage />} />
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
    </>
  );
}

export default App;