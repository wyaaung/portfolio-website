'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

import Tag from '@/components/Tag/Tag';

interface Props {
  title: string;
  summary?: string;
  tags?: string[];
  slug: string;
  showTags?: boolean;
  index: number;
}

const BlogCard = ({ title, summary, tags, slug, showTags = true, index }: Props) => {
  return (
    <motion.li
      className="py-2"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: index / 10 }}
    >
      <Link href={`/blogs/${slug}`} aria-label={`Read "${title}"`} legacyBehavior>
        <article className="cursor-pointer gap-3 space-y-2 bg-opacity-20 py-5 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <div className="space-y-3 xl:col-span-4">
            <span className="text-2xl font-bold leading-8 tracking-tight">
              <Link href={`/blogs/${slug}`}>
                <span className="text-gray-900 dark:text-gray-100 hover:text-cyan-500  dark:hover:text-cyan-500">
                  {title}
                </span>
              </Link>
            </span>
            {showTags && tags && (
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            )}
            <div className="prose max-w-none text-gray-900 dark:text-gray-100">{summary}</div>
          </div>
        </article>
      </Link>
    </motion.li>
  );
};

export default BlogCard;
