@extends('layouts.user')

@section('title', 'Karir — BrandSphere')

@section('content')
    <!-- ========== CAREER ========== -->
    <section class="section section-alt section-sm" style="padding:80px 80px 48px">
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
@endsection
