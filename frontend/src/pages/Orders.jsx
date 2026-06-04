import { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import api from '../api/axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/user');
        setOrders(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-widest uppercase mb-8">Riwayat <span className="text-gray-600 dark:text-gray-500">Pesanan</span></h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-black/10 dark:border-white/10">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-700" />
            <h2 className="text-2xl font-bold">Belum Ada Pesanan</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Anda belum melakukan transaksi apapun.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:border-white/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 pb-4 border-b border-black/10 dark:border-white/10">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Order ID</p>
                    <p className="font-mono font-bold text-lg">#ARC-{order.id.toString().padStart(5, '0')}</p>
                  </div>
                  <div className="mt-4 sm:mt-0 text-left sm:text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                    <span className="inline-block bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mt-1">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden">
                          {item.product?.image_path && (
                            <img src={`http://localhost:8000/storage/${item.product.image_path}`} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold">{item.product?.name || 'Produk Dihapus'}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-mono">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>

                {order.tracking_number && (
                  <div className="mt-4 p-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest font-bold">No. Resi Pengiriman</p>
                      <p className="font-mono text-lg font-bold tracking-wider mt-1 text-black dark:text-white">{order.tracking_number}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest font-bold">Kurir</p>
                      <p className="font-bold text-sm uppercase mt-1 text-black dark:text-white">{order.shipping_courier} - {order.shipping_service}</p>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-400 uppercase tracking-widest text-sm font-bold">Total Pembayaran</p>
                  <p className="font-mono text-xl font-bold text-black dark:text-white">Rp {order.total_price.toLocaleString('id-ID')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
