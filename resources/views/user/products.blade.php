@extends('layouts.user')

@section('title', 'Produk — BrandSphere')

@section('content')

<!-- ========== PRODUCTS ========== -->

    <section class="section section-alt section-sm" style="padding:80px 80px 48px">

        <div class="section-label">Katalog</div>
        <h2 class="section-title">Semua Produk</h2>

        <!-- Category -->
        <div class="cat-row">
            <div class="cat-pill active">Semua</div>
            <div class="cat-pill">Outerwear</div>
            <div class="cat-pill">Accessories</div>
            <div class="cat-pill">Footwear</div>
            <div class="cat-pill">Tops</div>
            <div class="cat-pill">Bottoms</div>
        </div>

        <!-- Product Grid -->
        <div class="product-grid">

            <!-- Product 1 -->
            <div class="product-card">
                <div class="product-img">
                    🧥
                    <div class="product-badge">New</div>
                </div>

                <div class="product-body">
                    <div class="product-cat">Outerwear</div>
                    <div class="product-name">Premium Jacket</div>
                    <div class="product-price">Rp 850.000</div>

                    <div class="product-actions">
                        <button class="btn btn-gold btn-sm">
                            + Keranjang
                        </button>

                        <button class="btn btn-ghost btn-sm">
                            Detail
                        </button>
                    </div>
                </div>
            </div>

            <!-- Product 2 -->
            <div class="product-card">
                <div class="product-img">
                    👜
                    <div class="product-badge">Best</div>
                </div>

                <div class="product-body">
                    <div class="product-cat">Accessories</div>
                    <div class="product-name">Signature Bag</div>
                    <div class="product-price">Rp 1.250.000</div>

                    <div class="product-actions">
                        <button class="btn btn-gold btn-sm">
                            + Keranjang
                        </button>

                        <button class="btn btn-ghost btn-sm">
                            Detail
                        </button>
                    </div>
                </div>
            </div>

            <!-- Product 3 -->
            <div class="product-card">
                <div class="product-img">👟</div>

                <div class="product-body">
                    <div class="product-cat">Footwear</div>
                    <div class="product-name">Classic Shoes</div>
                    <div class="product-price">Rp 650.000</div>

                    <div class="product-actions">
                        <button class="btn btn-gold btn-sm">
                            + Keranjang
                        </button>

                        <button class="btn btn-ghost btn-sm">
                            Detail
                        </button>
                    </div>
                </div>
            </div>

            <!-- Product 4 -->
            <div class="product-card">
                <div class="product-img">👕</div>

                <div class="product-body">
                    <div class="product-cat">Tops</div>
                    <div class="product-name">Linen Shirt</div>
                    <div class="product-price">Rp 320.000</div>

                    <div class="product-actions">
                        <button class="btn btn-gold btn-sm">
                            + Keranjang
                        </button>

                        <button class="btn btn-ghost btn-sm">
                            Detail
                        </button>
                    </div>
                </div>
            </div>

            <!-- Product 5 -->
            <div class="product-card">
                <div class="product-img">👖</div>

                <div class="product-body">
                    <div class="product-cat">Bottoms</div>
                    <div class="product-name">Slim Trouser</div>
                    <div class="product-price">Rp 480.000</div>

                    <div class="product-actions">
                        <button class="btn btn-gold btn-sm">
                            + Keranjang
                        </button>

                        <button class="btn btn-ghost btn-sm">
                            Detail
                        </button>
                    </div>
                </div>
            </div>

            <!-- Product 6 -->
            <div class="product-card">
                <div class="product-img">🧣</div>

                <div class="product-body">
                    <div class="product-cat">Accessories</div>
                    <div class="product-name">Wool Scarf</div>
                    <div class="product-price">Rp 175.000</div>

                    <div class="product-actions">
                        <button class="btn btn-gold btn-sm">
                            + Keranjang
                        </button>

                        <button class="btn btn-ghost btn-sm">
                            Detail
                        </button>
                    </div>
                </div>
            </div>

        </div>

    </section>
@endsection