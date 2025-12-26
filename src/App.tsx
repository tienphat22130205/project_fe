import { Routes, Route } from 'react-router-dom';
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
import DestinationPage from './app/(main)/[lang]/travel/domestic/[destination]/page';
import InternationalPage from './app/(main)/[lang]/travel/international/[country]/page';
import TourCategoryPage from './app/(main)/[lang]/tours/[category]/page';

function App() {
  console.log('App component rendering...');
  
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/vi" element={<HomePage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/travel/domestic/:destination" element={<DestinationPage />} />
          <Route path="/travel/international/:country" element={<InternationalPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/car-rental" element={<CarRentalPage />} />
          <Route path="/study-abroad" element={<StudyAbroadPage />} />
          <Route path="/work-abroad" element={<WorkAbroadPage />} />
          <Route path="/custom-tour" element={<CustomTourPage />} />
          <Route path="/vi/tours/:category" element={<TourCategoryPage />} />
        </Route>
      </Routes>
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
        theme="light"
        aria-label="Notifications"
      />
    </>
  );
}

export default App;
