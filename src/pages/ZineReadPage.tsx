import { useParams, Navigate } from 'react-router-dom';
import { ZineReader } from '@/components/layout/ZineReader';
import { allZines } from '@/data/zines/sample-zine';

export default function ZineReadPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const zine = allZines.find(z => z.slug === slug);

  if (!zine) {
    return <Navigate to="/" replace />;
  }

  return <ZineReader zine={zine} />;
}
