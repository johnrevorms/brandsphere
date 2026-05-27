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
    <div className="min-h-screen bg-black flex items-center justify-center p-4 bg-cover bg-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      
      <div className="bg-gray-900 border border-white/10 p-8 rounded-[32px] w-full max-w-md relative z-10 shadow-2xl">
        <h2 className="text-3xl font-bold italic tracking-widest uppercase mb-2 text-center text-white">Buat Akun</h2>
        <p className="text-gray-400 text-center mb-8 italic">Masuk ke dalam dunia Arcanum.</p>
        
        {error && <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded-xl mb-6 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Nama Lengkap</label>
            <input 
              type="text" 
              required
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="bg-black border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Email</label>
            <input 
              type="email" 
              required
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="bg-black border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Password</label>
            <input 
              type="password" 
              required
              minLength="6"
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="bg-black border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Konfirmasi Password</label>
            <input 
              type="password" 
              required
              minLength="6"
              value={formData.password_confirmation} 
              onChange={e => setFormData({...formData, password_confirmation: e.target.value})}
              className="bg-black border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 bg-white text-black font-bold italic py-3 rounded-xl uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Sudah punya akun? <Link to="/login" className="text-white font-bold hover:underline">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}
