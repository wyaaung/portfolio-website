import { ScrollProvider } from '@/providers/ScrollProvider';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <ScrollProvider>
      <Hero />
    </ScrollProvider>
  );
}
