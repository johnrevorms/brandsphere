import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function PaymentConfirmation() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/pages')
      .then(res => { if (res.data.payment?.content) setContent(res.data.payment.content); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-600 dark:text-gray-500 font-mono mb-4 text-center">— Panduan —</p>
        <h1 className="text-5xl italic font-bold mb-16 uppercase tracking-widest text-center">Payment Confirmation</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-black/20 dark:border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : content ? (
          <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-8">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">{content}</div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6">
              <h2 className="font-bold italic text-xl mb-4">Setelah Pembayaran</h2>
              <p>Setelah menyelesaikan pembayaran, berikan beberapa waktu untuk verifikasi sistem. Jika pembayaran berhasil, status pesanan Anda akan otomatis diperbarui menjadi <strong>"Diproses"</strong>.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6">
              <h2 className="font-bold italic text-xl mb-4">Jika Ada Kendala</h2>
              <p className="mb-4">Jika ada keterlambatan atau masalah konfirmasi, hubungi tim kami dengan menyertakan:</p>
              <ul className="flex flex-col gap-2 list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>ID Pesanan</li>
                <li>Bukti pembayaran (screenshot/foto)</li>
                <li>Nama lengkap dan nomor WhatsApp</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6">
              <h2 className="font-bold italic text-xl mb-4">Waktu Verifikasi</h2>
              <p>Tim kami akan memverifikasi pembayaran Anda dalam waktu 1×24 jam pada hari kerja. Terima kasih atas kepercayaan Anda kepada Arcanum.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
