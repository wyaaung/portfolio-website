import MainLayout from '@/layouts/MainLayout';
import BlogListLayout from '@/layouts/mdx/BlogListLayout';
import { allCoreContent, getAllBlogs, getAllTags } from '@/lib/utils/mdx';
import { BLOGS_PER_PAGE } from '@/types/constants';

export const metadata = {
  title: 'Blogs - William (Wai Yan Aung)',
  description: 'My Blogs - William (Wai Yan Aung)',
};

const Blogs = async ({ params }: { params: Promise<{ pageNumber: string }> }) => {
  const { pageNumber: pageNumberStr } = await params;
  const pageNumber = parseInt(pageNumberStr, 10);
  const blogs = await getAllBlogs();
  const coreBlogsData = allCoreContent(blogs);
  const tagCounts = getAllTags(blogs);
  const initialDisplayBlogs = coreBlogsData.slice(
    BLOGS_PER_PAGE * (pageNumber - 1),
    BLOGS_PER_PAGE * pageNumber
  );

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

  const pagination = {
    currentPage: pageNumber,
    totalPages,
  };

  return (
    <MainLayout>
      <BlogListLayout
        blogs={coreBlogsData}
        initialDisplayBlogs={initialDisplayBlogs}
        pagination={pagination}
        tagCounts={tagCounts}
        title="Blogs"
      />
    </MainLayout>
  );
};

export default Blogs;
