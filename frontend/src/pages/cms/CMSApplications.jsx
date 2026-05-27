import DashboardLayout from '../../components/DashboardLayout';
import { Trash2, XCircle, FileText, Download, Filter, Calendar, Mail, Phone, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function CMSApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await api.get('/applications');
      setApplications(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id) => {
    if (confirm('Yakin ingin menolak pelamar ini? Pelamar akan melihat status "Not Selected"')) {
      try {
        await api.put(`/applications/${id}/status`, { status: 'rejected' });
        alert('Pelamar berhasil ditolak.');
        fetchApplications();
      } catch (e) {
        console.error(e);
        alert('Gagal menolak pelamar.');
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus lamaran ini secara permanen dari database & server? File CV juga akan terhapus.')) {
      try {
        await api.delete(`/applications/${id}`);
        alert('Data lamaran & CV berhasil dihapus sepenuhnya.');
        fetchApplications();
      } catch (e) {
        console.error(e);
        alert('Gagal menghapus lamaran.');
      }
    }
  };

  const filteredApps = applications.filter((app) => {
    if (filterStatus === 'All') return true;
    if (filterStatus === 'Submitted') return app.status === 'submitted';
    if (filterStatus === 'Rejected') return app.status === 'rejected';
    return true;
  });

  const getStatusBadge = (status) => {
    if (status === 'rejected') {
      return (
        <span className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          Not Selected
        </span>
      );
    }
    return (
      <span className="bg-green-500/10 border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
        Submitted
      </span>
    );
  };

  const formatLocalDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout role="cms">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold italic tracking-wider">Daftar Pelamar Karir</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Tinjau CV pelamar, lakukan seleksi, dan kelola database berkas pelamar.</p>
        </div>
        
        {/* Status Filters */}
        <div className="flex gap-2 bg-neutral-900 border border-white/5 p-1 rounded-xl">
          {['All', 'Submitted', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                filterStatus === status 
                  ? 'bg-white text-black' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-20 text-center text-gray-600 dark:text-gray-500 italic">Memuat pelamar...</div>
        ) : filteredApps.length === 0 ? (
          <div className="p-20 text-center text-gray-600 dark:text-gray-500">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-xl italic">Belum ada pelamar pada kategori ini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white dark:bg-black/50 border-b border-black/10 dark:border-white/10">
                <tr className="text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400">
                  <th className="p-5 font-semibold">Pelamar</th>
                  <th className="p-5 font-semibold">Posisi Dilamar</th>
                  <th className="p-5 font-semibold">Kontak</th>
                  <th className="p-5 font-semibold">CV / Resume</th>
                  <th className="p-5 font-semibold">Status</th>
                  <th className="p-5 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-white/5 transition duration-300">
                    
                    {/* Applicant Info */}
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-lg text-black dark:text-white">{app.name}</span>
                        <span className="text-xs text-gray-600 dark:text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-600" />
                          Melamar pada {formatLocalDate(app.created_at)}
                        </span>
                      </div>
                    </td>

                    {/* Dilamar Position */}
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-600 dark:text-gray-500" />
                        <span className="font-bold italic text-gray-700 dark:text-gray-300">{app.career ? app.career.position : 'Posisi Terhapus'}</span>
                      </div>
                    </td>

                    {/* Contact details */}
                    <td className="p-5">
                      <div className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300 font-mono">
                        <span className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-gray-600 dark:text-gray-500" />
                          {app.email}
                        </span>
                        <span className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-gray-600 dark:text-gray-500" />
                          {app.phone}
                        </span>
                      </div>
                    </td>

                    {/* CV Download / View */}
                    <td className="p-5">
                      <a
                        href={`http://localhost:8000/storage/${app.cv_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/5 border border-black/10 dark:border-white/10 hover:border-white/30 text-black dark:text-white px-4 py-2 rounded-xl transition hover:scale-105"
                      >
                        <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        Lihat CV
                        <Download className="w-3 h-3 text-gray-600 dark:text-gray-500" />
                      </a>
                    </td>

                    {/* Status */}
                    <td className="p-5">
                      {getStatusBadge(app.status)}
                    </td>

                    {/* Action buttons */}
                    <td className="p-5 text-right">
                      <div className="flex gap-2 justify-end">
                        {app.status === 'submitted' && (
                          <button
                            onClick={() => handleReject(app.id)}
                            className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 p-2.5 rounded-xl transition duration-300 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                            title="Tolak Pelamar"
                          >
                            <XCircle className="w-4 h-4" /> Tolak
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="bg-neutral-800 border border-white/5 hover:bg-red-600 hover:text-white p-2.5 rounded-xl transition duration-300"
                          title="Hapus Berkas & Lamaran"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
