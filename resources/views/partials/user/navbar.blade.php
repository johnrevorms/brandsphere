<nav class="nav">

  <!-- Logo -->
  <a href="{{ route('user.dashboard') }}" class="nav-logo">
    <img src="{{ asset('images/logo.png') }}" alt="BrandSphere Logo" class="logo-img">
  </a>

  <!-- Navigation -->
  <ul class="nav-links">

    <li>
      <a href="{{ route('user.dashboard') }}"
         id="nl-home"
         class="{{ request()->routeIs('user.dashboard') ? 'active' : '' }}">
         Beranda
      </a>
    </li>

    <li>
      <a href="{{ route('products') }}"
         id="nl-products"
         class="{{ request()->routeIs('products') ? 'active' : '' }}">
         Produk
      </a>
    </li>

    <li>
      <a href="{{ route('about') }}"
         id="nl-about"
         class="{{ request()->routeIs('about') ? 'active' : '' }}">
         Tentang
      </a>
    </li>

    <li>
      <a href="{{ route('blog') }}"
         id="nl-blog"
         class="{{ request()->routeIs('blog') ? 'active' : '' }}">
         Blog
      </a>
    </li>

    <li>
      <a href="{{ route('career') }}"
         id="nl-career"
         class="{{ request()->routeIs('career') ? 'active' : '' }}">
         Karir
      </a>
    </li>

    <li>
      <a href="{{ route('orders') }}"
         id="nl-orders"
         class="{{ request()->routeIs('orders') ? 'active' : '' }}">
         Pesanan
      </a>
    </li>

  </ul>

  <!-- Right Side -->
  <div class="nav-right">

    <!-- Cart -->
    <a href="{{ route('cart') }}" class="cart-btn">
      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>

      <div class="cart-badge" id="cart-c">3</div>
    </a>

    <!-- Login -->
    <a href="{{ route('login') }}" class="btn btn-ghost btn-sm">
      Masuk
    </a>

    <!-- Register -->
    <a href="{{ route('register') }}" class="btn btn-gold btn-sm">
      Daftar
    </a>

  </div>

</nav>