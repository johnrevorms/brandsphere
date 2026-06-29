import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';

export default function Profile() {
  const { showToast } = useToast();
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [provinceId, setProvinceId] = useState('');
  const [cityId, setCityId] = useState('');

  // Shipping states
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setName(user.name || '');
    setPhone(user.phone || '');
    setAddress(user.address || '');
    setProvinceId(user.province_id || '');
    setCityId(user.city_id || '');
  }, [user, navigate]);

  useEffect(() => {
    api.get('/shipping/provinces').then(res => setProvinces(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    if (provinceId) {
      api.get(`/shipping/cities/${provinceId}`).then(res => {
        setCities(res.data);
      }).catch(console.error);
    } else {
      setCities([]);
    }
  }, [provinceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    try {
      await api.put('/user', {
        name,
        phone,
        address,
        province_id: provinceId,
        city_id: cityId
      });
      await checkAuth();
      setSuccessMsg('Profil berhasil diperbarui.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (e) {
      console.error(e);
      showToast('Gagal memperbarui profil.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        
        <h1 className="text-3xl md:text-5xl font-light tracking-[0.15em] uppercase mb-4 text-center">
          <span className="font-bold italic">Profil Saya</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-16 italic text-sm tracking-widest">
          Kelola informasi akun dan alamat pengiriman Anda.
        </p>

        {successMsg && (
          <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-xl mb-8 text-sm text-center font-bold tracking-widest uppercase">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white/[0.02] backdrop-blur-xl border border-black/10 dark:border-white/10 p-8 md:p-12 space-y-8 rounded-3xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-mono text-black dark:text-white/70 tracking-widest uppercase mb-3">Nama Lengkap</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-transparent border-b border-white/30 pb-2 text-sm text-black dark:text-white focus:outline-none focus:border-white transition-colors placeholder-white/40"
                placeholder="Nama Anda"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-black dark:text-white/70 tracking-widest uppercase mb-3">Nomor Telepon</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-transparent border-b border-white/30 pb-2 text-sm text-black dark:text-white focus:outline-none focus:border-white transition-colors placeholder-white/40"
                placeholder="081234567890"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-mono text-black dark:text-white/70 tracking-widest uppercase mb-3">Email (Tidak bisa diubah)</label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full bg-white/5 border-b border-black/10 dark:border-white/10 pb-2 text-sm text-black dark:text-white/50 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-black/10 dark:border-white/10">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-black dark:text-white/70 mb-6">Info Pengiriman Default</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono text-black dark:text-white/70 tracking-widest uppercase mb-3">Alamat Lengkap</label>
                <textarea
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full bg-transparent border-b border-white/30 pb-2 text-sm text-black dark:text-white focus:outline-none focus:border-white transition-colors resize-none h-20 placeholder-white/40"
                  placeholder="Nama Jalan, RT/RW, Kelurahan, Kecamatan..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-mono text-black dark:text-white/70 tracking-widest uppercase mb-3">Provinsi</label>
                  <select
                    value={provinceId}
                    onChange={e => {
                      setProvinceId(e.target.value);
                      setCityId(''); // reset city when province changes
                    }}
                    className="w-full bg-transparent border-b border-white/30 pb-2 text-sm text-black dark:text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-white dark:bg-black text-gray-600 dark:text-gray-400">Pilih Provinsi</option>
                    {provinces.map(p => (
                      <option key={p.province_id} value={p.province_id} className="bg-white dark:bg-black text-black dark:text-white">{p.province}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-black dark:text-white/70 tracking-widest uppercase mb-3">Kota/Kabupaten</label>
                  <select
                    value={cityId}
                    onChange={e => setCityId(e.target.value)}
                    disabled={!provinceId}
                    className="w-full bg-transparent border-b border-white/30 pb-2 text-sm text-black dark:text-white focus:outline-none focus:border-white transition-colors disabled:opacity-30 cursor-pointer"
                  >
                    <option value="" className="bg-white dark:bg-black text-gray-600 dark:text-gray-400">Pilih Kota</option>
                    {cities.map(c => (
                      <option key={c.city_id} value={c.city_id} className="bg-white dark:bg-black text-black dark:text-white">{c.type} {c.city_name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold italic py-4 rounded-xl uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
