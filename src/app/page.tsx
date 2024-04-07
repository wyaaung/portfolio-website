import { ScrollProvider } from '@/components/providers/ScrollProvider';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <ScrollProvider>
      <Hero />
    </ScrollProvider>
  );
}
