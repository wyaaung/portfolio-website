import Hero from '@/components/Hero/Hero';
import Intro from '@/components/Intro/Intro';
import RecentBlogs from '@/components/RecentBlogs/RecentBlogs';
import { allCoreContent, getAllBlogs } from '@/lib/utils/mdx';
import { ScrollProvider } from '@/providers/ScrollProvider';
import Container from '@/wrappers/Container';

export default async function Home() {
	const blogs = allCoreContent(await getAllBlogs());
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
