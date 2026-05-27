import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function CareerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appStatus, setAppStatus] = useState({ applied: false, status: null });
  
  // Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', coverLetter: '' });
  const [cvFile, setCvFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const res = await api.get(`/careers/${id}`);
        setCareer(res.data);
      } catch (e) {
        console.error(e);
        alert('Pekerjaan tidak ditemukan');
        navigate('/careers');
      } finally {
        setLoading(false);
      }
    };
    const fetchAppStatus = async () => {
      if (!user) return;
      try {
        const res = await api.get(`/careers/${id}/application-status`);
        setAppStatus(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCareer();
    fetchAppStatus();
  }, [id, navigate, user]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!cvFile) {
      alert('Mohon unggah CV Anda.');
      return;
    }
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('career_id', id);
      data.append('name', form.name);
      data.append('email', form.email);
      data.append('phone', form.phone);
      data.append('cv', cvFile);
      if (form.coverLetter) {
        data.append('cover_letter', form.coverLetter);
      }

      await api.post('/applications', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Lamaran Anda berhasil terkirim!');
      setShowModal(false);
      setAppStatus({ applied: true, status: 'submitted' });
    } catch (e) {
      console.error(e);
      alert('Gagal mengirim lamaran. Pastikan file berformat PDF dan ukuran maksimal 5MB.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex justify-center items-center">Loading...</div>;
  }

  if (!career) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        
        <button 
          onClick={() => navigate('/careers')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Karir
        </button>

        <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-8 mb-8">
            <div>
              <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${
                career.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {career.is_active ? 'Open Position' : 'Closed'}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold italic tracking-wider mb-4">{career.position}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{career.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{career.city} ({career.location})</span>
                </div>
              </div>
            </div>
            
            {/* Dynamic Application Action Button */}
            {!user ? (
              <Link 
                to="/login"
                className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex-shrink-0 text-center"
              >
                Login to Apply
              </Link>
            ) : appStatus.applied ? (
              appStatus.status === 'rejected' ? (
                <button 
                  disabled
                  className="bg-red-500/20 border border-red-500/40 text-red-400 px-8 py-3 rounded-full font-bold uppercase tracking-widest flex-shrink-0 cursor-not-allowed"
                >
                  Not Selected
                </button>
              ) : (
                <button 
                  disabled
                  className="bg-neutral-800 border border-black/20 dark:border-white/20 text-gray-600 dark:text-gray-400 px-8 py-3 rounded-full font-bold uppercase tracking-widest flex-shrink-0 cursor-not-allowed"
                >
                  Application Submitted
                </button>
              )
            ) : (
              <button 
                disabled={!career.is_active}
                className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                onClick={() => {
                  setForm({ name: user.name || '', email: user.email || '', phone: '', coverLetter: '' });
                  setShowModal(true);
                }}
              >
                Apply Now
              </button>
            )}
          </div>

          <div className="prose prose-invert prose-lg text-gray-700 dark:text-gray-300 max-w-none">
            <h3 className="text-xl font-bold uppercase tracking-widest text-black dark:text-white mb-6">Deskripsi Pekerjaan</h3>
            <p className="whitespace-pre-line leading-relaxed">
              {career.description || "Deskripsi lengkap belum ditambahkan oleh admin. Anda bisa menanyakan secara langsung atau apply untuk mendiskusikan peluang ini bersama tim Arcanum."}
            </p>
          </div>
          
        </div>

        {/* Modal Form Lamaran */}
        {showModal && (
          <div className="fixed inset-0 bg-white dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-black/10 dark:border-white/10 w-full max-w-lg rounded-3xl p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-2xl font-bold italic tracking-wide uppercase mb-6 text-black dark:text-white border-b border-black/10 dark:border-white/10 pb-4">
                Submit Application
              </h2>

              <form onSubmit={handleApply} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Nama Lengkap *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-xl p-3 text-black dark:text-white focus:outline-none focus:border-white text-sm transition"
                    placeholder="Contoh: John Doe"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-xl p-3 text-black dark:text-white focus:outline-none focus:border-white text-sm transition"
                    placeholder="Contoh: johndoe@gmail.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest">No. Telepon / WhatsApp *</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-xl p-3 text-black dark:text-white focus:outline-none focus:border-white text-sm transition"
                    placeholder="Contoh: 08123456789"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Unggah CV / Resume (PDF saja, Maks. 5MB) *</label>
                  <input
                    required
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setCvFile(e.target.files[0])}
                    className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-xl p-3 text-black dark:text-white focus:outline-none focus:border-white text-sm transition file:mr-4 file:py-1.5 file:px-3.5 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Cover Letter / Pesan Pengantar</label>
                  <textarea
                    rows={4}
                    value={form.coverLetter}
                    onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                    className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-xl p-3 text-black dark:text-white focus:outline-none focus:border-white text-sm transition resize-none leading-relaxed"
                    placeholder="Ceritakan singkat mengapa Anda kandidat yang tepat untuk posisi ini..."
                  />
                </div>

                <div className="flex justify-end gap-3 border-t border-black/10 dark:border-white/10 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-full border border-black/20 dark:border-white/20 text-gray-600 dark:text-gray-400 hover:text-white transition text-xs font-bold uppercase tracking-widest"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-full bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition disabled:opacity-50 text-xs"
                  >
                    {submitting ? 'Mengirim...' : 'Kirim Lamaran'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
