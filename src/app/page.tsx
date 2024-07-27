import { allBlogs } from 'contentlayer/generated';

import Hero from '@/components/Hero/Hero';
import Intro from '@/components/Intro/Intro';
import RecentBlogs from '@/components/RecentBlogs/RecentBlogs';
import { allCoreContent, sortBlogs } from '@/lib/utils/contentlayer';
import { ScrollProvider } from '@/providers/ScrollProvider';
import Container from '@/wrappers/Container';

export default function Home() {
  const blogs = allCoreContent(sortBlogs(allBlogs));
  return (
    <ScrollProvider>
      <Hero />
      <Intro />
      <Container>
        <RecentBlogs blogs={blogs} />
      </Container>
    </ScrollProvider>
  );
}
