import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setError('Password dan Konfirmasi Password tidak cocok');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/register', formData);
      login(res.data.user, res.data.access_token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal. Email mungkin sudah terdaftar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center pt-24 pb-12 px-4 bg-cover bg-center">
      <div className="absolute inset-0 bg-white dark:bg-black/80 backdrop-blur-sm"></div>
      
      <div className="bg-gray-50 dark:bg-gray-900 border border-black/5 dark:border-white/10 p-6 md:p-8 rounded-xl w-full max-w-sm relative z-10 shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-black italic tracking-widest uppercase mb-2 text-center text-black dark:text-white">Buat Akun</h2>
        <p className="text-gray-500 text-xs md:text-sm text-center mb-6 md:mb-8 italic tracking-wider">Masuk ke dalam dunia Arcanum.</p>
        
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-lg mb-5 text-xs md:text-sm font-bold text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">Nama Lengkap</label>
            <input 
              type="text" 
              required
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="bg-white dark:bg-black border border-black/10 dark:border-white/20 rounded-lg py-2.5 px-4 text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">Email</label>
            <input 
              type="email" 
              required
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="bg-white dark:bg-black border border-black/10 dark:border-white/20 rounded-lg py-2.5 px-4 text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">Password</label>
            <input 
              type="password" 
              required
              minLength="6"
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="bg-white dark:bg-black border border-black/10 dark:border-white/20 rounded-lg py-2.5 px-4 text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">Konfirmasi Password</label>
            <input 
              type="password" 
              required
              minLength="6"
              value={formData.password_confirmation} 
              onChange={e => setFormData({...formData, password_confirmation: e.target.value})}
              className="bg-white dark:bg-black border border-black/10 dark:border-white/20 rounded-lg py-2.5 px-4 text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 bg-black text-white dark:bg-white dark:text-black font-bold italic py-2.5 rounded-lg text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-5 text-[11px] md:text-xs tracking-wide">
          Sudah punya akun? <Link to="/login" className="text-black dark:text-white font-bold hover:underline">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}
