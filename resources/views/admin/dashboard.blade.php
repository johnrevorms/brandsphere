<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BrandSphere — Admin Dashboard</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #080810;
  --bg2: #0c0c14;
  --surface: #12121c;
  --surface2: #181824;
  --surface3: #1e1e2e;
  --border: rgba(255,255,255,0.06);
  --border-hi: rgba(201,162,74,0.2);
  --gold: #c9a24a;
  --gold2: #e8c97a;
  --gold-dim: rgba(201,162,74,0.1);
  --text: #e8e4dc;
  --text2: #9b96a0;
  --text3: #4a4555;
  --red: #e05555;
  --red-dim: rgba(224,85,85,0.1);
  --green: #4ecb8d;
  --green-dim: rgba(78,203,141,0.1);
  --blue: #5b8dee;
  --blue-dim: rgba(91,141,238,0.1);
  --amber: #f59e0b;
  --amber-dim: rgba(245,158,11,0.1);
  --sidebar: 260px;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Outfit', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  display: flex;
}

/* ===== SIDEBAR ===== */
.sidebar {
  width: var(--sidebar); flex-shrink: 0;
  background: var(--surface);
  border-right: 1px solid var(--border);
  min-height: 100vh;
  position: fixed; top: 0; left: 0; bottom: 0;
  display: flex; flex-direction: column;
  overflow-y: auto;
}
.sidebar-top {
  padding: 28px 24px 20px;
  border-bottom: 1px solid var(--border);
}
.sidebar-logo {
  font-family: 'Playfair Display', serif;
  font-size: 20px; font-weight: 700; color: var(--text);
  margin-bottom: 4px;
}
.sidebar-logo span { color: var(--gold); }
.sidebar-role {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 10px; font-weight: 600; letter-spacing: 1.5px;
  color: var(--gold); text-transform: uppercase;
  background: var(--gold-dim); border: 1px solid var(--border-hi);
  padding: 3px 10px; border-radius: 20px; margin-top: 6px;
}
.sidebar-nav { padding: 16px 12px; flex: 1; }
.nav-section-title {
  font-size: 9px; letter-spacing: 2px; color: var(--text3);
  text-transform: uppercase; padding: 8px 12px 6px;
  margin-top: 4px;
}
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: 8px;
  font-size: 13px; color: var(--text2);
  cursor: pointer; transition: all .2s;
  margin-bottom: 2px;
}
.nav-item:hover { background: var(--surface2); color: var(--text); }
.nav-item.active {
  background: var(--gold-dim);
  color: var(--gold);
  border: 1px solid var(--border-hi);
}
.nav-item .icon { width: 18px; text-align: center; font-size: 15px; }
.nav-item .badge {
  margin-left: auto; background: var(--gold); color: var(--bg);
  font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 10px;
}
.nav-divider { height: 1px; background: var(--border); margin: 10px 12px; }
.sidebar-bottom { padding: 16px 24px 24px; border-top: 1px solid var(--border); }
.user-info { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.user-avatar {
  width: 36px; height: 36px; border-radius: 10px;
  background: var(--gold-dim); border: 1px solid var(--border-hi);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
}
.user-name { font-size: 13px; font-weight: 500; }
.user-email { font-size: 11px; color: var(--text3); }
.btn-logout {
  display: flex; align-items: center; gap: 8px; width: 100%;
  padding: 9px 12px; border-radius: 8px;
  background: var(--red-dim); border: 1px solid rgba(224,85,85,0.15);
  color: var(--red); font-size: 12px; cursor: pointer;
  font-family: 'Outfit', sans-serif; transition: all .2s;
}
.btn-logout:hover { background: rgba(224,85,85,0.2); }

/* ===== MAIN ===== */
.main {
  margin-left: var(--sidebar); flex: 1;
  min-height: 100vh; background: var(--bg);
}

/* ===== TOPBAR ===== */
.topbar {
  height: 60px; background: rgba(8,8,16,0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px;
}
.topbar-title { font-family: 'Playfair Display', serif; font-size: 18px; }
.topbar-right { display: flex; align-items: center; gap: 14px; }
.notif-btn {
  width: 36px; height: 36px; border-radius: 9px;
  background: var(--surface); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 16px; position: relative;
  transition: border-color .2s;
}
.notif-btn:hover { border-color: var(--border-hi); }
.notif-dot { position: absolute; top: 6px; right: 6px; width: 7px; height: 7px; background: var(--red); border-radius: 50%; }
.search-bar {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 8px; padding: 8px 14px;
  font-size: 13px; color: var(--text); font-family: 'Outfit', sans-serif;
  outline: none; width: 220px; transition: border-color .2s;
}
.search-bar:focus { border-color: var(--border-hi); }
.search-bar::placeholder { color: var(--text3); }

/* ===== CONTENT ===== */
.content { padding: 28px 32px; }
.tab { display: none; }
.tab.active { display: block; }

/* ===== STATS ===== */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.stat-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 14px; padding: 20px 22px;
  transition: border-color .2s;
}
.stat-card:hover { border-color: var(--border-hi); }
.stat-icon-wrap {
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; margin-bottom: 12px;
}
.ic-gold { background: var(--gold-dim); }
.ic-green { background: var(--green-dim); }
.ic-blue { background: var(--blue-dim); }
.ic-amber { background: var(--amber-dim); }
.stat-lbl { font-size: 11px; color: var(--text2); margin-bottom: 4px; letter-spacing: 0.3px; }
.stat-val { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; margin-bottom: 4px; }
.stat-change { font-size: 11px; }
.up { color: var(--green); }
.down { color: var(--red); }

/* ===== SECTION HEADER ===== */
.sec-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.sec-head h3 { font-family: 'Playfair Display', serif; font-size: 18px; }

/* ===== TABLE ===== */
.tbl-wrap {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 14px; overflow: hidden;
}
.tbl-header {
  padding: 16px 20px; border-bottom: 1px solid var(--border);
  display: flex; justify-content: space-between; align-items: center;
}
.tbl-header h3 { font-size: 15px; font-weight: 600; }
table { width: 100%; border-collapse: collapse; }
thead tr { background: var(--bg2); }
th {
  padding: 11px 16px; text-align: left;
  font-size: 10px; font-weight: 600; letter-spacing: 1px;
  color: var(--text3); text-transform: uppercase;
}
td { padding: 13px 16px; font-size: 13px; border-bottom: 1px solid var(--border); color: var(--text2); }
tr:last-child td { border-bottom: none; }
tr:hover td { background: var(--surface2); }
.td-name { color: var(--text); font-weight: 500; }
.td-actions { display: flex; gap: 6px; }

/* ===== BADGES ===== */
.badge {
  padding: 3px 10px; border-radius: 20px;
  font-size: 11px; font-weight: 600; white-space: nowrap;
}
.b-done { background: var(--green-dim); color: var(--green); }
.b-process { background: var(--amber-dim); color: var(--amber); }
.b-ship { background: var(--blue-dim); color: var(--blue); }
.b-pending { background: var(--red-dim); color: var(--red); }
.b-draft { background: rgba(150,150,180,0.1); color: var(--text2); }
.b-active { background: var(--green-dim); color: var(--green); }

/* ===== BUTTONS ===== */
.btn {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 8px 14px; border-radius: 7px;
  font-size: 12px; font-weight: 500; cursor: pointer;
  border: none; transition: all .2s;
  font-family: 'Outfit', sans-serif;
}
.btn-gold { background: var(--gold); color: var(--bg); }
.btn-gold:hover { background: var(--gold2); }
.btn-ghost { background: transparent; color: var(--text2); border: 1px solid var(--border); }
.btn-ghost:hover { border-color: var(--border-hi); color: var(--text); }
.btn-red { background: var(--red-dim); color: var(--red); border: 1px solid rgba(224,85,85,0.2); }
.btn-green { background: var(--green-dim); color: var(--green); border: 1px solid rgba(78,203,141,0.2); }
.btn-sm { padding: 6px 12px; font-size: 11px; }
.btn-wide { width: 100%; justify-content: center; }

/* ===== CHART PLACEHOLDER ===== */
.chart-box {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 14px; padding: 20px;
}
.chart-bars {
  display: flex; align-items: flex-end; gap: 10px; height: 140px; margin-top: 16px;
}
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.bar {
  width: 100%; border-radius: 6px 6px 0 0;
  background: linear-gradient(to top, var(--gold), rgba(201,162,74,0.4));
  transition: height .3s;
}
.bar-lbl { font-size: 10px; color: var(--text3); }
.chart-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }

/* ===== FORM ===== */
.form-section {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 14px; padding: 24px;
}
.form-group { margin-bottom: 16px; }
.form-label { font-size: 11px; font-weight: 500; color: var(--text2); margin-bottom: 6px; display: block; letter-spacing: 0.3px; text-transform: uppercase; }
.form-input {
  width: 100%; padding: 10px 13px; border-radius: 7px;
  border: 1px solid var(--border); background: var(--bg2);
  color: var(--text); font-size: 13px; font-family: 'Outfit', sans-serif;
  outline: none; transition: border-color .2s;
}
.form-input:focus { border-color: var(--border-hi); }
.form-input::placeholder { color: var(--text3); }
textarea.form-input { resize: vertical; }
.form-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

/* ===== MODAL ===== */
.modal-bg {
  position: fixed; inset: 0; background: rgba(0,0,0,0.75);
  backdrop-filter: blur(8px); z-index: 1000;
  display: none; align-items: center; justify-content: center;
}
.modal-bg.show { display: flex; }
.modal-box {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 18px; padding: 32px 36px; width: 90%; max-width: 440px;
  position: relative;
}
.modal-box::before {
  content: ''; position: absolute; top: -1px; left: 40px; right: 40px;
  height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.modal-close { position: absolute; top: 14px; right: 14px; cursor: pointer; color: var(--text3); background: none; border: none; font-size: 18px; }
.modal-title { font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 18px; }

/* ===== TOAST ===== */
.toast {
  position: fixed; bottom: 24px; right: 24px; z-index: 9999;
  background: var(--surface2); color: var(--text);
  border: 1px solid var(--border-hi);
  padding: 12px 18px; border-radius: 10px;
  font-size: 13px; display: none; align-items: center; gap: 8px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
}
.toast.show { display: flex; animation: toastIn .3s ease; }
@keyframes toastIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

/* ===== QUICK ACTIONS ===== */
.quick-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
.qa-btn {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 12px; padding: 16px; cursor: pointer;
  text-align: center; transition: all .2s;
}
.qa-btn:hover { border-color: var(--border-hi); transform: translateY(-2px); }
.qa-btn .qa-icon { font-size: 24px; margin-bottom: 6px; }
.qa-btn .qa-label { font-size: 12px; color: var(--text2); }

/* === GRID LAYOUT === */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

/* === INFO CARD === */
.info-card {
  background: var(--surface2); border: 1px solid var(--border);
  border-radius: 10px; padding: 14px 16px;
}
.info-card .ic-lbl { font-size: 10px; color: var(--text3); margin-bottom: 3px; text-transform: uppercase; letter-spacing: 1px; }
.info-card .ic-val { font-size: 15px; font-weight: 500; }
</style>
</head>
<body>

<!-- ===== SIDEBAR ===== -->
<aside class="sidebar">
  <div class="sidebar-top">
    <div class="sidebar-logo">Brand<span>Sphere</span></div>
    <div class="sidebar-role">⚙️ Admin</div>
  </div>

  <nav class="sidebar-nav">
    <div class="nav-section-title">Overview</div>
    <div class="nav-item active" onclick="goTab('dashboard', this)">
      <span class="icon">📊</span> Dashboard
    </div>

    <div class="nav-section-title">E-Commerce</div>
    <div class="nav-item" onclick="goTab('products', this)">
      <span class="icon">📦</span> Produk
    </div>
    <div class="nav-item" onclick="goTab('categories', this)">
      <span class="icon">🏷</span> Kategori
    </div>
    <div class="nav-item" onclick="goTab('orders', this)">
      <span class="icon">🛒</span> Pesanan
      <span class="badge">5</span>
    </div>
    <div class="nav-item" onclick="goTab('payments', this)">
      <span class="icon">💰</span> Pembayaran
    </div>

    <div class="nav-section-title">Pengguna</div>
    <div class="nav-item" onclick="goTab('users', this)">
      <span class="icon">👥</span> Manajemen User
    </div>

    <div class="nav-section-title">Laporan</div>
    <div class="nav-item" onclick="goTab('reports', this)">
      <span class="icon">📈</span> Laporan Penjualan
    </div>

    <div class="nav-divider"></div>
    <div class="nav-section-title">Pengaturan</div>
    <div class="nav-item" onclick="goTab('settings', this)">
      <span class="icon">⚙️</span> Pengaturan Sistem
    </div>
    <div class="nav-item" onclick="window.location.href='brandsphere-user.html'">
      <span class="icon">🌐</span> Lihat Website
    </div>
  </nav>

  <div class="sidebar-bottom">
    <div class="user-info">
      <div class="user-avatar">👤</div>
      <div><div class="user-name">Admin BS</div><div class="user-email">admin@brandsphere.id</div></div>
    </div>
    <button class="btn-logout" onclick="window.location.href='brandsphere-user.html'">← Keluar</button>
  </div>
</aside>

<!-- ===== MAIN ===== -->
<div class="main">
  <header class="topbar">
    <div class="topbar-title" id="topbar-title">Dashboard</div>
    <div class="topbar-right">
      <input class="search-bar" placeholder="🔍 Cari...">
      <div class="notif-btn">🔔<div class="notif-dot"></div></div>
      <div style="font-size:12px;color:var(--text2)">Rabu, 28 Mei 2025</div>
    </div>
  </header>

  <div class="content">

    <!-- ========== DASHBOARD ========== -->
    <div class="tab active" id="tab-dashboard">
      <div class="stats-row">
        <div class="stat-card"><div class="stat-icon-wrap ic-gold">💰</div><div class="stat-lbl">Total Pendapatan</div><div class="stat-val">Rp 48,5M</div><div class="stat-change up">↑ 12% dari bulan lalu</div></div>
        <div class="stat-card"><div class="stat-icon-wrap ic-green">🛒</div><div class="stat-lbl">Pesanan Hari Ini</div><div class="stat-val">128</div><div class="stat-change up">↑ 8% dari kemarin</div></div>
        <div class="stat-card"><div class="stat-icon-wrap ic-blue">👥</div><div class="stat-lbl">Total Pengguna</div><div class="stat-val">2.140</div><div class="stat-change up">↑ 5% minggu ini</div></div>
        <div class="stat-card"><div class="stat-icon-wrap ic-amber">📦</div><div class="stat-lbl">Total Produk</div><div class="stat-val">84</div><div class="stat-change" style="color:var(--text3)">6 produk baru</div></div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <div class="qa-btn" onclick="goTab('products',null)"><div class="qa-icon">➕</div><div class="qa-label">Tambah Produk</div></div>
        <div class="qa-btn" onclick="goTab('orders',null)"><div class="qa-icon">📋</div><div class="qa-label">Lihat Pesanan</div></div>
        <div class="qa-btn" onclick="goTab('reports',null)"><div class="qa-icon">📊</div><div class="qa-label">Laporan</div></div>
        <div class="qa-btn" onclick="goTab('users',null)"><div class="qa-icon">👤</div><div class="qa-label">Kelola User</div></div>
      </div>

      <!-- Chart + Recent Orders -->
      <div class="chart-row">
        <div class="chart-box">
          <div class="sec-head"><h3>Penjualan 6 Bulan</h3><span style="font-size:12px;color:var(--text3)">2025</span></div>
          <div class="chart-bars">
            <div class="bar-col"><div class="bar" style="height:60%"></div><div class="bar-lbl">Jan</div></div>
            <div class="bar-col"><div class="bar" style="height:75%"></div><div class="bar-lbl">Feb</div></div>
            <div class="bar-col"><div class="bar" style="height:50%"></div><div class="bar-lbl">Mar</div></div>
            <div class="bar-col"><div class="bar" style="height:85%"></div><div class="bar-lbl">Apr</div></div>
            <div class="bar-col"><div class="bar" style="height:70%"></div><div class="bar-lbl">Mei</div></div>
            <div class="bar-col"><div class="bar" style="height:95%"></div><div class="bar-lbl">Jun</div></div>
          </div>
        </div>
        <div class="chart-box">
          <div class="sec-head"><h3>Status Pesanan</h3></div>
          <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:13px;color:var(--text2)">Selesai</span>
              <div style="flex:1;height:6px;background:var(--surface3);border-radius:3px;margin:0 12px"><div style="height:100%;width:65%;background:var(--green);border-radius:3px"></div></div>
              <span style="font-size:12px;color:var(--green);font-weight:600">65%</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:13px;color:var(--text2)">Dikirim</span>
              <div style="flex:1;height:6px;background:var(--surface3);border-radius:3px;margin:0 12px"><div style="height:100%;width:20%;background:var(--blue);border-radius:3px"></div></div>
              <span style="font-size:12px;color:var(--blue);font-weight:600">20%</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:13px;color:var(--text2)">Diproses</span>
              <div style="flex:1;height:6px;background:var(--surface3);border-radius:3px;margin:0 12px"><div style="height:100%;width:10%;background:var(--amber);border-radius:3px"></div></div>
              <span style="font-size:12px;color:var(--amber);font-weight:600">10%</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:13px;color:var(--text2)">Dibatalkan</span>
              <div style="flex:1;height:6px;background:var(--surface3);border-radius:3px;margin:0 12px"><div style="height:100%;width:5%;background:var(--red);border-radius:3px"></div></div>
              <span style="font-size:12px;color:var(--red);font-weight:600">5%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Orders -->
      <div class="tbl-wrap">
        <div class="tbl-header"><h3>Pesanan Terbaru</h3><button class="btn btn-ghost btn-sm" onclick="goTab('orders',null)">Lihat Semua</button></div>
        <table>
          <thead><tr><th>ID Pesanan</th><th>Pelanggan</th><th>Produk</th><th>Total</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            <tr><td>#BS-003</td><td class="td-name">Rina Ayu</td><td>Linen Shirt ×2</td><td style="color:var(--gold)">Rp 640.000</td><td><span class="badge b-process">⏳ Diproses</span></td><td><div class="td-actions"><button class="btn btn-green btn-sm">Konfirmasi</button><button class="btn btn-ghost btn-sm">Detail</button></div></td></tr>
            <tr><td>#BS-002</td><td class="td-name">Dika Pratama</td><td>Shoes, Scarf</td><td style="color:var(--gold)">Rp 1.000.000</td><td><span class="badge b-ship">🚚 Dikirim</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Lacak</button></div></td></tr>
            <tr><td>#BS-001</td><td class="td-name">Budi Santoso</td><td>Jacket, Bag</td><td style="color:var(--gold)">Rp 2.100.000</td><td><span class="badge b-done">✓ Selesai</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Detail</button></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ========== PRODUCTS ========== -->
    <div class="tab" id="tab-products">
      <div class="sec-head" style="margin-bottom:20px">
        <h3 style="font-family:'Playfair Display',serif;font-size:22px">Manajemen Produk</h3>
        <button class="btn btn-gold" onclick="openModal('Tambah Produk')">+ Tambah Produk</button>
      </div>
      <!-- Filters -->
      <div style="display:flex;gap:10px;margin-bottom:16px">
        <input class="form-input" placeholder="🔍 Cari produk..." style="width:220px">
        <select class="form-input" style="width:auto"><option>Semua Kategori</option><option>Outerwear</option><option>Accessories</option><option>Footwear</option></select>
        <select class="form-input" style="width:auto"><option>Semua Status</option><option>Aktif</option><option>Non-aktif</option><option>Stok Rendah</option></select>
      </div>
      <div class="tbl-wrap">
        <div class="tbl-header"><h3>Daftar Produk (84)</h3></div>
        <table>
          <thead><tr><th>Produk</th><th>Kategori</th><th>Harga</th><th>Stok</th><th>Terjual</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            <tr><td class="td-name">🧥 Premium Jacket</td><td>Outerwear</td><td style="color:var(--gold)">Rp 850.000</td><td>24</td><td>74 pcs</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm" onclick="openModal('Edit Produk')">Edit</button><button class="btn btn-red btn-sm">Hapus</button></div></td></tr>
            <tr><td class="td-name">👜 Signature Bag</td><td>Accessories</td><td style="color:var(--gold)">Rp 1.250.000</td><td>12</td><td>89 pcs</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm" onclick="openModal('Edit Produk')">Edit</button><button class="btn btn-red btn-sm">Hapus</button></div></td></tr>
            <tr><td class="td-name">👟 Classic Shoes</td><td>Footwear</td><td style="color:var(--gold)">Rp 650.000</td><td>38</td><td>112 pcs</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm" onclick="openModal('Edit Produk')">Edit</button><button class="btn btn-red btn-sm">Hapus</button></div></td></tr>
            <tr><td class="td-name">👕 Linen Shirt</td><td>Tops</td><td style="color:var(--gold)">Rp 320.000</td><td>5</td><td>48 pcs</td><td><span class="badge b-pending">Stok Rendah</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm" onclick="openModal('Edit Produk')">Edit</button><button class="btn btn-red btn-sm">Hapus</button></div></td></tr>
            <tr><td class="td-name">👖 Slim Trouser</td><td>Bottoms</td><td style="color:var(--gold)">Rp 480.000</td><td>20</td><td>36 pcs</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm" onclick="openModal('Edit Produk')">Edit</button><button class="btn btn-red btn-sm">Hapus</button></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ========== CATEGORIES ========== -->
    <div class="tab" id="tab-categories">
      <div class="sec-head" style="margin-bottom:20px">
        <h3 style="font-family:'Playfair Display',serif;font-size:22px">Manajemen Kategori</h3>
        <button class="btn btn-gold" onclick="openModal('Tambah Kategori')">+ Tambah Kategori</button>
      </div>
      <div class="tbl-wrap">
        <table>
          <thead><tr><th>Nama Kategori</th><th>Slug</th><th>Jumlah Produk</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            <tr><td class="td-name">Outerwear</td><td style="color:var(--text3)">outerwear</td><td>12</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Edit</button><button class="btn btn-red btn-sm">Hapus</button></div></td></tr>
            <tr><td class="td-name">Accessories</td><td style="color:var(--text3)">accessories</td><td>18</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Edit</button><button class="btn btn-red btn-sm">Hapus</button></div></td></tr>
            <tr><td class="td-name">Footwear</td><td style="color:var(--text3)">footwear</td><td>21</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Edit</button><button class="btn btn-red btn-sm">Hapus</button></div></td></tr>
            <tr><td class="td-name">Tops</td><td style="color:var(--text3)">tops</td><td>15</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Edit</button><button class="btn btn-red btn-sm">Hapus</button></div></td></tr>
            <tr><td class="td-name">Bottoms</td><td style="color:var(--text3)">bottoms</td><td>18</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Edit</button><button class="btn btn-red btn-sm">Hapus</button></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ========== ORDERS ========== -->
    <div class="tab" id="tab-orders">
      <div class="sec-head" style="margin-bottom:20px">
        <h3 style="font-family:'Playfair Display',serif;font-size:22px">Manajemen Pesanan</h3>
        <div style="display:flex;gap:10px">
          <select class="form-input" style="width:auto;font-size:12px"><option>Semua Status</option><option>Pending</option><option>Diproses</option><option>Dikirim</option><option>Selesai</option><option>Dibatalkan</option></select>
          <button class="btn btn-ghost btn-sm">⬇ Export</button>
        </div>
      </div>
      <div class="tbl-wrap">
        <table>
          <thead><tr><th>ID Pesanan</th><th>Pelanggan</th><th>Produk</th><th>Total</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            <tr><td>#BS-003</td><td class="td-name">Rina Ayu</td><td>Linen Shirt ×2</td><td style="color:var(--gold)">Rp 640.000</td><td style="color:var(--text3)">28 Mei</td><td><span class="badge b-process">⏳ Diproses</span></td><td><div class="td-actions"><button class="btn btn-green btn-sm">Konfirmasi</button><button class="btn btn-ghost btn-sm">Detail</button></div></td></tr>
            <tr><td>#BS-002</td><td class="td-name">Dika Pratama</td><td>Shoes, Scarf</td><td style="color:var(--gold)">Rp 1.000.000</td><td style="color:var(--text3)">25 Mei</td><td><span class="badge b-ship">🚚 Dikirim</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Lacak</button></div></td></tr>
            <tr><td>#BS-001</td><td class="td-name">Budi Santoso</td><td>Jacket, Bag</td><td style="color:var(--gold)">Rp 2.100.000</td><td style="color:var(--text3)">20 Mei</td><td><span class="badge b-done">✓ Selesai</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Detail</button></div></td></tr>
            <tr><td>#BS-000</td><td class="td-name">Sari Dewi</td><td>Slim Trouser</td><td style="color:var(--gold)">Rp 480.000</td><td style="color:var(--text3)">18 Mei</td><td><span class="badge b-pending">✕ Dibatalkan</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Detail</button></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ========== PAYMENTS ========== -->
    <div class="tab" id="tab-payments">
      <div class="sec-head" style="margin-bottom:20px">
        <h3 style="font-family:'Playfair Display',serif;font-size:22px">Manajemen Pembayaran</h3>
      </div>
      <div class="stats-row" style="grid-template-columns:repeat(3,1fr)">
        <div class="stat-card"><div class="stat-icon-wrap ic-green">✅</div><div class="stat-lbl">Lunas</div><div class="stat-val">Rp 41,2M</div></div>
        <div class="stat-card"><div class="stat-icon-wrap ic-amber">⏳</div><div class="stat-lbl">Menunggu Verifikasi</div><div class="stat-val">Rp 2,8M</div></div>
        <div class="stat-card"><div class="stat-icon-wrap ic-gold">💰</div><div class="stat-lbl">Total Transaksi</div><div class="stat-val">Rp 44M</div></div>
      </div>
      <div class="tbl-wrap">
        <div class="tbl-header"><h3>Daftar Transaksi</h3><button class="btn btn-ghost btn-sm">⬇ Export</button></div>
        <table>
          <thead><tr><th>ID Transaksi</th><th>Pesanan</th><th>Pelanggan</th><th>Metode</th><th>Jumlah</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            <tr><td>TRX-003</td><td>#BS-003</td><td class="td-name">Rina Ayu</td><td>GoPay</td><td style="color:var(--gold)">Rp 640.000</td><td><span class="badge b-process">⏳ Menunggu</span></td><td><div class="td-actions"><button class="btn btn-green btn-sm">Verifikasi</button></div></td></tr>
            <tr><td>TRX-002</td><td>#BS-002</td><td class="td-name">Dika Pratama</td><td>Transfer Bank</td><td style="color:var(--gold)">Rp 1.000.000</td><td><span class="badge b-done">✓ Lunas</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Detail</button></div></td></tr>
            <tr><td>TRX-001</td><td>#BS-001</td><td class="td-name">Budi Santoso</td><td>Kartu Kredit</td><td style="color:var(--gold)">Rp 2.100.000</td><td><span class="badge b-done">✓ Lunas</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Detail</button></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ========== USERS ========== -->
    <div class="tab" id="tab-users">
      <div class="sec-head" style="margin-bottom:20px">
        <h3 style="font-family:'Playfair Display',serif;font-size:22px">Manajemen Pengguna</h3>
        <button class="btn btn-gold" onclick="openModal('Tambah Pengguna')">+ Tambah User</button>
      </div>
      <div class="tbl-wrap">
        <div class="tbl-header"><h3>Semua Pengguna (2.140)</h3><input class="form-input" placeholder="🔍 Cari user..." style="width:180px"></div>
        <table>
          <thead><tr><th>Nama</th><th>Email</th><th>Role</th><th>Bergabung</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            <tr><td class="td-name">Budi Santoso</td><td style="color:var(--text3)">budi@email.com</td><td><span class="badge b-ship">User</span></td><td style="color:var(--text3)">1 Jan 2025</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Edit</button><button class="btn btn-red btn-sm">Suspend</button></div></td></tr>
            <tr><td class="td-name">Rina Ayu</td><td style="color:var(--text3)">rina@email.com</td><td><span class="badge b-ship">User</span></td><td style="color:var(--text3)">10 Mar 2025</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Edit</button><button class="btn btn-red btn-sm">Suspend</button></div></td></tr>
            <tr><td class="td-name">Sari Dewi</td><td style="color:var(--text3)">sari@email.com</td><td><span class="badge b-process">Content Manager</span></td><td style="color:var(--text3)">15 Feb 2025</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Edit</button><button class="btn btn-red btn-sm">Suspend</button></div></td></tr>
            <tr><td class="td-name">Admin BS</td><td style="color:var(--text3)">admin@brandsphere.id</td><td><span class="badge b-done">Admin</span></td><td style="color:var(--text3)">1 Jan 2025</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm">Edit</button></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ========== REPORTS ========== -->
    <div class="tab" id="tab-reports">
      <div class="sec-head" style="margin-bottom:20px">
        <h3 style="font-family:'Playfair Display',serif;font-size:22px">Laporan Penjualan</h3>
        <button class="btn btn-ghost btn-sm">⬇ Export PDF</button>
      </div>
      <div class="stats-row">
        <div class="stat-card"><div class="stat-icon-wrap ic-gold">📅</div><div class="stat-lbl">Penjualan Bulan Ini</div><div class="stat-val">Rp 12,4M</div><div class="stat-change up">↑ 18%</div></div>
        <div class="stat-card"><div class="stat-icon-wrap ic-green">🛒</div><div class="stat-lbl">Total Order</div><div class="stat-val">324</div><div class="stat-change up">↑ 9%</div></div>
        <div class="stat-card"><div class="stat-icon-wrap ic-blue">🔄</div><div class="stat-lbl">Avg Order Value</div><div class="stat-val">Rp 382K</div><div class="stat-change up">↑ 3%</div></div>
        <div class="stat-card"><div class="stat-icon-wrap ic-amber">⭐</div><div class="stat-lbl">Rating Kepuasan</div><div class="stat-val">4.8/5</div><div class="stat-change" style="color:var(--gold)">Excellent</div></div>
      </div>
      <div class="tbl-wrap">
        <div class="tbl-header"><h3>Produk Terlaris</h3></div>
        <table>
          <thead><tr><th>Produk</th><th>Kategori</th><th>Terjual</th><th>Revenue</th><th>Trend</th></tr></thead>
          <tbody>
            <tr><td class="td-name">👟 Classic Shoes</td><td>Footwear</td><td>112 pcs</td><td style="color:var(--gold)">Rp 7,3M</td><td class="up">↑ 32%</td></tr>
            <tr><td class="td-name">👜 Signature Bag</td><td>Accessories</td><td>89 pcs</td><td style="color:var(--gold)">Rp 11,1M</td><td class="up">↑ 24%</td></tr>
            <tr><td class="td-name">🧥 Premium Jacket</td><td>Outerwear</td><td>74 pcs</td><td style="color:var(--gold)">Rp 6,3M</td><td class="up">↑ 15%</td></tr>
            <tr><td class="td-name">👕 Linen Shirt</td><td>Tops</td><td>48 pcs</td><td style="color:var(--gold)">Rp 1,5M</td><td class="down">↓ 5%</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ========== SETTINGS ========== -->
    <div class="tab" id="tab-settings">
      <div style="margin-bottom:20px"><h3 style="font-family:'Playfair Display',serif;font-size:22px">Pengaturan Sistem</h3></div>
      <div class="grid-2" style="gap:20px">
        <div class="form-section">
          <h3 style="font-size:16px;font-weight:600;margin-bottom:16px">Informasi Toko</h3>
          <div class="form-group"><label class="form-label">Nama Toko</label><input class="form-input" value="BrandSphere"></div>
          <div class="form-group"><label class="form-label">Email Toko</label><input class="form-input" value="info@brandsphere.id"></div>
          <div class="form-group"><label class="form-label">Nomor WhatsApp</label><input class="form-input" value="+62 812-3456-7890"></div>
          <div class="form-group"><label class="form-label">Alamat</label><textarea class="form-input" rows="2">Jl. Digital No. 1, Jakarta Selatan</textarea></div>
          <button class="btn btn-gold" onclick="showToast('✅ Pengaturan disimpan!')">Simpan</button>
        </div>
        <div class="form-section">
          <h3 style="font-size:16px;font-weight:600;margin-bottom:16px">Pengaturan Sistem</h3>
          <div class="form-group"><label class="form-label">Mata Uang</label><select class="form-input"><option>IDR (Rupiah)</option><option>USD</option></select></div>
          <div class="form-group"><label class="form-label">Min. Order</label><input class="form-input" value="Rp 50.000"></div>
          <div class="form-group"><label class="form-label">Mode Maintenance</label>
            <select class="form-input"><option>Nonaktif</option><option>Aktif</option></select>
          </div>
          <div class="form-group"><label class="form-label">Timezone</label><input class="form-input" value="Asia/Jakarta (WIB)"></div>
          <button class="btn btn-gold" onclick="showToast('✅ Pengaturan disimpan!')">Simpan</button>
        </div>
      </div>
    </div>

  </div><!-- end .content -->
</div><!-- end .main -->

<!-- MODAL -->
<div class="modal-bg" id="modal-bg" onclick="closeModal()">
  <div class="modal-box" onclick="event.stopPropagation()">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="modal-title" id="modal-title">Form</div>
    <div class="form-group"><label class="form-label">Nama</label><input class="form-input" placeholder="..."></div>
    <div class="form-group"><label class="form-label">Kategori</label><select class="form-input"><option>Outerwear</option><option>Accessories</option><option>Footwear</option></select></div>
    <div class="form-row2"><div class="form-group"><label class="form-label">Harga</label><input class="form-input" placeholder="Rp 0"></div><div class="form-group"><label class="form-label">Stok</label><input class="form-input" placeholder="0"></div></div>
    <div class="form-group"><label class="form-label">Deskripsi</label><textarea class="form-input" rows="3" placeholder="Deskripsi produk..."></textarea></div>
    <button class="btn btn-gold btn-wide" onclick="saveModal()">Simpan →</button>
  </div>
</div>

<!-- TOAST -->
<div class="toast" id="toast">🎉 <span id="toast-txt"></span></div>

<script>
function goTab(id, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if(el) el.classList.add('active');
  const titles = {
    dashboard:'Dashboard', products:'Manajemen Produk', categories:'Kategori',
    orders:'Pesanan', payments:'Pembayaran', users:'Pengguna',
    reports:'Laporan Penjualan', settings:'Pengaturan'
  };
  document.getElementById('topbar-title').textContent = titles[id] || id;
}
function openModal(title) {
  document.getElementById('modal-title').textContent = title || 'Form';
  document.getElementById('modal-bg').classList.add('show');
}
function closeModal() { document.getElementById('modal-bg').classList.remove('show'); }
function saveModal() { closeModal(); showToast('✅ Data berhasil disimpan!'); }
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-txt').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
</script>
</body>
</html>
