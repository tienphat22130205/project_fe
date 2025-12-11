import Header from '../../../features/Header';
import Footer from '../../../features/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
