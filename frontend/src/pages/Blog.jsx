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
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-500 font-mono mb-4">— The Arcanum —</p>
          <h1 className="text-6xl md:text-8xl font-bold italic tracking-widest uppercase">
            Journal
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Cerita di balik layar, rilis edisi terbaru, dan pandangan langsung dari dunia Arcanum.
          </p>
          <div className="h-px bg-white/10 mt-12"></div>
        </div>

        {loading ? (
          <>
            <div className="block mb-20 animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="aspect-video bg-white/5 rounded-3xl"></div>
                <div>
                  <div className="w-20 h-6 bg-white/10 rounded-full mb-6"></div>
                  <div className="w-full h-12 bg-white/10 rounded mb-4"></div>
                  <div className="w-2/3 h-12 bg-white/10 rounded mb-6"></div>
                  <div className="w-full h-4 bg-white/5 rounded mb-2"></div>
                  <div className="w-4/5 h-4 bg-white/5 rounded mb-8"></div>
                  <div className="flex justify-between">
                    <div className="w-24 h-4 bg-white/10 rounded"></div>
                    <div className="w-32 h-4 bg-white/10 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-white/5 rounded-2xl mb-5"></div>
                  <div className="w-24 h-3 bg-white/10 rounded mb-3"></div>
                  <div className="w-full h-6 bg-white/10 rounded mb-2"></div>
                  <div className="w-3/4 h-6 bg-white/10 rounded mb-3"></div>
                  <div className="w-full h-3 bg-white/5 rounded mb-1"></div>
                  <div className="w-4/5 h-3 bg-white/5 rounded mb-4"></div>
                  <div className="w-16 h-3 bg-white/10 rounded"></div>
                </div>
              ))}
            </div>
          </>
        ) : articles.length === 0 ? (
          <div className="text-center text-gray-500 py-32 italic text-lg">Belum ada artikel yang dipublikasikan.</div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && (
              <Link to={`/blog/${featured.id}`} className="block group mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="aspect-video bg-gray-900 rounded-3xl overflow-hidden">
                    {featured.image_path ? (
                      <img
                        src={`http://localhost:8000/storage/${featured.image_path}`}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 italic">No Cover</div>
                    )}
                  </div>
                  <div>
                    <span className="inline-block bg-white text-black text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">Featured</span>
                    <h2 className="text-4xl md:text-5xl font-bold italic tracking-wide leading-tight mb-6 group-hover:text-gray-300 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8 line-clamp-3">
                      {featured.subtitle || featured.content?.slice(0, 150)}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
                        <Calendar className="w-4 h-4" />
                        {new Date(featured.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <span className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase group-hover:gap-3 transition-all">
                        Baca Selengkapnya <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Divider */}
            {rest.length > 0 && (
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-white/10 flex-1"></div>
                <p className="text-xs tracking-[0.3em] uppercase text-gray-500 font-mono">Artikel Lainnya</p>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>
            )}

            {/* Other articles grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((article) => (
                <Link to={`/blog/${article.id}`} key={article.id} className="group cursor-pointer block">
                  <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden mb-5">
                    {article.image_path ? (
                      <img
                        src={`http://localhost:8000/storage/${article.image_path}`}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 italic">No Cover</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-mono mb-3">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-bold tracking-wide mb-3 group-hover:text-gray-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {article.subtitle || article.content?.slice(0, 100)}
                  </p>
                  <span className="flex items-center gap-1 text-xs font-bold tracking-widest uppercase group-hover:gap-2 transition-all">
                    Baca <ArrowUpRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
