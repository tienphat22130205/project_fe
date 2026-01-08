import { useParams } from 'react-router-dom';
import { ThaiLanDetail } from '@/features';

export default function InternationalPage() {
  const { country } = useParams<{ country: string }>();

  // Route to appropriate component based on country
  switch (country?.toLowerCase()) {
    case 'thái-lan':
    case 'thai-lan':
      return <ThaiLanDetail />;
    default:
      // Temporary fallback
      return <ThaiLanDetail />;
  }
}
