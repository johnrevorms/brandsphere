import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-12 px-4 flex flex-col items-center justify-center">
      <CheckCircle className="w-24 h-24 text-green-500 mb-8" />
      <h1 className="text-4xl md:text-5xl font-bold italic tracking-widest uppercase mb-4 text-center">
        Pembayaran <span className="text-gray-500">Berhasil</span>
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Terima kasih atas pesanan Anda! Pesanan Anda saat ini sedang dalam proses packing dan akan segera dikirim.
      </p>
      <div className="flex gap-4">
        <Link to="/orders" className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
          Lihat Pesanan
        </Link>
        <Link to="/products" className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          Belanja Lagi
        </Link>
      </div>
    </div>
  );
}
