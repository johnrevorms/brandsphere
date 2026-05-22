@extends('layouts.user')

@section('title', 'Tentang Kami — BrandSphere')

@section('content')
 <!-- About Strip -->

  <section class="section section-alt section-sm" style="padding:80px 80px 48px">
    <div style="max-width:640px;margin:0 auto;text-align:center">
      <div class="section-label" style="justify-content:center">Mengapa BrandSphere</div>
      <h2 class="section-title" style="font-size:36px">Driven by Purpose,<br>Built for <em style="font-style:italic;color:var(--gold)">Brand</em></h2>
      <p style="font-size:14px;color:var(--text2);line-height:1.75;margin-bottom:28px;font-weight:300">Platform digital yang lahir dari keyakinan bahwa setiap brand berhak tampil profesional dan memiliki ekosistem digital yang kuat.</p>
      <button class="btn btn-gold" onclick="showP('about')">Selengkapnya</button>
    </div>
  </section>


@endsection