@extends('layouts.user')

@section('title', 'Blog — BrandSphere')

@section('content')
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