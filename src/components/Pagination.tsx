import Link from 'next/link';

interface Props {
	totalPages: number;
	currentPage: number;
}

const Pagination = ({ totalPages, currentPage }: Props) => {
	const prevPage = currentPage - 1 > 0;
	const nextPage = currentPage + 1 <= totalPages;

	return (
		<div className='space-y-2 md:space-y-5'>
			<nav className='flex justify-between'>
				{!prevPage && (
					<button type='button' className='cursor-auto disabled:opacity-50' disabled={!prevPage}>
						Previous
					</button>
				)}
				{prevPage && (
					<Link
						href={currentPage - 1 === 1 ? '/blogs/' : `/blogs/page/${currentPage - 1}`}
						className='underline-magical'
					>
						<button type='button'>Previous</button>
					</Link>
				)}
				<span>
					{currentPage} of {totalPages}
				</span>
				{!nextPage && (
					<button type='button' className='cursor-auto disabled:opacity-50' disabled={!nextPage}>
						Next
					</button>
				)}
				{nextPage && (
					<Link href={`/blogs/page/${currentPage + 1}`} className='underline-magical'>
						<button type='button'>Next</button>
					</Link>
				)}
			</nav>
		</div>
	);
};

export default Pagination;
