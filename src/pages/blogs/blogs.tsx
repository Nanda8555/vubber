'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BlogList from '@/components/blog/BlogList';
import BlogLayout from '@/shared/layout/BlogLayout';
import { blogData } from '@/constants/blogData';

// Get unique categories from blog data
export const categories = [
  'All',
  ...Array.from(new Set(blogData.map((blog) => blog.category)))
];

export default function BlogsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredBlogs, setFilteredBlogs] = useState(blogData);
  const nav = useNavigate();

  const category = searchParams.get('category') || 'All';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    // Filter blogs based on category and search term
    const filtered = blogData.filter((blog) => {
      const matchesCategory = category === 'All' || blog.category === category;
      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setFilteredBlogs(filtered);
  }, [category, search]);

  return (
    <BlogLayout>
      <section className='relative min-h-screen overflow-hidden bg-[#0A0118]'>
        <div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10' />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />

        <div className='container mx-auto px-4 py-8 relative z-1'>
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto py-20">
              <h1 className='text-4xl font-bold mb-8'>
                Blog
              </h1>
            
              <BlogList blogs={filteredBlogs} />
            </div>
          </motion.nav>
        </div>
      </section>
    </BlogLayout>
  );
}