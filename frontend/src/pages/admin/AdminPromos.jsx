import DashboardLayout from '../../components/DashboardLayout';
import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useToast } from '../../context/ToastContext';
import { Tag, Trash2, Plus, Percent } from 'lucide-react';

export default function AdminPromos() {
  const { showToast } = useToast();
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPromo, setNewPromo] = useState({ code: '', discount_percentage: '', min_quantity: '' });

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      const res = await api.get('/promos');
      setPromos(res.data);
    } catch (e) {
      console.error(e);
      showToast('Gagal memuat kode promo', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/promos', newPromo);
      setNewPromo({ code: '', discount_percentage: '', min_quantity: '' });
      fetchPromos();
      showToast('Kode promo berhasil ditambahkan!', 'success');
    } catch (e) {
      console.error(e);
      showToast(e.response?.data?.message || 'Gagal menambahkan promo', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus kode promo ini?')) return;
    try {
      await api.delete(`/promos/${id}`);
      fetchPromos();
      showToast('Kode promo dihapus', 'success');
    } catch (e) {
      console.error(e);
      showToast('Gagal menghapus promo', 'error');
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase mb-2 flex items-center gap-3">
          <Percent className="w-8 h-8" /> Manajemen Promo
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium tracking-wide">Atur kode voucher diskon untuk pembeli Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Promo Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-black/10 dark:border-white/10 pb-4 mb-6">Tambah Promo Baru</h2>
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Kode Promo (Mis: GROSIR20)</label>
                <input
                  type="text"
                  required
                  value={newPromo.code}
                  onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-black dark:focus:border-white transition-colors uppercase"
                  placeholder="KODE"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Diskon (%)</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="100"
                  value={newPromo.discount_percentage}
                  onChange={(e) => setNewPromo({ ...newPromo, discount_percentage: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  placeholder="20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Min. Jumlah Barang (Qty)</label>
                <input
                  type="number"
                  min="1"
                  value={newPromo.min_quantity}
                  onChange={(e) => setNewPromo({ ...newPromo, min_quantity: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  placeholder="1 (Default)"
                />
                <p className="text-[10px] text-gray-400 mt-1">Isi 12 untuk minimal pembelian 12 pcs (Grosir)</p>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-xs py-3 rounded-xl hover:opacity-80 transition-opacity flex items-center justify-center gap-2 mt-2"
              >
                <Plus className="w-4 h-4" /> Tambah
              </button>
            </form>
          </div>
        </div>

        {/* Promo List */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-black/10 dark:border-white/10 pb-4 mb-6">Daftar Kode Promo</h2>
            
            {loading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white mx-auto"></div>
              </div>
            ) : promos.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-black/10 dark:border-white/10 rounded-xl">
                <Percent className="w-8 h-8 text-gray-400 mx-auto mb-3 opacity-50" />
                <p className="text-gray-500 text-sm font-medium">Belum ada kode promo</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="border-b-2 border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-widest text-gray-500">
                      <th className="pb-4 px-2">Kode</th>
                      <th className="pb-4 px-2">Diskon</th>
                      <th className="pb-4 px-2">Min. Pembelian</th>
                      <th className="pb-4 px-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promos.map((promo) => (
                      <tr key={promo.id} className="border-b border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <td className="py-4 px-2">
                          <span className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-bold tracking-widest px-3 py-1 rounded-md text-sm border border-black/10 dark:border-white/10">
                            {promo.code}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-sm font-bold text-green-600 dark:text-green-400">{promo.discount_percentage}%</td>
                        <td className="py-4 px-2 text-sm font-medium">{promo.min_quantity} Pcs</td>
                        <td className="py-4 px-2 text-right">
                          <button
                            onClick={() => handleDelete(promo.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors inline-block"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
