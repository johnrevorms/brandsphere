import DashboardLayout from "../../components/DashboardLayout";
import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/orders/${id}/status`, { status: newStatus });
      fetchOrders();
    } catch (e) {
      console.error(e);
      alert('Gagal mengupdate status.');
    }
  };

  return (
    <DashboardLayout role="admin" title="Kelola Pesanan">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold italic tracking-wider text-black dark:text-white">Kelola Pesanan</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Pantau dan perbarui status pesanan pelanggan.</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white dark:bg-black/50 border-b border-black/10 dark:border-white/10">
            <tr>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">ID Pesanan</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Pelanggan</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Total</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Status Saat Ini</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-black/10 dark:border-white/10 hover:bg-white/5 transition-colors text-black dark:text-white">
                <td className="p-4 font-mono font-bold">#ARC-{order.id.toString().padStart(5, '0')}</td>
                <td className="p-4">
                  <p className="font-semibold">{order.user?.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{order.user?.email}</p>
                  {order.shipping_address && (
                    <div className="mt-2 text-xs text-gray-700 dark:text-gray-300">
                      <p className="font-bold border-t border-black/10 dark:border-white/10 pt-2">Pengiriman:</p>
                      <p>{order.shipping_address}</p>
                      <p className="uppercase mt-1 text-gray-600 dark:text-gray-500">{order.shipping_courier} - {order.shipping_service}</p>
                    </div>
                  )}
                  <div className="mt-2 text-xs text-gray-700 dark:text-gray-300">
                    <p className="font-bold border-t border-black/10 dark:border-white/10 pt-2">Detail Pesanan:</p>
                    <ul className="list-disc pl-4 mt-1 space-y-1">
                      {order.items?.map(item => (
                        <li key={item.id}>
                          <span className="text-black dark:text-white">{item.product?.name}</span> <br/>
                          Qty: {item.quantity} | Size: {item.size || '-'}
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
                <td className="p-4 font-mono">Rp {order.total_price.toLocaleString('id-ID')}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    order.status === 'Pending Payment' ? 'bg-gray-500/20 text-gray-600 dark:text-gray-400 border border-gray-500/30' :
                    order.status === 'Proses Packing' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    order.status === 'Sudah Dikirim' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    order.status === 'Selesai' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    'bg-white/10 text-black dark:text-white border border-black/20 dark:border-white/20'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <select 
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                    className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="Pending Payment" className="bg-white dark:bg-black">Pending Payment</option>
                    <option value="Proses Packing" className="bg-white dark:bg-black">Proses Packing</option>
                    <option value="Sudah Dikirim" className="bg-white dark:bg-black">Sudah Dikirim</option>
                    <option value="Selesai" className="bg-white dark:bg-black">Selesai</option>
                    <option value="Dibatalkan" className="bg-white dark:bg-black">Dibatalkan</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-600 dark:text-gray-500 italic">Belum ada pesanan masuk.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
