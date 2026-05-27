import DashboardLayout from '../../components/DashboardLayout';
import { Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../api/axios';

const PAGE_SLUGS = [
  { slug: 'faq',           label: 'FAQ (Pertanyaan Umum)',        hint: 'Tampil di halaman /faq' },
  { slug: 'refund',        label: 'Kebijakan Pengembalian',       hint: 'Tampil di halaman /refund' },
  { slug: 'privacy',       label: 'Kebijakan Privasi',            hint: 'Tampil di halaman /privacy' },
  { slug: 'how-to-order',  label: 'Cara Berbelanja (How To Order)', hint: 'Tampil di halaman /how-to-order' },
  { slug: 'payment',       label: 'Konfirmasi Pembayaran',        hint: 'Tampil di halaman /payment-confirmation' },
  { slug: 'terms',         label: 'Syarat & Ketentuan (Terms)',   hint: 'Tampil di halaman /terms' },
];

const emptyPages = Object.fromEntries(PAGE_SLUGS.map(p => [p.slug, '']));

export default function CMSPages() {
  const [pages, setPages] = useState(emptyPages);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await api.get('/pages');
        const data = res.data;
        const updated = { ...emptyPages };
        for (const slug of Object.keys(updated)) {
          if (data[slug]?.content) updated[slug] = data[slug].content;
        }
        setPages(updated);
      } catch (e) { console.error(e); }
    };
    fetchPages();
  }, []);

  const handleSave = async (slug) => {
    setSaving(slug);
    try {
      await api.put(`/pages/${slug}`, {
        content: pages[slug],
        title: PAGE_SLUGS.find(p => p.slug === slug)?.label,
      });
      setSaved(slug);
      setTimeout(() => setSaved(null), 2000);
    } catch (e) {
      console.error(e);
      alert('Gagal menyimpan. Pastikan sudah login.');
    } finally {
      setSaving(null);
    }
  };

  return (
    <DashboardLayout role="cms">
      <div className="mb-8">
        <h1 className="text-3xl font-bold italic tracking-wider">Kelola Halaman Statis</h1>
        <p className="text-gray-400 mt-2">Ubah konten untuk semua halaman informasi di footer website.</p>
      </div>

      <div className="flex flex-col gap-8">
        {PAGE_SLUGS.map(({ slug, label, hint }) => (
          <div key={slug} className="bg-gray-900 border border-white/10 rounded-3xl p-8">
            <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold italic">{label}</h2>
                <p className="text-xs text-gray-500 mt-1">{hint}</p>
              </div>
              <button
                onClick={() => handleSave(slug)}
                disabled={saving === slug}
                className="bg-white text-black font-bold italic px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition disabled:opacity-50 text-sm flex-shrink-0 ml-4"
              >
                <Save className="w-4 h-4" />
                {saved === slug ? 'Tersimpan ✓' : saving === slug ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Konten Halaman</label>
              <textarea
                rows={8}
                value={pages[slug]}
                onChange={e => setPages({ ...pages, [slug]: e.target.value })}
                placeholder={`Tulis konten untuk halaman ${label}...`}
                className="bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-white resize-y transition text-sm leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
