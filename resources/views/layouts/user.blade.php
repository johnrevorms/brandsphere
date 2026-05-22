<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BrandSphere</title>

<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{{ asset('css/user.css') }}">

</head>

<body>

@include('partials.user.navbar')

@yield('content')

@include('partials.user.footer')

<!-- TOAST -->
<div class="toast" id="toast">🎉 <span id="toast-txt"></span></div>

<script>
let cartN = 3;
let selectedRole = 'user';

function showP(p) {
  document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
  document.getElementById('page-' + p).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const n = document.getElementById('nl-' + p);
  if(n) n.classList.add('active');
  window.scrollTo(0, 0);
}

function showDetail(name, price, icon, cat, desc, rating) {
  document.getElementById('di-name').textContent = name;
  document.getElementById('db-name').textContent = name;
  document.getElementById('di-price').textContent = price;
  document.getElementById('di-icon').textContent = icon;
  document.getElementById('di-cat').textContent = cat;
  document.getElementById('di-desc').textContent = desc;
  document.getElementById('di-rating').textContent = rating;
  showP('detail');
}

function addCart(name) {
  cartN++;
  document.getElementById('cart-c').textContent = cartN;
  showToast('🛍 ' + name + ' ditambahkan ke keranjang!');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-txt').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function catFilter(el) {
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
}

function selPay(el) {
  document.querySelectorAll('.pay-m').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
}

function paySuccess() {
  showToast('✅ Pembayaran berhasil! Pesanan sedang diproses.');
  setTimeout(() => showP('orders'), 1800);
}

function openModal() { document.getElementById('modal-bg').classList.add('show'); }
function closeModal() { document.getElementById('modal-bg').classList.remove('show'); }
function submitApply() { closeModal(); showToast('✅ Lamaran berhasil dikirim!'); }

function setRole(role) {
  selectedRole = role;
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('role-' + role).classList.add('active');
}

function doLogin() {
  if(selectedRole === 'admin') {
    showToast('👋 Login sebagai Admin — Membuka Admin Dashboard...');
    setTimeout(() => window.open('brandsphere-admin.html', '_blank'), 1200);
  } else if(selectedRole === 'cm') {
    showToast('👋 Login sebagai Content Manager...');
    setTimeout(() => window.open('brandsphere-cm.html', '_blank'), 1200);
  } else {
    showToast('👋 Selamat datang kembali!');
    setTimeout(() => showP('home'), 1200);
  }
}

function doRegister() {
  showToast('🎉 Akun berhasil dibuat! Silakan masuk.');
  setTimeout(() => showP('login'), 1200);
}
</script>
</body>
</html>


</body>
</html>
