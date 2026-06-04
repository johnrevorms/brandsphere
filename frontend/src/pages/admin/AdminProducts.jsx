import DashboardLayout from '../../components/DashboardLayout';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '', category: 'TSHIRT', price: '', stock_status: 'In Stock', stock: '0', description: ''
  });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if(confirm('Yakin ingin menghapus produk ini?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock_status: product.stock_status,
      stock: product.stock !== undefined ? String(product.stock) : '0',
      description: product.description || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('stock_status', formData.stock_status);
    data.append('stock', formData.stock || '0');
    data.append('description', formData.description);
    if (image) data.append('image', image);

    try {
      if (editingId) {
        data.append('_method', 'PUT'); // For Laravel multipart form-data PUT
        await api.post(`/products/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Produk berhasil diperbarui!');
      } else {
        await api.post('/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Produk berhasil ditambahkan!');
      }
      
      fetchProducts();
      setFormData({ name: '', category: 'TSHIRT', price: '', stock_status: 'In Stock', stock: '0', description: '' });
      setImage(null);
      setEditingId(null);
    } catch (e) {
      console.error(e);
      alert('Gagal menyimpan produk');
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold italic tracking-wider">Kelola Produk</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Tambah, ubah, atau hapus produk dari katalog toko Anda.</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-xl md:rounded-3xl p-6 md:p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold italic">{editingId ? 'Edit Produk' : 'Formulir Tambah Produk'}</h2>
          {editingId && (
            <button 
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', category: 'TSHIRT', price: '', stock_status: 'In Stock', description: '' });
              }}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-white"
            >
              Batal Edit
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Nama Produk</label>
            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="Contoh: 3rd Artikel T-Shirt" className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Kategori</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white">
              <option>TSHIRT</option>
              <option>TROUSERS</option>
              <option>JACKET</option>
              <option>ACCESORIES</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Harga (Rp)</label>
            <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} type="number" placeholder="Contoh: 250000" className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Jumlah Stok (Unit)</label>
            <input required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} type="number" min="0" placeholder="Contoh: 50" className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Status Stok</label>
            <select value={formData.stock_status} onChange={e => setFormData({...formData, stock_status: e.target.value})} className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white">
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Deskripsi Produk</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="4" placeholder="Deskripsi lengkap produk..." className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white"></textarea>
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Gambar Produk {editingId && '(Biarkan kosong jika tidak ingin mengubah)'}</label>
            <input type="file" onChange={e => setImage(e.target.files[0])} accept="image/*" className="bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-white" />
          </div>
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button type="submit" className="px-6 py-2 rounded-lg bg-white text-black hover:bg-gray-200 font-bold italic w-full sm:w-auto">
              {editingId ? 'Simpan Perubahan' : 'Simpan Produk'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-xl md:rounded-3xl overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-white dark:bg-black/50 border-b border-black/10 dark:border-white/10">
            <tr>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Produk</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Kategori</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Harga</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Stok</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Status</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-b border-black/10 dark:border-white/10 hover:bg-white/5 transition">
                <td className="p-4 flex items-center gap-4">
                  {item.image_path ? (
                    <img src={`http://localhost:8000/storage/${item.image_path}`} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center text-[10px]">No Img</div>
                  )}
                  <span className="font-bold italic">{item.name}</span>
                </td>
                <td className="p-4">{item.category}</td>
                <td className="p-4 font-mono">Rp {item.price.toLocaleString('id-ID')}</td>
                <td className="p-4">
                  <span className={`text-lg font-bold ${(item.stock || 0) === 0 ? 'text-red-400' : (item.stock || 0) <= 5 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {item.stock || 0}
                  </span>
                  <span className="text-gray-600 dark:text-gray-500 text-xs ml-1">unit</span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.stock_status === 'In Stock' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {item.stock_status}
                  </span>
                </td>
                <td className="p-4 text-right flex gap-2 justify-end">
                  <button onClick={() => handleEdit(item)} className="p-2 hover:text-blue-400 transition inline-block"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 hover:text-red-400 transition inline-block"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-600 dark:text-gray-500 italic">Belum ada produk.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
