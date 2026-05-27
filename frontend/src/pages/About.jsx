import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function About() {
  const [pageContent, setPageContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await api.get('/pages');
        if (res.data && res.data['about']) {
          setPageContent(res.data['about'].content);
        }
      } catch (e) {
        console.error(e);
      }
    };
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setSettings(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    Promise.all([fetchPage(), fetchSettings()]).finally(() => setLoading(false));
  }, []);

  const renderTitle = () => {
    const title = settings.about_title || "The Arcanum";
    if (title.toLowerCase().startsWith("the ")) {
      return (
        <>
          The <span className="text-gray-600 dark:text-gray-500">{title.slice(4)}</span>
        </>
      );
    }
    return title;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-20">
        <div className="w-full h-[50vh] bg-white/5 animate-pulse mb-16"></div>
        <div className="max-w-3xl mx-auto px-4 animate-pulse">
          <div className="w-full h-12 bg-white/10 rounded mb-6"></div>
          <div className="w-2/3 h-12 bg-white/10 rounded mb-6"></div>
          <div className="w-full h-8 bg-white/10 rounded mb-12"></div>
          <div className="w-full h-4 bg-white/5 rounded mb-2 mt-12"></div>
          <div className="w-full h-4 bg-white/5 rounded mb-2"></div>
          <div className="w-4/5 h-4 bg-white/5 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-20">
      {/* Hero Cover */}
      {settings.about_image ? (
        <div className="w-full h-[50vh] bg-gray-50 dark:bg-gray-900 overflow-hidden relative mb-16">
          <img
            src={`http://localhost:8000/storage/${settings.about_image}`}
            alt="Arcanum Studio"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 dark:from-black dark:via-black/50 to-transparent"></div>
        </div>
      ) : (
        <div className="w-full h-[50vh] bg-white/5 overflow-hidden relative mb-16 flex items-center justify-center text-black dark:text-white/20 italic font-mono uppercase tracking-widest text-sm">
          No Studio Image
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold italic tracking-wide leading-tight mb-6">
          {renderTitle()}
        </h1>

        {/* Subtitle / Quote */}
        <p className="text-xl text-gray-600 dark:text-gray-400 italic mb-12 leading-relaxed border-l-2 border-black/20 dark:border-white/20 pl-6">
          "{settings.about_quote || "More than just fabric and thread. Arcanum is the manifestation of the unknown."}"
        </p>

        <div className="h-px bg-black/10 dark:bg-white/10 mb-12"></div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {pageContent || (
            <>
              Didirikan pada tahun 2026, Arcanum lahir dari kebutuhan untuk mengekspresikan sisi gelap, misterius, dan elegan dari gaya hidup urban. Kami menggabungkan siluet klasik dengan sentuhan avant-garde, menciptakan pakaian yang tidak hanya dipakai, tetapi juga dirasakan.

              Setiap jahitan, setiap potongan kain, dan setiap desain grafis dirancang dengan presisi yang obsesif di studio kami di Jakarta. Kami menolak produksi massal yang mengorbankan kualitas demi kuantitas. Sebaliknya, kami merilis setiap koleksi dalam jumlah terbatas untuk memastikan eksklusivitas.
            </>
          )}
        </div>

        <div className="h-px bg-black/10 dark:bg-white/10 mt-16 mb-10"></div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/products" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center text-sm">
            Koleksi Kami
          </Link>
          <Link to="/careers" className="border border-black/20 dark:border-white/20 text-black dark:text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:border-black dark:hover:border-white transition-colors text-center text-sm">
            Karir di Arcanum
          </Link>
        </div>
      </div>
    </div>
  );
}
