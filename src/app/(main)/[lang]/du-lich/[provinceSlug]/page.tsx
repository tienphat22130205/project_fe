import { useParams } from 'react-router-dom';
import ProvinceDestination from '../../../../../features/ProvinceDestination';

export default function ProvinceDetailPage() {
  const { provinceSlug } = useParams<{ provinceSlug: string }>();
  
  return <ProvinceDestination provinceSlug={provinceSlug || ''} />;
}
