import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { cache } from 'next/cache';
import readingTime from 'reading-time';
import type { TableOfContent } from '@/types/TableOfContent';
import { extractTocHeadings } from '../remark-toc-headings';

// Simple slug function that matches rehype-slug behavior
function createSlug(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '');
}

const isProduction = process.env.NODE_ENV === 'production';
const contentDirectory = path.join(process.cwd(), 'src/content');

export interface BlogFrontmatter {
	title: string;
	date: string;
	tags?: string[];
	lastmod?: string;
	draft?: boolean;
	summary?: string;
	images?: string[];
	layout?: string;
	bibliography?: string;
	canonicalUrl?: string;
}

export interface AuthorFrontmatter {
	name: string;
	avatar?: string;
	occupation?: string;
	company?: string;
	email?: string;
	twitter?: string;
	linkedin?: string;
	github?: string;
	layout?: string;
}

export interface MDXContent {
	slug: string;
	frontmatter: BlogFrontmatter | AuthorFrontmatter;
	content: string;
	readingTime: ReturnType<typeof readingTime>;
	filePath: string;
	toc?: TableOfContent;
}

export interface BlogPost extends MDXContent {
	frontmatter: BlogFrontmatter;
	structuredData: {
		'@context': string;
		'@type': string;
		headline: string;
		datePublished: string;
		dateModified: string;
		description?: string;
	};
}

export function getMDXFiles(dir: string): string[] {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

export function readMDXFile(filePath: string): {
	frontmatter: Record<string, unknown>;
	content: string;
} {
	const rawContent = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(rawContent);
	return { frontmatter: data, content };
}

export async function getMDXContent(
	type: 'blogs' | 'author',
	slug?: string,
): Promise<MDXContent[]> {
	const dir = path.join(contentDirectory, type);
	const files = getMDXFiles(dir);

	const content = await Promise.all(
		files
			.filter((file) => !slug || path.basename(file, '.mdx') === slug)
			.map(async (file) => {
				const filePath = path.join(dir, file);
				const { frontmatter, content } = readMDXFile(filePath);
				const fileSlug = path.basename(file, '.mdx');
				const toc = await extractTocHeadings(content);

				return {
					slug: fileSlug,
					frontmatter: frontmatter as unknown as BlogFrontmatter | AuthorFrontmatter,
					content,
					readingTime: readingTime(content),
					filePath: filePath.replace(process.cwd(), ''),
					toc,
				};
			}),
	);

	return content;
}

export async function getAllBlogs(): Promise<BlogPost[]> {
	const blogs = (await getMDXContent('blogs')) as BlogPost[];

	return blogs
		.map((blog) => ({
			...blog,
			structuredData: {
				'@context': 'https://schema.org',
				'@type': 'BlogPosting',
				headline: blog.frontmatter.title,
				datePublished: blog.frontmatter.date,
				dateModified: blog.frontmatter.lastmod || blog.frontmatter.date,
				description: blog.frontmatter.summary,
			},
		}))
		.filter((blog) => !isProduction || !blog.frontmatter.draft)
		.sort((a, b) => dateSortDesc(a.frontmatter.date, b.frontmatter.date));
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
	const blogs = (await getMDXContent('blogs', slug)) as BlogPost[];

	if (blogs.length === 0) return null;

	const blog = blogs[0];
	return {
		...blog,
		structuredData: {
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: blog.frontmatter.title,
			datePublished: blog.frontmatter.date,
			dateModified: blog.frontmatter.lastmod || blog.frontmatter.date,
			description: blog.frontmatter.summary,
		},
	};
}

export async function getAuthor(): Promise<MDXContent | null> {
	const authors = await getMDXContent('author');
	return authors.find((author) => author.slug === 'about') || null;
}

export function dateSortDesc(a: string, b: string): number {
	if (a > b) return -1;
	if (a < b) return 1;
	return 0;
}

export function sortBlogs<T extends { frontmatter: { date: string } }>(allBlogs: T[]): T[] {
	return allBlogs.sort((a, b) => dateSortDesc(a.frontmatter.date, b.frontmatter.date));
}

export function getAllTags(allBlogs: BlogPost[]): Record<string, number> {
	return allBlogs.reduce((tagCount: Record<string, number>, blog) => {
		const { tags, draft } = blog.frontmatter;
		if (tags && !draft) {
			tags.forEach((tag) => {
				const formattedTag = createSlug(tag);
				tagCount[formattedTag] = (tagCount[formattedTag] || 0) + 1;
			});
		}
		return tagCount;
	}, {});
}

export type CoreContent<T> = Omit<T, 'content'>;

export function coreContent<T extends MDXContent>(content: T): CoreContent<T> {
	const { content: _, ...core } = content;
	return core;
}

export function allCoreContent<T extends MDXContent>(contents: T[]): CoreContent<T>[] {
	return contents.map((c) => coreContent(c));
}

export type BlogLink = { slug: string; title: string };

export function formatBlogLink(
	blog: BlogPost | CoreContent<BlogPost> | null,
): BlogLink | undefined {
	return blog ? { title: blog.frontmatter.title, slug: blog.slug } : undefined;
}

// Function to create search index (replaces the contentlayer onSuccess callback)
export async function createSearchIndex(): Promise<void> {
	const allBlogs = await getAllBlogs();

	// Create flattened search data with the structure expected by the search
	const searchData = allBlogs.map((blog) => ({
		title: blog.frontmatter.title,
		date: blog.frontmatter.date,
		tags: blog.frontmatter.tags,
		draft: blog.frontmatter.draft,
		summary: blog.frontmatter.summary,
		type: 'Blog',
		readingTime: blog.readingTime,
		slug: blog.slug,
		path: `blogs/${blog.slug}`,
		filePath: blog.filePath,
		toc: blog.toc,
		structuredData: blog.structuredData,
	}));

	const searchIndexPath = path.join(process.cwd(), 'public', 'search.json');
	fs.writeFileSync(searchIndexPath, JSON.stringify(searchData, null, 2));
}

// Cached versions of the functions for performance optimization
export const getCachedAllBlogs = cache(getAllBlogs);
export const getCachedBlogBySlug = cache(getBlogBySlug);

// Optimized function that gets blog with navigation in a single operation
export const getBlogWithNavigation = cache(
	async (
		slug: string,
	): Promise<{
		blog: BlogPost;
		prev: CoreContent<BlogPost> | null;
		next: CoreContent<BlogPost> | null;
	} | null> => {
		const allBlogs = await getCachedAllBlogs();
		const currentIndex = allBlogs.findIndex((blog) => blog.slug === slug);

		if (currentIndex === -1) return null;

		return {
			blog: allBlogs[currentIndex],
			prev: allBlogs[currentIndex + 1] ? coreContent(allBlogs[currentIndex + 1]) : null,
			next: allBlogs[currentIndex - 1] ? coreContent(allBlogs[currentIndex - 1]) : null,
		};
	},
);
