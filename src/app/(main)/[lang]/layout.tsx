import { Outlet } from 'react-router-dom';
import Header from '../../../features/Header';
import Footer from '../../../features/Footer';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
