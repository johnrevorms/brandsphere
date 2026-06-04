import { useState, useEffect } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await api.get('/articles');
        setArticles(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-28 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gray-500 font-mono mb-3 md:mb-4">— The Arcanum —</p>
          <h1 className="text-4xl md:text-8xl font-black italic tracking-widest uppercase">
            Journal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4 md:mt-6 max-w-xl mx-auto text-xs md:text-base px-4">
            Cerita di balik layar, rilis edisi terbaru, dan pandangan langsung dari dunia Arcanum.
          </p>
          <div className="h-px bg-black/10 dark:bg-white/10 mt-8 md:mt-12 w-1/2 mx-auto"></div>
        </div>

        {loading ? (
          <>
            <div className="block mb-16 md:mb-20 animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                <div className="aspect-video bg-gray-100 dark:bg-white/5 rounded-xl"></div>
                <div>
                  <div className="w-20 h-5 md:h-6 bg-gray-200 dark:bg-white/10 rounded-full mb-4 md:mb-6"></div>
                  <div className="w-full h-8 md:h-12 bg-gray-200 dark:bg-white/10 rounded mb-3 md:mb-4"></div>
                  <div className="w-2/3 h-8 md:h-12 bg-gray-200 dark:bg-white/10 rounded mb-4 md:mb-6"></div>
                  <div className="w-full h-3 md:h-4 bg-gray-100 dark:bg-white/5 rounded mb-2"></div>
                  <div className="w-4/5 h-3 md:h-4 bg-gray-100 dark:bg-white/5 rounded mb-6 md:mb-8"></div>
                  <div className="flex justify-between">
                    <div className="w-20 md:w-24 h-3 md:h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
                    <div className="w-24 md:w-32 h-3 md:h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-gray-100 dark:bg-white/5 rounded-xl mb-4 md:mb-5"></div>
                  <div className="w-20 md:w-24 h-2 md:h-3 bg-gray-200 dark:bg-white/10 rounded mb-3"></div>
                  <div className="w-full h-5 md:h-6 bg-gray-200 dark:bg-white/10 rounded mb-2"></div>
                  <div className="w-3/4 h-5 md:h-6 bg-gray-200 dark:bg-white/10 rounded mb-3"></div>
                  <div className="w-full h-2 md:h-3 bg-gray-100 dark:bg-white/5 rounded mb-1"></div>
                  <div className="w-4/5 h-2 md:h-3 bg-gray-100 dark:bg-white/5 rounded mb-4"></div>
                  <div className="w-12 md:w-16 h-2 md:h-3 bg-gray-200 dark:bg-white/10 rounded"></div>
                </div>
              ))}
            </div>
          </>
        ) : articles.length === 0 ? (
          <div className="text-center text-gray-500 py-20 md:py-32 italic text-sm md:text-lg">Belum ada artikel yang dipublikasikan.</div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && (
              <Link to={`/blog/${featured.id}`} className="block group mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden border border-black/5 dark:border-white/5">
                    {featured.image_path ? (
                      <img
                        src={`http://localhost:8000/storage/${featured.image_path}`}
                        alt={featured.title}
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 italic text-xs uppercase tracking-widest">No Cover</div>
                    )}
                  </div>
                  <div>
                    <span className="inline-block border border-black text-black dark:border-white dark:text-white text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 md:mb-6">Featured</span>
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-wide leading-tight mb-3 md:mb-6 group-hover:text-gray-500 transition-colors uppercase">
                      {featured.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 line-clamp-3">
                      {featured.subtitle || featured.content?.slice(0, 150)}
                    </p>
                    <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-4">
                      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-mono">
                        <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        {new Date(featured.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <span className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-bold tracking-widest uppercase group-hover:gap-2 md:group-hover:gap-3 transition-all">
                        Baca <span className="hidden sm:inline">Selengkapnya</span> <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Divider */}
            {rest.length > 0 && (
              <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
                <div className="h-px bg-black/10 dark:bg-white/10 flex-1"></div>
                <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-500 font-mono">Artikel Lainnya</p>
                <div className="h-px bg-black/10 dark:bg-white/10 flex-1"></div>
              </div>
            )}

            {/* Other articles grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {rest.map((article) => (
                <Link to={`/blog/${article.id}`} key={article.id} className="group cursor-pointer block flex flex-col h-full">
                  <div className="aspect-[4/3] sm:aspect-video bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden mb-4 md:mb-5 border border-black/5 dark:border-white/5">
                    {article.image_path ? (
                      <img
                        src={`http://localhost:8000/storage/${article.image_path}`}
                        alt={article.title}
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 italic text-[10px] uppercase tracking-widest">No Cover</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500 font-mono mb-2 md:mb-3">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold tracking-wide mb-2 md:mb-3 group-hover:text-gray-500 transition-colors line-clamp-2 uppercase leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm line-clamp-2 mb-4 flex-grow">
                    {article.subtitle || article.content?.slice(0, 100)}
                  </p>
                  <div className="border-t border-black/5 dark:border-white/10 pt-3 mt-auto">
                    <span className="flex items-center gap-1 text-[10px] md:text-xs font-bold tracking-widest uppercase group-hover:gap-2 transition-all">
                      Baca <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
