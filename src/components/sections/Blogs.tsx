import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronLeft, ChevronRight, Clock, Tag } from 'lucide-react';
import { blogPosts, getUniqueTags, searchPosts, getFeaturedPosts } from '../../data/blogs';
import { BlogPost } from '../../types';
import SectionHeading from '../common/SectionHeading';

interface BlogModalProps {
  post: BlogPost;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="bg-light-card dark:bg-dark-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="h-64 sm:h-80 relative overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={post.images[currentImageIndex]}
                alt={post.title}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-full object-contain"
                style={{ objectFit: 'contain' }}
              />
            </AnimatePresence>
            
            {post.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full
                    hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full
                    hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
                
                {/* Image indicator dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {post.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {post.author.name}
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{post.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readingTime} read
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {post.title}
          </h3>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="skill-tag flex items-center gap-1 text-sm"
              >
                <Tag size={14} />
                {tag}
              </span>
            ))}
          </div>

          <div className="prose dark:prose-invert max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BlogCard: React.FC<{ post: BlogPost; onClick: () => void }> = ({
  post,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="card cursor-pointer"
    >
      <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <img
          src={post.images[0]}
          alt={post.title}
          className="max-w-full max-h-full object-contain"
          style={{ objectFit: 'contain' }}
        />
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="text-sm">
          <p className="font-medium text-gray-900 dark:text-white">
            {post.author.name}
          </p>
          <p className="text-gray-500">
            {post.date} • {post.readingTime} read
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white
        group-hover:text-primary-400 transition-colors line-clamp-2">
        {post.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {post.summary}
      </p>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="skill-tag text-xs flex items-center gap-1"
          >
            <Tag size={12} />
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Blogs = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | undefined>();
  
  const tags = getUniqueTags();
  const filteredPosts = searchPosts(searchQuery, selectedTag);
  const featuredPosts = getFeaturedPosts();

  return (
    <div className="container-section">
      <SectionHeading
        title="Blog & Insights"
        subtitle="Thoughts, tutorials, and insights about web development"
      />

      {/* Search and Filters */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(undefined)}
              className={`skill-tag ${!selectedTag ? 'border-primary-500' : ''}`}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`skill-tag ${selectedTag === tag ? 'border-primary-500' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && !searchQuery && !selectedTag && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-primary-500">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onClick={() => setSelectedPost(post)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            onClick={() => setSelectedPost(post)}
          />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No posts found matching your criteria.
          </p>
        </div>
      )}

      <AnimatePresence>
        {selectedPost && (
          <BlogModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blogs;