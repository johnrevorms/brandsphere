import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useTheme } from '../context/ThemeContext';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({});
  const { theme } = useTheme();

  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true);
      try {
        const res = await api.get('/careers');
        setJobs(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
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
    fetchCareers();
    fetchSettings();
  }, []);

  const activeMascot = theme === 'light' && settings.mascot_image_dark 
    ? settings.mascot_image_dark 
    : settings.mascot_image;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-28 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-center">
        {/* Header Image / Graphic */}
        {activeMascot ? (
          <div 
            className="w-48 h-64 md:w-64 md:h-80 mb-6 md:mb-8 flex items-center justify-center bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${import.meta.env.VITE_STORAGE_URL}${activeMascot})` }}
          >
          </div>
        ) : (
          <div className="w-48 h-64 md:w-64 md:h-80 mb-6 md:mb-8 bg-gray-100 dark:bg-white/5 flex items-center justify-center rounded-xl text-gray-500 dark:text-white/20 italic font-mono uppercase tracking-widest text-[10px] md:text-xs border border-black/5 dark:border-white/5">
            No Mascot Image
          </div>
        )}

        <h1 className="text-3xl md:text-5xl font-black italic tracking-widest uppercase mb-3 md:mb-4 text-center">Arcanum <span className="text-gray-400 dark:text-gray-500">Careers</span></h1>
        <p className="text-sm md:text-xl italic text-gray-600 dark:text-gray-400 mb-12 md:mb-16 text-center max-w-lg px-4">Built for those who move with purpose and craft with passion.</p>

        <div className="w-full flex flex-col gap-4 md:gap-6">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-900/50 border border-black/5 dark:border-white/10 rounded-xl p-5 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 md:gap-6 animate-pulse">
                <div className="w-full">
                  <div className="h-6 md:h-8 bg-gray-200 dark:bg-white/10 rounded w-2/3 md:w-1/2 mb-3 md:mb-4"></div>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <div className="h-5 md:h-6 w-16 md:w-20 bg-gray-200 dark:bg-white/10 rounded-full"></div>
                    <div className="h-5 md:h-6 w-16 md:w-20 bg-gray-200 dark:bg-white/10 rounded-full"></div>
                    <div className="h-5 md:h-6 w-16 md:w-20 bg-gray-200 dark:bg-white/10 rounded-full"></div>
                  </div>
                </div>
                <div className="h-10 md:h-12 w-full sm:w-32 md:w-40 bg-gray-200 dark:bg-white/10 rounded-full mt-4 sm:mt-0"></div>
              </div>
            ))
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border border-black/10 dark:border-white/10 rounded-xl italic text-sm md:text-base">
              Belum ada posisi yang dibuka saat ini.
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="bg-gray-50 dark:bg-gray-900/50 border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/40 transition-colors duration-300 rounded-xl p-5 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 md:gap-6 group">
                <div>
                  <h2 className="text-xl md:text-3xl font-black italic mb-3 md:mb-4 tracking-wide uppercase">{job.position}</h2>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <span className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/20 rounded-full px-3 py-1 text-[9px] md:text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                      {job.type}
                    </span>
                    <span className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/20 rounded-full px-3 py-1 text-[9px] md:text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                      {job.location}
                    </span>
                    <span className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/20 rounded-full px-3 py-1 text-[9px] md:text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                      {job.city}
                    </span>
                  </div>
                </div>
                
                <Link to={`/careers/${job.id}`} className="w-full sm:w-auto bg-black text-white dark:bg-white dark:text-black text-center hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors px-6 py-2.5 md:px-10 md:py-3 rounded-full font-bold text-xs md:text-sm uppercase tracking-widest whitespace-nowrap sm:group-hover:scale-105 transform duration-300 mt-2 sm:mt-0">
                  Lihat Detail
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
