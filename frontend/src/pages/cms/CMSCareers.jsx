import DashboardLayout from '../../components/DashboardLayout';
import { Plus, Trash2, Edit, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useToast } from '../../context/ToastContext';

const emptyForm = { position: '', type: 'Full Time', location: 'On Site', city: '', description: '' };

export default function CMSCareers() {
  const { showToast } = useToast();
  const [careers, setCareers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchCareers(); }, []);

  const fetchCareers = async () => {
    try {
      const res = await api.get('/careers');
      setCareers(res.data);
    } catch (e) { console.error(e); }
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEdit = (career) => {
    setEditingId(career.id);
    setFormData({ 
      position: career.position, 
      type: career.type, 
      location: career.location, 
      city: career.city,
      description: career.description || ''
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/careers/${editingId}`, formData);
        showToast('Lowongan berhasil diperbarui!');
      } else {
        await api.post('/careers', formData);
        showToast('Lowongan berhasil ditambahkan!');
      }
      closeForm();
      fetchCareers();
    } catch (e) {
      console.error(e);
      showToast('Gagal menyimpan. Pastikan sudah login.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus lowongan ini?')) {
      try {
        await api.delete(`/careers/${id}`);
        fetchCareers();
      } catch (e) { console.error(e); }
    }
  };

  const inputCls = "bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white transition";

  return (
    <DashboardLayout role="cms">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold italic tracking-wider">Kelola Lowongan Karir</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Tambah, edit, dan kelola lowongan pekerjaan.</p>
        </div>
        <button onClick={openAdd} className="bg-white text-black font-bold italic px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition">
          <Plus className="w-5 h-5" /> Tambah Lowongan
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold italic">{editingId ? '✏️ Edit Lowongan' : '+ Lowongan Baru'}</h2>
            <button onClick={closeForm} className="text-gray-600 dark:text-gray-400 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Posisi Pekerjaan *</label>
              <input required type="text" value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })} placeholder="Contoh: Frontend Engineer" className={inputCls} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Kota Lokasi *</label>
              <input required type="text" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} placeholder="Contoh: Jakarta" className={inputCls} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Tipe Waktu</label>
              <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className={inputCls}>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Freelance</option>
                <option>Internship</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Tipe Lokasi</label>
              <select value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className={inputCls}>
                <option>On Site</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Deskripsi Pekerjaan *</label>
              <textarea 
                required 
                rows={6} 
                value={formData.description} 
                onChange={e => setFormData({ ...formData, description: e.target.value })} 
                placeholder="Tulis tanggung jawab, kualifikasi, dan deskripsi pekerjaan secara detail..." 
                className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-4 text-black dark:text-white focus:outline-none focus:border-white resize-y transition text-sm leading-relaxed" 
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-2">
              <button type="button" onClick={closeForm} className="px-5 py-2 rounded-lg border border-black/20 dark:border-white/20 text-gray-600 dark:text-gray-400 hover:text-white transition text-sm">Batal</button>
              <button type="submit" disabled={submitting} className="px-6 py-2 rounded-lg bg-white text-black font-bold italic hover:bg-gray-200 transition disabled:opacity-50">
                {submitting ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Lowongan'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white dark:bg-black/50 border-b border-black/10 dark:border-white/10">
            <tr>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Posisi</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Detail</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {careers.map((career) => (
              <tr key={career.id} className="border-b border-black/10 dark:border-white/10 hover:bg-white/5 transition">
                <td className="p-4 font-bold italic">{career.position}</td>
                <td className="p-4 text-sm text-gray-700 dark:text-gray-300">
                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs mr-2">{career.type}</span>
                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs mr-2">{career.location}</span>
                  <span className="text-gray-600 dark:text-gray-400">{career.city}</span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => openEdit(career)} className="p-2 hover:text-blue-400 transition" title="Edit"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(career.id)} className="p-2 hover:text-red-400 transition" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {careers.length === 0 && (
              <tr><td colSpan="3" className="p-8 text-center text-gray-600 dark:text-gray-500 italic">Belum ada lowongan.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
