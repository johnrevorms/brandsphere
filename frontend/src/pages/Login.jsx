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
      <div className="w-full max-w-md bg-gray-900 border border-white/10 p-8 flex flex-col gap-8 rounded-3xl relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/10 blur-[50px] rounded-full"></div>

        <div className="text-center relative z-10">
          <h1 className="text-4xl font-bold italic tracking-widest uppercase mb-2 text-white">Login</h1>
          <p className="text-gray-400">Masuk ke akun Arcanum Anda</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-lg text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wider text-gray-300">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black border border-white/20 p-4 rounded-xl text-white focus:outline-none focus:border-white transition-colors" 
              placeholder="nama@email.com" 
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wider text-gray-300">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black border border-white/20 p-4 rounded-xl text-white focus:outline-none focus:border-white transition-colors" 
              placeholder="••••••••" 
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 bg-white text-black font-bold italic py-3 rounded-xl uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Masuk Sekarang'}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Belum punya akun? <Link to="/register" className="text-white font-bold hover:underline">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}
