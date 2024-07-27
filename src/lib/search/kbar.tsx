'use client';

import type { Action } from 'kbar';
import { KBarProvider } from 'kbar';
import { useRouter } from 'next/navigation';
import React from 'react';

import type { CoreContent, MDXDocument } from '../utils/contentlayer';
import formatDate from '../utils/formatDate';
import KBarModal from './kbar-modal';

export interface KBarSearchProps {
  searchDocumentsPath: string | false;
  defaultActions?: Action[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSearchDocumentsLoad?: (json: any) => Action[];
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
    const mapPosts = (posts: CoreContent<MDXDocument>[]) => {
      const actions: Action[] = [];
      for (const post of posts) {
        actions.push({
          id: post.path,
          name: post.title,
          keywords: post?.summary || '',
          section: 'Content',
          subtitle: formatDate(post.date),
          perform: () => router.push('/' + post.path),
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
  }, [defaultActions, dataLoaded, router, searchDocumentsPath, onSearchDocumentsLoad]);

  return (
    <KBarProvider actions={defaultActions}>
      <KBarModal actions={searchActions} isLoading={!dataLoaded} />
      {children}
    </KBarProvider>
  );
};
