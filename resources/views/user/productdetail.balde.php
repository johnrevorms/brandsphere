@extends('layouts.user')

@section('title', $product['name'] . ' — BrandSphere')

@section('content')
<div class="page active" id="page-detail">
  <div class="breadcrumb">
    <a href="{{ route('home') }}">Beranda</a>
    <span class="sep">/</span>
    <a href="{{ route('products') }}">Produk</a>
    <span class="sep">/</span>
    <span>{{ $product['name'] }}</span>
  </div>
  <section class="section" style="padding-top:8px">
    <div class="detail-2col">
      <div class="detail-img-box">{{ $product['icon'] }}</div>
      <div>
        <div class="product-cat">{{ $product['category'] }}</div>
        <h1 class="detail-h1">{{ $product['name'] }}</h1>
        <div class="detail-price">{{ $product['price'] }}</div>
        <div class="detail-meta-row">
          <span>⭐ {{ $product['rating'] }}</span>
          <span>📦 Stok Tersedia</span>
          <span>🚚 Free Shipping</span>
        </div>
        <p class="detail-desc">{{ $product['description'] }}</p>
        <div style="display:flex;gap:12px">
          <a href="{{ route('cart') }}" class="btn btn-gold">Beli Sekarang</a>
          <button class="btn btn-ghost">+ Keranjang</button>
        </div>
      </div>
    </div>
  </section>
</div>
@endsection