import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wyaaung.vercel.app';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/private/', '/admin/', '/_next/', '/api/'],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	};
}
