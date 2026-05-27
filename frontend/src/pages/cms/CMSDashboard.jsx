import DashboardLayout from '../../components/DashboardLayout';
import { Image, FileText, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function CMSDashboard() {
  const [stats, setStats] = useState({ articles: 0, careers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resArticles, resCareers] = await Promise.all([
          api.get('/articles'),
          api.get('/careers')
        ]);
        setStats({
          articles: resArticles.data.length,
          careers: resCareers.data.length
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchStats();
  }, []);

  return (
    <DashboardLayout role="cms">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold italic tracking-wider">Ikhtisar CMS</h1>
          <p className="text-gray-400 mt-2">Selamat datang di panel pengelolaan konten Arcanum.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 border border-white/10 p-6 rounded-3xl flex items-start justify-between">
          <div>
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Total Artikel</h3>
            <p className="text-4xl font-bold">{stats.articles}</p>
          </div>
          <FileText className="text-gray-600 w-8 h-8" />
        </div>
        <div className="bg-gray-900 border border-white/10 p-6 rounded-3xl flex items-start justify-between">
          <div>
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Lowongan Karir</h3>
            <p className="text-4xl font-bold">{stats.careers}</p>
          </div>
          <Users className="text-gray-600 w-8 h-8" />
        </div>
        <div className="bg-gray-900 border border-white/10 p-6 rounded-3xl flex items-start justify-between">
          <div>
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Halaman Statis</h3>
            <p className="text-4xl font-bold">3</p>
          </div>
          <Image className="text-gray-600 w-8 h-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-bold italic mb-6">Aktivitas Konten Terbaru</h2>
          <div className="flex items-center justify-center h-48 border-2 border-dashed border-white/10 rounded-xl">
            <p className="text-gray-500 italic">Data aktivitas tersinkronisasi secara real-time.</p>
          </div>
        </div>
        <div className="bg-gray-900 border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-bold italic mb-6">Pintasan Cepat</h2>
          <div className="flex flex-col gap-4">
            <Link to="/cmsdashboard/blog" className="block w-full text-left bg-black border border-white/20 hover:bg-white hover:text-black transition-colors px-6 py-4 rounded-xl font-bold italic">
              + Kelola Artikel Blog
            </Link>
            <Link to="/cmsdashboard/careers" className="block w-full text-left bg-black border border-white/20 hover:bg-white hover:text-black transition-colors px-6 py-4 rounded-xl font-bold italic">
              + Kelola Lowongan Pekerjaan
            </Link>
            <Link to="/cmsdashboard/pages" className="block w-full text-left bg-black border border-white/20 hover:bg-white hover:text-black transition-colors px-6 py-4 rounded-xl font-bold italic">
              + Perbarui Halaman Statis
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
