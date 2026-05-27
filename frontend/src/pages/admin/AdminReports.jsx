import DashboardLayout from '../../components/DashboardLayout';
import { Download, FileText, Table } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function AdminReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        const orders = res.data;

        // Aggregate by date
        const grouped = orders.reduce((acc, order) => {
          const date = new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
          if (!acc[date]) {
            acc[date] = { date, orderCount: 0, itemCount: 0, revenue: 0 };
          }
          acc[date].orderCount += 1;
          const itemsCount = order.items ? order.items.reduce((s, i) => s + i.quantity, 0) : 0;
          acc[date].itemCount += itemsCount;
          acc[date].revenue += order.total_price;
          return acc;
        }, {});

        setReports(Object.values(grouped));
      } catch (e) {
        console.error(e);
      }
    };
    fetchOrders();
  }, []);

  return (
    <DashboardLayout role="admin">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold italic tracking-wider">Laporan Penjualan</h1>
          <p className="text-gray-400 mt-2">Unduh laporan transaksi dan analitik penjualan.</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-white/10 rounded-3xl p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-xl font-bold italic mb-2">Ekspor Laporan</h2>
          <div className="flex items-center gap-4 text-gray-400">
            <p className="text-sm">Unduh laporan dalam format PDF berdesain profesional atau Excel.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <button 
            onClick={() => {
              const doc = new jsPDF();
              
              doc.setFontSize(22);
              doc.setTextColor(20, 20, 20);
              doc.text("ARCANUM", 14, 22);

              doc.setFontSize(12);
              doc.setTextColor(100);
              doc.text("Laporan Penjualan Historis", 14, 30);
              doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}`, 14, 36);

              const tableColumn = ["Tanggal", "Total Transaksi", "Barang Terjual", "Pendapatan"];
              const tableRows = [];

              reports.forEach(report => {
                tableRows.push([
                  report.date,
                  `${report.orderCount} Order`,
                  `${report.itemCount} Item`,
                  `Rp ${report.revenue.toLocaleString('id-ID')}`
                ]);
              });

              autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 45,
                theme: 'grid',
                headStyles: { fillColor: [15, 15, 15], textColor: [255, 255, 255] },
                styles: { fontSize: 10, cellPadding: 6 },
                alternateRowStyles: { fillColor: [245, 245, 245] },
              });

              doc.save("Laporan_Penjualan_Arcanum.pdf");
            }}
            className="bg-white text-black font-bold italic px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition"
          >
            <FileText className="w-5 h-5" /> Export PDF
          </button>
          
          <button 
            onClick={() => {
              const excelData = reports.map(r => ({
                "Tanggal": r.date,
                "Total Transaksi": r.orderCount,
                "Barang Terjual": r.itemCount,
                "Pendapatan (IDR)": r.revenue
              }));

              const worksheet = XLSX.utils.json_to_sheet(excelData);
              worksheet['!cols'] = [{wch: 20}, {wch: 15}, {wch: 15}, {wch: 25}];
              
              const workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Penjualan");

              XLSX.writeFile(workbook, "Laporan_Penjualan_Arcanum.xlsx");
            }}
            className="bg-gray-800 text-white font-bold italic px-6 py-3 rounded-xl border border-white/20 flex items-center justify-center gap-2 hover:bg-gray-700 transition"
          >
            <Table className="w-5 h-5" /> Export Excel
          </button>
        </div>
      </div>

      <div className="bg-gray-900 border border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/50 border-b border-white/10">
            <tr>
              <th className="p-4 font-semibold text-gray-400">Tanggal</th>
              <th className="p-4 font-semibold text-gray-400">Total Transaksi</th>
              <th className="p-4 font-semibold text-gray-400">Barang Terjual</th>
              <th className="p-4 font-semibold text-gray-400 text-right">Pendapatan</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition">
                <td className="p-4 font-bold">{report.date}</td>
                <td className="p-4">{report.orderCount} Order</td>
                <td className="p-4">{report.itemCount} Item</td>
                <td className="p-4 text-right font-mono text-green-400">+ Rp {report.revenue.toLocaleString('id-ID')}</td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500 italic">Belum ada data penjualan tersedia.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
