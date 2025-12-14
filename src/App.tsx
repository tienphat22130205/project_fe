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

function App() {
  const location = useLocation();
  
  return (
    <>
      <Routes location={location}>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/car-rental" element={<CarRentalPage />} />
          <Route path="/study-abroad" element={<StudyAbroadPage />} />
          <Route path="/work-abroad" element={<WorkAbroadPage />} />
          <Route path="/custom-tour" element={<CustomTourPage />} />
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
      />
    </>
  );
}

export default App;
