import DashboardLayout from '../../components/DashboardLayout';
import { Save, Upload, Plus, Trash2, ImageIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import api from '../../api/axios';

const API_BASE = import.meta.env.VITE_STORAGE_URL;

function ImageUploader({ label, settingKey, currentUrl, onUploaded }) {
  const [preview, setPreview] = useState(currentUrl || null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setPreview(currentUrl || null);
  }, [currentUrl]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64data = reader.result;
        const res = await api.post('/settings/upload', {
          key: settingKey,
          image: base64data
        });
        onUploaded && onUploaded(res.data.url);
        alert(`${label} berhasil disimpan!`);
      } catch (e) {
        console.error(e);
        alert('Gagal upload gambar.');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">{label}</label>
      <div
        className="relative border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl overflow-hidden cursor-pointer hover:border-white/50 transition group"
        style={{ minHeight: '140px' }}
        onClick={() => inputRef.current.click()}
      >
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-40 object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-600 dark:text-gray-500 gap-2">
            <ImageIcon className="w-8 h-8" />
            <span className="text-xs">Klik untuk upload gambar</span>
          </div>
        )}
        <div className="absolute inset-0 bg-white dark:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
            <Upload className="w-4 h-4" />
            {uploading ? 'Mengupload...' : 'Ganti Gambar'}
          </div>
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

export default function CMSHome() {
  const [settings, setSettings] = useState({});
  const [marquee, setMarquee] = useState('ONE MORE');
  const [promos, setPromos] = useState([
    { title: 'One More Devil?', imageKey: 'promo_0_image', imageUrl: '' },
    { title: 'NEW ARRIVAL', imageKey: 'promo_1_image', imageUrl: '' },
  ]);
  const [bottomTitle, setBottomTitle] = useState('Enter\nThe Unknown');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/settings');
        const s = res.data;
        setSettings(s);
        if (s.marquee_text) setMarquee(s.marquee_text);
        if (s.bottom_title) setBottomTitle(s.bottom_title);
        // Load promo data
        const savedPromos = [];
        let i = 0;
        while (s[`promo_${i}_title`] !== undefined || i < 2) {
          savedPromos.push({
            title: s[`promo_${i}_title`] || (i === 0 ? 'One More Devil?' : 'NEW ARRIVAL'),
            imageKey: `promo_${i}_image`,
            imageUrl: s[`promo_${i}_image`] ? `${API_BASE}${s[`promo_${i}_image`]}` : '',
          });
          i++;
          if (i >= 10) break; // safety cap
        }
        if (savedPromos.length > 0) setPromos(savedPromos);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const saveTextSettings = async () => {
    setSaving(true);
    try {
      // Save marquee text
      await api.post('/settings', { key: 'marquee_text', value: marquee });
      // Save bottom title
      await api.post('/settings', { key: 'bottom_title', value: bottomTitle });
      // Save promo titles
      for (let i = 0; i < promos.length; i++) {
        await api.post('/settings', { key: `promo_${i}_title`, value: promos[i].title });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      console.error(e);
      alert('Gagal menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  const addPromo = () => {
    const newIdx = promos.length;
    setPromos([...promos, { title: 'Judul Promosi Baru', imageKey: `promo_${newIdx}_image`, imageUrl: '' }]);
  };

  const removePromo = (idx) => {
    if (promos.length <= 1) return;
    setPromos(promos.filter((_, i) => i !== idx));
  };

  const updatePromoTitle = (idx, val) => {
    const updated = [...promos];
    updated[idx].title = val;
    setPromos(updated);
  };

  return (
    <DashboardLayout role="cms">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold italic tracking-wider">Kelola Beranda</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Atur gambar banner, logo, teks berjalan, dan seksi promosi.</p>
        </div>
        <button
          onClick={saveTextSettings}
          disabled={saving}
          className="bg-white text-black font-bold italic px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saved ? 'Tersimpan ✓' : saving ? 'Menyimpan...' : 'Simpan Teks'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Logo & Hero */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 flex flex-col gap-6">
          <h2 className="text-xl font-bold italic border-b border-black/10 dark:border-white/10 pb-4">1. Logo & Hero Utama</h2>

          <ImageUploader
            label="Logo Utama (format PNG transparan)"
            settingKey="site_logo"
            currentUrl={settings.site_logo ? `${API_BASE}${settings.site_logo}` : ''}
            onUploaded={(url) => setSettings({ ...settings, site_logo: url.replace(API_BASE, '') })}
          />

          <ImageUploader
            label="Gambar Latar Hero (1920×1080)"
            settingKey="hero_image"
            currentUrl={settings.hero_image ? `${API_BASE}${settings.hero_image}` : ''}
            onUploaded={(url) => setSettings({ ...settings, hero_image: url.replace(API_BASE, '') })}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Teks Marquee (Berjalan)</label>
            <input
              type="text"
              value={marquee}
              onChange={e => setMarquee(e.target.value)}
              className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white transition"
              placeholder="Contoh: ONE MORE ·"
            />
          </div>
        </div>

        {/* Bagian Bawah */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 flex flex-col gap-6">
          <h2 className="text-xl font-bold italic border-b border-black/10 dark:border-white/10 pb-4">3. Seksi Bawah (Enter The Unknown)</h2>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Judul Besar (pisah baris dengan Enter)</label>
            <textarea
              rows={3}
              value={bottomTitle}
              onChange={e => setBottomTitle(e.target.value)}
              className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white transition resize-none"
            />
          </div>

          <ImageUploader
            label="Gambar Maskot / Ilustrasi"
            settingKey="mascot_image"
            currentUrl={settings.mascot_image ? `${API_BASE}${settings.mascot_image}` : ''}
            onUploaded={(url) => setSettings({ ...settings, mascot_image: url.replace(API_BASE, '') })}
          />
        </div>

        {/* Promosi Section */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 flex flex-col gap-6 md:col-span-2">
          <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-4">
            <h2 className="text-xl font-bold italic">2. Seksi Promosi (bisa ditambah banyak)</h2>
            <button
              onClick={addPromo}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-black dark:text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
            >
              <Plus className="w-4 h-4" /> Tambah Promosi
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promos.map((promo, idx) => (
              <div key={idx} className="bg-white dark:bg-black/30 border border-black/10 dark:border-white/10 rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Promosi #{idx + 1}</span>
                  {promos.length > 1 && (
                    <button onClick={() => removePromo(idx)} className="text-red-400 hover:text-red-300 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-600 dark:text-gray-400">Judul Promosi</label>
                  <input
                    type="text"
                    value={promo.title}
                    onChange={e => updatePromoTitle(idx, e.target.value)}
                    className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-2 text-black dark:text-white text-sm focus:outline-none focus:border-white transition"
                  />
                </div>

                <ImageUploader
                  label="Gambar Promosi"
                  settingKey={promo.imageKey}
                  currentUrl={promo.imageUrl}
                  onUploaded={(url) => {
                    const updated = [...promos];
                    updated[idx].imageUrl = url;
                    setPromos(updated);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
