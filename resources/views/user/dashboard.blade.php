@extends('layouts.user')

@section('title', 'Home')

@section('content')
<div class="page active" id="page-home">
  <section class="hero">
    <div class="hero-grid-lines"></div>
    <div style="position:relative;z-index:2">
      <div class="hero-eyebrow">Welcome</div>
      <h1 class="hero-title">Arcanum<br><em>One More.</em><br></h1>
      <p class="hero-desc">BrandSphere menyatukan e-commerce premium dan company profile yang elegan dalam satu ekosistem digital yang seamless.</p>
      <div class="hero-actions">
        <button class="btn btn-gold" onclick="showP('products')">Jelajahi Produk</button>
        <button class="btn btn-ghost" onclick="showP('about')">Tentang Kami</button>
      </div>
      <div class="hero-stats">
        <div class="stat-item"><div class="stat-num">500<span>+</span></div><div class="stat-lbl">Produk</div></div>
        <div class="stat-item"><div class="stat-num">2<span>k+</span></div><div class="stat-lbl">Pelanggan</div></div>
        <div class="stat-item"><div class="stat-num">4.8<span>★</span></div><div class="stat-lbl">Rating</div></div>
      </div>
    </div>
    <div class="hero-visual" style="position:relative;z-index:2">
      <div class="hero-card-main">🛍️</div>
      <div class="hero-card-float">
        <div class="label">Revenue Bulan Ini</div>
        <div class="value">Rp 48,5M</div>
        <div class="sublabel">↑ 12% dari bulan lalu</div>
      </div>
      <div class="hero-badge">
        <strong>✓ Order Baru</strong>
        <span style="font-size:12px;color:var(--text3)">3 pesanan masuk</span>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Featured Products -->
  <section class="section">
    <div class="section-label">Koleksi Terbaru</div>
    <h2 class="section-title">Produk Unggulan</h2>
    <p class="section-desc">Temukan produk pilihan terbaik yang dirancang untuk memenuhi kebutuhan Anda dengan kualitas premium.</p>
    <div class="product-grid">
      <div class="product-card" onclick="showDetail('Premium Jacket','Rp 850.000','🧥','Outerwear','Jaket premium bahan wool blend, desain modern dan timeless untuk segala kesempatan.',4.8)">
        <div class="product-img">🧥<div class="product-badge">New</div></div>
        <div class="product-body">
          <div class="product-cat">Outerwear</div>
          <div class="product-name">Premium Jacket</div>
          <div class="product-price">Rp 850.000</div>
          <div class="product-actions">
            <button class="btn btn-gold btn-sm" onclick="event.stopPropagation();addCart('Premium Jacket')">+ Keranjang</button>
            <button class="btn btn-ghost btn-sm">Detail</button>
          </div>
        </div>
      </div>
      <div class="product-card" onclick="showDetail('Signature Bag','Rp 1.250.000','👜','Accessories','Tas signature edisi terbatas dengan material kulit asli premium.',4.9)">
        <div class="product-img">👜<div class="product-badge">Best</div></div>
        <div class="product-body">
          <div class="product-cat">Accessories</div>
          <div class="product-name">Signature Bag</div>
          <div class="product-price">Rp 1.250.000</div>
          <div class="product-actions">
            <button class="btn btn-gold btn-sm" onclick="event.stopPropagation();addCart('Signature Bag')">+ Keranjang</button>
            <button class="btn btn-ghost btn-sm">Detail</button>
          </div>
        </div>
      </div>
      <div class="product-card" onclick="showDetail('Classic Shoes','Rp 650.000','👟','Footwear','Sepatu kasual dengan desain timeless, nyaman dipakai sepanjang hari.',4.7)">
        <div class="product-img">👟</div>
        <div class="product-body">
          <div class="product-cat">Footwear</div>
          <div class="product-name">Classic Shoes</div>
          <div class="product-price">Rp 650.000</div>
          <div class="product-actions">
            <button class="btn btn-gold btn-sm" onclick="event.stopPropagation();addCart('Classic Shoes')">+ Keranjang</button>
            <button class="btn btn-ghost btn-sm">Detail</button>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align:center;margin-top:36px">
      <button class="btn btn-ghost" onclick="showP('products')">Lihat Semua Produk →</button>
    </div>
  </section>

  <!-- About Strip -->
  <section class="section section-alt section-sm" style="padding:48px 80px">
    <div style="max-width:640px;margin:0 auto;text-align:center">
      <div class="section-label" style="justify-content:center">Mengapa BrandSphere</div>
      <h2 class="section-title" style="font-size:36px">Driven by Purpose,<br>Built for <em style="font-style:italic;color:var(--gold)">Brand</em></h2>
      <p style="font-size:14px;color:var(--text2);line-height:1.75;margin-bottom:28px;font-weight:300">Platform digital yang lahir dari keyakinan bahwa setiap brand berhak tampil profesional dan memiliki ekosistem digital yang kuat.</p>
      <button class="btn btn-gold" onclick="showP('about')">Selengkapnya</button>
    </div>
  </section>

  <!-- Blog preview -->
  <section class="section">
    <div class="section-label">Journal</div>
    <h2 class="section-title">Inspirasi Terbaru</h2>
    <div class="blog-grid">
      <div class="blog-card">
        <div class="blog-img">✍️</div>
        <div class="blog-body">
          <div class="blog-tag">Branding</div>
          <div class="blog-title">5 Cara Membangun Brand Identity yang Kuat</div>
          <div class="blog-excerpt">Brand identity bukan hanya logo — ini tentang bagaimana pelanggan merasakan kehadiran Anda.</div>
          <div class="blog-meta"><span>📅 20 Mei 2025</span><span>⏱ 5 mnt baca</span></div>
        </div>
      </div>
      <div class="blog-card">
        <div class="blog-img">🎨</div>
        <div class="blog-body">
          <div class="blog-tag">Design</div>
          <div class="blog-title">Tren UI/UX 2025: Minimalism Bermakna</div>
          <div class="blog-excerpt">Desain minimalis kembali dominan, kali ini dengan sentuhan personal yang lebih dalam.</div>
          <div class="blog-meta"><span>📅 18 Mei 2025</span><span>⏱ 4 mnt baca</span></div>
        </div>
      </div>
      <div class="blog-card">
        <div class="blog-img">📈</div>
        <div class="blog-body">
          <div class="blog-tag">E-Commerce</div>
          <div class="blog-title">Strategi Konversi: Pengunjung Jadi Pembeli</div>
          <div class="blog-excerpt">Konversi yang baik dimulai dari pengalaman belanja yang mulus.</div>
          <div class="blog-meta"><span>📅 15 Mei 2025</span><span>⏱ 6 mnt baca</span></div>
        </div>
      </div>
    </div>
  </section>
@endsection
