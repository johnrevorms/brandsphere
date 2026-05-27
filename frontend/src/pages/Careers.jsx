import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({});

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

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white max-w-4xl mx-auto px-4 py-24 flex flex-col items-center">
      
      {/* Header Image / Graphic */}
      {settings.mascot_image ? (
        <div 
          className="w-64 h-80 mb-8 flex items-center justify-center bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(http://localhost:8000/storage/${settings.mascot_image})` }}
        >
        </div>
      ) : (
        <div className="w-64 h-80 mb-8 bg-white/5 flex items-center justify-center rounded-2xl text-black dark:text-white/20 italic font-mono uppercase tracking-widest text-xs">
          No Mascot Image
        </div>
      )}

      <h1 className="text-4xl md:text-5xl italic font-bold tracking-widest uppercase mb-4 text-center">Arcanum <span className="text-gray-600 dark:text-gray-500">Careers</span></h1>
      <p className="text-xl italic text-gray-600 dark:text-gray-400 mb-16 text-center max-w-lg">Built for those who move with purpose and craft with passion.</p>

      <div className="w-full flex flex-col gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-900/50 border border-black/10 dark:border-white/10 rounded-[32px] p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 animate-pulse">
              <div className="w-full">
                <div className="h-8 bg-white/10 rounded w-1/2 mb-4"></div>
                <div className="flex gap-3">
                  <div className="h-6 w-20 bg-white/10 rounded-full"></div>
                  <div className="h-6 w-20 bg-white/10 rounded-full"></div>
                  <div className="h-6 w-20 bg-white/10 rounded-full"></div>
                </div>
              </div>
              <div className="h-12 w-40 bg-white/10 rounded-full"></div>
            </div>
          ))
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-500 border border-black/10 dark:border-white/10 rounded-[32px] italic">
            Belum ada posisi yang dibuka saat ini.
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="bg-gray-50 dark:bg-gray-900/50 border border-black/10 dark:border-white/10 hover:border-white/40 transition-colors duration-300 rounded-[32px] p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group">
              <div>
                <h2 className="text-2xl md:text-3xl italic font-bold mb-4 tracking-wide">{job.position}</h2>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white/5 border border-black/20 dark:border-white/20 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    {job.type}
                  </span>
                  <span className="bg-white/5 border border-black/20 dark:border-white/20 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    {job.location}
                  </span>
                  <span className="bg-white/5 border border-black/20 dark:border-white/20 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    {job.city}
                  </span>
                </div>
              </div>
              
              <Link to={`/careers/${job.id}`} className="bg-white text-black hover:bg-gray-300 transition-colors px-10 py-3 rounded-full italic font-bold text-lg whitespace-nowrap group-hover:scale-105 transform duration-300">
                Lihat Detail
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
