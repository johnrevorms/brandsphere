import DashboardLayout from '../../components/DashboardLayout';
import { Save, Upload, Globe, Palette, ImageIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import api from '../../api/axios';

const API_BASE = 'http://localhost:8000/storage/';

function ImageUploadField({ label, settingKey, hint, currentValue, onSaved }) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (currentValue) {
      setPreview(currentValue.startsWith('http') ? currentValue : `${API_BASE}${currentValue}`);
    }
  }, [currentValue]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    const form = new FormData();
    form.append('key', settingKey);
    form.append('image', file);
    try {
      const res = await api.post('/settings/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onSaved && onSaved(res.data.url);
      alert(`${label} berhasil disimpan!`);
    } catch (err) {
      console.error(err);
      alert('Gagal upload. Pastikan sudah login.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">{label}</label>
      {hint && <p className="text-xs text-gray-600 dark:text-gray-500 -mt-1">{hint}</p>}
      <div
        onClick={() => inputRef.current.click()}
        className="relative border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl overflow-hidden cursor-pointer hover:border-white/50 transition group"
        style={{ minHeight: 140 }}
      >
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-36 object-contain bg-gray-200 dark:bg-gray-800" />
        ) : (
          <div className="flex flex-col items-center justify-center h-36 text-gray-600 dark:text-gray-500 gap-2">
            <ImageIcon className="w-8 h-8" />
            <span className="text-xs">Klik untuk upload gambar</span>
          </div>
        )}
        <div className="absolute inset-0 bg-white dark:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <span className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
            <Upload className="w-4 h-4" />
            {uploading ? 'Mengupload...' : 'Ganti Gambar'}
          </span>
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

export default function CMSSettings() {
  const [settings, setSettings] = useState({});
  const [form, setForm] = useState({
    site_name: 'Arcanum',
    site_tagline: 'Enter The Unknown',
    shopee_url: '',
    tiktok_url: '',
    instagram_url: '',
    whatsapp_url: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/settings');
        const s = res.data;
        setSettings(s);
        setForm(f => ({
          ...f,
          site_name: s.site_name || 'Arcanum',
          site_tagline: s.site_tagline || 'Enter The Unknown',
          shopee_url: s.shopee_url || '',
          tiktok_url: s.tiktok_url || '',
          instagram_url: s.instagram_url || '',
          whatsapp_url: s.whatsapp_url || '',
        }));
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const saveAll = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(form)) {
        await api.post('/settings', { key, value });
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

  const updateForm = (key, val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <DashboardLayout role="cms">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold italic tracking-wider">Pengaturan Identitas</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Logo, nama toko, sosial media, dan identitas merek.</p>
        </div>
        <button
          onClick={saveAll}
          disabled={saving}
          className="bg-white text-black font-bold italic px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saved ? 'Tersimpan ✓' : saving ? 'Menyimpan...' : 'Simpan Semua'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Logo & Gambar */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 flex flex-col gap-6">
          <h2 className="text-xl font-bold italic border-b border-black/10 dark:border-white/10 pb-4 flex items-center gap-2">
            <Palette className="w-5 h-5" /> Logo & Gambar Merek
          </h2>
          <ImageUploadField
            label="Logo Utama (Terang / Putih)"
            settingKey="site_logo"
            hint="Format PNG transparan. Untuk Mode Gelap."
            currentValue={settings.site_logo}
            onSaved={(url) => setSettings(s => ({ ...s, site_logo: url }))}
          />
          <ImageUploadField
            label="Logo Utama (Gelap / Hitam)"
            settingKey="site_logo_dark"
            hint="Format PNG transparan. Untuk Mode Terang."
            currentValue={settings.site_logo_dark}
            onSaved={(url) => setSettings(s => ({ ...s, site_logo_dark: url }))}
          />
          <ImageUploadField
            label="Favicon (ikon tab browser)"
            settingKey="site_favicon"
            hint="Format ICO atau PNG, ukuran 32×32 px."
            currentValue={settings.site_favicon}
            onSaved={(url) => setSettings(s => ({ ...s, site_favicon: url }))}
          />
          <ImageUploadField
            label="Maskot (Terang / Putih)"
            settingKey="mascot_image"
            hint="Format PNG transparan. Untuk Mode Gelap."
            currentValue={settings.mascot_image}
            onSaved={(url) => setSettings(s => ({ ...s, mascot_image: url }))}
          />
          <ImageUploadField
            label="Maskot (Gelap / Hitam)"
            settingKey="mascot_image_dark"
            hint="Format PNG transparan. Untuk Mode Terang."
            currentValue={settings.mascot_image_dark}
            onSaved={(url) => setSettings(s => ({ ...s, mascot_image_dark: url }))}
          />
        </div>

        {/* Identitas Toko */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 flex flex-col gap-6">
          <h2 className="text-xl font-bold italic border-b border-black/10 dark:border-white/10 pb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" /> Identitas Toko & Sosmed
          </h2>
          {[
            { key: 'site_name', label: 'Nama Toko / Brand', placeholder: 'Arcanum' },
            { key: 'site_tagline', label: 'Tagline / Slogan', placeholder: 'Enter The Unknown' },
            { key: 'shopee_url', label: 'Shopee URL', placeholder: 'https://shopee.co.id/arcanum' },
            { key: 'tiktok_url', label: 'TikTok URL', placeholder: 'https://tiktok.com/@arcanum' },
            { key: 'instagram_url', label: 'Instagram URL', placeholder: 'https://instagram.com/arcanum' },
            { key: 'whatsapp_url', label: 'WhatsApp URL / Nomor', placeholder: 'https://wa.me/6281234567890' },
          ].map(({ key, label, placeholder }) => (
            <div key={key} className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">{label}</label>
              <input
                type="text"
                value={form[key]}
                onChange={e => updateForm(key, e.target.value)}
                placeholder={placeholder}
                className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white transition"
              />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
