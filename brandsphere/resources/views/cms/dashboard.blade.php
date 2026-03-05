<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BrandSphere — Content Manager</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #08080f;
  --bg2: #0c0c14;
  --surface: #11111a;
  --surface2: #17172a;
  --surface3: #1d1d30;
  --border: rgba(255,255,255,0.06);
  --border-hi: rgba(130,100,220,0.3);
  --violet: #8264dc;
  --violet2: #a088f0;
  --violet-dim: rgba(130,100,220,0.1);
  --gold: #c9a24a;
  --gold-dim: rgba(201,162,74,0.1);
  --text: #e8e4ee;
  --text2: #9690a8;
  --text3: #46435a;
  --red: #e05555;
  --red-dim: rgba(224,85,85,0.1);
  --green: #4ecb8d;
  --green-dim: rgba(78,203,141,0.1);
  --teal: #2dcbb0;
  --teal-dim: rgba(45,203,176,0.1);
  --amber: #f59e0b;
  --amber-dim: rgba(245,158,11,0.1);
  --sidebar: 260px;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Outfit', sans-serif;
  background: var(--bg); color: var(--text);
  min-height: 100vh; display: flex;
}

/* Ambient glow */
body::before {
  content: '';
  position: fixed; top: -30%; left: -10%;
  width: 40%; height: 60%;
  background: radial-gradient(ellipse, rgba(130,100,220,0.04) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}

/* ===== SIDEBAR ===== */
.sidebar {
  width: var(--sidebar); flex-shrink: 0;
  background: var(--surface);
  border-right: 1px solid var(--border);
  min-height: 100vh;
  position: fixed; top: 0; left: 0; bottom: 0;
  display: flex; flex-direction: column;
  overflow-y: auto; z-index: 10;
}
.sidebar-top { padding: 28px 24px 20px; border-bottom: 1px solid var(--border); }
.sidebar-logo { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.sidebar-logo span { color: var(--violet2); }
.sidebar-role {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 10px; font-weight: 600; letter-spacing: 1.5px;
  color: var(--violet2); text-transform: uppercase;
  background: var(--violet-dim); border: 1px solid var(--border-hi);
  padding: 3px 10px; border-radius: 20px; margin-top: 6px;
}
.sidebar-nav { padding: 16px 12px; flex: 1; }
.nav-section-title { font-size: 9px; letter-spacing: 2px; color: var(--text3); text-transform: uppercase; padding: 8px 12px 6px; margin-top: 4px; }
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: 8px;
  font-size: 13px; color: var(--text2);
  cursor: pointer; transition: all .2s; margin-bottom: 2px;
}
.nav-item:hover { background: var(--surface2); color: var(--text); }
.nav-item.active { background: var(--violet-dim); color: var(--violet2); border: 1px solid var(--border-hi); }
.nav-item .icon { width: 18px; text-align: center; font-size: 15px; }
.nav-item .badge { margin-left: auto; background: var(--violet); color: #fff; font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 10px; }
.nav-divider { height: 1px; background: var(--border); margin: 10px 12px; }
.sidebar-bottom { padding: 16px 24px 24px; border-top: 1px solid var(--border); }
.user-info { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.user-avatar { width: 36px; height: 36px; border-radius: 10px; background: var(--violet-dim); border: 1px solid var(--border-hi); display: flex; align-items: center; justify-content: center; font-size: 16px; }
.user-name { font-size: 13px; font-weight: 500; }
.user-email { font-size: 11px; color: var(--text3); }
.btn-logout { display: flex; align-items: center; gap: 8px; width: 100%; padding: 9px 12px; border-radius: 8px; background: var(--red-dim); border: 1px solid rgba(224,85,85,0.15); color: var(--red); font-size: 12px; cursor: pointer; font-family: 'Outfit', sans-serif; transition: all .2s; }

/* ===== MAIN ===== */
.main { margin-left: var(--sidebar); flex: 1; min-height: 100vh; background: var(--bg); position: relative; z-index: 1; }

/* ===== TOPBAR ===== */
.topbar { height: 60px; background: rgba(8,8,15,0.9); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; }
.topbar-title { font-family: 'Playfair Display', serif; font-size: 18px; }
.topbar-right { display: flex; align-items: center; gap: 14px; }
.notif-btn { width: 36px; height: 36px; border-radius: 9px; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; position: relative; }
.notif-dot { position: absolute; top: 6px; right: 6px; width: 7px; height: 7px; background: var(--violet); border-radius: 50%; }
.search-bar { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 8px 14px; font-size: 13px; color: var(--text); font-family: 'Outfit', sans-serif; outline: none; width: 220px; }
.search-bar:focus { border-color: var(--border-hi); }
.search-bar::placeholder { color: var(--text3); }

/* ===== CONTENT ===== */
.content { padding: 28px 32px; }
.tab { display: none; }
.tab.active { display: block; }

/* ===== STATS ===== */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 20px 22px; transition: border-color .2s; }
.stat-card:hover { border-color: var(--border-hi); }
.stat-icon-wrap { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 12px; }
.ic-v { background: var(--violet-dim); }
.ic-g { background: var(--green-dim); }
.ic-t { background: var(--teal-dim); }
.ic-a { background: var(--amber-dim); }
.stat-lbl { font-size: 11px; color: var(--text2); margin-bottom: 4px; }
.stat-val { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; margin-bottom: 4px; }
.stat-change { font-size: 11px; }
.up { color: var(--green); }
.neutral { color: var(--text3); }

/* ===== SECTION HEADER ===== */
.sec-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.sec-head h3 { font-family: 'Playfair Display', serif; font-size: 18px; }

/* ===== TABLE ===== */
.tbl-wrap { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
.tbl-header { padding: 16px 20px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
.tbl-header h3 { font-size: 15px; font-weight: 600; }
table { width: 100%; border-collapse: collapse; }
thead tr { background: var(--bg2); }
th { padding: 11px 16px; text-align: left; font-size: 10px; font-weight: 600; letter-spacing: 1px; color: var(--text3); text-transform: uppercase; }
td { padding: 13px 16px; font-size: 13px; border-bottom: 1px solid var(--border); color: var(--text2); }
tr:last-child td { border-bottom: none; }
tr:hover td { background: var(--surface2); }
.td-name { color: var(--text); font-weight: 500; }
.td-actions { display: flex; gap: 6px; }

/* ===== BADGES ===== */
.badge { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
.b-pub { background: var(--green-dim); color: var(--green); }
.b-draft { background: rgba(150,150,180,0.1); color: var(--text2); }
.b-review { background: var(--amber-dim); color: var(--amber); }
.b-active { background: var(--green-dim); color: var(--green); }
.b-closed { background: var(--red-dim); color: var(--red); }
.b-violet { background: var(--violet-dim); color: var(--violet2); }

/* ===== BUTTONS ===== */
.btn { display: inline-flex; align-items: center; gap: 5px; padding: 8px 14px; border-radius: 7px; font-size: 12px; font-weight: 500; cursor: pointer; border: none; transition: all .2s; font-family: 'Outfit', sans-serif; }
.btn-violet { background: var(--violet); color: #fff; }
.btn-violet:hover { background: var(--violet2); }
.btn-ghost { background: transparent; color: var(--text2); border: 1px solid var(--border); }
.btn-ghost:hover { border-color: var(--border-hi); color: var(--text); }
.btn-red { background: var(--red-dim); color: var(--red); border: 1px solid rgba(224,85,85,0.2); }
.btn-green { background: var(--green-dim); color: var(--green); border: 1px solid rgba(78,203,141,0.2); }
.btn-amber { background: var(--amber-dim); color: var(--amber); border: 1px solid rgba(245,158,11,0.2); }
.btn-sm { padding: 6px 12px; font-size: 11px; }
.btn-wide { width: 100%; justify-content: center; }

/* ===== EDITOR ===== */
.editor-layout { display: grid; grid-template-columns: 1fr 320px; gap: 20px; align-items: start; }
.editor-toolbar {
  display: flex; flex-wrap: wrap; gap: 6px;
  padding: 10px 14px;
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: 8px 8px 0 0;
}
.tb-btn { padding: 5px 10px; border-radius: 5px; background: transparent; border: 1px solid var(--border); color: var(--text2); font-size: 12px; cursor: pointer; transition: all .2s; }
.tb-btn:hover { background: var(--surface2); color: var(--text); border-color: var(--border-hi); }
.tb-btn.active-fmt { background: var(--violet-dim); color: var(--violet2); border-color: var(--border-hi); }
.editor-body {
  min-height: 300px;
  background: var(--surface); border: 1px solid var(--border);
  border-top: none; border-radius: 0 0 8px 8px;
  padding: 20px; font-size: 14px; color: var(--text2);
  line-height: 1.75; font-weight: 300;
  outline: none;
}
.editor-sidebar-box { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 18px 20px; margin-bottom: 14px; }
.editor-sidebar-box h4 { font-size: 13px; font-weight: 600; margin-bottom: 12px; }

/* ===== FORM ===== */
.form-section { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 24px; }
.form-group { margin-bottom: 16px; }
.form-label { font-size: 11px; font-weight: 500; color: var(--text2); margin-bottom: 6px; display: block; letter-spacing: 0.3px; text-transform: uppercase; }
.form-input { width: 100%; padding: 10px 13px; border-radius: 7px; border: 1px solid var(--border); background: var(--bg2); color: var(--text); font-size: 13px; font-family: 'Outfit', sans-serif; outline: none; transition: border-color .2s; }
.form-input:focus { border-color: var(--border-hi); }
.form-input::placeholder { color: var(--text3); }
textarea.form-input { resize: vertical; }
.form-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

/* ===== MODAL ===== */
.modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); z-index: 1000; display: none; align-items: center; justify-content: center; }
.modal-bg.show { display: flex; }
.modal-box { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 32px 36px; width: 90%; max-width: 560px; position: relative; max-height: 90vh; overflow-y: auto; }
.modal-box::before { content: ''; position: absolute; top: -1px; left: 40px; right: 40px; height: 1px; background: linear-gradient(90deg, transparent, var(--violet), transparent); }
.modal-close { position: absolute; top: 14px; right: 14px; cursor: pointer; color: var(--text3); background: none; border: none; font-size: 18px; }
.modal-title { font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 18px; }

/* ===== TOAST ===== */
.toast { position: fixed; bottom: 24px; right: 24px; z-index: 9999; background: var(--surface2); color: var(--text); border: 1px solid var(--border-hi); padding: 12px 18px; border-radius: 10px; font-size: 13px; display: none; align-items: center; gap: 8px; box-shadow: 0 8px 40px rgba(0,0,0,0.5); }
.toast.show { display: flex; animation: toastIn .3s ease; }
@keyframes toastIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

/* ===== CARD GRID ===== */
.card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px; }
.mini-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px; cursor: pointer; transition: all .2s; }
.mini-card:hover { border-color: var(--border-hi); transform: translateY(-2px); }
.mini-card .mc-icon { font-size: 22px; margin-bottom: 8px; }
.mini-card .mc-title { font-size: 14px; font-weight: 500; margin-bottom: 3px; }
.mini-card .mc-sub { font-size: 12px; color: var(--text3); }

/* ===== PREVIEW STRIP ===== */
.preview-strip { background: var(--surface2); border: 1px solid var(--border-hi); border-radius: 10px; padding: 14px 18px; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
.preview-strip .ps-icon { font-size: 24px; }
.preview-strip .ps-title { font-size: 14px; font-weight: 500; }
.preview-strip .ps-sub { font-size: 12px; color: var(--text3); }
.preview-strip .ps-actions { margin-left: auto; display: flex; gap: 8px; }
</style>
</head>
<body>

<!-- ===== SIDEBAR ===== -->
<aside class="sidebar">
  <div class="sidebar-top">
    <div class="sidebar-logo">Brand<span>Sphere</span></div>
    <div class="sidebar-role">✏️ Content Manager</div>
  </div>

  <nav class="sidebar-nav">
    <div class="nav-section-title">Overview</div>
    <div class="nav-item active" onclick="goTab('dashboard', this)">
      <span class="icon">🏠</span> Dashboard
    </div>

    <div class="nav-section-title">Konten Utama</div>
    <div class="nav-item" onclick="goTab('blog', this)">
      <span class="icon">📝</span> Blog / Artikel
      <span class="badge">3</span>
    </div>
    <div class="nav-item" onclick="goTab('company', this)">
      <span class="icon">🏛</span> Company Profile
    </div>
    <div class="nav-item" onclick="goTab('vision', this)">
      <span class="icon">🎯</span> Visi & Misi
    </div>
    <div class="nav-item" onclick="goTab('career', this)">
      <span class="icon">💼</span> Halaman Karir
    </div>

    <div class="nav-section-title">Media</div>
    <div class="nav-item" onclick="goTab('media', this)">
      <span class="icon">🖼</span> Perpustakaan Media
    </div>

    <div class="nav-section-title">Pengaturan</div>
    <div class="nav-item" onclick="goTab('seo', this)">
      <span class="icon">🔍</span> SEO & Meta
    </div>
    <div class="nav-divider"></div>
    <div class="nav-item" onclick="window.location.href='brandsphere-user.html'">
      <span class="icon">🌐</span> Lihat Website
    </div>
  </nav>

  <div class="sidebar-bottom">
    <div class="user-info">
      <div class="user-avatar">✏️</div>
      <div><div class="user-name">Sari Dewi</div><div class="user-email">sari@brandsphere.id</div></div>
    </div>
    <button class="btn-logout" onclick="window.location.href='brandsphere-user.html'">← Keluar</button>
  </div>
</aside>

<!-- ===== MAIN ===== -->
<div class="main">
  <header class="topbar">
    <div class="topbar-title" id="topbar-title">Dashboard Konten</div>
    <div class="topbar-right">
      <input class="search-bar" placeholder="🔍 Cari konten...">
      <div class="notif-btn">🔔<div class="notif-dot"></div></div>
      <div style="font-size:12px;color:var(--text2)">Rabu, 28 Mei 2025</div>
    </div>
  </header>

  <div class="content">

    <!-- ========== DASHBOARD ========== -->
    <div class="tab active" id="tab-dashboard">
      <div class="stats-row">
        <div class="stat-card"><div class="stat-icon-wrap ic-v">📝</div><div class="stat-lbl">Total Artikel</div><div class="stat-val">24</div><div class="stat-change up">3 artikel baru</div></div>
        <div class="stat-card"><div class="stat-icon-wrap ic-g">👁</div><div class="stat-lbl">Total Pageviews</div><div class="stat-val">12,4K</div><div class="stat-change up">↑ 22% bulan ini</div></div>
        <div class="stat-card"><div class="stat-icon-wrap ic-t">💼</div><div class="stat-lbl">Lowongan Aktif</div><div class="stat-val">4</div><div class="stat-change neutral">22 pelamar total</div></div>
        <div class="stat-card"><div class="stat-icon-wrap ic-a">📋</div><div class="stat-lbl">Draft Menunggu</div><div class="stat-val">3</div><div class="stat-change" style="color:var(--amber)">Perlu review</div></div>
      </div>

      <!-- Quick actions -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px">
        <div class="mini-card" onclick="goTab('blog',null);openModal('Tulis Artikel Baru')"><div class="mc-icon">✍️</div><div class="mc-title">Tulis Artikel</div><div class="mc-sub">Blog / Journal</div></div>
        <div class="mini-card" onclick="goTab('company',null)"><div class="mc-icon">🏛</div><div class="mc-title">Edit Profil</div><div class="mc-sub">Company Profile</div></div>
        <div class="mini-card" onclick="goTab('career',null);openModal('Tambah Lowongan')"><div class="mc-icon">💼</div><div class="mc-title">Buka Lowongan</div><div class="mc-sub">Career Page</div></div>
        <div class="mini-card" onclick="goTab('vision',null)"><div class="mc-icon">🎯</div><div class="mc-title">Edit Visi Misi</div><div class="mc-sub">About Us</div></div>
      </div>

      <!-- Recent articles + drafts -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="tbl-wrap">
          <div class="tbl-header"><h3>Artikel Terbaru</h3><button class="btn btn-ghost btn-sm" onclick="goTab('blog',null)">Semua</button></div>
          <table>
            <thead><tr><th>Judul</th><th>Status</th><th>Views</th></tr></thead>
            <tbody>
              <tr><td class="td-name" style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">5 Cara Membangun Brand Identity</td><td><span class="badge b-pub">Publik</span></td><td style="color:var(--text3)">1,240</td></tr>
              <tr><td class="td-name" style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Tren UI/UX 2025</td><td><span class="badge b-pub">Publik</span></td><td style="color:var(--text3)">980</td></tr>
              <tr><td class="td-name" style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Strategi Konversi E-Commerce</td><td><span class="badge b-draft">Draft</span></td><td style="color:var(--text3)">—</td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <div class="tbl-wrap">
            <div class="tbl-header"><h3>Status Halaman</h3></div>
            <table>
              <thead><tr><th>Halaman</th><th>Terakhir Edit</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td class="td-name">Company Profile</td><td style="color:var(--text3)">2 hari lalu</td><td><span class="badge b-pub">Live</span></td></tr>
                <tr><td class="td-name">Visi & Misi</td><td style="color:var(--text3)">1 minggu lalu</td><td><span class="badge b-pub">Live</span></td></tr>
                <tr><td class="td-name">Career Page</td><td style="color:var(--text3)">Hari ini</td><td><span class="badge b-pub">Live</span></td></tr>
                <tr><td class="td-name">Blog</td><td style="color:var(--text3)">Hari ini</td><td><span class="badge b-pub">Live</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== BLOG ========== -->
    <div class="tab" id="tab-blog">
      <div class="sec-head" style="margin-bottom:20px">
        <h3 style="font-family:'Playfair Display',serif;font-size:22px">Manajemen Blog</h3>
        <button class="btn btn-violet" onclick="openModal('Tulis Artikel Baru')">+ Artikel Baru</button>
      </div>

      <!-- Filter -->
      <div style="display:flex;gap:10px;margin-bottom:16px">
        <input class="form-input" placeholder="🔍 Cari artikel..." style="width:200px">
        <select class="form-input" style="width:auto"><option>Semua Status</option><option>Publik</option><option>Draft</option><option>Review</option></select>
        <select class="form-input" style="width:auto"><option>Semua Kategori</option><option>Branding</option><option>Design</option><option>E-Commerce</option></select>
      </div>

      <div class="tbl-wrap">
        <div class="tbl-header"><h3>Semua Artikel (24)</h3></div>
        <table>
          <thead><tr><th>Judul</th><th>Kategori</th><th>Penulis</th><th>Tanggal</th><th>Views</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            <tr><td class="td-name">5 Cara Membangun Brand Identity yang Kuat</td><td>Branding</td><td>Sari Dewi</td><td style="color:var(--text3)">20 Mei</td><td style="color:var(--text3)">1,240</td><td><span class="badge b-pub">Publik</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm" onclick="openEditor()">Edit</button><button class="btn btn-red btn-sm">Hapus</button></div></td></tr>
            <tr><td class="td-name">Tren UI/UX 2025: Minimalism Bermakna</td><td>Design</td><td>Sari Dewi</td><td style="color:var(--text3)">18 Mei</td><td style="color:var(--text3)">980</td><td><span class="badge b-pub">Publik</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm" onclick="openEditor()">Edit</button><button class="btn btn-red btn-sm">Hapus</button></div></td></tr>
            <tr><td class="td-name">Strategi Konversi: Pengunjung Jadi Pembeli</td><td>E-Commerce</td><td>Sari Dewi</td><td style="color:var(--text3)">15 Mei</td><td style="color:var(--text3)">—</td><td><span class="badge b-draft">Draft</span></td><td><div class="td-actions"><button class="btn btn-amber btn-sm">Publish</button><button class="btn btn-ghost btn-sm" onclick="openEditor()">Edit</button></div></td></tr>
            <tr><td class="td-name">Memilih Platform E-Commerce Terbaik 2025</td><td>E-Commerce</td><td>Sari Dewi</td><td style="color:var(--text3)">12 Mei</td><td style="color:var(--text3)">—</td><td><span class="badge b-review">Review</span></td><td><div class="td-actions"><button class="btn btn-green btn-sm">Approve</button><button class="btn btn-red btn-sm">Tolak</button></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ========== EDITOR MODE ========== -->
    <div class="tab" id="tab-editor">
      <div class="sec-head" style="margin-bottom:20px">
        <button class="btn btn-ghost btn-sm" onclick="goTab('blog',null)">← Kembali ke Blog</button>
        <div style="display:flex;gap:8px">
          <button class="btn btn-ghost btn-sm" onclick="showToast('💾 Disimpan sebagai draft')">Simpan Draft</button>
          <button class="btn btn-violet btn-sm" onclick="showToast('🚀 Artikel dipublish!')">Publish</button>
        </div>
      </div>
      <div class="editor-layout">
        <div>
          <div class="form-group"><input class="form-input" placeholder="Judul Artikel..." style="font-size:20px;font-family:'Playfair Display',serif;padding:14px 16px"></div>
          <div class="editor-toolbar">
            <button class="tb-btn active-fmt" onclick="this.classList.toggle('active-fmt')"><b>B</b></button>
            <button class="tb-btn" onclick="this.classList.toggle('active-fmt')"><i>I</i></button>
            <button class="tb-btn" onclick="this.classList.toggle('active-fmt')"><u>U</u></button>
            <button class="tb-btn">H1</button>
            <button class="tb-btn">H2</button>
            <button class="tb-btn">📋 List</button>
            <button class="tb-btn">🔗 Link</button>
            <button class="tb-btn">🖼 Gambar</button>
            <button class="tb-btn">💬 Quote</button>
            <button class="tb-btn">👁 Preview</button>
          </div>
          <div class="editor-body" contenteditable="true">
            Mulai menulis artikel Anda di sini... Gunakan toolbar di atas untuk memformat teks. Klik dan ketik untuk mulai.
          </div>
        </div>
        <div>
          <div class="editor-sidebar-box">
            <h4>Pengaturan Artikel</h4>
            <div class="form-group"><label class="form-label">Kategori</label><select class="form-input"><option>Pilih Kategori</option><option>Branding</option><option>Design</option><option>E-Commerce</option><option>Lifestyle</option></select></div>
            <div class="form-group"><label class="form-label">Tag</label><input class="form-input" placeholder="brand, digital, tips..."></div>
            <div class="form-group"><label class="form-label">Penulis</label><input class="form-input" value="Sari Dewi"></div>
            <div class="form-group"><label class="form-label">Jadwal Publish</label><input class="form-input" type="datetime-local"></div>
          </div>
          <div class="editor-sidebar-box">
            <h4>Thumbnail</h4>
            <div style="height:120px;background:var(--bg2);border:1px dashed var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:6px;cursor:pointer" onclick="showToast('🖼 File picker terbuka')">
              <div style="font-size:24px">🖼</div>
              <div style="font-size:12px;color:var(--text3)">Klik untuk upload</div>
            </div>
          </div>
          <div class="editor-sidebar-box">
            <h4>SEO</h4>
            <div class="form-group"><label class="form-label">Meta Title</label><input class="form-input" placeholder="Judul SEO..."></div>
            <div class="form-group"><label class="form-label">Meta Description</label><textarea class="form-input" rows="2" placeholder="Deskripsi singkat..."></textarea></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== COMPANY PROFILE ========== -->
    <div class="tab" id="tab-company">
      <div class="sec-head" style="margin-bottom:20px">
        <h3 style="font-family:'Playfair Display',serif;font-size:22px">Company Profile</h3>
        <div style="display:flex;gap:8px">
          <a href="brandsphere-user.html#about" target="_blank" class="btn btn-ghost btn-sm">👁 Preview</a>
          <button class="btn btn-violet btn-sm" onclick="showToast('✅ Company profile berhasil disimpan!')">Simpan Perubahan</button>
        </div>
      </div>

      <!-- Live preview banner -->
      <div class="preview-strip">
        <div class="ps-icon">🌐</div>
        <div><div class="ps-title">Halaman Live</div><div class="ps-sub">brandsphere.id/about</div></div>
        <div class="ps-actions"><span style="font-size:11px;color:var(--green)">● Online</span></div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
        <div class="form-section">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:16px">Informasi Utama</h3>
          <div class="form-group"><label class="form-label">Nama Brand</label><input class="form-input" value="BrandSphere"></div>
          <div class="form-group"><label class="form-label">Tagline</label><input class="form-input" value="Unified Digital Brand Platform"></div>
          <div class="form-group"><label class="form-label">Deskripsi Singkat</label><textarea class="form-input" rows="3">BrandSphere adalah platform digital terintegrasi yang menggabungkan e-commerce dan company profile dalam satu sistem yang elegan.</textarea></div>
          <div class="form-group"><label class="form-label">Tahun Berdiri</label><input class="form-input" value="2023"></div>
          <div class="form-group"><label class="form-label">Lokasi</label><input class="form-input" value="Jakarta, Indonesia"></div>
        </div>
        <div class="form-section">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:16px">Kontak & Sosial</h3>
          <div class="form-group"><label class="form-label">Email</label><input class="form-input" value="info@brandsphere.id"></div>
          <div class="form-group"><label class="form-label">Instagram</label><input class="form-input" value="@brandsphere.id"></div>
          <div class="form-group"><label class="form-label">LinkedIn</label><input class="form-input" value="linkedin.com/company/brandsphere"></div>
          <div class="form-group"><label class="form-label">Logo Perusahaan</label>
            <div style="height:100px;background:var(--bg2);border:1px dashed var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer" onclick="showToast('🖼 Upload logo')">
              <span>🖼</span><span style="font-size:12px;color:var(--text3)">Upload logo (PNG/SVG)</span>
            </div>
          </div>
          <div class="form-group"><label class="form-label">Foto Hero About</label>
            <div style="height:80px;background:var(--bg2);border:1px dashed var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer" onclick="showToast('🖼 Upload foto')">
              <span>🖼</span><span style="font-size:12px;color:var(--text3)">Upload foto banner</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== VISI MISI ========== -->
    <div class="tab" id="tab-vision">
      <div class="sec-head" style="margin-bottom:20px">
        <h3 style="font-family:'Playfair Display',serif;font-size:22px">Visi & Misi</h3>
        <button class="btn btn-violet btn-sm" onclick="showToast('✅ Visi & Misi disimpan!')">Simpan</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="form-section">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:14px">🎯 Visi</h3>
          <div class="form-group"><textarea class="form-input" rows="3">Menjadi platform digital terintegrasi terdepan yang memberdayakan setiap brand untuk berkembang dan bersinar di ekosistem digital Indonesia dan global.</textarea></div>
        </div>
        <div class="form-section">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:14px">🚀 Misi</h3>
          <div class="form-group"><textarea class="form-input" rows="3">Menyediakan solusi digital terpadu yang menggabungkan e-commerce profesional, branding yang kuat, dan pengalaman pengguna terbaik untuk mendorong pertumbuhan bisnis.</textarea></div>
        </div>
        <div class="form-section">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:14px">💎 Nilai Perusahaan</h3>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
            <div><div class="form-group"><label class="form-label">Nilai 1</label><input class="form-input" value="Integritas"></div><div class="form-group"><textarea class="form-input" rows="2" placeholder="Deskripsi...">Kami menjunjung tinggi kejujuran dalam setiap aspek bisnis.</textarea></div></div>
            <div><div class="form-group"><label class="form-label">Nilai 2</label><input class="form-input" value="Inovasi"></div><div class="form-group"><textarea class="form-input" rows="2">Kami terus berinovasi untuk memberikan solusi terbaik.</textarea></div></div>
            <div><div class="form-group"><label class="form-label">Nilai 3</label><input class="form-input" value="Inklusivitas"></div><div class="form-group"><textarea class="form-input" rows="2">Kami percaya bahwa setiap brand berhak tampil profesional.</textarea></div></div>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="showToast('+ Nilai baru ditambahkan')">+ Tambah Nilai</button>
        </div>
      </div>
    </div>

    <!-- ========== CAREER ========== -->
    <div class="tab" id="tab-career">
      <div class="sec-head" style="margin-bottom:20px">
        <h3 style="font-family:'Playfair Display',serif;font-size:22px">Halaman Karir</h3>
        <button class="btn btn-violet" onclick="openModal('Tambah Lowongan Baru')">+ Tambah Lowongan</button>
      </div>

      <!-- Header career page edit -->
      <div class="form-section" style="margin-bottom:16px">
        <h3 style="font-size:15px;font-weight:600;margin-bottom:14px">Header Halaman Karir</h3>
        <div class="form-row2">
          <div class="form-group"><label class="form-label">Judul Halaman</label><input class="form-input" value="Karir di BrandSphere"></div>
          <div class="form-group"><label class="form-label">Subtitle</label><input class="form-input" value="Bergabung Bersama Kami"></div>
        </div>
        <div class="form-group"><label class="form-label">Deskripsi</label><textarea class="form-input" rows="2">Kami mencari individu berbakat yang siap membangun masa depan digital bersama kami.</textarea></div>
        <button class="btn btn-ghost btn-sm" onclick="showToast('✅ Header karir disimpan!')">Simpan Header</button>
      </div>

      <div class="tbl-wrap">
        <div class="tbl-header"><h3>Lowongan Aktif (4)</h3></div>
        <table>
          <thead><tr><th>Posisi</th><th>Tipe</th><th>Lokasi</th><th>Pelamar</th><th>Deadline</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            <tr><td class="td-name">Frontend Developer</td><td>Full-Time</td><td>Remote</td><td style="color:var(--violet2);font-weight:500">14</td><td style="color:var(--text3)">30 Jun 2025</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm" onclick="openModal('Edit Lowongan')">Edit</button><button class="btn btn-red btn-sm">Tutup</button></div></td></tr>
            <tr><td class="td-name">Backend Engineer (Laravel)</td><td>Full-Time</td><td>Hybrid</td><td style="color:var(--violet2);font-weight:500">8</td><td style="color:var(--text3)">30 Jun 2025</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm" onclick="openModal('Edit Lowongan')">Edit</button><button class="btn btn-red btn-sm">Tutup</button></div></td></tr>
            <tr><td class="td-name">UI/UX Designer</td><td>Full-Time</td><td>Remote</td><td style="color:var(--violet2);font-weight:500">22</td><td style="color:var(--text3)">30 Jun 2025</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm" onclick="openModal('Edit Lowongan')">Edit</button><button class="btn btn-red btn-sm">Tutup</button></div></td></tr>
            <tr><td class="td-name">Content & Social Media Specialist</td><td>Full-Time</td><td>On-site</td><td style="color:var(--violet2);font-weight:500">19</td><td style="color:var(--text3)">15 Jun 2025</td><td><span class="badge b-active">Aktif</span></td><td><div class="td-actions"><button class="btn btn-ghost btn-sm" onclick="openModal('Edit Lowongan')">Edit</button><button class="btn btn-red btn-sm">Tutup</button></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ========== MEDIA ========== -->
    <div class="tab" id="tab-media">
      <div class="sec-head" style="margin-bottom:20px">
        <h3 style="font-family:'Playfair Display',serif;font-size:22px">Perpustakaan Media</h3>
        <button class="btn btn-violet" onclick="showToast('📁 Upload dialog terbuka')">⬆ Upload File</button>
      </div>
      <!-- Upload area -->
      <div style="height:100px;background:var(--surface);border:1px dashed var(--border);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;cursor:pointer;margin-bottom:20px" onclick="showToast('📁 Pilih file untuk diupload')">
        <div style="font-size:28px">⬆️</div>
        <div style="font-size:13px;color:var(--text3)">Drag & drop file, atau klik untuk upload</div>
        <div style="font-size:11px;color:var(--text3)">PNG, JPG, WebP, SVG — Maks 5MB</div>
      </div>
      <!-- Media grid -->
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px">
        <div style="aspect-ratio:1;background:linear-gradient(135deg,var(--surface),var(--surface2));border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28px;cursor:pointer">🖼</div>
        <div style="aspect-ratio:1;background:linear-gradient(135deg,var(--surface),var(--surface2));border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28px;cursor:pointer">🧥</div>
        <div style="aspect-ratio:1;background:linear-gradient(135deg,var(--surface),var(--surface2));border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28px;cursor:pointer">👜</div>
        <div style="aspect-ratio:1;background:linear-gradient(135deg,var(--surface),var(--surface2));border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28px;cursor:pointer">📸</div>
        <div style="aspect-ratio:1;background:linear-gradient(135deg,var(--surface),var(--surface2));border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28px;cursor:pointer">🎨</div>
        <div style="aspect-ratio:1;background:linear-gradient(135deg,var(--surface),var(--surface2));border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28px;cursor:pointer">📷</div>
      </div>
    </div>

    <!-- ========== SEO ========== -->
    <div class="tab" id="tab-seo">
      <div class="sec-head" style="margin-bottom:20px">
        <h3 style="font-family:'Playfair Display',serif;font-size:22px">SEO & Meta Tags</h3>
        <button class="btn btn-violet btn-sm" onclick="showToast('✅ SEO settings disimpan!')">Simpan</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="form-section">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:14px">Homepage SEO</h3>
          <div class="form-group"><label class="form-label">Meta Title</label><input class="form-input" value="BrandSphere — Unified Digital Brand Platform"></div>
          <div class="form-group"><label class="form-label">Meta Description</label><textarea class="form-input" rows="2">Platform digital terpadu untuk e-commerce dan company profile yang profesional dan elegan.</textarea></div>
          <div class="form-group"><label class="form-label">Keywords</label><input class="form-input" value="brand, e-commerce, digital platform, fashion"></div>
          <div class="form-group"><label class="form-label">OG Image URL</label><input class="form-input" placeholder="https://..."></div>
        </div>
        <div class="form-section">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:14px">Pengaturan Umum</h3>
          <div class="form-group"><label class="form-label">Canonical URL</label><input class="form-input" value="https://brandsphere.id"></div>
          <div class="form-group"><label class="form-label">Robots.txt</label><select class="form-input"><option>index, follow</option><option>noindex, nofollow</option></select></div>
          <div class="form-group"><label class="form-label">Google Analytics ID</label><input class="form-input" placeholder="G-XXXXXXXXXX"></div>
          <div class="form-group"><label class="form-label">Google Search Console</label><input class="form-input" placeholder="Verification code..."></div>
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
    <div id="modal-body">
      <div class="form-group"><label class="form-label">Judul / Posisi</label><input class="form-input" placeholder="..."></div>
      <div class="form-group"><label class="form-label">Kategori / Tipe</label><select class="form-input"><option>Pilih...</option><option>Full-Time</option><option>Part-Time</option><option>Freelance</option></select></div>
      <div class="form-row2"><div class="form-group"><label class="form-label">Lokasi</label><input class="form-input" placeholder="Jakarta / Remote"></div><div class="form-group"><label class="form-label">Deadline</label><input class="form-input" type="date"></div></div>
      <div class="form-group"><label class="form-label">Deskripsi</label><textarea class="form-input" rows="4" placeholder="Tulis deskripsi..."></textarea></div>
    </div>
    <button class="btn btn-violet btn-wide" onclick="saveModal()">Simpan →</button>
  </div>
</div>

<!-- TOAST -->
<div class="toast" id="toast">✨ <span id="toast-txt"></span></div>

<script>
function goTab(id, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if(el) el.classList.add('active');
  const titles = {
    dashboard:'Dashboard Konten', blog:'Manajemen Blog', editor:'Editor Artikel',
    company:'Company Profile', vision:'Visi & Misi', career:'Halaman Karir',
    media:'Perpustakaan Media', seo:'SEO & Meta Tags'
  };
  document.getElementById('topbar-title').textContent = titles[id] || id;
}
function openEditor() { goTab('editor', null); }
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
