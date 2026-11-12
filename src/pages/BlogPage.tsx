import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X } from 'lucide-react';
import { TheraConnectStore } from '../services/store';
import { BlogPost } from '../types';

export const BlogPage: React.FC = () => {
  const posts = TheraConnectStore.getBlogPosts();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = ['All', 'Clinical Neurobiology', 'Therapy Foundations', 'Diagnostic Clarity'];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
          Clinical Journal & Papers
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-[#173D35] tracking-tight">
          Mental Health Science & Insights
        </h1>
        <p className="text-sm sm:text-base text-[#5C6764] leading-relaxed">
          Peer-informed essays, neurological explanations of chronic distress, and practical psychoeducation from our senior clinical staff.
        </p>
      </div>

      {/* Category Filter Tabs (Zero-Pill Discipline, Clean Segmented Controls) */}
      <div className="flex items-center justify-center gap-1 p-1 bg-[#EFEDE4] rounded-lg max-w-md mx-auto border border-[#D1DDD0]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === cat
                ? 'bg-white text-[#173D35] shadow-xs'
                : 'text-[#5C6764] hover:text-[#242B29]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white border border-[#D1DDD0] rounded-xl overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#173D35] transition-all group"
          >
            <div>
              {post.imageUrl && (
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#5C6764]">
                  <span className="font-medium text-[#173D35]">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-numbers">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-editorial font-bold text-[#173D35] leading-snug group-hover:text-[#0E2722] transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-[#5C6764] leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-50 text-xs">
              <span className="text-[#5C6764] font-medium">{post.authorName}</span>
              <button
                onClick={() => setActiveArticle(post)}
                className="text-[#173D35] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl bg-[#F8F7F2] rounded-xl shadow-2xl border border-[#D1DDD0] max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="bg-[#173D35] px-6 py-4 text-white flex items-center justify-between">
              <div className="text-xs uppercase font-mono tracking-wider text-[#DFC9A0]">
                {activeArticle.category} · {activeArticle.readTime}
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-white/70 hover:text-white p-1 rounded-full transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
              <div className="space-y-2 border-b border-[#D1DDD0] pb-6">
                <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#173D35]">
                  {activeArticle.title}
                </h2>
                <div className="text-xs text-[#5C6764] flex items-center gap-2">
                  <span>Written by <strong>{activeArticle.authorName}</strong></span>
                  <span>·</span>
                  <span>Published {activeArticle.publishedAt}</span>
                </div>
              </div>

              {activeArticle.imageUrl && (
                <div className="rounded-xl overflow-hidden max-h-72">
                  <img
                    src={activeArticle.imageUrl}
                    alt={activeArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="text-sm text-[#242B29] leading-relaxed space-y-4 whitespace-pre-line font-light">
                {activeArticle.content}
              </div>

              <div className="p-4 bg-[#EFEDE4] rounded-lg border border-[#D1DDD0] text-xs text-[#5C6764] leading-relaxed">
                <strong>Clinical Advisory:</strong> Articles published in the TheraConnect Journal provide general psychoeducation and are not diagnostic replacements for personalized clinical evaluation. If you are struggling with distress, we encourage consulting a licensed psychologist.
              </div>
            </div>

            <div className="bg-[#EFEDE4]/80 px-6 py-3.5 border-t border-[#D1DDD0] flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 bg-[#173D35] text-white text-xs font-medium rounded-md hover:bg-[#0E2722] transition-colors"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
