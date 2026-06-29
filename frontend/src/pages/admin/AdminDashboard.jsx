import DashboardLayout from '../../components/DashboardLayout';
import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { ShoppingBag, TrendingUp, Package } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

export default function AdminDashboard() {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeProducts: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [chartData, setChartData] = useState([]);

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

        // Compute chart data (monthly revenue for current year)
        const currentYear = new Date().getFullYear();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
        
        const revenueByMonth = {};
        months.forEach(m => revenueByMonth[m] = 0);

        orders.forEach(order => {
          if (!order.created_at) return;
          try {
            const orderDate = new Date(order.created_at);
            if (orderDate.getFullYear() === currentYear) {
              const monthName = months[orderDate.getMonth()];
              if (revenueByMonth[monthName] !== undefined) {
                revenueByMonth[monthName] += order.total_price;
              }
            }
          } catch(err) {
            // ignore invalid dates
          }
        });

        const formattedChartData = months.map(month => ({
          name: month,
          Pendapatan: revenueByMonth[month]
        }));
        setChartData(formattedChartData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout role="admin">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-2">Ikhtisar Admin</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium tracking-wide">Selamat datang kembali. Berikut adalah ringkasan performa toko hari ini.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-black border border-black/10 dark:border-white/10 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">Total Pesanan</h3>
            <ShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
          </div>
          <p className="text-4xl md:text-5xl font-black italic tracking-tighter relative z-10">{stats.totalOrders}</p>
        </div>
        
        <div className="bg-white dark:bg-black border border-black/10 dark:border-white/10 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">Total Pendapatan</h3>
            <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
          </div>
          <p className="text-3xl md:text-4xl font-black italic tracking-tighter relative z-10">Rp {stats.totalRevenue.toLocaleString('id-ID')}</p>
        </div>

        <div className="bg-white dark:bg-black border border-black/10 dark:border-white/10 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">Produk Aktif</h3>
            <Package className="w-5 h-5 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
          </div>
          <p className="text-4xl md:text-5xl font-black italic tracking-tighter relative z-10">{stats.activeProducts}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm mb-10">
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest border-b-2 border-black dark:border-white pb-2 inline-block">Tren Pendapatan Bulanan</h2>
        </div>
        <div className="h-72 md:h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis 
                tick={{ fill: '#888', fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(value) => `Rp${(value / 1000)}k`} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#111' : '#fff', 
                  color: theme === 'dark' ? '#fff' : '#000', 
                  borderRadius: '8px', 
                  border: theme === 'dark' ? '1px solid #333' : '1px solid #e5e7eb' 
                }}
                itemStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
                formatter={(value) => [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan']}
              />
              <Line 
                type="monotone" 
                dataKey="Pendapatan" 
                stroke={theme === 'dark' ? '#fff' : '#000'} 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: theme === 'dark' ? '#000' : '#fff' }}
                activeDot={{ r: 6, fill: theme === 'dark' ? '#fff' : '#000' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest border-b-2 border-black dark:border-white pb-2 inline-block">Pesanan Terbaru</h2>
        </div>
        
        {recentOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-black/10 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-gray-900/50">
            <Package className="w-8 h-8 text-gray-400 mb-3 opacity-50" />
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide uppercase">Belum ada pesanan masuk</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b-2 border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  <th className="pb-4 px-2">Order ID</th>
                  <th className="pb-4 px-2">Pelanggan</th>
                  <th className="pb-4 px-2">Status</th>
                  <th className="pb-4 px-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  let statusColor = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
                  if (order.status.toLowerCase() === 'pending') statusColor = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500";
                  if (order.status.toLowerCase() === 'paid' || order.status.toLowerCase() === 'sudah dikirim' || order.status.toLowerCase() === 'selesai') statusColor = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
                  if (order.status.toLowerCase() === 'cancelled') statusColor = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";

                  return (
                    <tr key={order.id} className="border-b border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-2 font-mono text-sm font-medium">#ARC-{order.id.toString().padStart(5, '0')}</td>
                      <td className="py-4 px-2 text-sm font-medium">{order.user?.name}</td>
                      <td className="py-4 px-2">
                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right font-mono text-sm font-medium group-hover:text-black dark:group-hover:text-white text-gray-600 dark:text-gray-400 transition-colors">Rp {order.total_price.toLocaleString('id-ID')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
