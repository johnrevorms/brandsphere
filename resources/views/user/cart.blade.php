@extends('layouts.user')

@section('title', 'Keranjang — BrandSphere')

@section('content')
<!-- ========== CART ========== -->
  <section class="section section-alt section-sm" style="padding:80px 80px 48px">
    <h2 class="section-title">Keranjang Belanja</h2>
    <div class="cart-layout">
      <div class="cart-box">
        <div class="cart-item">
          <div class="cart-item-img">🧥</div>
          <div style="flex:1"><div class="cart-item-name">Premium Jacket</div><div class="cart-item-price">Rp 850.000</div><div class="qty-ctrl"><div class="qty-btn">−</div><span style="font-size:14px">1</span><div class="qty-btn">+</div></div></div>
          <button style="background:none;border:none;color:var(--red);cursor:pointer;font-size:18px">✕</button>
        </div>
        <div class="cart-item">
          <div class="cart-item-img">👜</div>
          <div style="flex:1"><div class="cart-item-name">Signature Bag</div><div class="cart-item-price">Rp 1.250.000</div><div class="qty-ctrl"><div class="qty-btn">−</div><span style="font-size:14px">1</span><div class="qty-btn">+</div></div></div>
          <button style="background:none;border:none;color:var(--red);cursor:pointer;font-size:18px">✕</button>
        </div>
        <div class="cart-item">
          <div class="cart-item-img">👟</div>
          <div style="flex:1"><div class="cart-item-name">Classic Shoes</div><div class="cart-item-price">Rp 650.000</div><div class="qty-ctrl"><div class="qty-btn">−</div><span style="font-size:14px">1</span><div class="qty-btn">+</div></div></div>
          <button style="background:none;border:none;color:var(--red);cursor:pointer;font-size:18px">✕</button>
        </div>
      </div>
      <div class="summary-box">
        <h3>Ringkasan</h3>
        <div class="s-row"><span>Subtotal (3 item)</span><span>Rp 2.750.000</span></div>
        <div class="s-row"><span>Pengiriman</span><span style="color:var(--green)">Gratis</span></div>
        <div class="s-row"><span>Diskon</span><span style="color:var(--red)">−Rp 0</span></div>
        <div class="s-total"><span>Total</span><span style="color:var(--gold)">Rp 2.750.000</span></div>
        <button class="btn btn-gold btn-wide" style="margin-top:18px" onclick="showP('checkout')">Checkout →</button>
        <button class="btn btn-ghost btn-wide" style="margin-top:10px" onclick="showP('products')">Lanjut Belanja</button>
      </div>
    </div>
  </section>

<!-- ========== CHECKOUT ========== -->

  <div class="breadcrumb">Beranda <span class="sep">/</span> Keranjang <span class="sep">/</span> <span>Checkout</span></div>
  <section class="section" style="padding-top:8px">
    <h2 class="section-title">Informasi Pengiriman</h2>
    <div class="cart-layout">
      <div>
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px;margin-bottom:16px">
          <h3 style="font-family:'Playfair Display',serif;font-size:18px;margin-bottom:16px">Alamat Pengiriman</h3>
          <div class="form-row"><div class="form-group"><label class="form-label">Nama Depan</label><input class="form-input" placeholder="Budi"></div><div class="form-group"><label class="form-label">Nama Belakang</label><input class="form-input" placeholder="Santoso"></div></div>
          <div class="form-group"><label class="form-label">Nomor HP</label><input class="form-input" placeholder="08xx-xxxx-xxxx"></div>
          <div class="form-group"><label class="form-label">Alamat Lengkap</label><input class="form-input" placeholder="Jl. Merdeka No. 1..."></div>
          <div class="form-row"><div class="form-group"><label class="form-label">Kota</label><input class="form-input" placeholder="Jakarta"></div><div class="form-group"><label class="form-label">Kode Pos</label><input class="form-input" placeholder="12345"></div></div>
        </div>
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px">
          <h3 style="font-family:'Playfair Display',serif;font-size:18px;margin-bottom:14px">Kurir Pengiriman</h3>
          <div class="radio-opt selected"><input type="radio" name="kurir" checked><span>JNE Regular (3-5 hari)</span><span class="price" style="color:var(--green)">Gratis</span></div>
          <div class="radio-opt"><input type="radio" name="kurir"><span>JNE YES (1 hari)</span><span class="price">Rp 25.000</span></div>
          <div class="radio-opt"><input type="radio" name="kurir"><span>SiCepat HALU (2 hari)</span><span class="price">Rp 15.000</span></div>
        </div>
      </div>
      <div class="summary-box">
        <h3>Pesanan</h3>
        <div class="s-row"><span>Premium Jacket ×1</span><span>Rp 850.000</span></div>
        <div class="s-row"><span>Signature Bag ×1</span><span>Rp 1.250.000</span></div>
        <div class="s-row"><span>Classic Shoes ×1</span><span>Rp 650.000</span></div>
        <div class="s-row"><span>Pengiriman</span><span style="color:var(--green)">Gratis</span></div>
        <div class="s-total"><span>Total</span><span style="color:var(--gold)">Rp 2.750.000</span></div>
        <button class="btn btn-gold btn-wide" style="margin-top:18px" onclick="showP('payment')">Lanjut Pembayaran →</button>
      </div>
    </div>
  </section>


<!-- ========== PAYMENT ========== -->

  <div class="breadcrumb">Beranda <span class="sep">/</span> Checkout <span class="sep">/</span> <span>Pembayaran</span></div>
  <section class="section" style="padding-top:8px">
    <h2 class="section-title">Pembayaran</h2>
    <div class="cart-layout">
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:28px">
        <h3 style="font-family:'Playfair Display',serif;font-size:18px;margin-bottom:16px">Metode Pembayaran</h3>
        <div class="pay-methods">
          <div class="pay-m active" onclick="selPay(this)">💳 Kartu Kredit</div>
          <div class="pay-m" onclick="selPay(this)">🏦 Transfer Bank</div>
          <div class="pay-m" onclick="selPay(this)">📱 GoPay</div>
          <div class="pay-m" onclick="selPay(this)">📱 OVO</div>
          <div class="pay-m" onclick="selPay(this)">🏪 Alfamart</div>
        </div>
        <div class="form-group"><label class="form-label">Nama Pemegang Kartu</label><input class="form-input" placeholder="NAMA LENGKAP"></div>
        <div class="form-group"><label class="form-label">Nomor Kartu</label><input class="form-input" placeholder="xxxx xxxx xxxx xxxx"></div>
        <div class="form-row"><div class="form-group"><label class="form-label">Masa Berlaku</label><input class="form-input" placeholder="MM/YY"></div><div class="form-group"><label class="form-label">CVV</label><input class="form-input" placeholder="xxx"></div></div>
      </div>
      <div class="summary-box">
        <h3>Total Bayar</h3>
        <div class="s-row"><span>Subtotal</span><span>Rp 2.750.000</span></div>
        <div class="s-row"><span>Pengiriman</span><span style="color:var(--green)">Gratis</span></div>
        <div class="s-row"><span>Biaya Admin</span><span>Rp 0</span></div>
        <div class="s-total"><span>Total</span><span style="color:var(--gold)">Rp 2.750.000</span></div>
        <button class="btn btn-gold btn-wide" style="margin-top:18px" onclick="paySuccess()">🔒 Bayar Sekarang</button>
        <p style="font-size:11px;color:var(--text3);text-align:center;margin-top:10px">Dilindungi enkripsi SSL 256-bit</p>
      </div>
    </div>
  </section>

@endsection