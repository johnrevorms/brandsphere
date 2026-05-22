@extends('layouts.user')

@section('title', 'Tentang Kami — BrandSphere')

@section('content')
<!-- ========== ORDER STATUS ========== -->
  <section class="section section-alt section-sm" style="padding:80px 80px 48px">
    <h2 class="section-title">Pesanan Saya</h2>
    <div class="order-cards">
      <div class="order-card">
        <div class="order-head"><div><div style="font-weight:600">Order #BS-2025-001</div><div class="order-id">20 Mei 2025</div></div><div class="status-badge s-done">✓ Selesai</div></div>
        <div class="order-items"><div class="order-tag">Premium Jacket ×1</div><div class="order-tag">Signature Bag ×1</div></div>
        <div class="order-foot"><div class="order-total">Rp 2.100.000</div><button class="btn btn-ghost btn-sm">Beli Lagi</button></div>
      </div>
      <div class="order-card">
        <div class="order-head"><div><div style="font-weight:600">Order #BS-2025-002</div><div class="order-id">25 Mei 2025</div></div><div class="status-badge s-ship">🚚 Dikirim</div></div>
        <div class="order-items"><div class="order-tag">Classic Shoes ×1</div><div class="order-tag">Wool Scarf ×2</div></div>
        <div class="order-foot"><div class="order-total">Rp 1.000.000</div><button class="btn btn-ghost btn-sm">Lacak Pesanan</button></div>
      </div>
      <div class="order-card">
        <div class="order-head"><div><div style="font-weight:600">Order #BS-2025-003</div><div class="order-id">28 Mei 2025</div></div><div class="status-badge s-proc">⏳ Diproses</div></div>
        <div class="order-items"><div class="order-tag">Linen Shirt ×2</div></div>
        <div class="order-foot"><div class="order-total">Rp 640.000</div><button class="btn btn-danger btn-sm">Batalkan</button></div>
      </div>
    </div>
  </section>
@endsection