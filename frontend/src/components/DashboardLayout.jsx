import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, FileText, Briefcase, Settings, ArrowLeft, LogOut, BarChart2, Info, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ children, role }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const adminNav = [
    { name: 'Dashboard', path: '/admindashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Produk', path: '/admindashboard/products', icon: <Package className="w-5 h-5" /> },
    { name: 'Pesanan', path: '/admindashboard/orders', icon: <ShoppingCart className="w-5 h-5" /> },
    { name: 'Tracking Stok', path: '/admindashboard/stock', icon: <BarChart2 className="w-5 h-5" /> },
    { name: 'Laporan', path: '/admindashboard/reports', icon: <FileText className="w-5 h-5" /> },
  ];

  const cmsNav = [
    { name: 'Dashboard', path: '/cmsdashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Beranda (Home)', path: '/cmsdashboard/home', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Blog', path: '/cmsdashboard/blog', icon: <FileText className="w-5 h-5" /> },
    { name: 'Karir', path: '/cmsdashboard/careers', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Cek Pelamar', path: '/cmsdashboard/applications', icon: <Users className="w-5 h-5" /> },
    { name: 'Tentang Kami', path: '/cmsdashboard/about', icon: <Info className="w-5 h-5" /> },
    { name: 'Halaman Statis', path: '/cmsdashboard/pages', icon: <FileText className="w-5 h-5" /> },
    { name: 'Pengaturan', path: '/cmsdashboard/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const navItems = role === 'admin' ? adminNav : cmsNav;

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 fixed left-0 top-0 bottom-0 bg-gray-900 border-r border-white/10 flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-widest uppercase mb-1">
            {role === 'admin' ? 'ADMIN PANEL' : 'CMS PANEL'}
          </h2>
          <p className="text-xs text-gray-500 italic">Arcanum Web System</p>
        </div>
        
        <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive ? 'bg-white text-black font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                {item.icon}
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold">
              {user ? user.name.charAt(0) : 'U'}
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">{user ? user.name : 'Unknown'}</p>
              <p className="text-xs text-gray-500 capitalize">{role}</p>
            </div>
          </div>
          
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-400 hover:bg-red-500/10 w-full px-4 py-2 rounded-lg transition mt-2">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 w-full px-4 py-2 rounded-lg transition mt-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Web
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
