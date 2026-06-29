import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Trash2, Plus, LayoutList } from 'lucide-react';
import api from '../../api/axios';
import { useToast } from '../../context/ToastContext';

export default function AdminCategories() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (e) {
      console.error(e);
      showToast('Gagal memuat kategori');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      await api.post('/categories', { name: newCategory });
      showToast('Kategori berhasil ditambahkan!');
      setNewCategory('');
      fetchCategories();
    } catch (e) {
      console.error(e);
      showToast(e.response?.data?.message || 'Gagal menambahkan kategori');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm('Hapus kategori ini? Pastikan tidak ada produk yang masih menggunakannya.')) return;

    try {
      await api.delete(`/categories/${id}`);
      showToast('Kategori berhasil dihapus');
      fetchCategories();
    } catch (e) {
      console.error(e);
      showToast('Gagal menghapus kategori');
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="admin">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="admin">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-gray-500 mb-3">Manajemen Kategori</p>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tight uppercase text-black dark:text-white">Kategori Produk</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl">
            Kelola kategori produk yang akan muncul di filter halaman utama dan pilihan dropdown saat menambah produk baru.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold italic tracking-wide uppercase mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5" /> Tambah Kategori
            </h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-bold tracking-widest text-gray-500 mb-2">NAMA KATEGORI</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value.toUpperCase())}
                  placeholder="Contoh: SNEAKERS"
                  required
                  className="w-full bg-transparent border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-xs py-4 px-6 hover:opacity-80 transition-opacity"
              >
                Simpan Kategori
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-black/10 dark:border-white/10 flex items-center gap-2">
              <LayoutList className="w-5 h-5" />
              <h2 className="text-xl font-bold italic tracking-wide uppercase">Daftar Kategori</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
                  <tr>
                    <th className="p-4 font-bold tracking-widest text-xs text-gray-500 w-16">ID</th>
                    <th className="p-4 font-bold tracking-widest text-xs text-gray-500">NAMA KATEGORI</th>
                    <th className="p-4 font-bold tracking-widest text-xs text-gray-500 text-right w-24">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10 dark:divide-white/10">
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="p-8 text-center text-gray-500">
                        Belum ada kategori.
                      </td>
                    </tr>
                  ) : (
                    categories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono text-gray-500">#{cat.id}</td>
                        <td className="p-4 font-bold tracking-widest">{cat.name}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Hapus Kategori"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
