import DashboardLayout from '../../components/DashboardLayout';
import { Save, Upload, ImageIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import api from '../../api/axios';

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
      <label className="text-sm font-semibold text-gray-400">{label}</label>
      <div
        className="relative border-2 border-dashed border-white/20 rounded-xl overflow-hidden cursor-pointer hover:border-white/50 transition group"
        style={{ minHeight: '140px' }}
        onClick={() => inputRef.current.click()}
      >
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-40 object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500 gap-2">
            <ImageIcon className="w-8 h-8" />
            <span className="text-xs">Klik untuk upload gambar</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
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

export default function CMSAbout() {
  const [aboutContent, setAboutContent] = useState('');
  const [settings, setSettings] = useState({});
  const [aboutQuote, setAboutQuote] = useState('');
  const [aboutTitle, setAboutTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await api.get('/pages');
        if (res.data && res.data['about']) {
          setAboutContent(res.data['about'].content);
        }
      } catch (e) {
        console.error(e);
      }
    };
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setSettings(res.data);
        if (res.data.about_quote) setAboutQuote(res.data.about_quote);
        if (res.data.about_title) setAboutTitle(res.data.about_title);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPage();
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save static page content
      await api.put('/pages/about', {
        content: aboutContent,
        title: 'Tentang Kami',
      });

      // Save title & quote in settings
      await api.post('/settings', { key: 'about_title', value: aboutTitle });
      await api.post('/settings', { key: 'about_quote', value: aboutQuote });

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error(e);
      alert('Gagal menyimpan perubahan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout role="cms">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold italic tracking-wider">Kelola Tentang Kami (About)</h1>
          <p className="text-gray-400 mt-2">Atur judul halaman, kutipan inspiratif, deskripsi profil, dan gambar utama.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-white text-black font-bold italic px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saved ? 'Tersimpan ✓' : saving ? 'Menyimpan...' : 'Simpan Semua'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Text Inputs */}
        <div className="lg:col-span-2 bg-gray-900 border border-white/10 rounded-3xl p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Judul Utama Halaman</label>
            <input
              type="text"
              value={aboutTitle}
              onChange={e => setAboutTitle(e.target.value)}
              placeholder="The Arcanum"
              className="bg-black border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-white transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Quote / Slogan (Besar)</label>
            <textarea
              rows={3}
              value={aboutQuote}
              onChange={e => setAboutQuote(e.target.value)}
              placeholder="More than just fabric and thread. Arcanum is the manifestation of the unknown."
              className="bg-black border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-white transition resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Deskripsi Profil Utama</label>
            <textarea
              rows={10}
              value={aboutContent}
              onChange={e => setAboutContent(e.target.value)}
              placeholder="Tulis sejarah, filosofi, dan profil brand Arcanum di sini..."
              className="bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-white resize-y transition text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Right Side: Image Upload & Preview */}
        <div className="bg-gray-900 border border-white/10 rounded-3xl p-8 flex flex-col gap-6">
          <h2 className="text-lg font-bold italic border-b border-white/10 pb-4">Media & Visual</h2>
          
          <ImageUploader
            label="Banner Utama Halaman"
            settingKey="about_image"
            currentUrl={settings.about_image ? `http://localhost:8000/storage/${settings.about_image}` : ''}
            onUploaded={(url) => setSettings({ ...settings, about_image: url.replace('http://localhost:8000/storage/', '') })}
          />

          <div className="bg-black/50 border border-white/5 rounded-xl p-4 mt-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tips Visual</h3>
            <ul className="text-xs text-gray-500 list-disc list-inside space-y-1">
              <li>Gunakan gambar lanskap (aspect ratio 16:9).</li>
              <li>Pilih foto dengan nuansa gelap/streetwear untuk menyelaraskan tema Arcanum.</li>
              <li>Ukuran rekomendasi: 1200x675px dengan format JPG/PNG berkualitas tinggi.</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
