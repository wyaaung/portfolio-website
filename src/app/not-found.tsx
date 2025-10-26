import Link from '@/components/Link';
import SectionContainer from '@/wrappers/Container';

export default function FourZeroFour() {
	return (
		<SectionContainer>
			<div className='space-x-2 pt-6 pb-8 md:space-y-5'>
				<h1 className='font-extrabold text-6xl text-gray-900 leading-9 tracking-tight md:border-r-2 md:px-6 md:text-8xl md:leading-14 dark:text-gray-100'>
					404
				</h1>
			</div>
			<div className='max-w-md'>
				<p className='mb-4 font-bold text-xl leading-normal md:text-2xl'>
					Sorry we could not find this page.
				</p>
				<p className='mb-8'>But dont worry, you can find plenty of other things on our homepage.</p>
				<Link href='/'>Back to homepage</Link>
			</div>
		</SectionContainer>
	);
}
