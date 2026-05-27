import DashboardLayout from '../../components/DashboardLayout';
import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeProducts: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          api.get('/orders'),
          api.get('/products')
        ]);

        const orders = ordersRes.data;
        const products = productsRes.data;

        // Compute stats
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0);
        const activeProducts = products.filter(p => p.stock_status === 'In Stock').length;

        setStats({ totalOrders, totalRevenue, activeProducts });
        setRecentOrders(orders.slice(0, 5)); // top 5 recent
      } catch (e) {
        console.error(e);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout role="admin">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold italic tracking-wider">Ikhtisar Admin</h1>
          <p className="text-gray-400 mt-2">Selamat datang kembali. Berikut adalah ringkasan toko hari ini.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 border border-white/10 p-6 rounded-3xl">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Total Pesanan</h3>
          <p className="text-4xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-gray-900 border border-white/10 p-6 rounded-3xl">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Total Pendapatan</h3>
          <p className="text-4xl font-bold">Rp {stats.totalRevenue.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-gray-900 border border-white/10 p-6 rounded-3xl">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Produk Aktif</h3>
          <p className="text-4xl font-bold">{stats.activeProducts}</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-white/10 rounded-3xl p-8">
        <h2 className="text-xl font-bold italic mb-6">Pesanan Terbaru</h2>
        {recentOrders.length === 0 ? (
          <div className="flex items-center justify-center h-48 border-2 border-dashed border-white/10 rounded-xl">
            <p className="text-gray-500 italic">Belum ada pesanan masuk.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-sm text-gray-400">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Pelanggan</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 font-mono">#ARC-{order.id.toString().padStart(5, '0')}</td>
                    <td className="py-4">{order.user?.name}</td>
                    <td className="py-4 text-xs font-bold uppercase tracking-widest">{order.status}</td>
                    <td className="py-4 text-right font-mono">Rp {order.total_price.toLocaleString('id-ID')}</td>
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
