import { useParams } from 'react-router-dom';
import { HaNoiDetail } from '@/features';

export default function DestinationPage() {
  const { destination } = useParams<{ destination: string }>();

  // Route to appropriate component based on destination
  switch (destination?.toLowerCase()) {
    case 'hà-nội':
    case 'ha-noi':
      return <HaNoiDetail />;
    case 'hạ-long':
    case 'ha-long':
      return <HaNoiDetail />; // TODO: Create HaLongDetail component
    default:
      // Temporary fallback
      return <HaNoiDetail />;
  }
}
