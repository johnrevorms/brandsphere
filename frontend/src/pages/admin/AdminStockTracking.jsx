import DashboardLayout from '../../components/DashboardLayout';
import { useState, useEffect, Fragment } from 'react';
import { Package, Users, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../../api/axios';

export default function AdminStockTracking() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [buyers, setBuyers] = useState([]);
  const [buyerLoading, setBuyerLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data)).catch(console.error);
  }, []);

  const loadBuyers = async (productId) => {
    if (expanded === productId) {
      setExpanded(null);
      return;
    }
    setExpanded(productId);
    setBuyerLoading(true);
    setSelected(productId);
    try {
      const res = await api.get(`/products/${productId}/buyers`);
      setBuyers(prev => ({ ...prev, [productId]: res.data }));
    } catch (e) {
      console.error(e);
    } finally {
      setBuyerLoading(false);
    }
  };

  const totalStock = products.reduce((a, p) => a + (p.stock || 0), 0);
  const lowStock = products.filter(p => (p.stock || 0) <= 5).length;
  const outOfStock = products.filter(p => p.stock_status === 'Out of Stock').length;

  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold italic tracking-wider">Tracking Stok & Pembeli</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Pantau stok produk dan lihat siapa saja yang telah membeli.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold">{totalStock}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Stok Tersedia</p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <p className="text-2xl font-bold">{lowStock}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Produk Stok Rendah (≤5)</p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <p className="text-2xl font-bold">{outOfStock}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Produk Habis</p>
          </div>
        </div>
      </div>

      {/* Product Stock Table */}
      <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-black/10 dark:border-white/10">
          <h2 className="text-lg font-bold italic">Daftar Produk & Stok</h2>
          <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">Klik baris produk untuk melihat daftar pembeli</p>
        </div>
        <table className="w-full text-left">
          <thead className="bg-white dark:bg-black/50 border-b border-black/10 dark:border-white/10">
            <tr>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Produk</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Kategori</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Stok</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Status</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-right">Detail Pembeli</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <Fragment key={product.id}>
                <tr
                  className="border-b border-black/10 dark:border-white/10 hover:bg-white/5 transition cursor-pointer"
                  onClick={() => loadBuyers(product.id)}
                >
                  <td className="p-4 flex items-center gap-3">
                    {product.image_path ? (
                      <img src={`${import.meta.env.VITE_STORAGE_URL}${product.image_path}`} className="w-10 h-10 rounded object-cover" alt="" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center text-[10px] text-gray-600 dark:text-gray-500">No Img</div>
                    )}
                    <span className="font-bold italic">{product.name}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{product.category}</td>
                  <td className="p-4">
                    <span className={`text-lg font-bold ${(product.stock || 0) <= 5 ? 'text-red-400' : (product.stock || 0) <= 10 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {product.stock || 0}
                    </span>
                    <span className="text-gray-600 dark:text-gray-500 text-sm ml-1">unit</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock_status === 'In Stock' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {product.stock_status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-gray-600 dark:text-gray-400 hover:text-white transition flex items-center gap-1 ml-auto">
                      {expanded === product.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      <span className="text-xs">{expanded === product.id ? 'Tutup' : 'Lihat Pembeli'}</span>
                    </button>
                  </td>
                </tr>
                {expanded === product.id && (
                  <tr key={`buyers-${product.id}`} className="bg-white dark:bg-black/30">
                    <td colSpan="5" className="p-6">
                      {buyerLoading && selected === product.id ? (
                        <div className="flex justify-center py-4">
                          <div className="w-6 h-6 border-2 border-black/20 dark:border-white/20 border-t-white rounded-full animate-spin" />
                        </div>
                      ) : buyers[product.id]?.buyers?.length > 0 ? (
                        <div>
                          <p className="text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
                            Total Terjual: <span className="text-black dark:text-white">{buyers[product.id].total_sold} unit</span>
                          </p>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-gray-600 dark:text-gray-500 text-xs uppercase tracking-wider">
                                <th className="pb-2 text-left">Pembeli</th>
                                <th className="pb-2 text-left">Email</th>
                                <th className="pb-2 text-left">Qty</th>
                                <th className="pb-2 text-left">Size</th>
                                <th className="pb-2 text-left">Status Order</th>
                                <th className="pb-2 text-left">Tanggal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {buyers[product.id].buyers.map((b, i) => (
                                <tr key={i} className="border-t border-white/5">
                                  <td className="py-2 font-semibold text-black dark:text-white">{b.user_name}</td>
                                  <td className="py-2 text-gray-600 dark:text-gray-400">{b.user_email}</td>
                                  <td className="py-2 text-black dark:text-white">{b.quantity}</td>
                                  <td className="py-2 text-gray-600 dark:text-gray-400">{b.size || '-'}</td>
                                  <td className="py-2">
                                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-xs">{b.status}</span>
                                  </td>
                                  <td className="py-2 text-gray-600 dark:text-gray-400">{b.date}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-center text-gray-600 dark:text-gray-500 italic py-4 text-sm">Belum ada pembeli untuk produk ini.</p>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            {products.length === 0 && (
              <tr><td colSpan="5" className="p-8 text-center text-gray-600 dark:text-gray-500 italic">Belum ada produk.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
