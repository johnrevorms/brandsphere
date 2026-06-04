import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admindashboard');
      } else if (user.role === 'cms') {
        navigate('/cmsdashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="w-full max-w-sm bg-gray-50 dark:bg-gray-900 border border-black/5 dark:border-white/10 p-6 md:p-8 flex flex-col gap-6 rounded-xl relative overflow-hidden shadow-2xl">
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/10 blur-[50px] rounded-full"></div>

        <div className="text-center relative z-10">
          <h1 className="text-2xl md:text-3xl font-black italic tracking-widest uppercase mb-2 text-black dark:text-white">Login</h1>
          <p className="text-gray-500 text-xs md:text-sm tracking-wider">Masuk ke akun Arcanum Anda</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-lg text-center text-xs md:text-sm font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-500">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white dark:bg-black border border-black/10 dark:border-white/20 py-2.5 px-4 rounded-lg text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors" 
              placeholder="nama@email.com" 
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-500">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white dark:bg-black border border-black/10 dark:border-white/20 py-2.5 px-4 rounded-lg text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors" 
              placeholder="••••••••" 
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 bg-black text-white dark:bg-white dark:text-black font-bold italic py-2.5 rounded-lg text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Masuk Sekarang'}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4 text-[11px] md:text-xs tracking-wide">
          Belum punya akun? <Link to="/register" className="text-black dark:text-white font-bold hover:underline">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}
