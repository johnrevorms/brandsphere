import { useState, useEffect } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/articles/${id}`);
        setArticle(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-20">
        <div className="w-full h-[50vh] bg-white/5 animate-pulse mb-16"></div>
        <div className="max-w-3xl mx-auto px-4 animate-pulse">
          <div className="w-32 h-4 bg-white/10 rounded mb-10"></div>
          <div className="w-24 h-3 bg-white/10 rounded mb-6"></div>
          <div className="w-full h-12 bg-white/10 rounded mb-6"></div>
          <div className="w-2/3 h-12 bg-white/10 rounded mb-6"></div>
          <div className="w-full h-4 bg-white/5 rounded mb-2 mt-12"></div>
          <div className="w-full h-4 bg-white/5 rounded mb-2"></div>
          <div className="w-4/5 h-4 bg-white/5 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold italic">Artikel tidak ditemukan</h1>
        <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-20">
      {/* Hero Cover */}
      {article.image_path && (
        <div className="w-full h-[50vh] bg-gray-50 dark:bg-gray-900 overflow-hidden relative mb-16">
          <img
            src={`${import.meta.env.VITE_STORAGE_URL}${article.image_path}`}
            alt={article.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 dark:from-black dark:via-black/50 to-transparent"></div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4">
        {/* Back link */}
        <Link to="/blog" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-500 hover:text-white transition mb-10">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Journal
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-500 font-mono mb-6">
          <Calendar className="w-3 h-3" />
          {new Date(article.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold italic tracking-wide leading-tight mb-6">
          {article.title}
        </h1>

        {/* Subtitle */}
        {article.subtitle && (
          <p className="text-xl text-gray-600 dark:text-gray-400 italic mb-12 leading-relaxed border-l-2 border-black/20 dark:border-white/20 pl-6">
            {article.subtitle}
          </p>
        )}

        <div className="h-px bg-black/10 dark:bg-white/10 mb-12"></div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {article.content}
        </div>

        <div className="h-px bg-black/10 dark:bg-white/10 mt-16 mb-10"></div>

        {/* Footer nav */}
        <Link to="/blog" className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:gap-3 transition-all">
          <ArrowLeft className="w-4 h-4" /> Semua Artikel
        </Link>
      </div>
    </div>
  );
}
