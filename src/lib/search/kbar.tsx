'use client';

import type { Action } from 'kbar';
import { KBarProvider } from 'kbar';
import { useRouter } from 'next/navigation';
import React from 'react';

import formatDate from '../utils/formatDate';
import KBarModal from './kbar-modal';

interface PostData {
	filePath?: string;
	path?: string;
	title: string;
	summary?: string;
	date: string;
	slug: string;
}

export interface KBarSearchProps {
	searchDocumentsPath: string | false;
	defaultActions?: Action[];
	onSearchDocumentsLoad?: (json: PostData[]) => Action[];
}

export const KBarSearchProvider: React.FC<{
	children: React.ReactNode;
	kbarConfig: KBarSearchProps;
}> = ({ kbarConfig, children }) => {
	const router = useRouter();
	const { searchDocumentsPath, defaultActions, onSearchDocumentsLoad } = kbarConfig;
	const [searchActions, setSearchActions] = React.useState<Action[]>([]);
	const [dataLoaded, setDataLoaded] = React.useState(false);

	React.useEffect(() => {
		const mapPosts = (posts: PostData[]) => {
			const actions: Action[] = [];
			for (const post of posts) {
				actions.push({
					id: post.filePath || post.path || post.slug,
					name: post.title,
					keywords: post.summary || '',
					section: 'Content',
					subtitle: formatDate(post.date),
					perform: () => router.push(`/blogs/${post.slug}`),
				});
			}
			return actions;
		};
		async function fetchData() {
			if (searchDocumentsPath) {
				const url =
					searchDocumentsPath.indexOf('://') > 0 || searchDocumentsPath.indexOf('//') === 0
						? searchDocumentsPath
						: new URL(searchDocumentsPath, window.location.origin);
				const res = await fetch(url);
				const json = await res.json();
				const actions = onSearchDocumentsLoad ? onSearchDocumentsLoad(json) : mapPosts(json);
				setSearchActions(actions);
				setDataLoaded(true);
			}
		}
		if (!dataLoaded && searchDocumentsPath) {
			fetchData();
		} else {
			setDataLoaded(true);
		}
	}, [dataLoaded, router, searchDocumentsPath, onSearchDocumentsLoad]);

	return (
		<KBarProvider actions={defaultActions}>
			<KBarModal actions={searchActions} isLoading={!dataLoaded} />
			{children}
		</KBarProvider>
	);
};
