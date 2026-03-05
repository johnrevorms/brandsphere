<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BrandSphere — Platform Digital Brand</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #0a0a0f;
  --bg2: #0f0f18;
  --bg3: #13131e;
  --surface: #16161f;
  --surface2: #1c1c28;
  --border: rgba(255,255,255,0.07);
  --border-glow: rgba(201,162,74,0.25);
  --gold: #c9a24a;
  --gold2: #e8c97a;
  --gold-dim: rgba(201,162,74,0.12);
  --text: #e8e4dc;
  --text2: #9b96a0;
  --text3: #5a5560;
  --red: #e05555;
  --green: #4ecb8d;
  --blue: #5b8dee;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Outfit', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
}

/* Ambient background effect */
body::before {
  content: '';
  position: fixed;
  top: -50%;
  left: -20%;
  width: 60%;
  height: 80%;
  background: radial-gradient(ellipse, rgba(201,162,74,0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}
body::after {
  content: '';
  position: fixed;
  bottom: -30%;
  right: -10%;
  width: 50%;
  height: 70%;
  background: radial-gradient(ellipse, rgba(91,141,238,0.03) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ===== NAVBAR ===== */

.logo-img {
  height: 25px;
  width: auto;
  cursor: pointer;
  margin-top: 10px;
}

.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  height: 64px;
  background: rgba(10,10,15,0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px;
}
.nav-logo {
  font-family: 'Playfair Display', serif;
  font-size: 22px; font-weight: 700;
  letter-spacing: 1px;
  color: var(--text);
  text-decoration: none;
  cursor: pointer;
}
.nav-logo span { color: var(--gold); }
.nav-links { display: flex; gap: 28px; list-style: none; }
.nav-links a {
  font-size: 13px; font-weight: 400; letter-spacing: 0.3px;
  color: var(--text2); text-decoration: none; cursor: pointer;
  transition: color .2s;
  position: relative;
}
.nav-links a::after {
  content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
  height: 1px; background: var(--gold); transform: scaleX(0);
  transition: transform .2s;
}
.nav-links a:hover, .nav-links a.active { color: var(--text); }
.nav-links a:hover::after, .nav-links a.active::after { transform: scaleX(1); }

.nav-right { display: flex; align-items: center; gap: 14px; }
.cart-btn {
  position: relative; cursor: pointer;
  width: 38px; height: 38px; border-radius: 10px;
  background: var(--surface); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  transition: border-color .2s;
}
.cart-btn:hover { border-color: var(--border-glow); }
.cart-badge {
  position: absolute; top: -5px; right: -5px;
  background: var(--gold); color: var(--bg);
  width: 17px; height: 17px; border-radius: 50%;
  font-size: 9px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 18px; border-radius: 8px;
  font-size: 13px; font-weight: 500; cursor: pointer;
  border: none; transition: all .2s;
  font-family: 'Outfit', sans-serif;
  text-decoration: none;
}
.btn-gold {
  background: var(--gold); color: var(--bg);
  letter-spacing: 0.3px;
}
.btn-gold:hover { background: var(--gold2); transform: translateY(-1px); }
.btn-ghost {
  background: transparent; color: var(--text2);
  border: 1px solid var(--border);
}
.btn-ghost:hover { border-color: var(--border-glow); color: var(--text); }
.btn-sm { padding: 7px 14px; font-size: 12px; }
.btn-danger { background: rgba(224,85,85,0.15); color: var(--red); border: 1px solid rgba(224,85,85,0.2); }
.btn-success-soft { background: rgba(78,203,141,0.12); color: var(--green); border: 1px solid rgba(78,203,141,0.2); }

/* ===== PAGES ===== */
.page { display: none; padding-top: 64px; min-height: 100vh; position: relative; z-index: 1; }
.page.active { display: block; }

/* ===== HERO ===== */
.hero {
  min-height: calc(100vh - 64px);
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 60px 80px;
  gap: 80px;
  position: relative;
}
.hero-grid-lines {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 11px; font-weight: 500; letter-spacing: 3px;
  color: var(--gold); text-transform: uppercase;
  margin-bottom: 24px;
  padding: 6px 14px;
  border: 1px solid var(--border-glow);
  border-radius: 20px;
  background: var(--gold-dim);
}
.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: 66px; font-weight: 900; line-height: 1.05;
  margin-bottom: 24px;
  letter-spacing: -1px;
}
.hero-title em { font-style: italic; color: var(--gold); }
.hero-title .line2 { color: var(--text2); }
.hero-desc {
  font-size: 15px; color: var(--text2); line-height: 1.75;
  margin-bottom: 40px; max-width: 460px;
  font-weight: 300;
}
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
.hero-stats { display: flex; gap: 36px; }
.stat-item { }
.stat-num {
  font-family: 'Playfair Display', serif;
  font-size: 28px; font-weight: 700; color: var(--text);
}
.stat-num span { color: var(--gold); }
.stat-lbl { font-size: 12px; color: var(--text3); margin-top: 2px; }

.hero-visual {
  position: relative; height: 560px;
}
.hero-card-main {
  position: absolute; top: 0; right: 0; left: 60px;
  height: 380px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 100px;
  overflow: hidden;
}
.hero-card-main::before {
  content: '';
  position: absolute; top: -60px; right: -60px;
  width: 240px; height: 240px;
  background: radial-gradient(circle, rgba(201,162,74,0.12) 0%, transparent 70%);
}
.hero-card-float {
  position: absolute; bottom: 0; left: 0;
  background: var(--surface2);
  border: 1px solid var(--border-glow);
  border-radius: 16px; padding: 18px 22px;
  backdrop-filter: blur(10px);
  min-width: 200px;
}
.hero-card-float .label { font-size: 11px; color: var(--text3); margin-bottom: 4px; letter-spacing: 1px; text-transform: uppercase; }
.hero-card-float .value { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--gold); }
.hero-card-float .sublabel { font-size: 12px; color: var(--text2); margin-top: 2px; }
.hero-badge {
  position: absolute; top: 24px; left: 0;
  background: var(--bg);
  border: 1px solid var(--border-glow);
  border-radius: 12px; padding: 12px 16px;
  font-size: 13px;
}
.hero-badge strong { display: block; color: var(--green); font-size: 15px; }

/* ===== SECTION ===== */
.section { padding: 80px; }
.section-sm { padding: 60px 80px; }
.section-label {
  font-size: 11px; font-weight: 500; letter-spacing: 3px;
  color: var(--gold); text-transform: uppercase;
  margin-bottom: 12px;
  display: flex; align-items: center; gap: 10px;
}
.section-label::before { content: ''; width: 24px; height: 1px; background: var(--gold); }
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 40px; font-weight: 700; margin-bottom: 12px;
  letter-spacing: -0.5px;
}
.section-desc {
  font-size: 14px; color: var(--text2); max-width: 500px;
  line-height: 1.75; margin-bottom: 48px; font-weight: 300;
}

/* ===== DIVIDER ===== */
.divider { height: 1px; background: var(--border); margin: 0 80px; }

/* ===== CATEGORY PILLS ===== */
.cat-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 36px; }
.cat-pill {
  padding: 7px 16px; border-radius: 20px;
  font-size: 12px; font-weight: 500; cursor: pointer;
  border: 1px solid var(--border);
  background: transparent; color: var(--text2);
  transition: all .2s;
}
.cat-pill:hover { border-color: var(--border-glow); color: var(--text); }
.cat-pill.active { background: var(--gold); color: var(--bg); border-color: var(--gold); }

/* ===== PRODUCT GRID ===== */
.product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.product-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px; overflow: hidden;
  cursor: pointer; transition: all .3s;
}
.product-card:hover {
  border-color: var(--border-glow);
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,162,74,0.1);
}
.product-img {
  aspect-ratio: 1;
  background: linear-gradient(135deg, var(--bg2) 0%, var(--surface2) 100%);
  display: flex; align-items: center; justify-content: center;
  font-size: 72px; position: relative;
}
.product-img::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(10,10,15,0.6));
}
.product-badge {
  position: absolute; top: 12px; left: 12px; z-index: 2;
  background: var(--gold); color: var(--bg);
  padding: 3px 10px; border-radius: 20px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;
}
.product-body { padding: 16px 18px 20px; }
.product-cat { font-size: 10px; color: var(--text3); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px; }
.product-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; margin-bottom: 8px; }
.product-price { font-size: 16px; font-weight: 600; color: var(--gold); margin-bottom: 14px; }
.product-actions { display: flex; gap: 8px; }

/* ===== GLASS CARD ===== */
.glass-card {
  background: rgba(22,22,31,0.7);
  border: 1px solid var(--border);
  border-radius: 16px;
  backdrop-filter: blur(20px);
}

/* ===== BLOG ===== */
.blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.blog-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 16px; overflow: hidden; cursor: pointer;
  transition: all .3s;
}
.blog-card:hover { border-color: var(--border-glow); transform: translateY(-3px); }
.blog-img {
  height: 180px;
  background: linear-gradient(135deg, var(--bg2), var(--surface2));
  display: flex; align-items: center; justify-content: center;
  font-size: 48px;
}
.blog-body { padding: 18px 20px; }
.blog-tag { font-size: 10px; color: var(--gold); font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px; }
.blog-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; line-height: 1.3; margin-bottom: 8px; }
.blog-excerpt { font-size: 13px; color: var(--text2); line-height: 1.65; margin-bottom: 14px; font-weight: 300; }
.blog-meta { font-size: 11px; color: var(--text3); display: flex; gap: 12px; }

/* ===== ABOUT / VM ===== */
.about-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.about-img-box {
  aspect-ratio: 1; border-radius: 20px;
  background: linear-gradient(135deg, var(--surface), var(--surface2));
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 80px; position: relative; overflow: hidden;
}
.about-img-box::before {
  content: ''; position: absolute; top: -40px; right: -40px;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(201,162,74,0.1) 0%, transparent 70%);
}
.about-stat-box {
  position: absolute; bottom: 20px; right: 20px;
  background: rgba(10,10,15,0.9); border: 1px solid var(--border-glow);
  border-radius: 12px; padding: 14px 18px; text-align: center;
}
.about-stat-box .num { font-family: 'Playfair Display', serif; font-size: 30px; color: var(--gold); }
.about-stat-box .lbl { font-size: 11px; color: var(--text3); }
.vm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 36px; }
.vm-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 14px; padding: 22px 24px;
  border-left: 2px solid var(--gold);
  transition: border-color .2s;
}
.vm-card:hover { border-color: var(--gold); border-left-color: var(--gold2); }
.vm-card h3 { font-family: 'Playfair Display', serif; font-size: 18px; margin-bottom: 8px; }
.vm-card p { font-size: 13px; color: var(--text2); line-height: 1.65; font-weight: 300; }

/* ===== CAREER ===== */
.career-list { display: flex; flex-direction: column; gap: 14px; }
.career-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 14px; padding: 20px 24px;
  display: flex; align-items: center; justify-content: space-between;
  transition: all .2s;
}
.career-card:hover { border-color: var(--border-glow); }
.career-title { font-family: 'Playfair Display', serif; font-size: 18px; margin-bottom: 8px; }
.career-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.career-tag {
  padding: 3px 10px; border-radius: 20px;
  background: var(--surface2); border: 1px solid var(--border);
  font-size: 11px; color: var(--text2);
}

/* ===== CART ===== */
.cart-layout { display: grid; grid-template-columns: 1fr 360px; gap: 28px; align-items: start; }
.cart-box { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 22px; }
.cart-item { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border); }
.cart-item:last-child { border-bottom: none; }
.cart-item-img {
  width: 72px; height: 72px; border-radius: 10px;
  background: linear-gradient(135deg, var(--bg2), var(--surface2));
  display: flex; align-items: center; justify-content: center; font-size: 28px; flex-shrink: 0;
  border: 1px solid var(--border);
}
.cart-item-name { font-family: 'Playfair Display', serif; font-size: 16px; margin-bottom: 3px; }
.cart-item-price { font-size: 14px; color: var(--gold); font-weight: 500; }
.qty-ctrl { display: flex; align-items: center; gap: 10px; margin-top: 7px; }
.qty-btn {
  width: 26px; height: 26px; border-radius: 6px;
  border: 1px solid var(--border); background: var(--surface2);
  cursor: pointer; font-size: 14px; color: var(--text);
  display: flex; align-items: center; justify-content: center;
  transition: border-color .2s;
}
.qty-btn:hover { border-color: var(--gold); }
.summary-box { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 22px; position: sticky; top: 80px; }
.summary-box h3 { font-family: 'Playfair Display', serif; font-size: 20px; margin-bottom: 18px; }
.s-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--text2); margin-bottom: 10px; }
.s-total { display: flex; justify-content: space-between; font-size: 16px; font-weight: 600; padding-top: 14px; border-top: 1px solid var(--border); margin-top: 6px; }

/* ===== CHECKOUT ===== */
.form-group { margin-bottom: 18px; }
.form-label { font-size: 12px; font-weight: 500; color: var(--text2); margin-bottom: 6px; display: block; letter-spacing: 0.3px; }
.form-input {
  width: 100%; padding: 11px 14px; border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg2); color: var(--text);
  font-size: 14px; font-family: 'Outfit', sans-serif;
  transition: border-color .2s; outline: none;
}
.form-input:focus { border-color: var(--border-glow); }
.form-input::placeholder { color: var(--text3); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.radio-opt {
  display: flex; align-items: center; gap: 12px;
  padding: 11px 14px; border-radius: 8px;
  border: 1px solid var(--border); cursor: pointer;
  margin-bottom: 8px; transition: border-color .2s;
}
.radio-opt.selected { border-color: var(--gold); background: var(--gold-dim); }
.radio-opt span { font-size: 13px; flex: 1; }
.radio-opt .price { font-size: 12px; color: var(--text2); }

/* ===== PAYMENT ===== */
.pay-methods { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
.pay-m {
  padding: 9px 16px; border-radius: 8px; cursor: pointer;
  border: 1px solid var(--border); background: transparent;
  font-size: 12px; color: var(--text2); transition: all .2s;
}
.pay-m.active { border-color: var(--gold); background: var(--gold-dim); color: var(--gold); }

/* ===== ORDER STATUS ===== */
.order-cards { display: flex; flex-direction: column; gap: 14px; }
.order-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 14px; padding: 18px 22px;
}
.order-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.order-id { font-size: 12px; color: var(--text3); margin-top: 2px; }
.status-badge {
  padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600;
}
.s-done { background: rgba(78,203,141,0.1); color: var(--green); }
.s-ship { background: rgba(91,141,238,0.1); color: var(--blue); }
.s-proc { background: rgba(201,162,74,0.1); color: var(--gold); }
.s-cancel { background: rgba(224,85,85,0.1); color: var(--red); }
.order-items { display: flex; gap: 8px; flex-wrap: wrap; }
.order-tag { background: var(--surface2); border: 1px solid var(--border); padding: 3px 10px; border-radius: 6px; font-size: 12px; color: var(--text2); }
.order-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border); }
.order-total { font-weight: 600; color: var(--gold); font-size: 15px; }

/* ===== AUTH ===== */
.auth-wrap { min-height: calc(100vh - 64px); display: flex; align-items: center; justify-content: center; padding: 40px; }
.auth-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 20px; padding: 44px 48px; width: 100%; max-width: 420px;
  position: relative;
}
.auth-card::before {
  content: ''; position: absolute; top: -1px; left: 40px; right: 40px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.auth-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; margin-bottom: 6px; }
.auth-sub { font-size: 13px; color: var(--text2); margin-bottom: 28px; font-weight: 300; }
.auth-switch { text-align: center; margin-top: 18px; font-size: 13px; color: var(--text3); }
.auth-switch a { color: var(--gold); cursor: pointer; font-weight: 500; }

/* Role selector for login */
.role-selector { display: flex; gap: 10px; margin-bottom: 22px; }
.role-btn {
  flex: 1; padding: 10px 8px; border-radius: 8px;
  border: 1px solid var(--border); background: transparent;
  font-size: 12px; color: var(--text2); cursor: pointer;
  font-family: 'Outfit', sans-serif; text-align: center;
  transition: all .2s;
}
.role-btn.active { border-color: var(--gold); background: var(--gold-dim); color: var(--gold); }

/* ===== PRODUCT DETAIL ===== */
.detail-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
.detail-img-box {
  aspect-ratio: 1; border-radius: 20px;
  background: linear-gradient(135deg, var(--bg2), var(--surface2));
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center; font-size: 120px;
}
.detail-h1 { font-family: 'Playfair Display', serif; font-size: 36px; line-height: 1.1; margin-bottom: 8px; }
.detail-price { font-size: 26px; font-weight: 600; color: var(--gold); margin: 14px 0; }
.detail-desc { font-size: 14px; color: var(--text2); line-height: 1.75; margin-bottom: 22px; font-weight: 300; }
.detail-meta-row { display: flex; gap: 20px; font-size: 12px; color: var(--text3); margin-bottom: 22px; }
.detail-meta-row span { display: flex; align-items: center; gap: 5px; }

/* ===== BREADCRUMB ===== */
.breadcrumb { padding: 16px 80px; font-size: 12px; color: var(--text3); display: flex; gap: 6px; align-items: center; }
.breadcrumb span { color: var(--text); font-weight: 500; }
.breadcrumb .sep { color: var(--text3); }

/* ===== TOAST ===== */
.toast {
  position: fixed; bottom: 24px; right: 24px; z-index: 9999;
  background: var(--surface2); color: var(--text);
  border: 1px solid var(--border-glow);
  padding: 14px 20px; border-radius: 12px;
  font-size: 14px; display: none; align-items: center; gap: 10px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
}
.toast.show { display: flex; animation: toastIn .3s ease; }
@keyframes toastIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }

/* ===== MODAL ===== */
.modal-bg {
  position: fixed; inset: 0; background: rgba(0,0,0,0.7);
  backdrop-filter: blur(6px); z-index: 1000;
  display: none; align-items: center; justify-content: center;
}
.modal-bg.show { display: flex; }
.modal-box {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 20px; padding: 36px 40px; width: 90%; max-width: 460px;
  position: relative;
}
.modal-box::before {
  content: ''; position: absolute; top: -1px; left: 40px; right: 40px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.modal-close { position: absolute; top: 16px; right: 16px; cursor: pointer; color: var(--text3); background: none; border: none; font-size: 18px; }
.modal-title { font-family: 'Playfair Display', serif; font-size: 24px; margin-bottom: 20px; }

/* ===== FOOTER ===== */
.footer { background: var(--surface); border-top: 1px solid var(--border); padding: 56px 80px 28px; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 44px; }
.footer-logo { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; margin-bottom: 10px; }
.footer-logo span { color: var(--gold); }
.footer-desc { font-size: 13px; color: var(--text3); line-height: 1.75; font-weight: 300; }
.footer-col h4 { font-size: 10px; letter-spacing: 2.5px; color: var(--gold); text-transform: uppercase; margin-bottom: 16px; }
.footer-col a { display: block; font-size: 13px; color: var(--text3); margin-bottom: 8px; cursor: pointer; transition: color .2s; }
.footer-col a:hover { color: var(--text); }
.footer-bottom { border-top: 1px solid var(--border); padding-top: 20px; display: flex; justify-content: space-between; font-size: 12px; color: var(--text3); }

/* Wide btn */
.btn-wide { width: 100%; justify-content: center; padding: 12px; }

/* section alt bg */
.section-alt { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }

@keyframes fadeUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
.page.active .hero-title,
.page.active .hero-desc { animation: fadeUp .6s ease both; }
.page.active .hero-title { animation-delay: .1s; }
.page.active .hero-desc { animation-delay: .2s; }
</style>
</head>
<body>

<!-- NAVBAR -->
<nav class="nav">
  <span class="nav-logo" onclick="showP('home')">
  <img src="{{ asset('images/logo.png') }}" alt="BrandSphere Logo" class="logo-img">
  </span>
  <ul class="nav-links">
    <li><a onclick="showP('home')" id="nl-home" class="active">Beranda</a></li>
    <li><a onclick="showP('products')" id="nl-products">Produk</a></li>
    <li><a onclick="showP('about')" id="nl-about">Tentang</a></li>
    <li><a onclick="showP('blog')" id="nl-blog">Blog</a></li>
    <li><a onclick="showP('career')" id="nl-career">Karir</a></li>
    <li><a onclick="showP('orders')" id="nl-orders">Pesanan</a></li>
  </ul>
  <div class="nav-right">
    <div class="cart-btn" onclick="showP('cart')">
      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
      <div class="cart-badge" id="cart-c">3</div>
    </div>
    <button class="btn btn-ghost btn-sm" onclick="showP('login')">Masuk</button>
    <button class="btn btn-gold btn-sm" onclick="showP('register')">Daftar</button>
  </div>
</nav>

<!-- ========== HOME ========== -->
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

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">Brand<span>Sphere</span></div>
        <p class="footer-desc">Platform digital terintegrasi untuk e-commerce dan company profile yang profesional.</p>
      </div>
      <div class="footer-col"><h4>Produk</h4><a onclick="showP('products')">Katalog</a><a>New Arrival</a><a>Best Seller</a></div>
      <div class="footer-col"><h4>Perusahaan</h4><a onclick="showP('about')">About</a><a onclick="showP('career')">Career</a><a onclick="showP('blog')">Blog</a></div>
      <div class="footer-col"><h4>Bantuan</h4><a>FAQ</a><a>Kontak</a><a>Kebijakan</a></div>
    </div>
    <div class="footer-bottom"><span>© 2025 BrandSphere</span><span>Platform Digital Terpadu</span></div>
  </footer>
</div>

<!-- ========== PRODUCTS ========== -->
<div class="page" id="page-products">
  <div class="breadcrumb">Beranda <span class="sep">/</span> <span>Produk</span></div>
  <section class="section" style="padding-top:8px">
    <div class="section-label">Katalog</div>
    <h2 class="section-title">Semua Produk</h2>
    <div class="cat-row">
      <div class="cat-pill active" onclick="catFilter(this)">Semua</div>
      <div class="cat-pill" onclick="catFilter(this)">Outerwear</div>
      <div class="cat-pill" onclick="catFilter(this)">Accessories</div>
      <div class="cat-pill" onclick="catFilter(this)">Footwear</div>
      <div class="cat-pill" onclick="catFilter(this)">Tops</div>
      <div class="cat-pill" onclick="catFilter(this)">Bottoms</div>
    </div>
    <div class="product-grid">
      <div class="product-card" onclick="showDetail('Premium Jacket','Rp 850.000','🧥','Outerwear','Jaket premium bahan wool blend.',4.8)">
        <div class="product-img">🧥<div class="product-badge">New</div></div>
        <div class="product-body"><div class="product-cat">Outerwear</div><div class="product-name">Premium Jacket</div><div class="product-price">Rp 850.000</div><div class="product-actions"><button class="btn btn-gold btn-sm" onclick="event.stopPropagation();addCart('Premium Jacket')">+ Keranjang</button><button class="btn btn-ghost btn-sm">Detail</button></div></div>
      </div>
      <div class="product-card">
        <div class="product-img">👜<div class="product-badge">Best</div></div>
        <div class="product-body"><div class="product-cat">Accessories</div><div class="product-name">Signature Bag</div><div class="product-price">Rp 1.250.000</div><div class="product-actions"><button class="btn btn-gold btn-sm" onclick="addCart('Signature Bag')">+ Keranjang</button><button class="btn btn-ghost btn-sm">Detail</button></div></div>
      </div>
      <div class="product-card">
        <div class="product-img">👟</div>
        <div class="product-body"><div class="product-cat">Footwear</div><div class="product-name">Classic Shoes</div><div class="product-price">Rp 650.000</div><div class="product-actions"><button class="btn btn-gold btn-sm" onclick="addCart('Classic Shoes')">+ Keranjang</button><button class="btn btn-ghost btn-sm">Detail</button></div></div>
      </div>
      <div class="product-card">
        <div class="product-img">👕</div>
        <div class="product-body"><div class="product-cat">Tops</div><div class="product-name">Linen Shirt</div><div class="product-price">Rp 320.000</div><div class="product-actions"><button class="btn btn-gold btn-sm" onclick="addCart('Linen Shirt')">+ Keranjang</button><button class="btn btn-ghost btn-sm">Detail</button></div></div>
      </div>
      <div class="product-card">
        <div class="product-img">👖</div>
        <div class="product-body"><div class="product-cat">Bottoms</div><div class="product-name">Slim Trouser</div><div class="product-price">Rp 480.000</div><div class="product-actions"><button class="btn btn-gold btn-sm" onclick="addCart('Slim Trouser')">+ Keranjang</button><button class="btn btn-ghost btn-sm">Detail</button></div></div>
      </div>
      <div class="product-card">
        <div class="product-img">🧣</div>
        <div class="product-body"><div class="product-cat">Accessories</div><div class="product-name">Wool Scarf</div><div class="product-price">Rp 175.000</div><div class="product-actions"><button class="btn btn-gold btn-sm" onclick="addCart('Wool Scarf')">+ Keranjang</button><button class="btn btn-ghost btn-sm">Detail</button></div></div>
      </div>
    </div>
  </section>
</div>

<!-- ========== PRODUCT DETAIL ========== -->
<div class="page" id="page-detail">
  <div class="breadcrumb">Beranda <span class="sep">/</span> Produk <span class="sep">/</span> <span id="db-name">...</span></div>
  <section class="section" style="padding-top:8px">
    <div class="detail-2col">
      <div class="detail-img-box" id="di-icon">🛍️</div>
      <div>
        <div class="product-cat" id="di-cat">—</div>
        <h1 class="detail-h1" id="di-name">Nama Produk</h1>
        <div class="detail-price" id="di-price">Rp 0</div>
        <div class="detail-meta-row">
          <span>⭐ <span id="di-rating">4.8</span></span>
          <span>📦 Stok Tersedia</span>
          <span>🚚 Free Shipping</span>
        </div>
        <p class="detail-desc" id="di-desc">Deskripsi produk.</p>
        <div style="display:flex;gap:12px">
          <button class="btn btn-gold" onclick="addCart(document.getElementById('di-name').textContent);showP('cart')">Beli Sekarang</button>
          <button class="btn btn-ghost" onclick="addCart(document.getElementById('di-name').textContent)">+ Keranjang</button>
        </div>
      </div>
    </div>
  </section>
</div>

<!-- ========== CART ========== -->
<div class="page" id="page-cart">
  <div class="breadcrumb">Beranda <span class="sep">/</span> <span>Keranjang</span></div>
  <section class="section" style="padding-top:8px">
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
</div>

<!-- ========== CHECKOUT ========== -->
<div class="page" id="page-checkout">
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
</div>

<!-- ========== PAYMENT ========== -->
<div class="page" id="page-payment">
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
</div>

<!-- ========== ORDER STATUS ========== -->
<div class="page" id="page-orders">
  <div class="breadcrumb">Beranda <span class="sep">/</span> <span>Pesanan Saya</span></div>
  <section class="section" style="padding-top:8px">
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
</div>

<!-- ========== ABOUT ========== -->
<div class="page" id="page-about">
  <div class="breadcrumb">Beranda <span class="sep">/</span> <span>Tentang Kami</span></div>
  <section class="section" style="padding-top:8px">
    <div class="about-2col">
      <div>
        <div class="section-label">About BrandSphere</div>
        <h2 class="section-title">Membangun Identitas Digital Bermakna</h2>
        <p style="font-size:14px;color:var(--text2);line-height:1.75;margin-bottom:16px;font-weight:300">BrandSphere lahir pada 2023 sebagai jawaban atas kebutuhan brand modern. Kami percaya setiap brand memiliki cerita yang layak diceritakan dengan cara terbaik.</p>
        <p style="font-size:14px;color:var(--text2);line-height:1.75;font-weight:300">Platform kami menggabungkan kemampuan e-commerce yang robust dengan company profile yang elegan.</p>
      </div>
      <div class="about-img-box">🏛<div class="about-stat-box"><div class="num">2k+</div><div class="lbl">Pelanggan Puas</div></div></div>
    </div>
    <div class="vm-grid" style="margin-top:48px">
      <div class="vm-card"><h3>🎯 Visi</h3><p>Menjadi platform digital terintegrasi terdepan yang memberdayakan setiap brand di ekosistem digital Indonesia dan global.</p></div>
      <div class="vm-card"><h3>🚀 Misi</h3><p>Menyediakan solusi digital terpadu yang menggabungkan e-commerce profesional, branding kuat, dan pengalaman pengguna terbaik.</p></div>
      <div class="vm-card"><h3>💎 Nilai</h3><p>Integritas, Inovasi, dan Inklusivitas menjadi tiga pilar yang menopang setiap keputusan dan produk yang kami hadirkan.</p></div>
      <div class="vm-card"><h3>🌱 Komitmen</h3><p>Berkomitmen pada keberlanjutan bisnis, pertumbuhan bersama mitra, dan dampak positif bagi ekosistem digital Indonesia.</p></div>
    </div>
  </section>
</div>

<!-- ========== BLOG ========== -->
<div class="page" id="page-blog">
  <div class="breadcrumb">Beranda <span class="sep">/</span> <span>Blog</span></div>
  <section class="section" style="padding-top:8px">
    <div class="section-label">Journal</div>
    <h2 class="section-title">Inspirasi & Insight</h2>
    <p class="section-desc">Temukan artikel tentang fashion, branding, dan tren digital terkini dari tim BrandSphere.</p>
    <div class="blog-grid">
      <div class="blog-card"><div class="blog-img">✍️</div><div class="blog-body"><div class="blog-tag">Branding</div><div class="blog-title">5 Cara Membangun Brand Identity yang Kuat di Era Digital</div><div class="blog-excerpt">Brand identity yang kuat bukan hanya logo — ini tentang bagaimana pelanggan merasakan Anda.</div><div class="blog-meta"><span>📅 20 Mei 2025</span><span>⏱ 5 mnt</span></div></div></div>
      <div class="blog-card"><div class="blog-img">🎨</div><div class="blog-body"><div class="blog-tag">Design</div><div class="blog-title">Tren UI/UX 2025: Minimalism yang Bermakna</div><div class="blog-excerpt">Desain minimalis kembali mendominasi dengan sentuhan personal yang lebih dalam.</div><div class="blog-meta"><span>📅 18 Mei 2025</span><span>⏱ 4 mnt</span></div></div></div>
      <div class="blog-card"><div class="blog-img">📈</div><div class="blog-body"><div class="blog-tag">E-Commerce</div><div class="blog-title">Strategi Konversi: Pengunjung Jadi Pembeli</div><div class="blog-excerpt">Konversi yang baik dimulai dari pengalaman belanja yang mulus dari awal hingga akhir.</div><div class="blog-meta"><span>📅 15 Mei 2025</span><span>⏱ 6 mnt</span></div></div></div>
    </div>
  </section>
</div>

<!-- ========== CAREER ========== -->
<div class="page" id="page-career">
  <div class="breadcrumb">Beranda <span class="sep">/</span> <span>Karir</span></div>
  <section class="section" style="padding-top:8px">
    <div class="section-label">Bergabung Bersama Kami</div>
    <h2 class="section-title">Karir di BrandSphere</h2>
    <p class="section-desc">Kami mencari individu berbakat yang siap membangun masa depan digital bersama kami.</p>
    <div class="career-list">
      <div class="career-card"><div><div class="career-title">Frontend Developer</div><div class="career-tags"><div class="career-tag">Full-Time</div><div class="career-tag">Remote</div><div class="career-tag">React / Tailwind</div><div class="career-tag">Jakarta</div></div></div><button class="btn btn-gold btn-sm" onclick="openModal()">Lamar</button></div>
      <div class="career-card"><div><div class="career-title">Backend Engineer (Laravel)</div><div class="career-tags"><div class="career-tag">Full-Time</div><div class="career-tag">Hybrid</div><div class="career-tag">Laravel / MySQL</div><div class="career-tag">Jakarta</div></div></div><button class="btn btn-gold btn-sm" onclick="openModal()">Lamar</button></div>
      <div class="career-card"><div><div class="career-title">UI/UX Designer</div><div class="career-tags"><div class="career-tag">Full-Time</div><div class="career-tag">Remote</div><div class="career-tag">Figma</div><div class="career-tag">Jakarta</div></div></div><button class="btn btn-gold btn-sm" onclick="openModal()">Lamar</button></div>
      <div class="career-card"><div><div class="career-title">Content & Social Media Specialist</div><div class="career-tags"><div class="career-tag">Full-Time</div><div class="career-tag">On-site</div><div class="career-tag">Copywriting</div><div class="career-tag">Jakarta</div></div></div><button class="btn btn-gold btn-sm" onclick="openModal()">Lamar</button></div>
    </div>
  </section>
</div>

<!-- ========== LOGIN ========== -->
<div class="page" id="page-login">
  <div class="auth-wrap">
    <div class="auth-card">
      <div class="auth-title">Selamat Datang</div>
      <div class="auth-sub">Masuk ke akun BrandSphere Anda</div>
      <!-- Role selector — pilih role simulasi redirect -->
      <div style="margin-bottom:6px"><label class="form-label">Login sebagai</label></div>
      <div class="role-selector">
        <button class="role-btn active" id="role-user" onclick="setRole('user')">👤 User</button>
        <button class="role-btn" id="role-admin" onclick="setRole('admin')">⚙️ Admin</button>
        <button class="role-btn" id="role-cm" onclick="setRole('cm')">✏️ Konten Manager</button>
      </div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-input" placeholder="nama@email.com" type="email"></div>
      <div class="form-group"><label class="form-label">Password</label><input class="form-input" placeholder="••••••••" type="password"></div>
      <div style="text-align:right;margin-bottom:18px"><a style="font-size:12px;color:var(--gold);cursor:pointer">Lupa password?</a></div>
      <button class="btn btn-gold btn-wide" onclick="doLogin()">Masuk →</button>
      <div class="auth-switch">Belum punya akun? <a onclick="showP('register')">Daftar di sini</a></div>
    </div>
  </div>
</div>

<!-- ========== REGISTER ========== -->
<div class="page" id="page-register">
  <div class="auth-wrap">
    <div class="auth-card">
      <div class="auth-title">Buat Akun</div>
      <div class="auth-sub">Bergabung dengan komunitas BrandSphere</div>
      <div class="form-row"><div class="form-group"><label class="form-label">Nama Depan</label><input class="form-input" placeholder="Budi"></div><div class="form-group"><label class="form-label">Nama Belakang</label><input class="form-input" placeholder="Santoso"></div></div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-input" placeholder="budi@email.com" type="email"></div>
      <div class="form-group"><label class="form-label">Password</label><input class="form-input" placeholder="Min. 8 karakter" type="password"></div>
      <div class="form-group"><label class="form-label">Konfirmasi Password</label><input class="form-input" placeholder="Ulangi password" type="password"></div>
      <button class="btn btn-gold btn-wide" style="margin-top:4px" onclick="doRegister()">Buat Akun →</button>
      <div class="auth-switch">Sudah punya akun? <a onclick="showP('login')">Masuk di sini</a></div>
    </div>
  </div>
</div>

<!-- MODAL LAMARAN -->
<div class="modal-bg" id="modal-bg" onclick="closeModal()">
  <div class="modal-box" onclick="event.stopPropagation()">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="modal-title">Lamar Posisi Ini</div>
    <div class="form-group"><label class="form-label">Nama Lengkap</label><input class="form-input" placeholder="Nama Anda"></div>
    <div class="form-group"><label class="form-label">Email</label><input class="form-input" placeholder="email@anda.com"></div>
    <div class="form-group"><label class="form-label">Portfolio / LinkedIn</label><input class="form-input" placeholder="https://..."></div>
    <div class="form-group"><label class="form-label">Upload CV</label><input class="form-input" type="file" style="padding:8px 14px"></div>
    <button class="btn btn-gold btn-wide" onclick="submitApply()">Kirim Lamaran →</button>
  </div>
</div>

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
