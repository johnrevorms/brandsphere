import DashboardLayout from "../../components/DashboardLayout";
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X } from 'lucide-react';
import api from '../../api/axios';
import { useToast } from '../../context/ToastContext';

const emptyForm = { title: '', subtitle: '', content: '', image: null };

export default function CMSBlog() {
  const { showToast } = useToast();
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchArticles = async () => {
    try {
      const res = await api.get('/articles');
      setArticles(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchArticles(); }, []);

  const openAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEdit = (article) => {
    setEditingId(article.id);
    setFormData({ title: article.title, subtitle: article.subtitle || '', content: article.content, image: null });
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
    const data = new FormData();
    data.append('title', formData.title);
    data.append('subtitle', formData.subtitle);
    data.append('content', formData.content);
    if (formData.image) data.append('image', formData.image);

    try {
      if (editingId) {
        await api.post(`/articles/${editingId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        showToast('Artikel berhasil diperbarui!');
      } else {
        await api.post('/articles', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        showToast('Artikel berhasil dipublikasikan!');
      }
      closeForm();
      fetchArticles();
    } catch (e) {
      console.error(e);
      const serverMessage = e.response?.data?.message;
      if (serverMessage) {
        showToast('Gagal menyimpan: ' + serverMessage);
      } else {
        showToast('Gagal menyimpan artikel. Pastikan sudah login atau cek koneksi Anda.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin hapus artikel ini?')) {
      try {
        await api.delete(`/articles/${id}`);
        fetchArticles();
      } catch (e) { console.error(e); }
    }
  };

  return (
    <DashboardLayout role="cms">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold italic tracking-wider">Kelola Blog</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Tulis, edit, dan terbitkan artikel untuk pengunjung web.</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-white text-black font-bold italic px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition"
        >
          <Plus className="w-5 h-5" /> Tulis Artikel Baru
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold italic">{editingId ? '✏️ Edit Artikel' : '+ Artikel Baru'}</h2>
            <button onClick={closeForm} className="text-gray-600 dark:text-gray-400 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Judul Artikel *</label>
              <input
                type="text" required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Judul menarik artikel..."
                className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Subjudul / Ringkasan</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Deskripsi singkat artikel..."
                className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white transition"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Isi Konten *</label>
              <textarea
                required rows={10}
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                placeholder="Tulis konten artikel di sini..."
                className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white transition resize-y"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Gambar Cover {editingId && <span className="text-gray-600 dark:text-gray-500 font-normal">(biarkan kosong jika tidak diganti)</span>}
              </label>
              <input
                type="file" accept="image/*"
                onChange={e => setFormData({ ...formData, image: e.target.files[0] })}
                className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white transition"
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-2">
              <button type="button" onClick={closeForm} className="px-5 py-2 rounded-lg border border-black/20 dark:border-white/20 text-gray-600 dark:text-gray-400 hover:text-white transition text-sm">Batal</button>
              <button type="submit" disabled={submitting} className="px-6 py-2 rounded-lg bg-white text-black font-bold italic hover:bg-gray-200 transition disabled:opacity-50">
                {submitting ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Publikasikan'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white dark:bg-black/50 border-b border-black/10 dark:border-white/10">
            <tr>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Artikel</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Tanggal Publish</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-black/10 dark:border-white/10 hover:bg-white/5 transition">
                <td className="p-4 flex items-center gap-4">
                  <div className="w-16 h-12 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {article.image_path
                      ? <img src={`${import.meta.env.VITE_STORAGE_URL}${article.image_path}`} className="w-full h-full object-cover" alt="" />
                      : <span className="text-[10px] text-gray-600 dark:text-gray-500">No Img</span>}
                  </div>
                  <div>
                    <p className="font-bold italic">{article.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{article.subtitle}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-700 dark:text-gray-300">
                  {article.published_at ? new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                </td>
                <td className="p-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => openEdit(article)} className="p-2 hover:text-blue-400 transition" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(article.id)} className="p-2 hover:text-red-400 transition" title="Hapus">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr><td colSpan="3" className="p-8 text-center text-gray-600 dark:text-gray-500 italic">Belum ada artikel. Klik "Tulis Artikel Baru" untuk mulai.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
